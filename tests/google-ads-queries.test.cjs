const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const src=fs.readFileSync(path.resolve(__dirname,'../scripts/google_ads_sheets_bridge.gs'),'utf8');
test('one main and valid Ads Script syntax',()=>{assert.doesNotThrow(()=>new vm.Script(src));assert.equal((src.match(/function main\s*\(/g)||[]).length,1)});
test('query runner reads configuration from Sheets',()=>{assert.match(src,/function msRunConfiguredReports_/);assert.match(src,/getSheetByName\('CONSULTAS'\)/);assert.match(src,/AdsApp\.search\(sql\)/)});
test('strict report target names',()=>{assert.match(src,/GRUPOS_RECURSOS/);assert.match(src,/CONVERSOES/);assert.match(src,/CONFIG_PMAX/);assert.match(src,/LOCALIZACOES/)});
test('read only queries and prevent spreadsheet injection',()=>{assert.match(src,/^\s*if\s*\(!\/\^SELECT/mi);assert.match(src,/^\s*if\s*\(\/\^\[=\+\\-@\]/mi)});
test('ad spend safety',()=>{assert.doesNotMatch(src,/\.setAmount\s*\(/);assert.doesNotMatch(src,/\.enable\s*\(/);assert.doesNotMatch(src,/createCampaign\s*\(/);assert.match(src,/EXECUTAR_COMANDOS/);assert.match(src,/MS_ADS_CUSTOMER\s*=\s*'987-700-7101'/)});
