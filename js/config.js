/* =====================================================================
   CONFIG DEL SITIO
   Aquí están todos los datos del negocio juntos para cambiarlos fácilmente.
   ===================================================================== */
window.SITE = {
  nombre: "Verde Espina",
  eslogan: "Cactus, suculentas y macetas hechas con cariño",
  // WhatsApp: 52 y los 10 dígitos, sin espacios ni signos
  whatsapp: "523300000000",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  correo: "hola@verdeespina.mx",
  direccion: "Colonia Agua Fría, Zapopan, Jalisco, México",
  // Búsqueda del mapa de Google: entre más exacta, mejor ubicación
  mapa: "Agua Fría, Zapopan, Jalisco, México",
  horario: "Lunes a sábado de 10:00 a 18:00 h",
  envio: { costo: 60, gratisDesde: 600 },

  // Solo el ID del video de YouTube, no la liga completa
  videoYoutubeId: "RMSnOe6kxa4",

  // Fotos propias de los productos (img/productos). Si se pone en false,
  // se usan las ilustraciones de respaldo.
  usarFotos: true,

  // Las 3 diapositivas del inicio. "producto" es el producto que se dibuja
  // mientras no hay foto y "foto" es la ruta de la foto nuestra.
  slides: [
    { titulo: "Plantas pequeñas, mucho carácter",
      texto: "Cactus y suculentas que cuidamos una por una en Zapopan.",
      cta: "Ver cactus", href: "tienda.html?tipo=cactus", producto: "c01", foto: "img/productos/c01.jpg" },
    { titulo: "Macetas para cada planta",
      texto: "Macetas de distintos tamaños, formas y colores para darle su lugar a cada planta.",
      cta: "Ver macetas", href: "tienda.html?tipo=maceta", producto: "m02", foto: "img/productos/m02.jpg" },
    { titulo: "Plantas de interior",
      texto: "Begonias, chefleras y más plantas de interior para darle vida a cualquier espacio.",
      cta: "Ver plantas de interior", href: "tienda.html?tipo=interior", producto: "p01", foto: "img/productos/p01.jpg" }
  ],

  testimonios: [
    { nombre: "Blanca J.", texto: "Mi echeveria llegó perfecta y bien empacada. Me explicaron cómo regarla.", estrellas: 5 },
    { nombre: "Diana O.", texto: "Las macetas están muy bonitas y son más que ideales para regalo.", estrellas: 5 },
    { nombre: "Carlos R.", texto: "Atención rápida por WhatsApp y entrega a tiempo.", estrellas: 4 },
    { nombre: "Roberto O.", texto: "Pedí una begonia y llegó sana y bien protegida. Ya tiene su lugar en la sala.", estrellas: 5 }
  ]
};
