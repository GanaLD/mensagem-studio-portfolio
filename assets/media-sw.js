/* StudioFrame V7.5 — same-origin streaming bridge for public Drive video. */
const SF_DRIVE_MEDIA_PREFIX = '/__studioframe_drive_media__/';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

function inferredRangeHeaders(requestRange, response, headers) {
  if (response.status !== 206 || !requestRange) return;
  if (response.headers.get('Content-Range')) {
    headers.set('Content-Range', response.headers.get('Content-Range'));
    return;
  }
  const match = String(requestRange).match(/^bytes=(\d+)-(\d*)$/i);
  const length = Number(response.headers.get('Content-Length') || 0);
  if (!match || !Number.isFinite(length) || length <= 0) return;
  const start = Number(match[1]);
  const end = start + length - 1;
  const total = match[2] ? '*' : String(start + length);
  headers.set('Content-Range', `bytes ${start}-${end}/${total}`);
}

async function streamDriveMedia(request, driveId) {
  const upstreamUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(driveId)}&export=download&confirm=t`;
  const requestRange = request.headers.get('Range') || '';
  const upstreamHeaders = new Headers();
  if (requestRange) upstreamHeaders.set('Range', requestRange);
  const response = await fetch(upstreamUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    redirect: 'follow',
    cache: 'no-store',
    headers: upstreamHeaders,
  });
  if (!response.ok && response.status !== 206) {
    return new Response('StudioFrame media upstream unavailable', { status: response.status || 502 });
  }
  const headers = new Headers();
  headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'private, max-age=3600');
  const length = response.headers.get('Content-Length');
  if (length) headers.set('Content-Length', length);
  inferredRangeHeaders(requestRange, response, headers);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SF_DRIVE_MEDIA_PREFIX)) return;
  const driveId = decodeURIComponent(url.pathname.slice(SF_DRIVE_MEDIA_PREFIX.length)).trim();
  if (!/^[A-Za-z0-9_-]{10,}$/.test(driveId)) {
    event.respondWith(new Response('Invalid media id', { status: 400 }));
    return;
  }
  event.respondWith(streamDriveMedia(event.request, driveId).catch(() => new Response('StudioFrame media bridge unavailable', { status: 502 })));
});
