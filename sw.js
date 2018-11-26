const CACHE ='JS'
const FILES = ['/https://busenurkaraca.github.io/AdvancedProgramming/', '/https://busenurkaraca.github.io/AdvancedProgramming/inspector.html','https://busenurkaraca.github.io/AdvancedProgramming/myhtml.html','https://busenurkaraca.github.io/AdvancedProgramming/Timing.html','https://busenurkaraca.github.io/AdvancedProgramming/CW7.html','https://busenurkaraca.github.io/AdvancedProgramming/CourseData.html','https://busenurkaraca.github.io/AdvancedProgramming/CW7','https://busenurkaraca.github.io/AdvancedProgramming/Database.html','https://busenurkaraca.github.io/AdvancedProgramming/HW3.html']
function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)
self.addEventListener('install', installCB)
function cacheCB(e) { //cache first
  let req = e.request
  e.respondWith(
    caches.match(req)
    .then(r1 => r1 || fetch(req))
    .catch(console.log)
  )
}
self.addEventListener('fetch', cacheCB)
function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
//navigator.serviceWorker.register('https://celilreha.github.io/AdvancedProg/CW7/sw.js')
