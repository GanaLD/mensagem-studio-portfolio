#!/usr/bin/env node
/**
 * Mensagem Studio — Google Ads API direct writer (v26, Google Cloud Explorer).
 * One target only. No UI automation, no ad-script replacement, no budget writes.
 * OAuth user consent: adwords + drive.readonly (private, preapproved image files).
 * Nothing is sent to the API without --apply AND locked environment confirmation.
 */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const PLAN_PATH=fileURLToPath(new URL('../ops/google-ads/plan.json',import.meta.url));
const API='https://googleads.googleapis.com/v26';
const PIN={customerId:'9877007101',campaignId:'24423699562',assetGroupId:'6767362372',currency:'BRL',dailyBudgetMicros:'1000000'};
const ALLOWED_URL='https://mensagemstudio.shop/servicos/';
const APPROVAL_ENV='APPLY_9877007101_24423699562';

export function validatePlan(plan) {
  for(const [k,v] of Object.entries(PIN)) if(String(plan[k])!==v) throw Error('Bloqueado: '+k+' diferente da campanha autorizada.');
  if(plan.destination!==ALLOWED_URL) throw Error('Bloqueado: URL fora do .shop aprovado.');
  if(plan.positiveGeo!=='PRESENCE') throw Error('Bloqueado: segmentação não autorizada.');
  if(plan.dailyBudgetMustRemainUnchanged!==true || plan.approval?.explicitUserApproval!==true ||
     !plan.approval?.campaignOnly || !plan.approval?.noNewCampaigns || !plan.approval?.noBillingChanges)
    throw Error('Bloqueado: falta aprovação e travas de segurança.');
  const {latitude,longitude,radiusKm}=plan.geo||{};
  if(latitude!==-25.428 || longitude!==-49.273 || radiusKm!==35)
    throw Error('Bloqueado: raio não autorizado.');
  if(!Array.isArray(plan.textReplacements)||plan.textReplacements.length!==11||
     !Array.isArray(plan.images)||plan.images.length!==4)
    throw Error('Bloqueado: plano incompleto.');
  let pairs=new Set();
  for(const t of plan.textReplacements) {
    const limit={HEADLINE:30,LONG_HEADLINE:90,DESCRIPTION:90}[t.fieldType];
    const pair=t.fieldType+'|'+t.oldAssetId;
    if(!/^MS-[HLD]-\d\d$/.test(t.id)||!limit||!/^\d+$/.test(t.oldAssetId)||
       !t.newText||t.newText.length>limit||!t.oldText||pairs.has(pair))
      throw Error('Bloqueado: substituição de texto inválida/duplicada: '+t.id);
    pairs.add(pair);
  }
  for(const a of plan.images)
    if(!/^MS-IMG-/.test(a.id)||!/^MS-PMAX-20261104-[A-Z0-9-]+$/.test(a.assetName)||
      !/^[A-Za-z0-9_-]{15,}$/.test(a.driveFileId)||
      a.fieldType!=='SQUARE_MARKETING_IMAGE')
      throw Error('Bloqueado: imagem fora da lista autorizada.');
  return true;
}
export function locationOperation(plan) {
  return {create:{campaign:'customers/'+PIN.customerId+'/campaigns/'+PIN.campaignId,
    proximity:{geoPoint:{latitudeInMicroDegrees:Math.round(plan.geo.latitude*1e6),
      longitudeInMicroDegrees:Math.round(plan.geo.longitude*1e6)},
      radius:plan.geo.radiusKm,radiusUnits:'KILOMETERS'}}};
}
export function campaignUpdateOperation(plan,changeName,changePresence) {
  const update={resourceName:'customers/'+PIN.customerId+'/campaigns/'+PIN.campaignId},mask=[];
  if(changeName){update.name=plan.campaignName;mask.push('name');}
  if(changePresence){update.geoTargetTypeSetting={positiveGeoTargetType:'PRESENCE'};mask.push('geo_target_type_setting.positive_geo_target_type');}
  return {update,updateMask:mask.join(',')};
}
export function groupUpdateOperation(plan,changeName,changeUrl) {
  const update={resourceName:'customers/'+PIN.customerId+'/assetGroups/'+PIN.assetGroupId},mask=[];
  if(changeName){update.name=plan.assetGroupName;mask.push('name');}
  if(changeUrl){update.finalUrls=[plan.destination];mask.push('final_urls');}
  return {update,updateMask:mask.join(',')};
}
export function textLinkOperations(plan,ready) {
  const group='customers/'+PIN.customerId+'/assetGroups/'+PIN.assetGroupId;
  return [...ready.map(({current})=>({remove:current.resourceName})),
    ...ready.map(({row,newAsset})=>({create:{assetGroup:group,asset:newAsset,fieldType:row.fieldType}}))];
}
export function imageDimensions(buf){
  if(!Buffer.isBuffer(buf)||buf.length<24||buf.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')
    throw Error('Somente PNG válido.');
  const width=buf.readUInt32BE(16),height=buf.readUInt32BE(20);
  if(width<300||height!==width||buf.length>5*1024*1024)
    throw Error('Imagem deve ser quadrada, >=300px e <=5 MiB.');
  return {width,height};
}
export function assertLiveTargets(plan,campaign,group) {
  if(String(campaign.id)!==PIN.campaignId ||
     campaign.advertisingChannelType!=='PERFORMANCE_MAX' ||
     campaign.status!=='ENABLED' ||
     String(campaign.campaignBudget)!==String('customers/'+PIN.customerId+'/campaignBudgets/'+String(campaign.campaignBudget).split('/').pop()) ||
     String(campaign.budgetAmountMicros)!==PIN.dailyBudgetMicros)
    throw Error('Bloqueado: estado, tipo ou orçamento inesperado.');
  if(String(group.id)!==PIN.assetGroupId ||
     group.campaign!=='customers/'+PIN.customerId+'/campaigns/'+PIN.campaignId ||
     group.status!=='ENABLED')
    throw Error('Bloqueado: grupo de recursos inesperado.');
  for(const url of group.finalUrls||[]){
    if(typeof url!=='string'||!url.startsWith('https://mensagemstudio.shop/'))
      throw Error('Bloqueado: grupo usa URL externa ao .shop.');
  }
}
function reqEnv(key){const x=process.env[key];if(!x)throw Error('CREDENCIAL_AUSENTE: '+key);return x;}
async function getAccessToken(){
  const params=new URLSearchParams({client_id:reqEnv('GOOGLE_ADS_CLIENT_ID'),
    client_secret:reqEnv('GOOGLE_ADS_CLIENT_SECRET'),
    refresh_token:reqEnv('GOOGLE_ADS_REFRESH_TOKEN'),grant_type:'refresh_token'});
  const r=await fetch('https://oauth2.googleapis.com/token',{
    method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:params});
  const j=await r.json();if(!r.ok||!j.access_token)
    throw Error('Falha OAuth: '+(j.error||r.status));
  return j.access_token;
}
export class AdsClient {
  constructor(token){this.token=token;}
  async call(path,body,method='POST',drive=false){
    const url=drive?path:API+'/customers/'+PIN.customerId+'/'+path;
    const headers={'Authorization':'Bearer '+this.token,'Content-Type':'application/json'};
    if(!drive&&process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID){
      headers['login-customer-id']=process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/\D/g,'');
    }
    const r=await fetch(url,{method,headers,...(body===undefined?{}:{body:JSON.stringify(body)})});
    const j=await r.json().catch(()=>({}));
    if(!r.ok||j.error)throw Error('Ads API '+r.status+' '+JSON.stringify(j.error||j).slice(0,800));
    return j;
  }
  async search(query) {
    let results=[],pageToken='';
    do{
      const j=await this.call('googleAds:search',{query,...(pageToken?{pageToken}:{})});
      results.push(...(j.results||[]));pageToken=j.nextPageToken||'';
      if(results.length>500)throw Error('Bloqueado: consulta retornou resultados demais.');
    }while(pageToken);
    return results;
  }
  async mutate(resource,operations) {
    if(!operations.length)return {results:[]};
    if(operations.length>40)throw Error('Bloqueado: número excessivo de alterações.');
    return this.call(resource+':mutate',{operations,partialFailure:false});
  }
  async drivePng(id) {
    const url='https://www.googleapis.com/drive/v3/files/'+encodeURIComponent(id)+'?alt=media';
    const r=await fetch(url,{headers:{Authorization:'Bearer '+this.token}});
    if(!r.ok)throw Error('Imagem Drive não acessível ('+r.status+'): '+id);
    const buf=Buffer.from(await r.arrayBuffer());imageDimensions(buf);return buf;
  }
}
async function getSnapshot(api,plan) {
  const [custRows,campaignRows,groupRows,assetRows,geoRows] = await Promise.all([
    api.search('SELECT customer.id, customer.currency_code, customer.time_zone FROM customer LIMIT 1'),
    api.search('SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign.campaign_budget, campaign.geo_target_type_setting.positive_geo_target_type, campaign_budget.amount_micros FROM campaign WHERE campaign.id = '+PIN.campaignId),
    api.search('SELECT asset_group.id, asset_group.campaign, asset_group.name, asset_group.final_urls, asset_group.status, asset_group.ad_strength FROM asset_group WHERE asset_group.id = '+PIN.assetGroupId),
    api.search('SELECT asset_group_asset.resource_name, asset_group_asset.asset, asset_group_asset.field_type, asset_group_asset.status, asset.type, asset.name, asset.text_asset.text FROM asset_group_asset WHERE asset_group.id = '+PIN.assetGroupId),
    api.search("SELECT campaign_criterion.resource_name, campaign_criterion.type, campaign_criterion.negative, campaign_criterion.proximity.geo_point.latitude_in_micro_degrees, campaign_criterion.proximity.geo_point.longitude_in_micro_degrees, campaign_criterion.proximity.radius, campaign_criterion.proximity.radius_units FROM campaign_criterion WHERE campaign.id = "+PIN.campaignId+" AND campaign_criterion.type IN ('LOCATION','PROXIMITY')")
  ]);
  const customer=custRows[0]?.customer,campaign=campaignRows[0]?.campaign,group=groupRows[0]?.assetGroup;
  if(String(customer?.id)!==PIN.customerId||customer?.currencyCode!==PIN.currency ||
    !campaign||!group||!campaignRows[0]?.campaignBudget)
    throw Error('Bloqueado: conta/campanha/grupo não coincidem.');
  campaign.budgetAmountMicros=String(campaignRows[0].campaignBudget.amountMicros);
  assertLiveTargets(plan,campaign,group);
  return {customer,campaign,group,links:assetRows.map(r=>({...(r.assetGroupAsset||{}),
    assetData:r.asset||{}})).filter(r=>r.status==='ENABLED'),
    geos:geoRows.map(r=>r.campaignCriterion||{})};
}
function checkCurrentTexts(plan,snap){
  const changes=[],already=[];
  for(const row of plan.textReplacements){
    const oldAsset='customers/'+PIN.customerId+'/assets/'+row.oldAssetId;
    const hit=snap.links.find(r=>r.fieldType===row.fieldType&&r.asset===oldAsset);
    const newHit=snap.links.find(r=>r.fieldType===row.fieldType&&r.assetData?.textAsset?.text===row.newText);
    if(newHit&&!hit){already.push(row.id);continue;}
    if(!hit||hit.assetData?.textAsset?.text!==row.oldText)
      throw Error('Bloqueado: texto original divergente '+row.id+' ('+oldAsset+').');
    if(newHit)throw Error('Bloqueado: texto novo já duplicado '+row.id);
    changes.push({row,current:hit});
  }
  return {changes,already};
}
function inspectGeo(snap){
  if(snap.geos.some(x=>x.negative===true))
    throw Error('Bloqueado: segmentação negativa existente requer revisão.');
  if(snap.geos.length>1)
    throw Error('Bloqueado: mais de um alvo geográfico existente.');
  if(!snap.geos.length)return 'create';
  const g=snap.geos[0];
  const prox=g.proximity;
  if(g.type!=='PROXIMITY'||!prox||
     Number(prox.geoPoint?.latitudeInMicroDegrees)!==-25428000 ||
     Number(prox.geoPoint?.longitudeInMicroDegrees)!==-49273000 ||
     Number(prox.radius)!==35 ||prox.radiusUnits!=='KILOMETERS')
    throw Error('Bloqueado: localização já existente divergente; não ampliar segmentação.');
  return 'already';
}
async function indexedAssets(api){
  const rows=await api.search("SELECT asset.resource_name, asset.name, asset.type FROM asset WHERE asset.name LIKE 'MS-PMAX-20261104-%'");
  const d=new Map();for(const r of rows){const x=r.asset||{};if(x.name)d.set(x.name,x.resourceName);}return d;
}
async function createOrReuseAssets(api,plan,needs,imageMode){
  const indexed=await indexedAssets(api);
  const mapping=new Map(),toCreate=[];
  for(const item of needs){
    const name=item.assetName||('MS-PMAX-20261104-'+item.id);
    if(indexed.has(name)){mapping.set(item.id,indexed.get(name));continue;}
    const body=item.newText ? {name,textAsset:{text:item.newText}} :
      {name,type:'IMAGE',imageAsset:{data:(await api.drivePng(item.driveFileId)).toString('base64')}};
    toCreate.push({item,body});
  }
  if(toCreate.length) {
    const res=await api.mutate('assets',toCreate.map(({body})=>({create:body})));
    if((res.results||[]).length!==toCreate.length)throw Error('Retorno incompleto na criação de recursos.');
    toCreate.forEach(({item},i)=>mapping.set(item.id,res.results[i].resourceName));
  }
  return mapping;
}
async function apply(plan,api){
  // Preflight all resource consistency checks BEFORE first API mutation.
  const start=await getSnapshot(api,plan);
  const texts=checkCurrentTexts(plan,start);
  const geoState=inspectGeo(start);
  const existingSquares=start.links.filter(r=>r.fieldType==='SQUARE_MARKETING_IMAGE');
  if(existingSquares.length+plan.images.length>20)
    throw Error('Bloqueado: excederia limite de imagens quadradas.');
  const report={customerId:PIN.customerId,campaignId:PIN.campaignId,assetGroupId:PIN.assetGroupId,
    before:{name:start.campaign.name,group:start.group.name,strength:start.group.adStrength,
      squares:existingSquares.length,geo:start.geos.length},changes:[],errors:[]};

  const campaignName=start.campaign.name!==plan.campaignName;
  const geoPresence=start.campaign.geoTargetTypeSetting?.positiveGeoTargetType!=='PRESENCE';
  if(campaignName||geoPresence){
    await api.mutate('campaigns',[campaignUpdateOperation(plan,campaignName,geoPresence)]);
    report.changes.push('campaign:name/presence');
  }
  if(geoState==='create') {
    await api.mutate('campaignCriteria',[locationOperation(plan)]);
    report.changes.push('campaign:Curitiba_35km');
  }
  const groupName=start.group.name!==plan.assetGroupName;
  const finalUrls=Array.isArray(start.group.finalUrls)?start.group.finalUrls:[];
  const groupUrl=finalUrls.length!==1||finalUrls[0]!==plan.destination;
  if(groupName||groupUrl) {
    await api.mutate('assetGroups',[groupUpdateOperation(plan,groupName,groupUrl)]);
    report.changes.push('group:name/destination');
  }
  // Asset copies first, then atomic replacement link batch to preserve counts.
  if(texts.changes.length) {
    const mapping=await createOrReuseAssets(api,plan,texts.changes.map(x=>x.row));
    await api.mutate('assetGroupAssets',textLinkOperations(plan,texts.changes.map(x=>({...x,newAsset:mapping.get(x.row.id)}))));
    report.changes.push('text_replacements:'+texts.changes.length);
  }
  const beforeImages=await getSnapshot(api,plan);
  const alreadyNames=new Set(beforeImages.links.filter(x=>x.fieldType==='SQUARE_MARKETING_IMAGE').map(x=>x.assetData?.name));
  const imgsToAdd=plan.images.filter(i=>!alreadyNames.has(i.assetName));
  if(imgsToAdd.length) {
    const map=await createOrReuseAssets(api,plan,imgsToAdd,true);
    const group='customers/'+PIN.customerId+'/assetGroups/'+PIN.assetGroupId;
    await api.mutate('assetGroupAssets',imgsToAdd.map(x=>({create:{assetGroup:group,asset:map.get(x.id),
      fieldType:'SQUARE_MARKETING_IMAGE'}})));
    report.changes.push('images_added:'+imgsToAdd.length);
  }
  const end=await getSnapshot(api,plan);
  if(end.campaign.name!==plan.campaignName ||end.group.name!==plan.assetGroupName ||
     end.group.finalUrls?.length!==1||end.group.finalUrls[0]!==plan.destination ||
     end.campaign.geoTargetTypeSetting?.positiveGeoTargetType!=='PRESENCE'||
     inspectGeo(end)!=='already')throw Error('VERIFICAÇÃO_FALHOU: nomes/URL/geo não refletiram no Ads.');
  const pending=checkCurrentTexts(plan,end);
  if(pending.changes.length)throw Error('VERIFICAÇÃO_FALHOU: textos antigos ainda vinculados.');
  const imageNames=new Set(end.links.filter(x=>x.fieldType==='SQUARE_MARKETING_IMAGE').map(x=>x.assetData?.name));
  if(plan.images.some(i=>!imageNames.has(i.assetName)))
    throw Error('VERIFICAÇÃO_FALHOU: imagens sem vínculo no grupo.');
  report.verified={campaign:end.campaign.name,group:end.group.name,finalUrl:end.group.finalUrls,
    geo:end.campaign.geoTargetTypeSetting?.positiveGeoTargetType,
    squareImages:end.links.filter(x=>x.fieldType==='SQUARE_MARKETING_IMAGE').length,
    newTextsVerified:pending.already.length,quality:end.group.adStrength,
    dailyBudgetMicros:end.campaign.budgetAmountMicros};
  return report;
}
async function main(){
  const plan=JSON.parse(readFileSync(PLAN_PATH,'utf8'));validatePlan(plan);
  const mode=process.argv.includes('--apply')?'apply':process.argv.includes('--inspect')?'inspect':'validate';
  if(mode==='validate'){console.log(JSON.stringify({status:'VALIDADO_LOCALMENTE',customerId:plan.customerId,
    campaignId:plan.campaignId,replacements:plan.textReplacements.length,images:plan.images.length}));return;}
  if(mode==='apply' && process.env.GOOGLE_ADS_WRITE_CONFIRMATION!==APPROVAL_ENV)
    throw Error('Bloqueado: falta confirmação explícita de escrita para esta conta/campanha.');
  const token=await getAccessToken(),api=new AdsClient(token);
  const current=await getSnapshot(api,plan);
  if(mode==='inspect'){
    console.log(JSON.stringify({status:'LIDO_GOOGLE_ADS',campaign:current.campaign.name,
      group:current.group.name,budgetMicros:current.campaign.budgetAmountMicros,
      quality:current.group.adStrength,links:current.links.length,geo:current.geos.length},null,2));return;
  }
  const result=await apply(plan,api);console.log(JSON.stringify({status:'APLICADO_E_VERIFICADO',...result},null,2));
}
if(process.argv[1] && fileURLToPath(import.meta.url)===process.argv[1]){
  main().catch(e=>{console.error('GOOGLE_ADS_DIRECT_ERROR: '+e.message);process.exitCode=1;});
}
