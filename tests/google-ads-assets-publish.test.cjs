const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const src = fs.readFileSync(path.resolve(__dirname, '../scripts/google_ads_sheets_bridge.gs'), 'utf8');

test('one parsable main entrypoint', () => {
  assert.doesNotThrow(() => new vm.Script(src));
  assert.equal((src.match(/function main\s*\(/g) || []).length, 1);
});
test('publication imports from private authorized Sheets queue only', () => {
  assert.match(src, /function msPublishApprovedAssets_/);
  assert.match(src, /getSheetByName\('PUBLICAR_ASSETS'\)/);
  assert.match(src, /6767362372/);
  assert.match(src, /24423699562/);
  assert.match(src, /getId\(\)/);
});
test('uploads images and adds to existing Performance Max group', () => {
  assert.match(src, /DriveApp\.getFileById/);
  assert.match(src, /newImageAssetBuilder\(\)/);
  assert.match(src, /withSyntheticContentAttestation\('IS_SYNTHETIC'\)/);
  assert.match(src, /group\.addAsset\(/);
  assert.match(src, /SQUARE_MARKETING_IMAGE/);
});
test('publication enforces safety, campaign and price safeguards', () => {
  assert.match(src, /getExecutionInfo\(\)\.isPreview\(\)/);
  assert.match(src, /status\s*!==\s*'PENDENTE'/);
  assert.match(src, /approved\s*!==\s*'SIM'/);
  assert.match(src, /amount\s*>\s*1/);
  assert.doesNotMatch(src, /\.setAmount\s*\(/);
  assert.doesNotMatch(src, /\.enable\s*\(/);
  assert.doesNotMatch(src, /createCampaign\s*\(/);
});
test('safe retries prevent duplicates, keep original assets', () => {
  assert.match(src, /'PROCESSANDO'/);
  assert.match(src, /'PUBLICADO'/);
  assert.doesNotMatch(src, /group\.removeAsset\(/);
});
