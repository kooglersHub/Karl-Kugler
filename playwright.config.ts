import { defineConfig } from '@playwright/test';

const previewUrl = process.env.PLAYWRIGHT_PREVIEW_URL;

export default defineConfig({
  testDir: './tests/browser',
  timeout: 60000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: previewUrl ?? 'http://127.0.0.1:4321',
    channel: process.env.CI ? 'chromium' : 'msedge',
    headless: true,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  },
  webServer: previewUrl
    ? undefined
    : {
        command:
          'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4321',
        port: 4321,
        reuseExistingServer: false,
      },
});
