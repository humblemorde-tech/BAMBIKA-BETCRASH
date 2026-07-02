const CACHE_NAME = "bambika-betcrash-v1";

// Files to cache (core PWA shell)
const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/register.html",
  "/dashboard.html",
  "/wallet.html",
  "/profile.html",
  "/promotions.html",
  "/history.html",
  "/leaderboard.html",
  "/games.html",
  "/help.html",
  "/settings.html",

  "/css/style.css",
  "/css/auth.css",
  "/css/dashboard.css",
  "/css/wallet.css",
  "/css/games.css",
  "/css/profile.css",
  "/css/responsive.css",

  "/js/app.js",
  "/js/auth.js",
  "/js/dashboard.js",
  "/js/wallet.js",
  "/js/crash-engine.js",
  "/js/casino.js",
  "/js/notifications.js",
  "/js/charts.js",
  "/js/storage.js",
  "/js/utils.js",

  "/manifest.json",
  "/assets/logo.png",
  "/assets/favicon.png"
];

// INSTALL EVENT
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE EVENT (clean old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH EVENT (offline support)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cache first, fallback to network
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Optional offline fallback page
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
