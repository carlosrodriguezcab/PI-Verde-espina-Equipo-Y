/* Tienda: filtros, búsqueda, orden, detalle del producto y valoraciones */
(function () {
  const P = window.PRODUCTS;
  const state = { tipo: 'todos', q: '', luz: 'todas', orden: 'destacados' };
  const params = new URLSearchParams(location.search);
  if (window.TIPOS[params.get('tipo')]) state.tipo = params.get('tipo');

  const grid = $('#grid'), count = $('#resCount'), empty = $('#noRes');

  function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function filtered() {
    let l = P.filter(p => (state.tipo === 'todos' || p.tipo === state.tipo)
      && (state.luz === 'todas' || p.luz === state.luz)
      && (!state.q || norm(p.nombre + ' ' + p.desc).includes(norm(state.q))));
    const sorters = {
      destacados: (a, b) => (b.destacado - a.destacado),
      menor: (a, b) => a.precio - b.precio,
      mayor: (a, b) => b.precio - a.precio,
      valorados: (a, b) => Ratings.summary(b).avg - Ratings.summary(a).avg,
      nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es')
    };
    return l.sort(sorters[state.orden]);
  }

  function render() {
    const l = filtered();
    grid.innerHTML = l.map(productCard).join('');
    count.textContent = `${l.length} producto${l.length === 1 ? '' : 's'}`;
    empty.hidden = l.length > 0;
    observeReveal(grid);
  }

  /* botones de categoría */
  $$('.chip[data-tipo]').forEach(c => {
    c.classList.toggle('active', c.dataset.tipo === state.tipo);
    c.addEventListener('click', () => {
      state.tipo = c.dataset.tipo;
      $$('.chip[data-tipo]').forEach(x => x.classList.toggle('active', x === c));
      render();
    });
  });
  $('#q').addEventListener('input', e => { state.q = e.target.value.trim(); render(); });
  $('#orden').addEventListener('change', e => { state.orden = e.target.value; render(); });
  $('#luz').addEventListener('change', e => { state.luz = e.target.value; render(); });
  $('#resetF').addEventListener('click', () => {
    Object.assign(state, { tipo: 'todos', q: '', luz: 'todas', orden: 'destacados' });
    $('#q').value = ''; $('#luz').value = 'todas'; $('#orden').value = 'destacados';
    $$('.chip[data-tipo]').forEach(x => x.classList.toggle('active', x.dataset.tipo === 'todos'));
    render();
  });

  /* ---------- Ventana de detalle con opiniones ---------- */
  function detail(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    let qty = 1;
    const body = Modal.open('', 'wide');
    const draw = () => {
      const r = Ratings.summary(p), revs = Ratings.list(p.id);
      body.innerHTML = `<div class="det">
        <div class="det-art">${productArt(p)}</div>
        <div class="det-info">
          <span class="badge solid">${TIPOS[p.tipo]}</span>
          <h2>${esc(p.nombre)}</h2>
          <div class="card-rate">${stars(r.avg)}<small>${r.avg.toFixed(1)} · ${r.n} valoraciones</small></div>
          <p class="det-price">${money(p.precio)}</p>
          <p>${esc(p.desc)}</p>
          <dl class="specs"><div><dt>Tamaño</dt><dd>${esc(p.tam)}</dd></div><div><dt>Luz</dt><dd>${esc(p.luz)}</dd></div><div><dt>Riego</dt><dd>${esc(p.riego)}</dd></div><div><dt>Existencias</dt><dd>${p.stock > 0 ? p.stock + ' piezas' : 'Agotado'}</dd></div></dl>
          <div class="det-buy"><div class="qty big"><button id="dq-" aria-label="Menos">${ICONS.minus}</button><span id="dq">${qty}</span><button id="dq+" aria-label="Más">${ICONS.plus}</button></div>
            <button class="btn btn-primary" id="dAdd" ${p.stock <= 0 ? 'disabled' : ''}>${ICONS.cart}<span>Agregar al carrito</span></button></div>
        </div></div>
        <section class="reviews"><h3>Opiniones de clientes</h3>
          <form id="rvForm" class="rv-form" novalidate>
            <div class="star-pick" role="radiogroup" aria-label="Calificación">${[1, 2, 3, 4, 5].map(i => `<button type="button" data-s="${i}" aria-label="${i} estrellas">★</button>`).join('')}</div>
            <input name="nombre" placeholder="Tu nombre" maxlength="30" required>
            <textarea name="txt" placeholder="Cuéntanos qué te pareció (opcional)" maxlength="200" rows="2"></textarea>
            <button class="btn btn-primary" type="submit">Publicar opinión</button><em class="err" id="rvErr"></em>
          </form>
          <ul class="rv-list">${revs.length ? revs.map(v => `<li><b>${esc(v.nombre)}</b> ${stars(v.stars)}<p>${esc(v.txt || 'Sin comentario.')}</p></li>`).join('') : '<li class="muted">Aún no hay opiniones nuevas. ¡Sé la primera persona en opinar!</li>'}</ul>
        </section>`;
      $('#dq-', body).onclick = () => { qty = Math.max(1, qty - 1); $('#dq', body).textContent = qty; };
      $('#dq\\+', body).onclick = () => { qty = Math.min(p.stock, qty + 1); $('#dq', body).textContent = qty; };
      $('#dAdd', body).onclick = () => Cart.add(p.id, qty);
      let pick = 0;
      $$('.star-pick button', body).forEach(b => b.addEventListener('click', () => {
        pick = +b.dataset.s; $$('.star-pick button', body).forEach(x => x.classList.toggle('on', +x.dataset.s <= pick));
      }));
      $('#rvForm', body).addEventListener('submit', e => {
        e.preventDefault(); const f = e.target, err = $('#rvErr', body);
        if (!pick) { err.textContent = 'Elige una calificación de 1 a 5 estrellas.'; return; }
        if (f.nombre.value.trim().length < 2) { err.textContent = 'Escribe tu nombre.'; return; }
        Ratings.add(p.id, { nombre: f.nombre.value.trim(), stars: pick, txt: f.txt.value.trim() });
        Toast.show('¡Gracias por tu opinión!'); draw(); render();
      });
    };
    draw();
  }

  document.addEventListener('click', e => {
    const d = e.target.closest('[data-detail]'); if (d) detail(d.dataset.detail);
  });

  render();
  if (params.get('producto')) detail(params.get('producto'));
})();
