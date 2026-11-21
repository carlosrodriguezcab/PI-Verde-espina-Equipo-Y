/* Ilustraciones (SVG) de plantas y macetas.
   Las hice con código para que los productos tengan imagen mientras no
   tenemos nuestras fotos. Este archivo no hay que tocarlo. */
(function () {
  let uid = 0;
  const clamp = v => Math.max(0, Math.min(255, v));
  function shade(hex, amt) {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 255) + amt), b = clamp((n & 255) + amt);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* ---------- Plantas (base en y=125, centradas en x=100) ---------- */
  const P = {};
  P.columnar = c => `
    <path d="M86 108H70V88" fill="none" stroke="${c}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M114 100H130V80" fill="none" stroke="${c}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="86" y="44" width="28" height="86" rx="14" fill="${c}"/>
    <g stroke="${shade(c, -30)}" stroke-width="1.6" opacity=".55" fill="none"><path d="M94 52V124"/><path d="M100 48V128"/><path d="M106 52V124"/></g>
    <g stroke="#fff" stroke-width="1.2" opacity=".8" stroke-linecap="round"><path d="M90 62l-4-2M110 62l4-2M90 82l-4-2M110 82l4-2M90 102l-4-2M110 102l4-2"/></g>`;

  P.barrel = c => {
    const spines = [[100, 84], [86, 94], [114, 94], [92, 112], [108, 112], [100, 100], [80, 106], [120, 106]]
      .map(([x, y]) => `M${x - 3} ${y - 3}l6 6M${x + 3} ${y - 3}l-6 6`).join('');
    const ribs = [-26, -13, 0, 13, 26].map(o => `<path d="M100 71C${100 + o * 1.5} 88 ${100 + o * 1.5} 116 100 133"/>`).join('');
    return `<ellipse cx="100" cy="102" rx="36" ry="32" fill="${c}"/>
      <g fill="none" stroke="${shade(c, -32)}" stroke-width="1.6" opacity=".55">${ribs}</g>
      <path d="${spines}" stroke="#fff" stroke-width="1.2" opacity=".85" stroke-linecap="round" fill="none"/>
      <g><circle cx="100" cy="70" r="6.5" fill="#F4C84A"/><circle cx="100" cy="70" r="2.6" fill="#E58A5F"/></g>`;
  };

  P.opuntia = c => {
    const pad = (cx, cy, rx, ry, rot) => `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>
      <path d="M${cx - 6} ${cy - 6}l3 3M${cx + 6} ${cy - 6}l-3 3M${cx} ${cy + 6}v-4M${cx - 6} ${cy + 8}l3 -3M${cx + 6} ${cy + 8}l-3 -3" stroke="#fff" stroke-width="1.2" opacity=".75" stroke-linecap="round" fill="none"/></g>`;
    return pad(100, 104, 24, 27, 0) + pad(76, 78, 17, 21, -24) + pad(124, 72, 16, 20, 22) + pad(100, 62, 13, 16, 0);
  };

  P.rosette = c => {
    let s = '';
    for (let a = 0; a < 360; a += 30) s += `<g transform="rotate(${a} 100 104)"><ellipse cx="100" cy="82" rx="10" ry="22" fill="${shade(c, -14)}"/></g>`;
    for (let a = 15; a < 360; a += 30) s += `<g transform="rotate(${a} 100 104)"><ellipse cx="100" cy="88" rx="9" ry="17" fill="${c}"/></g>`;
    for (let a = 0; a < 360; a += 45) s += `<g transform="rotate(${a} 100 104)"><ellipse cx="100" cy="94" rx="6" ry="10" fill="${shade(c, 16)}"/></g>`;
    return s + `<circle cx="100" cy="104" r="6" fill="${shade(c, 30)}"/>`;
  };

  P.haworthia = c => {
    let s = '';
    [-62, 62, -42, 42, -22, 22, 0].forEach((a, i) => {
      s += `<g transform="rotate(${a} 100 128)"><path d="M91 130L100 ${58 + Math.abs(a) / 4}L109 130Z" fill="${i % 2 ? c : shade(c, -14)}"/>
        <path d="M96 108h8M95 96h10M97 84h6" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/></g>`;
    });
    return s;
  };

  P.burro = c => {
    let s = '';
    for (let i = 0; i < 34; i++) {
      const r = 4 + Math.sqrt(i) * 6.2, a = i * 2.39996;
      const x = 100 + r * Math.cos(a) * 1.15, y = 100 + r * Math.sin(a) * 0.75;
      s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7.5" ry="6" fill="${i % 3 ? c : shade(c, -14)}"/>`;
    }
    [[54, 126], [53, 138], [55, 150], [57, 162], [148, 128], [149, 140], [147, 152], [145, 164]]
      .forEach(([x, y], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="7" ry="6" fill="${i % 2 ? c : shade(c, -14)}"/>`; });
    return s;
  };

  P.jade = c => {
    const leaves = [[100, 74, 0], [86, 82, -30], [114, 78, 30], [76, 96, -50], [124, 92, 50], [92, 62, -15], [108, 60, 15], [100, 90, 0]];
    return `<path d="M100 130V92M100 108L82 88M100 100L120 82" stroke="#8B6B4A" stroke-width="7" stroke-linecap="round" fill="none"/>` +
      leaves.map(([x, y, r], i) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="9" fill="${i % 2 ? c : shade(c, -12)}" transform="rotate(${r} ${x} ${y})"/>`).join('');
  };

  /* ---------- Macetas y sus patrones ---------- */
  function pot(x, y, w, h, color, pat) {
    const id = 'cp' + (++uid);
    let overlay = '';
    if (pat === 'lineas') overlay = [.3, .55, .8].map(t => `<rect x="${x}" y="${y + h * t}" width="${w}" height="${h * .1}" fill="#fff" opacity=".55"/>`).join('');
    if (pat === 'puntos') {
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++)
        overlay += `<circle cx="${x + 12 + c * (w - 24) / 4 + (r % 2 ? 8 : 0)}" cy="${y + 26 + r * 14}" r="3.2" fill="#fff" opacity=".7"/>`;
    }
    if (pat === 'zigzag') {
      let d = `M${x} ${y + h * .5}`; const n = 8;
      for (let i = 0; i < n; i++) d += ` l${w / n / 2} ${i % 2 ? 10 : -10} l${w / n / 2} ${i % 2 ? -10 : 10}`;
      overlay = `<path d="${d}" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>`;
    }
    if (pat === 'hojas') {
      overlay = [0, 1, 2].map(i => `<g transform="translate(${x + 20 + i * 20} ${y + 36})"><path d="M0 18C-8 8 -4 -4 0 -10C4 -4 8 8 0 18Z" fill="#fff" opacity=".65"/></g>`).join('');
    }
    return `<defs><clipPath id="${id}"><path d="M${x + 4} ${y + 10}H${x + w - 4}L${x + w - 14} ${y + h}H${x + 14}Z"/></clipPath></defs>
      <path d="M${x + 4} ${y + 10}H${x + w - 4}L${x + w - 14} ${y + h}H${x + 14}Z" fill="${color}"/>
      <g clip-path="url(#${id})">${overlay}</g>
      <rect x="${x - 2}" y="${y}" width="${w + 4}" height="14" rx="4" fill="${shade(color, -18)}"/>`;
  }

  const plantSVG = (tipo, color) => (P[tipo] || P.rosette)(color);
  const mini = (cx, cy, s, planta, color, maceta, patron) =>
    `<g transform="translate(${cx} ${cy}) scale(${s}) translate(-100 -152)">${plantSVG(planta, color)}${pot(60, 120, 80, 64, maceta, patron)}</g>`;

  const TINT = { cactus: '#DCEBDD', suculenta: '#E5EFD6', maceta: '#F6E3D4', interior: '#DDEAD8', kit: '#F3EBD6' };

  function product(p) {
    let inner = '';
    if (p.tipo === 'maceta') {
      inner = `<g transform="translate(100 112) scale(1.5) translate(-100 -152)">${pot(60, 120, 80, 64, p.maceta, p.patron)}</g>`;
    } else if (p.tipo === 'kit') {
      inner = `<rect x="22" y="146" width="156" height="14" rx="6" fill="#C79A66"/><rect x="22" y="156" width="156" height="5" rx="2.5" fill="#A87C4C"/>` +
        p.kit.map((k, i) => mini(48 + i * 52, 128, .6, k.planta, k.color, k.maceta, k.patron)).join('');
    } else {
      inner = plantSVG(p.planta, p.color) + pot(60, 120, 80, 64, p.maceta, p.patron);
    }
    return `<svg viewBox="0 0 200 200" role="img" aria-label="Ilustración de ${p.nombre}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="104" r="88" fill="${TINT[p.tipo] || '#EEE'}"/>
      <ellipse cx="100" cy="190" rx="54" ry="7" fill="#000" opacity=".08"/>${inner}</svg>`;
  }

  window.ART = { product, shade };
})();
