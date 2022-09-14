
const CACHE_VERSION = 5
const CURRENT_CACHES = {
  'read-through': 'read-through-cache-v' + CACHE_VERSION
}

self.addEventListener('activate', (event) => {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(
    (key) => CURRENT_CACHES[key]
  )

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()

        caches.open(CURRENT_CACHES['read-through'])
          .then(function(cache) {
            cache.put(event.request, responseToCache)
          })

        return response
      })
      .catch(() => {
        return caches.open(CURRENT_CACHES['read-through'])
          .then((cache) => cache.match(event.request))
      })
  )
})
