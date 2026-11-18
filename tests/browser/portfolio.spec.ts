import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const germanRoutes = [
  '/',
  '/projects/',
  '/projects/haptiq-hand/',
  '/projects/evolab/',
  '/projects/little-detours/',
  '/projects/picture-to-print/',
  '/lab/',
  '/writing/',
  '/writing/measuring-before-claiming/',
  '/writing/a-static-first-portfolio/',
  '/about/',
  '/contact/',
  '/404.html',
];
const routes = [...germanRoutes, ...germanRoutes.map((route) => `/en${route}`)];

test('visible link text is included in the accessible name for speech navigation', async ({
  page,
}) => {
  for (const route of ['/', '/projects/']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withRules(['label-content-name-mismatch'])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
});

for (const width of [375, 768, 1440, 1920]) {
  test(`all pages render without overflow, failed assets or console errors at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().endsWith('/404.html'))
        errors.push(`${response.status()} ${response.url()}`);
    });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(
            () =>
              image.evaluate(
                (element: HTMLImageElement) =>
                  element.complete && element.naturalWidth > 0,
              ),
            { message: route },
          )
          .toBe(true);
      }
      expect(
        await page
          .locator('img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
        route,
      ).toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(
          `${route.replaceAll('/', '_') || 'home'}-${width}.png`,
        ),
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });
}

test('major pages meet WCAG 2.2 AA automated accessibility rules in both themes', async ({
  page,
}) => {
  for (const theme of ['light', 'dark']) {
    for (const route of routes.filter(
      (route) => !route.endsWith('/404.html'),
    )) {
      await page.goto(route);
      await page.evaluate(
        (value) => (document.documentElement.dataset.theme = value),
        theme,
      );
      const results = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
        ])
        .analyze();
      expect(results.violations, `${route} in ${theme}`).toEqual([]);
    }
  }
});

test('project filters can be operated from the keyboard', async ({ page }) => {
  await page.goto('/projects/');
  const robotics = page.getByRole('button', { name: 'Robotik', exact: true });
  await robotics.focus();
  await page.keyboard.press('Enter');
  await expect(robotics).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-category]:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('1 Projekt');
  await page.getByRole('button', { name: 'Alle Projekte' }).click();
  await expect(page.locator('[data-category]:visible')).toHaveCount(4);
});

test('theme persists and skip link reaches the main content', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Zum Inhalt' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.getByRole('button', { name: 'Dunkle Ansicht aktivieren' }).click();
  await page.goto('/about/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('blocked local storage leaves navigation and theme functional', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Blocked storage');
      },
    }),
  );
  await page.goto('/');
  await page.getByRole('button', { name: 'Dunkle Ansicht aktivieren' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('signal controls expose aliasing and the exact threshold', async ({
  page,
}) => {
  await page.goto('/lab/');
  const frequency = page.getByRole('slider', { name: 'Signalfrequenz' });
  const sampleRate = page.getByRole('slider', { name: 'Abtastrate' });
  await frequency.fill('12');
  await sampleRate.fill('4');
  await expect(page.locator('.signal-readout[role="status"]')).toContainText(
    'Unter der Nyquist-Grenze',
  );
  await sampleRate.fill('24');
  await expect(page.locator('.signal-readout[role="status"]')).toContainText(
    'An der Nyquist-Grenze',
  );
  await sampleRate.fill('64');
  await expect(page.locator('.signal-readout[role="status"]')).toContainText(
    'Über der Nyquist-Grenze',
  );
  await expect(page.locator('#signal-samples circle')).toHaveCount(65);
});

test('content and navigation work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('/projects/');
  await expect(page.locator('[data-category]:visible')).toHaveCount(4);
  await expect(page.locator('.filters')).toBeHidden();
  await page
    .getByRole('heading', { name: 'HaptIQ Hand', exact: true })
    .getByRole('link')
    .click();
  await expect(page.locator('h1')).toContainText('HaptIQ Hand');
  await page.goto('/lab/');
  await expect(page.locator('#signal-plot')).toBeVisible();
  await expect(page.locator('.signal-controls')).toBeHidden();
  await page.goto('/en/contact/');
  await expect(
    page.getByRole('link', { name: 'Trade fairs & events' }),
  ).toHaveAttribute('href', /^mailto:.*Trade%20fairs/);
  await context.close();
});

test('home names the degree and the enquiry detects the event service', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Karl\s+Kugler/,
  );
  await expect(
    page.getByText('Mechatronik und Informationstechnik am KIT', {
      exact: true,
    }),
  ).toBeVisible();
  await page.locator('summary').click();
  await page.getByRole('link', { name: /Messe & Host/ }).click();
  await expect(page).toHaveURL(/anliegen=messe#freelance$/);
  await expect(page.locator('#enquiry-email')).toHaveAttribute(
    'href',
    /Messe/i,
  );
});

test('language switch stays on the corresponding project and works without client scripts', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('/projects/evolab/');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/evolab\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('heading', { name: 'What keeps a population alive?' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Deutsch' }).click();
  await expect(page).toHaveURL(/\/projects\/evolab\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await context.close();
});

test('English lab controls and enquiry subjects are translated', async ({
  page,
}) => {
  await page.goto('/contact/?anliegen=messe#freelance');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/contact\/\?anliegen=messe#freelance$/);
  await expect(page.locator('#enquiry-title')).toHaveText(
    'Trade fairs & events',
  );
  await expect(page.locator('#enquiry-email')).toHaveAttribute(
    'href',
    /Trade%20fairs/,
  );
  await page.goto('/en/lab/');
  await page.getByRole('slider', { name: 'Signal frequency' }).fill('12');
  await page.getByRole('slider', { name: 'Sample rate' }).fill('4');
  await expect(page.locator('.signal-readout[role="status"]')).toContainText(
    'Below the Nyquist limit',
  );
});

test('reduced motion keeps the home hero static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'animation-duration',
    '0s',
  );
  await expect(page.getByRole('link', { name: 'Projekte ansehen' })).toHaveCSS(
    'transition-duration',
    '0s',
  );
});
