/* StudioFrame V7.5 — same-origin streaming bridge for public Drive video. */
const SF_DRIVE_MEDIA_PREFIX = '/__studioframe_drive_media__/';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

async function streamDriveMedia(request, driveId) {
  const upstreamUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(driveId)}&export=download&confirm=t`;
  // Do not forward Range: Google's public download host exposes the bytes to
  // CORS, but its Range preflight is rejected. A progressive 200 stream keeps
  // the body flowing without buffering it in the worker or duplicating media.
  const response = await fetch(upstreamUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    redirect: 'follow',
    cache: 'no-store',
  });
  if (!response.ok && response.status !== 206) {
    return new Response('StudioFrame media upstream unavailable', { status: response.status || 502 });
  }
  const headers = new Headers();
  headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
  headers.set('Cache-Control', 'private, max-age=3600');
  const length = response.headers.get('Content-Length');
  if (length) headers.set('Content-Length', length);
  return new Response(response.body, { status: 200, statusText: 'OK', headers });
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
