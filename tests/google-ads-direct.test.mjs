import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validatePlan, locationOperation, groupUpdateOperation, campaignUpdateOperation, textLinkOperations, imageDimensions } from '../scripts/google-ads-direct.mjs';
const plan=JSON.parse(readFileSync(new URL('../ops/google-ads/plan.json',import.meta.url),'utf8'));
test('only one pinned account, PMax group and existing R$1 budget',()=>{
  assert.doesNotThrow(()=>validatePlan(plan));
  for(const [k,v] of [['customerId','123'],['campaignId','123'],['assetGroupId','123'],['dailyBudgetMicros','2000000'],['currency','USD']]){
    assert.throws(()=>validatePlan({...plan,[k]:v}),/Bloqueado/);
  }
});
test('only wwwless .shop approved destination',()=>{
  assert.throws(()=>validatePlan({...plan,destination:'https://mensagemstudio.com.br/servicos/'}),/Bloqueado/);
  assert.throws(()=>validatePlan({...plan,destination:'https://mensagemstudio.shop.evil.test/'}),/Bloqueado/);
});
test('11 exact text replacement rows with character limits and no duplicates',()=>{
  assert.equal(plan.textReplacements.length,11);
  assert.equal(plan.images.length,4);
  for(const r of plan.textReplacements) assert.ok(r.newText.length<= (r.fieldType==='HEADLINE'?30:90));
  assert.throws(()=>validatePlan({...plan,textReplacements:[...plan.textReplacements,plan.textReplacements[0]]}),/Bloqueado/);
});
test('geolocation creates only desired proximity and no extra regions',()=>{
  const op=locationOperation(plan);
  assert.deepEqual(op.create.proximity.geoPoint,{latitudeInMicroDegrees:-25428000,longitudeInMicroDegrees:-49273000});
  assert.equal(op.create.proximity.radius,35);
  assert.equal(op.create.campaign,'customers/9877007101/campaigns/24423699562');
});
test('updates can change only campaign name, presence and group name/url',()=>{
  const c=campaignUpdateOperation(plan,true,true);
  const g=groupUpdateOperation(plan,true,true);
  assert.equal(c.updateMask,'name,geo_target_type_setting.positive_geo_target_type');
  assert.equal(g.updateMask,'name,final_urls');
  assert.equal(c.update.name,plan.campaignName);
  assert.equal(g.update.finalUrls[0],plan.destination);
  assert.ok(!JSON.stringify(c).includes('budget'));
  assert.ok(!JSON.stringify(g).includes('budget'));
});
test('text changes are atomic link replacements referencing exact asset group',()=>{
  const existing={resourceName:'customers/9877007101/assetGroupAssets/6767362372~434896667966~HEADLINE',asset:'customers/9877007101/assets/434896667966',fieldType:'HEADLINE'};
  const ops=textLinkOperations(plan,[{row:plan.textReplacements[0],current:existing,newAsset:'customers/9877007101/assets/999999999'}]);
  assert.equal(ops.length,2);
  assert.equal(ops[0].remove,existing.resourceName);
  assert.equal(ops[1].create.assetGroup,'customers/9877007101/assetGroups/6767362372');
  assert.equal(ops[1].create.fieldType,'HEADLINE');
});
test('binary validation requires PNG square at least 300px',()=>{
  const png=Buffer.alloc(33);Buffer.from('89504e470d0a1a0a','hex').copy(png);png.writeUInt32BE(1000,16);png.writeUInt32BE(1000,20);
  assert.deepEqual(imageDimensions(png),{width:1000,height:1000});
  png.writeUInt32BE(200,20);
  assert.throws(()=>imageDimensions(png),/quadrada/);
});
