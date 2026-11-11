# Prototipo web · Producto Integrador (Equipo Y)

Es la página del negocio de cactus y suculentas. Es solo front-end (HTML, CSS y JavaScript), no necesita servidor ni backend.

## Cómo abrirla
Descarguen o clonen el repositorio y abran `index.html` con doble clic (Chrome, Edge o Firefox). El mapa y el video necesitan internet.

## Qué hay que hacer entre todos
Casi todos los datos los inventé yo para que la página se viera completa, así que hay que cambiarlos por los reales. Todo lo pendiente está marcado con `TODO` en el código. En VS Code usen **Ctrl + Shift + F** y busquen `TODO`.

- `js/config.js`: nombre del negocio, WhatsApp, redes, correo, dirección, horario, envío, testimonios y textos del slider. **Aquí está casi todo.**
- `js/config.js` → `videoYoutubeId`: pongan el ID del video cuando lo subamos a YouTube.
- `js/products.js`: los 28 productos son de ejemplo. Pongan los reales.
- `nosotros.html`: historia, misión, visión, políticas de calidad y línea del tiempo.
- `faq.html`: preguntas frecuentes.
- `js/site.js` → `KB`: respuestas del chat.
- `js/ubicacion.js`: zonas de entrega.

## Fotos
Piden que las imágenes sean de nuestra autoría. Las que se ven ahorita son ilustraciones dibujadas con código, solo para que no se viera vacío.
Cuando tengamos las fotos las guardamos en `img/` (slides: `img/slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`; productos: `img/productos/` con el nombre que pongamos en el campo `foto` de cada producto) y cambiamos `usarFotos` a `true` en `config.js`.

## Cómo funciona sin backend
- El carrito y las opiniones se guardan en el navegador (localStorage).
- El pago es de mentiritas: el pedido se manda por WhatsApp.
- El formulario de contacto valida pero no manda correo.
- El chat responde por palabras clave.

## Para trabajar en Git
Cada quien haga su rama o avísenme antes de tocar el mismo archivo, para no pisarnos. Si solo van a cambiar datos, basta con editar `config.js` y `products.js`.
