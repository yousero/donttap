const CACHE_VERSION = 3
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
    fetch(event.request.clone()).catch(() => {
      return caches.open(CURRENT_CACHES['read-through']).then((cache) =>
        cache
          .match(event.request)
          .then((response) => {

            if (response) {
              return response
            }
            return 
          })
          .then((response) => {
            if (response.status < 400) {
              cache.put(event.request, response.clone())
            }
            return response
          })
      )      
    })    
  )
})
