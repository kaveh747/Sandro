// Smart Sandero service worker: keeps the app and map files for offline use.
const V = 'sandero-v1';
const MAP_HOSTS = ['tiles.openfreemap.org', 'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com'];
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
async function netFirst(r, fresh) {
  const c = await caches.open(V);
  try {
    const res = fresh ? await fetch(r.url, { cache: 'no-cache' }) : await fetch(r);
    if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone());
    return res;
  } catch (err) {
    const m = await c.match(r, { ignoreSearch: true });
    if (m) return m;
    throw err;
  }
}
async function cacheFirst(r) {
  const c = await caches.open(V);
  const m = await c.match(r);
  if (m) return m;
  const res = await fetch(r);
  if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone());
  return res;
}
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) { e.respondWith(netFirst(r, true)); return; }
  if (MAP_HOSTS.indexOf(u.hostname) >= 0) {
    const meta = /\/styles\//.test(u.pathname) || /\/planet$/.test(u.pathname) || /\.json$/.test(u.pathname);
    e.respondWith(meta ? netFirst(r) : cacheFirst(r));
  }
});
