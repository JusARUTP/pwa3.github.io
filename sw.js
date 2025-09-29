/*
 * sw.js
 *
 * Este Service Worker implementa una estrategia de "Cache First" para que la PWA
 * funcione sin conexión.
 *
 * 1. Evento 'install': Se activa una sola vez. Abre un caché y guarda los
 * archivos fundamentales de la aplicación (HTML, JS, imágenes locales).
 * 2. Evento 'fetch': Se activa cada vez que la página solicita un recurso.
 * Primero busca el recurso en el caché. Si lo encuentra, lo devuelve
 * inmediatamente. Si no, intenta obtenerlo de la red.
 */

// Define un nombre y versión para nuestro caché.
// Si actualizas los archivos, cambia la versión (ej. 'pwa-cache-v2').
const CACHE_NAME = 'pwa-cache-v1';

// Lista de los archivos que forman el "App Shell".
// Son los recursos mínimos para que la interfaz funcione.
const URLS_TO_CACHE = [
  '/', // La raíz de la app
  'index.html',
  'manifest.json',
  'lib1.js',
  'lib2.js',
  'hola.jpg',
  'unicorn.jpg', // Lo incluimos porque tu lógica anterior lo usaba
  'utp.png'      // Lo incluimos también
];

// === 1. Evento de Instalación: Guardar archivos en caché ===
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  
  // Espera a que la promesa de abrir el caché y agregar los archivos se complete.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Abriendo caché y guardando el app shell.');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker: Todos los archivos fueron guardados en caché exitosamente.');
        return self.skipWaiting(); // Opcional: activa el SW inmediatamente
      })
      .catch((err) => {
        console.error('Service Worker: Falló el guardado en caché durante la instalación.', err);
      })
  );
});

// === 2. Evento Fetch: Interceptar peticiones y servir desde caché ===
self.addEventListener('fetch', (event) => {
  // Responde a la petición con una estrategia "Cache First".
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si la respuesta está en el caché, la devolvemos.
        if (response) {
          console.log(`Service Worker: Sirviendo desde caché: ${event.request.url}`);
          return response;
        }

        // Si no está en el caché, la buscamos en la red.
        console.log(`Service Worker: Buscando en red: ${event.request.url}`);
        return fetch(event.request);
      })
  );
});
//  * sw.js
//  *
//  * Service Worker para la práctica.  Se escucha el evento «fetch» y se
//  * interceptan las peticiones de imágenes con extensiones .jpg y .png para
//  * devolver imágenes predefinidas.  Esto ilustra cómo un SW puede controlar
//  * las respuestas de red y proporcionar contenido alternativo incluso sin
//  * conexión.
//  */

// self.addEventListener('fetch', function (evento) {
//   // Muestra por consola la URL solicitada.  Útil para depuración.
//   console.log('Interceptando solicitud:', evento.request.url);

//   // Si la solicitud termina en .jpg devolvemos siempre unicorn.jpg
//   if (/\.jpg$/i.test(evento.request.url)) {
//     evento.respondWith(fetch('unicorn.jpg'));
//     return;
//   }

//   // Si la solicitud termina en .png devolvemos utp.png
//   if (/\.png$/i.test(evento.request.url)) {
//     evento.respondWith(fetch('utp.png'));
//     return;
//   }
//   // Para el resto de recursos dejamos pasar la petición al servidor
// });