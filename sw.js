!function(){var e={"read-through":"read-through-cache-v3"};self.addEventListener("activate",(function(t){var n=Object.keys(e).map((function(t){return e[t]}));t.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===n.indexOf(e))return caches.delete(e)})))})))})),self.addEventListener("fetch",(function(t){t.respondWith(fetch(t.request.clone()).catch((function(){return caches.open(e["read-through"]).then((function(e){return e.match(t.request).then((function(e){if(e)return e})).then((function(n){return n.status<400&&e.put(t.request,n.clone()),n}))}))})))}))}();
//# sourceMappingURL=sw.js.map