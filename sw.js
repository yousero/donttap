!function(){var e={"read-through":"read-through-cache-v2"};self.addEventListener("activate",(function(t){var n=Object.keys(e).map((function(t){return e[t]}));t.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===n.indexOf(e))return caches.delete(e)})))})))})),self.addEventListener("fetch",(function(t){t.respondWith(caches.open(e["read-through"]).match(t.request).then((function(e){return e||fetch(t.request.clone(),{ignoreVary:!0})})).then((function(e){return e.status<400&&cache.put(t.request,e.clone()),e})))}))}();
//# sourceMappingURL=sw.js.map