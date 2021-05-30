const CACHE_VERSION = 2
const CURRENT_CACHES = {
  'read-through': 'read-through-cache-v' + CACHE_VERSION
}

self.addEventListener('activate', function (event) {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key]
  })

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .open(CURRENT_CACHES['read-through'])
      .match(event.request, { ignoreVary: true })
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request.clone())
      })
      .then(function (response) {
        if (response.status < 400) {
          cache.put(event.request, response.clone())
        }
        return response
      })
  )
})
