import { test } from 'node:test';
import assert from 'node:assert/strict';

test('each service produces an accurately scoped German email enquiry', async () => {
  const { services, createEnquiryHref, getService } =
    await import('../src/lib/services.ts');
  assert.equal(services.length, 3);
  for (const service of services) {
    assert.equal(getService(service.id)?.title, service.title);
    const url = new URL(createEnquiryHref('karl.kugler@proton.me', service.id));
    assert.equal(url.protocol, 'mailto:');
    assert.ok(
      !url.search.includes('+'),
      'mailto spaces must be percent-encoded',
    );
    assert.ok(url.searchParams.get('subject').includes(service.title));
    assert.ok(url.searchParams.get('body').includes('Hallo Karl'));
  }
  assert.equal(getService('<script>'), undefined);
  assert.match(
    createEnquiryHref('karl.kugler@proton.me', 'unknown'),
    /Zusammenarbeit/,
  );
});
