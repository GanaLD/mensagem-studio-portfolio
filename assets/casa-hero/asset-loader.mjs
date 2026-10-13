export const ASSET_VERSION='20261012-web-fast-v1';
export function versionedAssetURL(url){const absolute=new URL(url,location.href);absolute.searchParams.set('v',ASSET_VERSION);return absolute.href;}

async function digest(buffer){
 if(!globalThis.crypto?.subtle)throw Error('A entrega do ambiente precisa de HTTPS ou do servidor local.');
 return [...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(value=>value.toString(16).padStart(2,'0')).join('');
}

// The local review uses the canonical complete GLB. A published preview may
// opt into byte-identical transport parts through its HTML metadata only.
export async function loadHouseAsset(loader,{url='./CASA_HERO.glb',onProgress,manifestURL=document.querySelector('meta[name="casa-asset-manifest"]')?.content}={}){
 if(!manifestURL)return loader.loadAsync(versionedAssetURL(url),onProgress);
 const manifestAbsolute=new URL(versionedAssetURL(manifestURL)),response=await fetch(manifestAbsolute,{cache:'force-cache'});
 if(!response.ok)throw Error('Manifesto do ambiente indisponível: '+response.status);
 const manifest=await response.json();
 if(manifest.version===2){
  if(manifest.asset!=='CASA_HERO.glb'||!Number.isSafeInteger(manifest.bytes)||manifest.bytes<28||manifest.bytes>512*1024*1024||!/^[a-f0-9]{64}$/.test(manifest.sha256)||typeof manifest.url!=='string')throw Error('Manifesto do ambiente inválido.');
  const assetURL=new URL(manifest.url,manifestAbsolute);if(assetURL.origin!==manifestAbsolute.origin)throw Error('O ambiente deve pertencer à mesma entrega.');
  assetURL.searchParams.set('v',ASSET_VERSION);assetURL.searchParams.set('sha',manifest.sha256);
  const asset=await fetch(assetURL,{cache:'force-cache'});if(!asset.ok)throw Error('Ambiente indisponível: '+asset.status);
  const reader=asset.body?.getReader(),bytes=new Uint8Array(manifest.bytes);let loaded=0,lastPercent=-1;
  const progress=()=>{const percent=Math.floor(loaded/manifest.bytes*100);if(percent!==lastPercent){lastPercent=percent;onProgress?.({loaded,total:manifest.bytes,lengthComputable:true});}};
  if(reader){while(true){const {done,value}=await reader.read();if(done)break;if(loaded+value.byteLength>bytes.byteLength)throw Error('Ambiente maior que o tamanho declarado.');bytes.set(value,loaded);loaded+=value.byteLength;progress();}}
  else{const buffer=new Uint8Array(await asset.arrayBuffer());if(buffer.byteLength!==manifest.bytes)throw Error('Tamanho do ambiente divergente.');bytes.set(buffer);loaded=buffer.byteLength;progress();}
  if(loaded!==manifest.bytes||await digest(bytes)!==manifest.sha256)throw Error('Integridade do ambiente divergente.');
  window.__houseAssetProof={transport:'single',asset:manifest.asset,bytes:loaded,sha256:manifest.sha256,verified:true,quality:manifest.quality};
  return loader.parseAsync(bytes.buffer,new URL('.',manifestAbsolute).href);
 }
 if(manifest.version!==1||manifest.asset!=='CASA_HERO.glb'||!Number.isSafeInteger(manifest.bytes)||manifest.bytes<28||manifest.bytes>512*1024*1024||!Array.isArray(manifest.parts)||!manifest.parts.length||!/^[a-f0-9]{64}$/.test(manifest.sha256))throw Error('Manifesto do ambiente inválido.');
 let cursor=0;const partURLs=[];
 for(const part of manifest.parts){
  if(!part||part.offset!==cursor||!Number.isSafeInteger(part.bytes)||part.bytes<1||part.bytes>manifest.bytes-cursor||typeof part.url!=='string'||!part.url||!/^[a-f0-9]{64}$/.test(part.sha256))throw Error('Partes do ambiente inválidas.');
  const partURL=new URL(part.url,manifestAbsolute);if(partURL.origin!==manifestAbsolute.origin)throw Error('A parte do ambiente deve pertencer à mesma entrega.');partURL.searchParams.set('sha',part.sha256);partURLs.push(partURL);cursor+=part.bytes;
 }
 if(cursor!==manifest.bytes)throw Error('Tamanho total do ambiente divergente.');
 const assembled=new Uint8Array(manifest.bytes);let completed=0,lastPercent=-1;
 const progress=loaded=>{const percent=Math.floor(loaded/manifest.bytes*100);if(percent!==lastPercent){lastPercent=percent;onProgress?.({loaded,total:manifest.bytes,lengthComputable:true});}};
 for(let index=0;index<manifest.parts.length;index++){
  const part=manifest.parts[index],chunkResponse=await fetch(partURLs[index],{cache:'force-cache'});if(!chunkResponse.ok)throw Error('Parte do ambiente indisponível: '+part.url);
  // Each part is a view into the final buffer: no second full-size chunk allocation or copy.
  const reader=chunkResponse.body?.getReader(),bytes=assembled.subarray(part.offset,part.offset+part.bytes);let loaded=0;
  if(reader){
   try{while(true){const {done,value}=await reader.read();if(done)break;if(value.byteLength>bytes.byteLength-loaded)throw Error('Parte maior que o tamanho declarado.');bytes.set(value,loaded);loaded+=value.byteLength;progress(completed+loaded);}}
   catch(error){try{await reader.cancel();}catch{}throw error;}
   finally{reader.releaseLock?.();}
  }
  else{const data=new Uint8Array(await chunkResponse.arrayBuffer());if(data.byteLength!==part.bytes)throw Error('Parte com tamanho divergente.');bytes.set(data);loaded=data.byteLength;progress(completed+loaded);}
  if(loaded!==part.bytes||await digest(bytes)!==part.sha256)throw Error('Integridade da parte do ambiente divergente: '+part.url);
  completed+=loaded;
 }
 const sha256=await digest(assembled);if(sha256!==manifest.sha256)throw Error('Integridade do modelo reconstruído divergente.');
 window.__houseAssetProof={transport:'multipart',asset:manifest.asset,bytes:assembled.byteLength,sha256,parts:manifest.parts.length,verified:true};
 return loader.parseAsync(assembled.buffer,new URL('.',manifestAbsolute).href);
}
