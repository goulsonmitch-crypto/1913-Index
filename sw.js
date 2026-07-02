/**
 * 1913 Index — Service Worker
 *
 * Strategy:
 *   - App shell (HTML/CSS/JS): Cache-first, network fallback, update in background
 *   - 1913 Index API data (api/*.json, corpus shards): Network-first, cache fallback
 *   - Cloudflare Worker API calls (/scan, /submit-upc): Network-only (no caching)
 *   - External UPC APIs: Network-only
 */

const CACHE_NAME = '1913-index-v2';
const DATA_CACHE = '1913-data-v2';

const SHELL_ASSETS = [
  '/scan.html',
  '/index.html',
  '/data.html',
  '/item.html',
  '/manifest.json',
  '/nav.js',
  '/core.js',
];

const DATA_ASSETS = [
  '/api/meta.json',
  '/api/headline.json',
  '/api/categories.json',
  '/database.js',
];

// ── Install: cache app shell ──────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(SHELL_ASSETS.map(url => new Request(url, { cache: 'reload' })))
        .catch(() => {}) // Non-fatal if some assets missing during dev
    ).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== DATA_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: routing logic ──────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept: Cloudflare Worker API, UPC lookup APIs, browser internals
  if (
    url.hostname.includes('workers.dev') ||
    url.hostname.includes('upcitemdb.com') ||
    url.hostname.includes('openfoodfacts.org') ||
    url.protocol === 'chrome-extension:' ||
    request.method !== 'GET'
  ) {
    return; // Let browser handle normally
  }

  // API / corpus data — Network-first, cache fallback
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/corpus/') ||
    url.pathname === '/database.js' ||
    url.pathname === '/corpus.js'
  ) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }

  // App shell — Cache-first, revalidate in background
  event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
});

async function networkFirst(request, cacheName) {
  try {
    const networkResp = await fetch(request);
    if (networkResp.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResp.clone());
    }
    return networkResp;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('{"error":"offline"}', {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request).then(resp => {
    if (resp.ok) cache.put(request, resp.clone());
    return resp;
  }).catch(() => null);
  return cached || await networkPromise || new Response('Offline', { status: 503 });
}

// ── Background sync: retry failed submissions ─────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'retry-submissions') {
    event.waitUntil(retryPendingSubmissions());
  }
});

async function retryPendingSubmissions() {
  // Pending submissions are stored by scan.html in localStorage
  // SW can't access localStorage, but clients can message back
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'retry-submissions' }));
}

// ── Push messages from main thread ───────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
