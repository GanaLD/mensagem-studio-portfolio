#!/usr/bin/env node
/**
 * Mensagem Studio — single-use Google Ads OAuth desktop bootstrap.
 * Reuses existing client secrets on SATA3; captures consent at 127.0.0.1, never chat.
 * --apply runs the existing Google Ads API writer (pinned to customer 9877007101).
 * --sync-gh securely writes secrets into Github Actions via 'gh secret set', if authenticated.
 *
 * Requires Node.js 20+ available in PATH; no npm package installation.
 */
import { readFileSync, writeFileSync, chmodSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import process from 'node:process';

const SCOPES = Object.freeze([
  'https://www.googleapis.com/auth/adwords',
  'https://www.googleapis.com/auth/drive.readonly'
]);
const REPO='GanaLD/mensagem-studio-portfolio';
const TARGET='9877007101';
const CONFIRM='APPLY_9877007101_24423699562';
const HOME_DEFAULT='E:\\ARQUIVOS DO CHAT GPT E 3D\\MARKETING_AI';

export function credentialPaths({home=process.env.MARKETING_AI_HOME||HOME_DEFAULT,platform=process.platform}={}) {
  if(platform==='win32'&&!/^E:\\ARQUIVOS DO CHAT GPT E 3D\\MARKETING_AI(?:\\|$)/i.test(home))
    throw Error('SATA3: configuração exige E:\\ARQUIVOS DO CHAT GPT E 3D\\MARKETING_AI');
  const root=path.join(home,'CREDENCIAIS_PRIVADAS');
  return {root,id:path.join(root,'google-ads-oauth-client-id.txt'),
    secret:path.join(root,'google-ads-oauth-client-secret.txt'),
    json:path.join(root,'CHAVE API ADS.json'),
    refresh:path.join(root,'google-ads-refresh-token.txt'),
    ghConfig:path.join(home,'GH_CONFIG')};
}
export function validateClient(raw) {
  const c=raw.installed||null;
  if(!c||typeof c!=='object')throw Error('Cliente OAuth precisa ser Desktop/installed, não Web. Use a credencial já criada no projeto Google Cloud.');
  const clientId=String(c.client_id||'').trim(),clientSecret=String(c.client_secret||'').trim();
  if(!clientId.endsWith('.apps.googleusercontent.com')) throw Error('client_id inválido');
  if(!clientSecret)throw Error('client_secret ausente');
  return {clientId,clientSecret};
}
export function validateScopes(granted){
  const available=String(granted||'').split(/\s+/);
  for(const x of SCOPES)if(!available.includes(x))throw Error('OAuth sem permissão '+x.split('/').pop()+'. Reautorize incluindo o escopo.');
  return true;
}
export function oauthUrl({clientId,redirectUri,state,challenge}) {
  const args=new URLSearchParams({
    client_id:clientId,redirect_uri:redirectUri,response_type:'code',
    scope:SCOPES.join(' '),access_type:'offline',prompt:'consent',
    state,code_challenge:challenge,code_challenge_method:'S256'
  });
  return 'https://accounts.google.com/o/oauth2/v2/auth?'+args;
}
function loadCredentials(paths){
  if(existsSync(paths.id)&&existsSync(paths.secret)) {
    const id=readFileSync(paths.id,'utf8').trim(),secret=readFileSync(paths.secret,'utf8').trim();
    return validateClient({installed:{client_id:id,client_secret:secret}});
  }
  if(existsSync(paths.json)) {
    if(statSync(paths.json).size>100000)throw Error('Arquivo JSON de cliente OAuth grande demais.');
    return validateClient(JSON.parse(readFileSync(paths.json,'utf8')));
  }
  throw Error('Não encontrei as credenciais OAuth existentes em '+paths.root+'. Não criar outro cliente desnecessariamente.');
}
function equalState(a,b) {
  const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));
  return x.length===y.length && timingSafeEqual(x,y);
}
async function consent(clientId) {
  const state=randomBytes(20).toString('base64url');
  const verifier=randomBytes(32).toString('base64url');
  const challenge=createHash('sha256').update(verifier).digest('base64url');
  let finish,fail;
  const response=new Promise((resolve,reject)=>{finish=resolve;fail=reject});
  let settled=false;
  const server=createServer((req,res)=>{
    const u=new URL(req.url||'/', 'http://127.0.0.1');
    if(u.pathname!=='/callback'){res.writeHead(404);res.end('Not found');return;}
    if(!equalState(u.searchParams.get('state'),state)){
      res.writeHead(403,{'Content-Type':'text/plain; charset=utf-8'});res.end('Estado OAuth inválido.');
      if(!settled){settled=true;fail(Error('State OAuth inválido: autorização cancelada.'));}
      return;
    }
    const error=u.searchParams.get('error'),code=u.searchParams.get('code');
    if(error||!code){
      res.writeHead(400,{'Content-Type':'text/plain; charset=utf-8'});res.end('OAuth recusado.');
      if(!settled){settled=true;fail(Error('Google OAuth recusado: '+(error||'sem código')));}
      return;
    }
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
    res.end('<!doctype html><meta charset="utf-8"><title>Mensagem Studio</title><h2>Autorização recebida</h2><p>Pode fechar esta aba. A validação e aplicação continuam no terminal do SATA3.</p>');
    if(!settled){settled=true;finish(code);}
  });
  await new Promise((resolve,reject)=>{
    server.once('error',reject);
    server.listen(0,'127.0.0.1',resolve);
  });
  const redirectUri='http://127.0.0.1:'+server.address().port+'/callback';
  console.log('AUTORIZAÇÃO GOOGLE ADS: abra esta URL no navegador e aprove somente as permissões solicitadas.');
  console.log(oauthUrl({clientId,redirectUri,state,challenge}));
  console.log('Não envie tokens, senhas nem código OAuth pelo chat.');
  const timeout=setTimeout(()=>{if(!settled){settled=true;fail(Error('Consentimento OAuth não concluído.'))}},600000);
  try{return {code:await response,redirectUri,verifier}}
  finally{clearTimeout(timeout);server.close();}
}
async function tokenExchange(client,grant) {
  const params=new URLSearchParams({
    client_id:client.clientId,client_secret:client.clientSecret,
    code:grant.code,code_verifier:grant.verifier,
    redirect_uri:grant.redirectUri,grant_type:'authorization_code'
  });
  const response=await fetch('https://oauth2.googleapis.com/token',{
    method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:params});
  const result=await response.json().catch(()=>({}));
  if(!response.ok)throw Error('Google recusou a troca do código OAuth: '+String(result.error||response.status));
  if(!result.refresh_token||!result.access_token)throw Error('Google não forneceu refresh_token. O fluxo exige acesso offline e novo consentimento.');
  validateScopes(result.scope);
  return result;
}
async function verifyAdsAccess(accessToken, loginCustomerId='') {
  const headers={'Authorization':'Bearer '+accessToken,'Content-Type':'application/json'};
  if(loginCustomerId) headers['login-customer-id']=loginCustomerId.replace(/\D/g,'');
  const query='SELECT customer.id, customer.currency_code FROM customer LIMIT 1';
  const result=await fetch('https://googleads.googleapis.com/v26/customers/'+TARGET+'/googleAds:search',{
    method:'POST',headers,body:JSON.stringify({query})});
  const j=await result.json().catch(()=>({}));
  if(!result.ok)throw Error('Conta Google Ads '+TARGET+' não autorizada pela API: '+String(j.error?.message||result.status).slice(0,500));
  const c=j.results?.[0]?.customer||{};
  if(String(c.id)!==TARGET||c.currencyCode!=='BRL')
    throw Error('Conta incorreta ou moeda inesperada. Nenhum token foi persistido.');
  return true;
}
function storeRefresh(paths,token) {
  mkdirSync(paths.root,{recursive:true,mode:0o700});
  writeFileSync(paths.refresh,token,{flag:'w',mode:0o600,encoding:'utf8'});
  if(process.platform!=='win32')chmodSync(paths.refresh,0o600);
}
function ghSetSecrets(paths,client,refresh) {
  const exe=process.platform==='win32'?'gh.exe':'gh';
  const env={...process.env,GH_CONFIG_DIR:paths.ghConfig};
  const status=spawnSync(exe,['auth','status'],{encoding:'utf8',env,windowsHide:true});
  if(status.error||status.status!==0){
    console.log('GITHUB_SECRETS_PENDENTES: gh CLI não autenticado no SATA3. A execução local continua sem precisar deles.');
    return false;
  }
  for(const [name,value] of [
    ['GOOGLE_ADS_CLIENT_ID',client.clientId],
    ['GOOGLE_ADS_CLIENT_SECRET',client.clientSecret],
    ['GOOGLE_ADS_REFRESH_TOKEN',refresh]
  ]){
    const r=spawnSync(exe,['secret','set',name,'--repo',REPO],
      {input:value,encoding:'utf8',env,windowsHide:true,timeout:30000});
    if(r.error||r.status!==0){
      console.error('Não foi possível configurar o GitHub secret '+name+' (sem imprimir conteúdo).');
      return false;
    }
  }
  console.log('GITHUB_SECRETS_OK: três segredos gravados de forma privada.');
  return true;
}
function runDirect(client,refresh) {
  const env={...process.env,GOOGLE_ADS_CLIENT_ID:client.clientId,
    GOOGLE_ADS_CLIENT_SECRET:client.clientSecret,
    GOOGLE_ADS_REFRESH_TOKEN:refresh,
    GOOGLE_ADS_WRITE_CONFIRMATION:CONFIRM};
  const file=fileURLToPath(new URL('./google-ads-direct.mjs',import.meta.url));
  for(const mode of ['--inspect','--apply']){
    const r=spawnSync(process.execPath,[file,mode],{
      env,encoding:'utf8',windowsHide:true,timeout:120000,maxBuffer:2e6
    });
    if(r.stdout)process.stdout.write(r.stdout);
    if(r.stderr)process.stderr.write(r.stderr);
    if(r.error||r.status!==0)
      throw Error('Falha '+mode+'. Nenhum sucesso será declarado sem confirmação da API.');
  }
}
async function main() {
  const flags=new Set(process.argv.slice(2));
  if(flags.has('--help')) {
    console.log('node scripts/google-ads-oauth-bootstrap.mjs --apply [--sync-gh]\nExige credenciais existentes no SATA3 e aprovação do Google no navegador. Não modifica cartão/orçamento.');
    return;
  }
  const paths=credentialPaths(),client=loadCredentials(paths);
  console.log('CLIENTE_OAUTH_ENCONTRADO_NO_SATA3: '+client.clientId.slice(0,6)+'… [segredos ocultos]');
  const refresh=existsSync(paths.refresh)?readFileSync(paths.refresh,'utf8').trim():null;
  let authorizedToken=refresh;
  if(!authorizedToken || flags.has('--reauthorize')){
    const grant=await consent(client.clientId);
    const result=await tokenExchange(client,grant);
    await verifyAdsAccess(result.access_token,process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID||'');
    authorizedToken=result.refresh_token;
    storeRefresh(paths,authorizedToken);
    console.log('OAUTH_AUTORIZADO_VALIDADO: Google Ads '+TARGET+' / BRL; refresh token salvo somente no SATA3.');
  }else console.log('TOKEN_EXISTENTE_NO_SATA3: validando pela API antes de aplicar.');
  if(flags.has('--sync-gh'))ghSetSecrets(paths,client,authorizedToken);
  if(flags.has('--apply'))runDirect(client,authorizedToken);
  else console.log('OAuth preparado. Para aplicar as edições autorizadas execute com --apply.');
}
if(process.argv[1] && fileURLToPath(import.meta.url)===path.resolve(process.argv[1]))
  main().catch(e=>{console.error('OAUTH_SETUP_ERROR: '+e.message);process.exitCode=1});
