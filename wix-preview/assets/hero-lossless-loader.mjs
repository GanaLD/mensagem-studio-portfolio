function isGLB(buffer) {
  return buffer.byteLength >= 12 && new DataView(buffer).getUint32(0, true) === 0x46546c67;
}

function validateGLB(buffer) {
  if (!isGLB(buffer)) throw new Error('The 3D asset has an invalid GLB header.');
  const header = new DataView(buffer);
  if (header.getUint32(4, true) !== 2 || header.getUint32(8, true) !== buffer.byteLength) {
    throw new Error('The 3D asset is incomplete or uses an unsupported GLB version.');
  }
  return buffer;
}

async function fetchBytes(url, priority) {
  const response = await fetch(url, { priority });
  if (!response.ok) throw new Error(`The 3D asset request failed (${response.status}).`);
  return response.arrayBuffer();
}

// Transport compression preserves every mesh, texture and animation byte.
// The original GLB remains available when native decompression is unavailable
// or a compressed request fails; some hosts already decode gzip over HTTP.
export async function loadGLBBytes(plainURL, gzipURL, { priority = 'auto' } = {}) {
  if (gzipURL && typeof DecompressionStream === 'function') {
    try {
      const compressed = await fetchBytes(gzipURL, priority);
      if (isGLB(compressed)) return validateGLB(compressed);
      const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
      return validateGLB(await new Response(stream).arrayBuffer());
    } catch (_) {
      // Retry the original asset without changing the caller's loading state.
    }
  }
  return validateGLB(await fetchBytes(plainURL, priority));
}
