const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.resolve(__dirname,'../scripts/google_ads_sheets_bridge.gs'),'utf8');

test('RAW V6 has one main and valid JavaScript',()=>{
  assert.doesNotThrow(()=>new vm.Script(source));
  assert.equal((source.match(/function main\s*\(/g)||[]).length,1);
  assert.match(source,/msApplyPMaxSettings_\(ss, account, cfg\)/);
});

test('specific authorized campaign and asset group only',()=>{
  assert.match(source,/getSheetByName\('AJUSTES_PMAX'\)/);
  assert.match(source,/campaignId\s*=\s*'24423699562'/);
  assert.match(source,/groupId\s*=\s*'6767362372'/);
  assert.match(source,/account\.getCustomerId\(\)/);
  assert.match(source,/getCurrencyCode\(\)/);
  assert.match(source,/approved\s*!==\s*'SIM'/);
  assert.match(source,/status\s*!==\s*'PENDENTE'/);
});

test('supports verified locality and destination settings',()=>{
  assert.match(source,/ADD_PROXIMITY/);
  assert.match(source,/SET_GEO_PRESENCE/);
  assert.match(source,/SET_FINAL_URL/);
  assert.match(source,/RENAME_GROUP/);
  assert.match(source,/getFinalUrl\(\)/);
  assert.match(source,/setFinalUrl\(/);
  assert.match(source,/targetedProximities\(\)/);
  assert.match(source,/campaignOperation/);
  assert.match(source,/geo_target_type_setting\.positive_geo_target_type/);
});

test('does not create campaigns, alter budget or force ads on',()=>{
  assert.doesNotMatch(source,/\.setAmount\s*\(/);
  assert.doesNotMatch(source,/\.enable\s*\(/);
  assert.doesNotMatch(source,/createCampaign\s*\(/);
  assert.match(source,/getExecutionInfo\(\)\.isPreview\(\)/);
  assert.match(source,/amount\s*>\s*1/);
});

test('reports idempotent and error states for each action',()=>{
  assert.match(source,/PROCESSANDO/);
  assert.match(source,/EXECUTADO/);
  assert.match(source,/IGNORADO/);
  assert.match(source,/REVISAR/);
  assert.match(source,/ERRO/);
});
