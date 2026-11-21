/* =====================================================================
   CATÁLOGO (30 productos)

   Cada producto se crea con mk(id, nombre, tipo, ...):
     id, nombre, tipo ('cactus' | 'suculenta' | 'interior' | 'maceta')
     planta, color, maceta, patron -> solo dibujan la ilustración de respaldo
     precio, tam, luz, riego, stock (existencias), desc (descripción)
   Al final: d:1 lo pone en "destacados" del inicio, r:[promedio, # de opiniones].

   La foto de cada producto se toma de img/productos/<id>.jpg
   (si alguna tiene otro nombre, se pone con foto:'ruta' al final).
   ===================================================================== */
(function () {
  const TIPOS = { cactus: 'Cactus', suculenta: 'Suculenta', interior: 'Planta de interior', maceta: 'Maceta' };
  const LUZ_SOL = 'Sol directo', LUZ_SEMI = 'Semisombra', LUZ_SOMBRA = 'Sombra';

  const mk = (id, nombre, tipo, planta, color, maceta, patron, precio, tam, luz, riego, stock, desc, o = {}) => ({
    id, nombre, tipo, planta, color, maceta, patron, precio, tam, luz, riego, stock, desc,
    foto: o.foto || `img/productos/${id}.jpg`, destacado: !!o.d, rating: o.r || [4.6, 8], kit: o.kit || null
  });

  const TERRA = '#C8643B', OCRE = '#E2A35C', ARENA = '#E9D3B0', AZUL = '#3F6C8C', SALVIA = '#8CB1A0', ROSA = '#D98C9A', LADRILLO = '#B5523B', CREMA = '#F0E4D0';
  const NEGRO = '#3A3A3A', CAFE = '#6B4A3A', GRIS = '#B9B3A8';

  const PRODUCTS = [
    // ---- Cactus ----
    mk('c01', 'Orejas de conejo', 'cactus', 'opuntia', '#8DB86E', NEGRO, 'liso', 150, 'Planta 25 cm · maceta 14 cm', LUZ_SOL, 'Cada 15 días', 6, 'Nopalito de pencas redondas cubiertas de puntitos dorados. Se ve suavecito, pero mejor no tocarlo con la mano.', { d: 1, r: [4.9, 15] }),
    mk('c02', 'Biznaga de costillas', 'cactus', 'barrel', '#3F7D5A', TERRA, 'liso', 120, 'Planta 12 cm · maceta 14 cm', LUZ_SOL, 'Cada 15 días', 8, 'Cactus redondo con costillas marcadas y areolas blancas. Crece lento y casi no pide cuidados.', { d: 1, r: [4.8, 12] }),
    mk('c03', 'Cactus columnar', 'cactus', 'columnar', '#4E8F63', NEGRO, 'liso', 110, 'Planta 25 cm · maceta 13 cm', LUZ_SOL, 'Cada 15 días', 7, 'Cactus de crecimiento vertical que ya trae un hijuelo a un lado. Da altura a cualquier rincón con sol.', { d: 1, r: [4.7, 10] }),
    mk('c04', 'Nopal de mesa', 'cactus', 'opuntia', '#6AA56E', NEGRO, 'liso', 70, 'Planta 18 cm · maceta 10 cm', LUZ_SOL, 'Cada 12 días', 12, 'Nopal joven de dos pencas. Un clásico mexicano en tamaño de maceta.', { r: [4.6, 9] }),
    mk('c05', 'Nopalito joven', 'cactus', 'opuntia', '#7DB26E', NEGRO, 'liso', 60, 'Planta 22 cm · maceta 9 cm', LUZ_SOL, 'Cada 12 días', 10, 'Nopal delgado de espinas largas que apenas empieza a sacar pencas. Ideal para verlo crecer.', { r: [4.4, 6] }),

    // ---- Suculentas ----
    mk('s01', 'Echeveria terciopelo', 'suculenta', 'rosette', '#8DBF8A', CAFE, 'liso', 90, 'Planta 15 cm · maceta 13 cm', LUZ_SEMI, 'Cada 10 días', 9, 'Echeveria pulvinata de hojas aterciopeladas con puntas rojizas. Con buen sol el rojo se intensifica.', { d: 1, r: [4.9, 13] }),
    mk('s02', 'Aloe manchado', 'suculenta', 'rosette', '#5E9E63', NEGRO, 'liso', 120, 'Planta 30 cm · maceta 12 cm', LUZ_SOL, 'Cada 15 días', 5, 'Aloe de hojas largas con manchas claras y orillas dentadas. Resistente y muy vistoso.', { d: 1, r: [4.8, 11] }),
    mk('s03', 'Lengua de suegra', 'suculenta', 'haworthia', '#4F8A62', CAFE, 'liso', 130, 'Planta 25 cm · maceta 12 cm', LUZ_SOMBRA, 'Cada 20 días', 8, 'Sansevieria de hojas firmes con rayas verdes. Aguanta poca luz y pocos riegos, perfecta para interior.', { d: 1, r: [4.9, 14] }),
    mk('s04', 'Roseta verde', 'suculenta', 'rosette', '#7DB26E', TERRA, 'liso', 80, 'Roseta 14 cm · maceta 13 cm', LUZ_SEMI, 'Cada 10 días', 10, 'Suculenta de hojas largas y puntiagudas que forman una roseta abierta. Muy fácil de cuidar.', { r: [4.6, 8] }),
    mk('s05', 'Euphorbia candelabro', 'suculenta', 'columnar', '#9CC48A', NEGRO, 'liso', 90, 'Planta 20 cm · maceta 9 cm', LUZ_SOL, 'Cada 15 días', 7, 'Parece cactus, pero es una euphorbia. Tallos con aristas que se ramifican como candelabro.', { r: [4.5, 7] }),
    mk('s06', 'Rosetas azules', 'suculenta', 'rosette', '#9CC4B5', GRIS, 'liso', 75, 'Planta 14 cm · maceta 9 cm', LUZ_SEMI, 'Cada 10 días', 9, 'Suculenta de tallos ramificados con rositas de tono azulado. Se llena rápido de nuevas rosetas.', { r: [4.6, 7] }),
    mk('s07', 'Pinito', 'suculenta', 'jade', '#5FA06F', NEGRO, 'liso', 70, 'Planta 20 cm · maceta 9 cm', LUZ_SEMI, 'Cada 12 días', 11, 'Crassula tetragona, de hojitas delgadas que parecen un pino en miniatura. Se puede formar como bonsái.', { r: [4.7, 9] }),
    mk('s08', 'Dedos azules', 'suculenta', 'rosette', '#9CC4B5', NEGRO, 'liso', 65, 'Planta 12 cm · maceta 10 cm', LUZ_SOL, 'Cada 12 días', 10, 'Senecio de hojas alargadas color azul verdoso. Le gusta mucho la luz y poca agua.', { r: [4.4, 6] }),
    mk('s09', 'Echeveria verde', 'suculenta', 'rosette', '#8DBF8A', NEGRO, 'liso', 60, 'Roseta 10 cm · maceta 10 cm', LUZ_SEMI, 'Cada 10 días', 14, 'Roseta compacta de hojas suaves. Buena opción para empezar con suculentas.', { r: [4.5, 8] }),
    mk('s10', 'Kalanchoe festoneado', 'suculenta', 'jade', '#A8B8B5', NEGRO, 'liso', 75, 'Planta 25 cm · maceta 9 cm', LUZ_SEMI, 'Cada 12 días', 8, 'Kalanchoe fedtschenkoi de hojas con orillas onduladas en tonos azul y rosa.', { r: [4.6, 7] }),
    mk('s11', 'Crassula apilada', 'suculenta', 'jade', '#9CC48A', NEGRO, 'liso', 95, 'Planta 20 cm · maceta 11 cm', LUZ_SOL, 'Cada 12 días', 6, 'Hojas planas que crecen una sobre otra, con orillas que se ponen rojizas con el sol.', { r: [4.7, 8] }),
    mk('s12', 'Planta fantasma', 'suculenta', 'rosette', '#C9B8C9', NEGRO, 'liso', 140, 'Planta 25 cm · maceta 15 cm', LUZ_SOL, 'Cada 10 días', 4, 'Graptopetalum paraguayense con muchas rosetas color lila grisáceo. Una planta grande y llamativa.', { r: [4.8, 10] }),

    // ---- Plantas de interior ----
    mk('p01', 'Begonia alas de ángel', 'interior', 'jade', '#4F8A62', CAFE, 'liso', 140, 'Planta 30 cm · maceta 13 cm', LUZ_SEMI, 'Cada 5 días', 5, 'Hojas grandes con forma de ala y puntitos plateados. Le gusta la luz indirecta y la tierra húmeda.', { d: 1, r: [4.8, 9] }),
    mk('p02', 'Cheflera', 'interior', 'jade', '#3F7D5A', CAFE, 'liso', 150, 'Planta 35 cm · maceta 12 cm', LUZ_SEMI, 'Cada 7 días', 6, 'Arbolito de hojas brillantes en forma de manita abierta. Crece bien dentro de casa.', { d: 1, r: [4.7, 8] }),
    mk('p03', 'Cinta', 'interior', 'haworthia', '#6FA37F', TERRA, 'liso', 70, 'Planta 20 cm · jardinera 18 cm', LUZ_SEMI, 'Cada 5 días', 12, 'Mala madre de hojas largas y arqueadas. Saca hijuelos colgantes y es muy difícil de matar.', { r: [4.6, 7] }),
    mk('p04', 'Peperomia', 'interior', 'jade', '#3F7D5A', CAFE, 'liso', 130, 'Planta 35 cm · maceta 13 cm', LUZ_SEMI, 'Cada 7 días', 5, 'Hojas gruesas y brillantes de color verde intenso. Tolera bien los espacios con poca luz.', { r: [4.7, 6] }),
    mk('p05', 'Planta china del dinero', 'interior', 'jade', '#5E9E63', NEGRO, 'liso', 110, 'Planta 15 cm · maceta 9 cm', LUZ_SEMI, 'Cada 7 días', 7, 'Pilea de hojas redondas como monedas. Dicen que atrae la buena suerte.', { r: [4.8, 9] }),

    // ---- Macetas ----
    mk('m01', 'Maceta cuadrada con flor', 'maceta', null, null, CAFE, 'liso', 55, '15 cm por lado', 'Para interior y exterior', 'Con orificio de drenaje', 10, 'Maceta café de plástico resistente con una flor en relieve al frente.', { r: [4.6, 6] }),
    mk('m02', 'Maceta borde ondulado', 'maceta', null, null, CAFE, 'liso', 50, '16 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 12, 'Maceta café con textura tejida y borde en ondas. Le da un toque decorativo a cualquier planta.', { r: [4.7, 7] }),
    mk('m03', 'Jardinera rectangular', 'maceta', null, null, CAFE, 'liso', 60, '20 x 14 cm', 'Para interior y exterior', 'Con orificio de drenaje', 8, 'Jardinera con patitas y textura de madera. Ideal para varias suculentas juntas.', { r: [4.5, 5] }),
    mk('m04', 'Maceta redonda café', 'maceta', null, null, CAFE, 'liso', 40, '14 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 20, 'Maceta lisa de plástico, sencilla y funcional para el día a día.', { r: [4.4, 6] }),
    mk('m05', 'Maceta redonda crema', 'maceta', null, null, CREMA, 'liso', 40, '14 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 15, 'Maceta color crema que combina con plantas de cualquier tono.', { r: [4.5, 5] }),
    mk('m06', 'Maceta con aros', 'maceta', null, null, CAFE, 'liso', 45, '15 cm de diámetro', 'Para interior y exterior', 'Con orificio de drenaje', 14, 'Maceta café oscuro con aros en la parte de arriba. Discreta y elegante.', { r: [4.5, 4] }),
    mk('m07', 'Maceta de cemento', 'maceta', null, null, GRIS, 'liso', 85, '10 cm de diámetro', 'Para interior y exterior', 'Sin orificio, usar poca agua', 6, 'Maceta artesanal de cemento con acabado rústico. Pesada y firme, perfecta para cactus pequeños.', { r: [4.8, 7] }),
    mk('m08', 'Maceta de vivero', 'maceta', null, null, NEGRO, 'liso', 15, '9 cm por lado', 'Para interior y exterior', 'Con orificio de drenaje', 40, 'Maceta cuadrada de plástico negro, la clásica de vivero para trasplantes y esquejes.', { r: [4.3, 4] })
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
