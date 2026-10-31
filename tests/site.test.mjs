import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const routes = [
  '',
  'projects',
  'projects/haptiq-hand',
  'projects/evolab',
  'lab',
  'writing',
  'writing/measuring-before-claiming',
  'writing/a-static-first-portfolio',
  'about',
  'contact',
];

test('every portfolio route is generated with a main landmark and descriptive title', () => {
  for (const route of routes) {
    const path = `dist/${route ? `${route}/` : ''}index.html`;
    assert.ok(existsSync(path), `Missing built route: /${route}`);
    const html = readFileSync(path, 'utf8');
    assert.match(html, /<main[ >]/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /href="#main"/);
    assert.doesNotMatch(html, /hello@example.com|Your Name|Lorem ipsum/);
  }
});

test('contact uses the supplied profile and real email, without an inert form', () => {
  const html = readFileSync('dist/contact/index.html', 'utf8');
  assert.match(html, /https:\/\/www.linkedin.com\/in\/karl-kugler/);
  assert.match(html, /mailto:karl.kugler@proton.me/);
  assert.doesNotMatch(html, /<form/);
});

test('every internal link and local asset resolves in the production output', () => {
  const files = readdirSync('dist', { recursive: true }).filter((file) =>
    String(file).endsWith('.html'),
  );
  for (const file of files) {
    const html = readFileSync(join('dist', String(file)), 'utf8');
    for (const match of html.matchAll(
      /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
    )) {
      const target = decodeURIComponent(match[1]);
      const path = join(
        'dist',
        target.endsWith('/') ? `${target}index.html` : target,
      );
      assert.ok(existsSync(path), `${file} links to missing ${target}`);
    }
  }
});

test('indexing is enabled only when the real production URL is configured', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const robots = readFileSync('dist/robots.txt', 'utf8');
  if (process.env.SITE_URL) {
    assert.match(html, /rel="canonical"/);
    assert.ok(html.includes(process.env.SITE_URL));
    assert.doesNotMatch(html, /noindex/);
    assert.match(robots, /Sitemap:/);
    assert.ok(existsSync('dist/sitemap-index.xml'));
  } else {
    assert.match(html, /noindex, nofollow/);
    assert.match(robots, /Disallow: \//);
    assert.doesNotMatch(html, /rel="canonical"/);
  }
});
