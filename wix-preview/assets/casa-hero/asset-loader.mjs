export const ASSET_VERSION='20261011-cabin-entrance-v1';
export function versionedAssetURL(url){const absolute=new URL(url,location.href);absolute.searchParams.set('v',ASSET_VERSION);return absolute.href;}

async function digest(buffer){
 if(!globalThis.crypto?.subtle)throw Error('A entrega do ambiente precisa de HTTPS ou do servidor local.');
 return [...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(value=>value.toString(16).padStart(2,'0')).join('');
}

// The local review uses the canonical complete GLB. A published preview may
// opt into byte-identical transport parts through its HTML metadata only.
export async function loadHouseAsset(loader,{url='./CASA_HERO.glb',onProgress,manifestURL=document.querySelector('meta[name="casa-asset-manifest"]')?.content}={}){
 if(!manifestURL)return loader.loadAsync(versionedAssetURL(url),onProgress);
 const manifestAbsolute=new URL(versionedAssetURL(manifestURL)),response=await fetch(manifestAbsolute,{cache:'no-cache'});
 if(!response.ok)throw Error('Manifesto do ambiente indisponível: '+response.status);
 const manifest=await response.json();
 if(manifest.version!==1||manifest.asset!=='CASA_HERO.glb'||!Number.isSafeInteger(manifest.bytes)||manifest.bytes<28||manifest.bytes>512*1024*1024||!Array.isArray(manifest.parts)||!manifest.parts.length||!/^[a-f0-9]{64}$/.test(manifest.sha256))throw Error('Manifesto do ambiente inválido.');
 let cursor=0;for(const part of manifest.parts){if(part.offset!==cursor||!Number.isSafeInteger(part.bytes)||part.bytes<1||!/^[a-f0-9]{64}$/.test(part.sha256))throw Error('Partes do ambiente inválidas.');cursor+=part.bytes;}if(cursor!==manifest.bytes)throw Error('Tamanho total do ambiente divergente.');
 const assembled=new Uint8Array(manifest.bytes);let completed=0;
 for(const part of manifest.parts){
  const partURL=new URL(part.url,manifestAbsolute);if(partURL.origin!==manifestAbsolute.origin)throw Error('A parte do ambiente deve pertencer à mesma entrega.');partURL.searchParams.set('sha',part.sha256);
  const chunkResponse=await fetch(partURL);if(!chunkResponse.ok)throw Error('Parte do ambiente indisponível: '+part.url);
  const reader=chunkResponse.body?.getReader(),bytes=new Uint8Array(part.bytes);let loaded=0;
  if(reader){while(true){const {done,value}=await reader.read();if(done)break;if(loaded+value.byteLength>bytes.byteLength)throw Error('Parte maior que o tamanho declarado.');bytes.set(value,loaded);loaded+=value.byteLength;onProgress?.({loaded:completed+loaded,total:manifest.bytes,lengthComputable:true});}}
  else{const data=new Uint8Array(await chunkResponse.arrayBuffer());if(data.byteLength!==part.bytes)throw Error('Parte com tamanho divergente.');bytes.set(data);loaded=data.byteLength;}
  if(loaded!==part.bytes||await digest(bytes)!==part.sha256)throw Error('Integridade da parte do ambiente divergente: '+part.url);
  assembled.set(bytes,part.offset);completed+=loaded;
 }
 const sha256=await digest(assembled);if(sha256!==manifest.sha256)throw Error('Integridade do modelo reconstruído divergente.');
 window.__houseAssetProof={transport:'multipart',asset:manifest.asset,bytes:assembled.byteLength,sha256,parts:manifest.parts.length,verified:true};
 return loader.parseAsync(assembled.buffer,new URL('.',manifestAbsolute).href);
}
