import { rename, rmdir } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL;
const englishNotFound = {
  name: 'english-not-found',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      // Pages looks for the nearest 404.html, while Astro treats only the root error route as a file.
      const folder = new URL('en/404/', dir);
      await rename(new URL('index.html', folder), new URL('en/404.html', dir));
      await rmdir(folder);
    },
  },
};

// Case's static MDX + sitemap architecture, with a conditional production URL.
export default defineConfig({
  site,
  output: 'static',
  integrations: [
    mdx(),
    englishNotFound,
    ...(site
      ? [
          sitemap({
            filter: (page) => !/^\/en\/404\/?$/.test(new URL(page).pathname),
          }),
        ]
      : []),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: { shikiConfig: { theme: 'github-dark', wrap: true } },
});
