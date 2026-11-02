const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const src = fs.readFileSync(path.join(__dirname, '..', 'scripts/google_ads_sheets_bridge.gs'), 'utf8');

test('script parses and defines one main entrypoint', () => {
  assert.doesNotThrow(() => new vm.Script(src));
  assert.equal((src.match(/function main\s*\(/g) || []).length, 1);
});

test('campaign is pinned and all advertising mutations require explicit enablement', () => {
  assert.match(src, /MS_ADS_CUSTOMER\s*=\s*'987-700-7101'/);
  assert.match(src, /EXECUTAR_COMANDOS/);
  assert.doesNotMatch(src, /\.(?:setAmount|enable)\s*\(/);
  assert.doesNotMatch(src, /createCampaign\s*\(/);
});

test('Performance Max entities use their dedicated selector', () => {
  assert.match(src, /AdsApp\.performanceMaxCampaigns\(\)\.withIds\(\[campaignId\]\)/);
});

test('conversion actions, actual campaign goals, URL destinations and geo targeting are audited', () => {
  assert.match(src, /FROM conversion_action/);
  assert.match(src, /FROM campaign_conversion_goal/);
  assert.match(src, /FROM asset_group/);
  assert.match(src, /FROM asset_group_asset/);
  assert.match(src, /FROM campaign_criterion/);
  assert.match(src, /asset_group\.final_urls/);
});

test('new reports are written only to named audit sheets', () => {
  for (const tab of ['GRUPOS_RECURSOS', 'RECURSOS', 'CONVERSOES', 'METAS', 'LOCALIZACOES']) {
    assert.ok(src.includes("'" + tab + "'"), 'missing tab: ' + tab);
  }
});

test('Performance Max rejects unsupported negative keyword edits', () => {
  assert.match(src, /NEGATIVAR/);
  assert.match(src, /Performance Max.*não aceita palavras-chave negativas/i);
});
