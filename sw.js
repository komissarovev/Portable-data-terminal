const staticCacheName = 's-app-v4'
const dynamicCacheName = 'd-app-v4'

const assetUrls = [
  'index.html',
  'manifest.json',
  'favicon.ico',
  '/icons/dialog.png',
  '/icons/tab.png',
  '/src/components/BarcodeScaner.js',
  '/src/components/Info_prod.js',
  '/src/components/Install.js',
  '/src/components/Inventory.js',
  '/src/components/Menu.js',
  '/src/components/Nomenklatura.js',
  '/src/App.js',
  '/src/Audio.js',
  '/src/Dom.js',
  '/src/main.js',
  '/src/styles.css',
  '404.html'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('404.html')
  }
}