/* Página de inicio: slider, destacados, video y testimonios.
   Los textos y fotos se cambian en config.js, aquí no hay que tocar nada. */
(function () {
  const S = window.SITE;

  /* ---------- Slider (avanza solo, con flechas, puntos y swipe en celular) ---------- */
  const track = $('#slides'), dots = $('#dots'), bar = $('#sbar');
  const DUR = 5500;
  track.innerHTML = S.slides.map((s, i) => {
    const p = PRODUCTS.find(x => x.id === s.producto);
    const art = S.usarFotos ? `<img src="${s.foto}" alt="${esc(s.titulo)}">` : ART.product(p);
    return `<div class="slide ${i === 0 ? 'active' : ''}" aria-hidden="${i !== 0}">
      <div class="slide-text"><span class="eyebrow">${esc(S.nombre)}</span><h1>${esc(s.titulo)}</h1><p>${esc(s.texto)}</p>
        <a class="btn btn-primary" href="${s.href}"><span>${esc(s.cta)}</span>${ICONS.arrow}</a></div>
      <div class="slide-art">${art}</div></div>`;
  }).join('');
  dots.innerHTML = S.slides.map((_, i) => `<button aria-label="Ir a la diapositiva ${i + 1}" class="${i === 0 ? 'on' : ''}"></button>`).join('');

  $('#prev').innerHTML = ICONS.left; $('#next').innerHTML = ICONS.right;
  const slides = $$('.slide', track), dbtn = $$('button', dots);
  let cur = 0, timer = null, paused = false, t0 = 0, raf = 0;

  function go(n) {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => { s.classList.toggle('active', i === cur); s.setAttribute('aria-hidden', i !== cur); });
    dbtn.forEach((d, i) => d.classList.toggle('on', i === cur));
    restart();
  }
  function tick(ts) {
    if (!t0) t0 = ts;
    if (!paused) {
      const pct = Math.min(1, (ts - t0) / DUR); bar.style.width = pct * 100 + '%';
      if (pct >= 1) return go(cur + 1);
    } else t0 = ts - (parseFloat(bar.style.width) || 0) / 100 * DUR;
    raf = requestAnimationFrame(tick);
  }
  function restart() { cancelAnimationFrame(raf); t0 = 0; bar.style.width = '0'; if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick); }

  $('#prev').addEventListener('click', () => go(cur - 1));
  $('#next').addEventListener('click', () => go(cur + 1));
  dbtn.forEach((d, i) => d.addEventListener('click', () => go(i)));
  const hero = $('#hero');
  hero.addEventListener('mouseenter', () => paused = true);
  hero.addEventListener('mouseleave', () => paused = false);
  hero.addEventListener('focusin', () => paused = true);
  hero.addEventListener('focusout', () => paused = false);
  let sx = null;
  hero.addEventListener('touchstart', e => { sx = e.touches[0].clientX; paused = true; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (sx !== null) { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1)); }
    sx = null; paused = false;
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,select')) return;
    if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1);
  });
  restart();

  /* ---------- Productos destacados (los marcados con d:1 en products.js) ---------- */
  $('#featured').innerHTML = PRODUCTS.filter(p => p.destacado).slice(0, 8).map(productCard).join('');

  /* ---------- Video de YouTube: sale cuando pongan el ID en config.js, si no, un aviso ---------- */
  const vb = $('#videoBox');
  if (S.videoYoutubeId) {
    vb.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(S.videoYoutubeId)}" title="Video de ${esc(S.nombre)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    vb.innerHTML = `<div class="video-ph"><div class="play">${ICONS.arrow}</div><b>Aquí va el video de YouTube</b><small>Pega el ID del video en <code>js/config.js</code> (videoYoutubeId).</small></div>`;
  }

  /* ---------- Testimonios (salen de config.js) ---------- */
  $('#testi').innerHTML = S.testimonios.map(t => `<figure class="testi" data-reveal><div>${stars(t.estrellas)}</div><blockquote>“${esc(t.texto)}”</blockquote><figcaption>${esc(t.nombre)}</figcaption></figure>`).join('');

  /* ---------- Números que suben al llegar a la sección de cifras ---------- */
  const nums = $$('[data-count]');
  const co = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; co.unobserve(en.target);
    const end = +en.target.dataset.count, t = performance.now();
    (function step(n) { const k = Math.min(1, (n - t) / 1200); en.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t);
  }), { threshold: .5 });
  nums.forEach(n => co.observe(n));

  observeReveal();
})();
