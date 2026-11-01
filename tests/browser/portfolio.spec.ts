import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/projects/',
  '/projects/haptiq-hand/',
  '/projects/evolab/',
  '/projects/little-detours/',
  '/lab/',
  '/writing/',
  '/writing/measuring-before-claiming/',
  '/writing/a-static-first-portfolio/',
  '/about/',
  '/contact/',
  '/404.html',
];

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

for (const width of [375, 768, 1024, 1440]) {
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
      if (width === 375 || width === 1440)
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
    for (const route of routes.filter((route) => route !== '/404.html')) {
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
  await expect(page.locator('[data-category]:visible')).toHaveCount(3);
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

test('content and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/projects/');
  await expect(page.locator('[data-category]:visible')).toHaveCount(3);
  await expect(page.locator('.filters')).toBeHidden();
  await page.getByRole('link', { name: 'HaptIQ Hand', exact: true }).click();
  await expect(page.locator('h1')).toContainText('HaptIQ Hand');
  await page.goto('http://127.0.0.1:4321/lab/');
  await expect(page.locator('#signal-plot')).toBeVisible();
  await expect(page.locator('.signal-controls')).toBeHidden();
  await context.close();
});

test('hero text fits and service links prepare the right enquiry', async ({
  page,
}) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const linesFit = await page
      .locator('.hero-line')
      .evaluateAll((lines) =>
        lines.every(
          (line) => line.firstElementChild!.scrollWidth <= line.clientWidth + 1,
        ),
      );
    expect(linesFit, `hero at ${width}px`).toBe(true);
  }
  await page.getByRole('link', { name: /Messe & Host/ }).click();
  await expect(page).toHaveURL(/anliegen=messe/);
  await expect(page.locator('#enquiry-email')).toHaveAttribute(
    'href',
    /Messe/i,
  );
});

test('reduced motion disables the animated hero', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.hero-line > span').first()).toHaveCSS(
    'animation-duration',
    '0s',
  );
});
