import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL;

// Case's static MDX + sitemap architecture, with a conditional production URL.
export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx(), ...(site ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
  markdown: { shikiConfig: { theme: 'github-dark', wrap: true } },
});
