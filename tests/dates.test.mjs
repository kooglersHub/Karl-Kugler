import { test } from 'node:test';
import assert from 'node:assert/strict';

test('article list dates follow their data, independent of the host timezone', async () => {
  const { formatMonthYear } = await import('../src/lib/dates.ts');
  assert.equal(formatMonthYear(new Date('2027-02-01T00:00:00Z')), 'FEB 2027');
  assert.equal(formatMonthYear(new Date('2026-11-01T00:00:00Z')), 'NOV 2026');
});
