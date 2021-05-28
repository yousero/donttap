var CACHE_VERSION = 1
var CURRENT_CACHES = {
  'read-through': 'read-through-cache-v' + CACHE_VERSION
}

self.addEventListener('activate', function (event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key]
  })

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log('Deleting out of date cache:', cacheName)
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
      .match(event.request)
      .then(function (response) {
        if (response) {
          console.log(' Found response in cache:', response)

          return response
        }
        console.log(
          ' No response for %s found in cache. ' +
            'About to fetch from network...',
          event.request.url
        )
        return fetch(event.request.clone())
      })
      .then(function (response) {
        console.log(
          '  Response for %s from network is: %O',
          event.request.url,
          response
        )
        if (response.status < 400) {
          cache.put(event.request, response.clone())
        }
        return response
      })
  )
})
