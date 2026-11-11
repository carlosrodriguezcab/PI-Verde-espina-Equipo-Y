/* =====================================================================
   CATÁLOGO (28 productos)

   TODO: los 28 productos con sus nombres, precios, tamaños y existencias
   los inventé yo para llenar la tienda. Pongan los reales del negocio
   (piden mínimo 20 productos).

   Cada producto se crea con mk(id, nombre, tipo, ...):
     id, nombre, tipo ('cactus' | 'suculenta' | 'maceta' | 'kit')
     planta, color, maceta, patron -> solo dibujan la ilustración temporal
     precio, tam, luz, riego, stock (existencias), desc (descripción)
   Al final: d:1 lo pone en "destacados" del inicio, r:[promedio, # de opiniones].

   TODO: en "foto" de cada producto pongan la ruta de su foto (ej. "img/productos/c01.jpg")
   y luego cambien usarFotos a true en config.js.
   ===================================================================== */
(function () {
  const TIPOS = { cactus: 'Cactus', suculenta: 'Suculenta', maceta: 'Maceta', kit: 'Kit' };
  const LUZ_SOL = 'Sol directo', LUZ_SEMI = 'Semisombra', LUZ_SOMBRA = 'Sombra';

  const mk = (id, nombre, tipo, planta, color, maceta, patron, precio, tam, luz, riego, stock, desc, o = {}) => ({
    id, nombre, tipo, planta, color, maceta, patron, precio, tam, luz, riego, stock, desc,
    foto: '', destacado: !!o.d, rating: o.r || [4.6, 8], kit: o.kit || null
  });

  const TERRA = '#C8643B', OCRE = '#E2A35C', ARENA = '#E9D3B0', AZUL = '#3F6C8C', SALVIA = '#8CB1A0', ROSA = '#D98C9A', LADRILLO = '#B5523B', CREMA = '#F0E4D0';

  const PRODUCTS = [
    // ---- Cactus (TODO: datos reales) ----
    mk('c01', 'Biznaga dorada', 'cactus', 'barrel', '#5E9E63', TERRA, 'lineas', 95, 'Planta 8 cm · maceta 9 cm', LUZ_SOL, 'Cada 15 días', 12, 'Cactus redondo de crecimiento lento, ideal para escritorio. Le encanta el sol y casi no pide cuidados.', { d: 1, r: [4.8, 14] }),
    mk('c02', 'Cactus columnar', 'cactus', 'columnar', '#4E8F63', OCRE, 'puntos', 110, 'Planta 18 cm · maceta 10 cm', LUZ_SOL, 'Cada 15 días', 9, 'Cactus de porte recto con brazos pequeños. Da altura y personalidad a cualquier esquina soleada.', { r: [4.5, 9] }),
    mk('c03', 'Nopalito de mesa', 'cactus', 'opuntia', '#6AA56E', ARENA, 'liso', 85, 'Planta 12 cm · maceta 9 cm', LUZ_SOL, 'Cada 12 días', 15, 'Nopal miniatura de pencas suaves. Un clásico mexicano en versión de mesa.', { r: [4.7, 11] }),
    mk('c04', 'Asiento de suegra', 'cactus', 'barrel', '#7DB26E', TERRA, 'zigzag', 140, 'Planta 12 cm · maceta 12 cm', LUZ_SOL, 'Cada 20 días', 6, 'El cactus redondo más famoso. Con los años se vuelve una esfera impresionante.', { d: 1, r: [4.9, 12] }),
    mk('c05', 'Biznaguita erizada', 'cactus', 'barrel', '#5C9A7A', SALVIA, 'puntos', 70, 'Planta 6 cm · maceta 7 cm', LUZ_SOL, 'Cada 15 días', 20, 'Pequeña, redonda y cubierta de espinas blancas. Perfecta para coleccionar.', { r: [4.4, 7] }),
    mk('c06', 'Orejas de conejo', 'cactus', 'opuntia', '#7FAE6B', CREMA, 'hojas', 90, 'Planta 14 cm · maceta 10 cm', LUZ_SOL, 'Cada 12 días', 11, 'Pencas aterciopeladas que parecen orejitas. Se ve tierno pero cuidado con sus pelitos.', { d: 1, r: [4.6, 10] }),
    mk('c07', 'Cereus mini', 'cactus', 'columnar', '#3F7D5A', AZUL, 'lineas', 120, 'Planta 22 cm · maceta 11 cm', LUZ_SOL, 'Cada 15 días', 7, 'Cactus esbelto de crecimiento vertical. Resistente y muy fácil de cuidar.', { r: [4.5, 6] }),
    mk('c08', 'Cactus estrella', 'cactus', 'barrel', '#4E8F73', ROSA, 'zigzag', 105, 'Planta 9 cm · maceta 9 cm', LUZ_SOL, 'Cada 18 días', 10, 'De forma aplanada y marcada, parece una estrella verde. Florece en primavera.', { r: [4.7, 8] }),

    // ---- Suculentas (TODO: datos reales) ----
    mk('s01', 'Echeveria perla', 'suculenta', 'rosette', '#9CC4B5', TERRA, 'puntos', 80, 'Roseta 8 cm · maceta 9 cm', LUZ_SEMI, 'Cada 10 días', 14, 'Roseta de tono azul perlado. Se mantiene compacta con buena luz.', { d: 1, r: [4.8, 16] }),
    mk('s02', 'Echeveria rosa', 'suculenta', 'rosette', '#C98B9E', ARENA, 'lineas', 85, 'Roseta 8 cm · maceta 9 cm', LUZ_SEMI, 'Cada 10 días', 13, 'Tonos rosados que se intensifican con el sol de la mañana.', { r: [4.7, 12] }),
    mk('s03', 'Haworthia cebra', 'suculenta', 'haworthia', '#4F8A62', OCRE, 'hojas', 75, 'Planta 10 cm · maceta 9 cm', LUZ_SOMBRA, 'Cada 12 días', 18, 'Hojas con rayas blancas. De las suculentas más fáciles para interior.', { d: 1, r: [4.9, 15] }),
    mk('s04', 'Cola de burro', 'suculenta', 'burro', '#8DBF8A', CREMA, 'liso', 130, 'Cuelga hasta 25 cm · maceta 11 cm', LUZ_SEMI, 'Cada 14 días', 5, 'Tallos colgantes cubiertos de hojitas carnosas. Se ve espectacular en macetas altas.', { r: [4.6, 9] }),
    mk('s05', 'Árbol de jade', 'suculenta', 'jade', '#5FA06F', LADRILLO, 'zigzag', 120, 'Planta 20 cm · maceta 11 cm', LUZ_SEMI, 'Cada 12 días', 8, 'Dicen que atrae la buena suerte. Crece como un arbolito en miniatura.', { r: [4.8, 13] }),
    mk('s06', 'Rosetón terracota', 'suculenta', 'rosette', '#C9694F', SALVIA, 'puntos', 70, 'Roseta 7 cm · maceta 8 cm', LUZ_SOL, 'Cada 10 días', 16, 'Hojas rojizas que cambian de color según la estación.', { r: [4.3, 6] }),
    mk('s07', 'Haworthia perla', 'suculenta', 'haworthia', '#6FA37F', ROSA, 'lineas', 78, 'Planta 9 cm · maceta 9 cm', LUZ_SOMBRA, 'Cada 12 días', 12, 'Variedad de puntos claros, muy decorativa para repisas con poca luz.', { r: [4.5, 7] }),
    mk('s08', 'Echeveria lila', 'suculenta', 'rosette', '#A99BC9', AZUL, 'hojas', 90, 'Roseta 8 cm · maceta 9 cm', LUZ_SEMI, 'Cada 10 días', 9, 'Tono lila poco común. Es de las más buscadas para regalo.', { d: 1, r: [4.9, 10] }),

    // ---- Macetas (TODO: datos reales) ----
    mk('m01', 'Maceta pintada “Sol”', 'maceta', null, null, OCRE, 'lineas', 65, '10 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 14, 'Pintada a mano con bandas de color cálido. Cada pieza sale un poco distinta.', { d: 1, r: [4.9, 12] }),
    mk('m02', 'Maceta pintada “Puntos”', 'maceta', null, null, AZUL, 'puntos', 70, '10 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 11, 'Fondo azul con puntos blancos pintados uno por uno.', { r: [4.7, 9] }),
    mk('m03', 'Maceta zigzag', 'maceta', null, null, CREMA, 'zigzag', 75, '11 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 10, 'Diseño geométrico en tono crema, combina con cualquier suculenta.', { r: [4.6, 8] }),
    mk('m04', 'Maceta hojas', 'maceta', null, null, SALVIA, 'hojas', 80, '11 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 9, 'Verde salvia con hojas pintadas a mano. Una pieza muy fresca.', { r: [4.8, 10] }),
    mk('m05', 'Maceta mini terracota', 'maceta', null, null, TERRA, 'liso', 40, '7 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 30, 'Clásica de barro, perfecta para plantas pequeñas o para pintar tú mismo.', { r: [4.4, 6] }),
    mk('m06', 'Maceta rayas rosa', 'maceta', null, null, ROSA, 'lineas', 70, '10 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 12, 'Rayas pintadas en tono rosa, muy popular para regalos.', { r: [4.6, 7] }),
    mk('m07', 'Maceta cuadro mini', 'maceta', null, null, LADRILLO, 'puntos', 60, '8 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 15, 'Color ladrillo con detalles blancos. Ideal para escritorio.', { r: [4.5, 5] }),
    mk('m08', 'Maceta grande artesanal', 'maceta', null, null, ARENA, 'hojas', 120, '15 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 6, 'Nuestra pieza grande, con diseño de hojas. Perfecta para una planta protagonista.', { r: [4.9, 8] }),

    // ---- Kits (TODO: datos reales) ----
    mk('k01', 'Kit 3 suculentas', 'kit', null, null, null, null, 240, '3 plantas con maceta', LUZ_SEMI, 'Cada 10 días', 8, 'Tres suculentas diferentes en macetas pintadas a mano y una guía de cuidados impresa.', {
      d: 1, r: [4.9, 14], kit: [
        { planta: 'rosette', color: '#9CC4B5', maceta: TERRA, patron: 'puntos' },
        { planta: 'haworthia', color: '#4F8A62', maceta: OCRE, patron: 'lineas' },
        { planta: 'jade', color: '#5FA06F', maceta: AZUL, patron: 'hojas' }] }),
    mk('k02', 'Kit cactus mini', 'kit', null, null, null, null, 260, '3 cactus con maceta', LUZ_SOL, 'Cada 15 días', 6, 'Tres cactus miniatura listos para decorar tu escritorio o ventana soleada.', {
      r: [4.7, 9], kit: [
        { planta: 'columnar', color: '#4E8F63', maceta: ARENA, patron: 'liso' },
        { planta: 'barrel', color: '#5E9E63', maceta: ROSA, patron: 'zigzag' },
        { planta: 'opuntia', color: '#6AA56E', maceta: SALVIA, patron: 'puntos' }] }),
    mk('k03', 'Kit regalo “Hogar”', 'kit', null, null, null, null, 320, '3 plantas con maceta y caja', LUZ_SEMI, 'Cada 10 días', 5, 'Selección variada para regalar, con caja decorada y tarjeta de felicitación.', {
      r: [5, 6], kit: [
        { planta: 'rosette', color: '#C98B9E', maceta: CREMA, patron: 'hojas' },
        { planta: 'burro', color: '#8DBF8A', maceta: LADRILLO, patron: 'liso' },
        { planta: 'haworthia', color: '#6FA37F', maceta: AZUL, patron: 'puntos' }] }),
    mk('k04', 'Kit de oficina', 'kit', null, null, null, null, 210, '3 plantas de bajo cuidado', LUZ_SOMBRA, 'Cada 14 días', 7, 'Plantas que aguantan poca luz y pocos riegos. Pensado para escritorios.', {
      r: [4.6, 5], kit: [
        { planta: 'haworthia', color: '#4F8A62', maceta: SALVIA, patron: 'lineas' },
        { planta: 'jade', color: '#5FA06F', maceta: OCRE, patron: 'liso' },
        { planta: 'rosette', color: '#A99BC9', maceta: TERRA, patron: 'zigzag' }] })
  ];

  /* ---------- Valoraciones (se guardan en el navegador con localStorage) ---------- */
  const Ratings = {
    key: 'vs_reviews',
    all() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
    list(id) { return this.all()[id] || []; },
    add(id, r) {
      const a = this.all(); (a[id] = a[id] || []).unshift(r);
      try { localStorage.setItem(this.key, JSON.stringify(a)); } catch (e) { /* si el navegador no deja guardar, pues no se guarda y ya */ }
    },
    summary(p) {
      const l = this.list(p.id), [avg0, n0] = p.rating, n = n0 + l.length;
      return { avg: (avg0 * n0 + l.reduce((s, x) => s + x.stars, 0)) / n, n };
    }
  };

  /* Imagen del producto: la foto nuestra si está activada, si no la ilustración */
  function productArt(p) {
    if (window.SITE.usarFotos && p.foto) return `<img src="${p.foto}" alt="${p.nombre}" loading="lazy">`;
    return window.ART.product(p);
  }

  window.PRODUCTS = PRODUCTS; window.TIPOS = TIPOS; window.Ratings = Ratings; window.productArt = productArt;
})();
