const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repo = path.join(__dirname, '..');
function quotePage(relativePath) {
  return fs.readFileSync(path.join(repo, relativePath), 'utf8');
}
function verifyQuote(relativePath) {
  const html = quotePage(relativePath);
  assert.match(html, /<input[^>]+id="clientEmail"[^>]*type="email"[^>]*>/);
  assert.match(html, /id="marketingEmailOptIn"[^>]+type="checkbox"/);
  assert.doesNotMatch(html, /id="marketingEmailOptIn"[^>]+checked(?:\s|>)/);
  assert.match(html, /id="sendBtn">Finalizar pelo WhatsApp/);
  assert.match(html, /emailInput\.checkValidity\(\)/);
  assert.match(html, /emailInput\.reportValidity\(\)/);
  assert.match(html, /marketingOptIn\s*&&\s*!email/);
  assert.match(html, /E-mail para retorno:/);
  assert.match(html, /Consentimento de e-mail marketing:/);
  assert.match(html, /window\.open\('https:\/\/wa\.me\/'.*encodeURIComponent\(msg\)/);
  assert.doesNotMatch(html, /api\.brevo\.com\s*\/|api-key\s*[:=]/i);
}

test('preview: email can accompany quotes, newsletter opt-in is separate', () => {
  verifyQuote('wix-preview/servicos/index.html');
});
if (process.env.QUOTE_VERIFY_PRODUCTION === '1') {
  test('production: email capture remains consistent with preview', () => {
    verifyQuote('servicos/index.html');
  });
}
