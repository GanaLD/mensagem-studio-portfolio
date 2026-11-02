const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const web = read('servicos/index.html');
function schema(file) {
  const html = read(file);
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'Missing JSON-LD: ' + file);
  return JSON.parse(match[1])['@graph'];
}
const priceRows = [
  ['landing-pages/index.html', [399, 1199, 1399]],
  ['video-ia/index.html', [299]],
  ['servicos/identidade-visual-branding/index.html', [750, 1500]],
  ['servicos/modelagem-3d-produto/index.html', [100, 225, 400]],
  ['servicos/sites-html/index.html', [399, 1199, 1399]],
];

for (const [file, expected] of priceRows) {
  test(file + ': published offers match JSON-LD and remain indexable', () => {
    const graph = schema(file);
    const service = graph.find(item => item['@type'] === 'Service');
    assert.ok(service, 'Missing Service schema');
    const offers = (service.hasOfferCatalog || service.offers).itemListElement;
    assert.deepEqual(offers.map(offer => Number(offer.price)), expected);
    const html = read(file);
    assert.match(html, /rel="canonical" href="https:\/\/mensagemstudio\.shop\//);
    assert.match(html, /name="robots" content="index,follow/);
  });
}

const catalog = [
  ['Manual essencial', 750],
  ['Manual completo', 1500],
  ['Modelo 3D Produto', 100],
  ['Produto + vídeo render animado', 225],
  ['Ambiente 3D + produto + render', 400],
  ['Landing Page HTML Essencial (até 3 seções)', 399],
  ['Editor independente + HTML', 1199],
  ['HTML + domínio publicado*', 1399],
];
test('catalog prices match the displayed offers and cart', () => {
  for (const [name, price] of catalog) {
    assert.ok(web.includes("'" + name + "'," + price), 'Missing catalog price: ' + name);
  }
  assert.match(web, /const PROMO_REFERENCE=/);
  assert.match(web, /cart=cart\.map\(/);
  assert.match(web, /p:current\[2\]/);
});
test('HTML essential is not falsely presented as the same R$ 900 product', () => {
  assert.doesNotMatch(read('landing-pages/index.html'), /<s class="original-price">R\$ 900<\/s>/);
  assert.match(read('servicos/sites-html/index.html'), /até 3 seções/);
});
test('landing page and video keep working contact links and price styles', () => {
  for (const p of ['video-ia/index.html', 'landing-pages/index.html']) {
    assert.match(read(p), /https:\/\/wa\.me\/5541999999937/);
    assert.match(read(p), /assets\/lp-campaigns\.css\?v=20261102/);
  }
  assert.match(read('assets/lp-campaigns.css'), /\.discount-price/);
  assert.match(read('servicos/service-page.css'), /\.discount-price/);
});
