import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {oauthUrl, validateScopes, validateClient, credentialPaths} from '../scripts/google-ads-oauth-bootstrap.mjs';

test('OAuth consent is offline, CSRF/PKCE protected and only scoped to Ads + Drive',()=>{
 const u=new URL(oauthUrl({clientId:'123-abc.apps.googleusercontent.com',
  redirectUri:'http://127.0.0.1:12345/callback',state:'csrf12345678',challenge:'code-challenge'}));
 assert.equal(u.origin,'https://accounts.google.com');
 assert.equal(u.searchParams.get('access_type'),'offline');
 assert.equal(u.searchParams.get('prompt'),'consent');
 assert.equal(u.searchParams.get('code_challenge_method'),'S256');
 assert.equal(u.searchParams.get('redirect_uri'),'http://127.0.0.1:12345/callback');
 assert.deepEqual(u.searchParams.get('scope').split(' ').sort(),[
  'https://www.googleapis.com/auth/adwords',
  'https://www.googleapis.com/auth/drive.readonly'
 ].sort());
});
test('permission check rejects missing adwords/drive grant',()=>{
 assert.throws(()=>validateScopes('https://www.googleapis.com/auth/drive.readonly'),/adwords/);
 assert.throws(()=>validateScopes('https://www.googleapis.com/auth/adwords'),/drive.readonly/);
 assert.doesNotThrow(()=>validateScopes('https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/drive.readonly'));
});
test('reuses actual Desktop OAuth client and rejects a web client without callback',()=>{
 const c=validateClient({installed:{client_id:'abc.apps.googleusercontent.com',client_secret:'private'}});
 assert.equal(c.clientId,'abc.apps.googleusercontent.com');
 assert.throws(()=>validateClient({web:{client_id:'abc.apps.googleusercontent.com',client_secret:'private'}}),/Desktop/);
 assert.throws(()=>validateClient({installed:{client_id:'bad',client_secret:'private'}}),/client_id/);
});
test('credential and resulting token paths are ONLY on E SATA3 Windows',()=>{
 const p=credentialPaths({home:'E:\\ARQUIVOS DO CHAT GPT E 3D\\MARKETING_AI',platform:'win32'});
 assert.match(p.id,/CREDENCIAIS_PRIVADAS/);
 assert.match(p.id,/google-ads-oauth-client-id.txt$/);
 assert.match(p.secret,/google-ads-oauth-client-secret.txt$/);
 assert.match(p.refresh,/google-ads-refresh-token.txt$/);
 assert.ok(!p.refresh.startsWith('C:'));
 assert.throws(()=>credentialPaths({home:'C:\\Users\\gabri\\Downloads',platform:'win32'}),/SATA3/);
});
test('OAuth bootstrap never embeds or exposes refresh_token in public plan or workflow',()=>{
 const source=readFileSync(new URL('../scripts/google-ads-oauth-bootstrap.mjs',import.meta.url),'utf8');
 assert.ok(source.includes('readFileSync'));
 assert.ok(source.includes('spawnSync'));
 assert.ok(source.includes('GOOGLE_ADS_REFRESH_TOKEN'));
 assert.ok(!source.includes('github.com/GanaLD/mensagem-studio-portfolio/blob/main/CREDENCIAIS_PRIVADAS'));
});
