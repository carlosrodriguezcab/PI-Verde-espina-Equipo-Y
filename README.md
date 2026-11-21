# Verde Espina: prototipo de tienda en línea

Prototipo de sistema Web desarrollado como Producto Integrador de la materia Proyecto III (Equipo Y).

## Objetivo

Desarrollar un prototipo de sistema Web que solucione un problema o satisfaga una necesidad.

## Problema que atiende

El negocio es un emprendimiento familiar de cactus, suculentas, plantas de interior y macetas ubicado en la colonia Agua Fría, en Zapopan, Jalisco. Hasta ahora sus ventas dependen casi por completo de la atención presencial, con un promedio de 15 a 20 ventas por fin de semana, y no cuenta con un canal digital donde los clientes puedan consultar el catálogo o hacer pedidos.

El prototipo propone una tienda en línea sencilla que permite conocer los productos, armar un pedido y enviarlo directamente al negocio por WhatsApp, sin necesidad de una plataforma de pago ni de un servidor propio.

## Equipo

| Integrante | Rol Scrum |
|---|---|
| Carlos Rodríguez Caballero | Product Owner |
| Diana Ornelas Ricardo | Scrum Master |
| Blanca Viridiana Jáuregui del Muro | Desarrolladora Frontend |
| Roberto Carlos Ortiz González | Desarrollador Backend |

## Funcionalidades

- Catálogo de 30 productos en cuatro categorías: cactus, suculentas, plantas de interior y macetas.
- Búsqueda por nombre y filtros por categoría y tipo de luz.
- Orden por destacados, precio, valoración y nombre.
- Ficha de cada producto con cuidados, existencias y opiniones con estrellas.
- Carrito de compras con cálculo de envío.
- Envío del pedido por WhatsApp con folio y resumen.
- Página de ubicación con mapa y zonas de entrega.
- Chat de ayuda con respuestas automáticas.
- Preguntas frecuentes, formulario de contacto y enlaces a redes sociales.
- Diseño adaptable a computadora, tableta y celular.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: slider, productos favoritos, video, cifras y opiniones |
| `tienda.html` | Tienda virtual con filtros y detalle de productos |
| `nosotros.html` | Historia, misión, visión, valores y políticas de calidad |
| `ubicacion.html` | Mapa, horario y zonas de entrega |
| `faq.html` | Preguntas frecuentes |
| `contacto.html` | Formulario de contacto y datos del negocio |

## Tecnologías

- HTML5, CSS3 y JavaScript sin frameworks.
- `localStorage` para guardar el carrito y las opiniones en el navegador.
- Google Maps y YouTube integrados mediante `iframe`.
- WhatsApp (`wa.me`) para recibir los pedidos.

## Estructura del proyecto

```
├── index.html, tienda.html, nosotros.html, ubicacion.html, faq.html, contacto.html
├── css/
│   └── styles.css        Estilos generales y diseño adaptable
├── js/
│   ├── config.js         Datos del negocio: nombre, contacto, horario, envío, slider y opiniones
│   ├── products.js       Catálogo de productos
│   ├── site.js           Encabezado, pie de página, animaciones y chat
│   ├── home.js           Página de inicio
│   ├── shop.js           Tienda, filtros y detalle de producto
│   ├── cart.js           Carrito y pedido por WhatsApp
│   ├── ubicacion.js      Página de ubicación
│   ├── contacto.js       Validación del formulario de contacto
│   └── art.js            Ilustraciones de respaldo si una foto no está disponible
└── img/
    ├── logo.svg
    └── productos/        Fotografías propias de los productos
```

## Cómo usarlo

El sitio está publicado con GitHub Pages y se puede abrir directamente desde el navegador, sin descargar nada:

**https://carlosrodriguezcab.github.io/PI-Verde-espina-Equipo-Y/**

### Abrirlo en la computadora (opcional)

Para revisarlo de forma local se necesita un servidor local, por ejemplo:

- En Visual Studio Code, con la extensión **Live Server**: clic derecho sobre `index.html` y elegir "Open with Live Server".
- Desde la terminal, dentro de la carpeta del proyecto: `python3 -m http.server 8000` y después entrar a `http://localhost:8000`.

Si se abre `index.html` con doble clic, el video de YouTube muestra el error 153, porque el navegador no envía la dirección de origen de la página y YouTube bloquea el reproductor. En la versión publicada esto no pasa.

El mapa y el video necesitan conexión a internet.

## Alcance del prototipo

Al ser un prototipo, algunas funciones se resuelven sin backend:

- El pago no se procesa en el sitio; el pedido se confirma por WhatsApp y el pago se acuerda en efectivo o transferencia.
- El formulario de contacto valida los datos, pero no envía correos.
- El carrito y las opiniones se guardan solo en el navegador de cada usuario.

## Mantenimiento

- Los datos del negocio se editan en `js/config.js`.
- Los productos se editan en `js/products.js`. La foto de cada producto se toma de `img/productos/` con el mismo nombre que su código (por ejemplo, `c01.jpg`).
