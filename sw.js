const filesCache = [
  "/",
  "/index.html",
  "about.html",
  "offline.html",
  "/assets/css/bootstrap.min.css",
  "/assets/js/bootstrap.bundle.min.js",
  "/assets/img/logo.png",
  "/assets/img/about.svg",
  "/assets/img/404.svg",
];
const staticCacheName = "inix-cache-v1";

// instalasi service worker
self.addEventListener("install", (event) => {
  console.log("Instalasi service worker dan cache static assets");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(filesCache);
    })
  );
});

// fetch and activate service worker
self.addEventListener("fetch", (event) => {
  console.log("Fetch for Event :", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // jika respone event ditemukan
        if (response) {
          return response;
        }
        console.log("Network request for:", event.request.url);
        return fetch(event.request);
      })
      .catch(() => {
        // jika internet mati
        return caches.match("/offline.html");
      })
  );
});

// whitelist untuk service worker
self.addEventListener("activate", (event) => {
  console.log("aktifasi service worker yang baru");

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
