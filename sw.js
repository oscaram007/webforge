/**
 * WebForge 3.0 — Service Worker
 * Provides offline capability by caching the app shell and CDN assets.
 *
 * Strategy:
 *  - App shell (index.html, sw.js, manifest.json): Network-first, cache fallback
 *  - CDN assets (Monaco, Google Fonts, jsDelivr): Cache-first, network fallback
 */

const CACHE_VERSION  = 'webforge-v3.0.0';
const APP_SHELL      = ['./', './index.html', './sw.js', './manifest.json'];

const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        console.log('[SW] Pre-caching app shell');
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Pre-cache failed (offline?):', err))
  );
});

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http'))  return;

  // CDN assets → Cache-first (versioned URLs, rarely change)
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Same-origin app files → Network-first with cache fallback
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(event.request));
    return;
  }
});

// ─── STRATEGIES ───────────────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Cache-first fetch failed:', request.url);
    return new Response('Offline — resource not cached', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) {
      console.log('[SW] Serving from cache (offline):', request.url);
      return cached;
    }
    return new Response(offlineFallback(), {
      status:  200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// ─── OFFLINE FALLBACK PAGE ────────────────────────────────────────────────────
function offlineFallback() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WebForge — Offline</title>
<style>
  body {
    margin: 0;
    background: #0b0c10;
    color: #d4d8ef;
    font-family: 'JetBrains Mono', monospace;
    display: grid;
    place-items: center;
    height: 100vh;
    text-align: center;
  }
  .container { max-width: 380px; }
  .icon { font-size: 48px; margin-bottom: 20px; }
  h1 { font-size: 22px; color: #7c6af7; margin-bottom: 12px; }
  p { color: #6b7194; line-height: 1.7; font-size: 13px; }
  button {
    margin-top: 20px;
    padding: 10px 24px;
    background: #7c6af7;
    border: none;
    border-radius: 6px;
    color: white;
    font-family: inherit;
    cursor: pointer;
    font-size: 13px;
  }
  button:hover { background: #9585f8; }
</style>
</head>
<body>
<div class="container">
  <div class="icon">⚡</div>
  <h1>WebForge is offline</h1>
  <p>It looks like you're not connected to the internet.<br>
  Visit once while online to cache the editor for offline use.</p>
  <button onclick="location.reload()">Try again</button>
</div>
</body>
</html>`;
}

// ─── MESSAGE HANDLER ──────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'CLEAR_CACHE') {
    caches.delete(CACHE_VERSION).then(() => {
      event.ports[0]?.postMessage({ status: 'cleared' });
    });
  }
});
