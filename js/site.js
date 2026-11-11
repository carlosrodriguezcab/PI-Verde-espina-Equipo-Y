/* Núcleo del sitio: encabezado y pie, transiciones, animaciones al hacer scroll,
   avisos (toast), ventanas (modal) y chat con respuestas programadas. */
(function () {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stars = (v, cls = '') => {
    const full = Math.round(v);
    return `<span class="stars ${cls}" aria-label="${v.toFixed(1)} de 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= full ? 'on' : ''}">★</i>`).join('')}</span>`;
  };

  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.7 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.8 2.100 1.200 1 2.200 1.400 2.500 1.500.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.200.1.800-.100 1.500z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.7.2-1 1.100-1H17V2h-2.700C11.200 2 10 3.800 10 6.200V8H8v3.500h2V22h4v-10.500h2.700L17 8z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h12v10H1zM13 10h5l4 3v3h-9"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-8-4.700-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 6.300-8 11-8 11z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.300-4.300"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
  };

  const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#DCEBDD"/><rect x="19" y="10" width="10" height="24" rx="5" fill="#2F5D46"/><path d="M19 22h-4v-6a3 3 0 0 1 6 0M29 19h4v-5a3 3 0 0 0-6 0" fill="none" stroke="#2F5D46" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 32h22l-3 11H16z" fill="#C8643B"/><rect x="12" y="29" width="24" height="5" rx="2" fill="#A94F2C"/><circle cx="24" cy="9" r="3" fill="#E58A5F"/></svg>`;

  const LINKS = [
    ['inicio', 'index.html', 'Inicio'], ['tienda', 'tienda.html', 'Tienda'], ['nosotros', 'nosotros.html', 'Nosotros'],
    ['ubicacion', 'ubicacion.html', 'Ubicación'], ['faq', 'faq.html', 'Preguntas'], ['contacto', 'contacto.html', 'Contacto']
  ];

  /* ---------- Encabezado y pie (salen en todas las páginas) ---------- */
  function mountChrome() {
    const page = document.body.dataset.page;
    const h = $('#site-header');
    if (h) {
      h.outerHTML = `<header class="header" id="header"><div class="wrap header-in">
        <a class="brand" href="index.html" aria-label="${esc(S.nombre)} - inicio"><span class="brand-logo">${LOGO}</span><span class="brand-name">${esc(S.nombre)}</span></a>
        <nav class="nav" id="nav" aria-label="Principal">${LINKS.map(l => `<a href="${l[1]}" class="${l[0] === page ? 'active' : ''}">${l[2]}</a>`).join('')}</nav>
        <div class="header-actions">
          <button class="icon-btn cart-btn" data-open-cart aria-label="Abrir carrito">${ICONS.cart}<span class="cart-count" hidden>0</span></button>
          <button class="icon-btn menu-btn" id="menuBtn" aria-label="Abrir menú" aria-expanded="false">${ICONS.menu}</button>
        </div></div></header>`;
    }
    const f = $('#site-footer');
    if (f) {
      f.outerHTML = `<footer class="footer"><div class="wrap footer-grid">
        <div><a class="brand light" href="index.html"><span class="brand-logo">${LOGO}</span><span class="brand-name">${esc(S.nombre)}</span></a>
          <p class="foot-text">${esc(S.eslogan)}.</p>
          <div class="social">
            <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.fb}</a>
            <a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
            <a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.wa}</a>
          </div></div>
        <div><h4>Explora</h4>${LINKS.map(l => `<a href="${l[1]}">${l[2]}</a>`).join('')}</div>
        <div><h4>Contacto</h4><p>${ICONS.pin}<span>${esc(S.direccion)}</span></p><p>${ICONS.clock}<span>${esc(S.horario)}</span></p><p>${ICONS.mail}<span>${esc(S.correo)}</span></p></div>
      </div><div class="foot-bottom"><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(S.nombre)} · Prototipo académico de Equipo Y</span></div></div></footer>`;
    }
    const mb = $('#menuBtn'), nav = $('#nav');
    if (mb) mb.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', open); mb.innerHTML = open ? ICONS.close : ICONS.menu;
    });
    const hd = $('#header');
    const onScroll = () => hd && hd.classList.toggle('scrolled', window.scrollY > 10);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Cortina verde al cambiar de página ---------- */
  function mountCurtain() {
    const c = document.createElement('div'); c.className = 'curtain opening';
    c.innerHTML = `<span class="curtain-logo">${LOGO}</span>`;
    document.body.appendChild(c);
    setTimeout(() => c.classList.remove('opening'), 700);
    window.addEventListener('pageshow', e => { if (e.persisted) c.classList.remove('leaving'); });
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault(); c.classList.add('leaving');
      setTimeout(() => { location.href = href; }, 420);
    });
  }

  /* ---------- Cosas que aparecen al hacer scroll ---------- */
  let io;
  function observeReveal(root = document) {
    const els = $$('[data-reveal]:not(.in)', root);
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
    io = io || new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .12 });
    els.forEach((e, i) => { e.style.setProperty('--d', (e.dataset.delay || (i % 4) * 80) + 'ms'); io.observe(e); });
  }

  /* ---------- Avisos (toast) y ventana emergente (modal) ---------- */
  const Toast = {
    show(msg, type = 'ok') {
      let box = $('#toasts'); if (!box) { box = document.createElement('div'); box.id = 'toasts'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
      const t = document.createElement('div'); t.className = 'toast ' + type; t.innerHTML = `<span class="t-ico">${ICONS.check}</span><span>${esc(msg)}</span>`;
      box.appendChild(t); requestAnimationFrame(() => t.classList.add('in'));
      setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 350); }, 2600);
    }
  };
  const Modal = {
    el: null,
    open(html, cls = '') {
      this.close(true);
      const o = document.createElement('div'); o.className = 'modal-overlay';
      o.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true"><button class="modal-x" aria-label="Cerrar">${ICONS.close}</button><div class="modal-body">${html}</div></div>`;
      document.body.appendChild(o); document.body.classList.add('noscroll');
      requestAnimationFrame(() => o.classList.add('in'));
      o.addEventListener('click', e => { if (e.target === o || e.target.closest('.modal-x')) Modal.close(); });
      this.el = o; return o.querySelector('.modal-body');
    },
    close(instant) {
      if (!this.el) return; const o = this.el; this.el = null;
      document.body.classList.remove('noscroll');
      if (instant) return o.remove();
      o.classList.remove('in'); setTimeout(() => o.remove(), 300);
    }
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') Modal.close(); });

  /* ---------- Tarjeta de producto (se usa en inicio y en tienda) ---------- */
  function productCard(p) {
    const r = window.Ratings.summary(p);
    const agotado = p.stock <= 0;
    return `<article class="card" data-reveal data-id="${p.id}">
      <button class="card-art" data-detail="${p.id}" aria-label="Ver detalle de ${esc(p.nombre)}">${window.productArt(p)}<span class="badge">${window.TIPOS[p.tipo]}</span>${p.stock > 0 && p.stock <= 6 ? '<span class="badge warn">Pocas piezas</span>' : ''}</button>
      <div class="card-body">
        <h3 class="card-title"><button data-detail="${p.id}">${esc(p.nombre)}</button></h3>
        <div class="card-rate">${stars(r.avg)}<small>${r.avg.toFixed(1)} (${r.n})</small></div>
        <div class="card-foot"><strong class="price">${money(p.precio)}</strong>
          <button class="btn btn-add" data-add="${p.id}" ${agotado ? 'disabled' : ''}>${ICONS.plus}<span>${agotado ? 'Agotado' : 'Agregar'}</span></button></div>
      </div></article>`;
  }

  /* ---------- Chat con respuestas programadas ----------
   TODO: abajo, en KB, cambien las respuestas por datos reales del negocio (precios, pagos, envíos).
   Cada línea tiene las palabras clave 'k' y la respuesta 'r'. Pueden agregar las que quieran. */
  const KB = [
    { k: ['hola', 'buenas', 'buenos', 'hey'], r: `¡Hola! 🌵 Soy el asistente de ${S.nombre}. Puedo ayudarte con precios, envíos, cuidados, horarios y pedidos.` },
    { k: ['envio', 'envío', 'entrega', 'domicilio', 'paqueteria'], r: `Hacemos entregas a domicilio. El envío cuesta ${money(S.envio.costo)} y es gratis desde ${money(S.envio.gratisDesde)} de compra.` },
    { k: ['precio', 'cuesta', 'costo', 'cuanto', 'cuánto'], r: 'Nuestras piezas van desde $40 en macetas pequeñas hasta $320 en kits de regalo. Mira todo en la tienda.' },
    { k: ['horario', 'abren', 'cierran', 'hora'], r: `Nuestro horario es: ${S.horario}.` },
    { k: ['donde', 'dónde', 'ubicacion', 'ubicación', 'direccion', 'dirección', 'mapa'], r: `Estamos en ${S.direccion}. En la página Ubicación encuentras el mapa.` },
    { k: ['riego', 'regar', 'agua', 'cuidado', 'cuidar'], r: 'Regla básica: riega solo cuando la tierra esté totalmente seca y dale mucha luz. Cada producto indica su frecuencia de riego en el detalle.' },
    { k: ['pago', 'pagar', 'tarjeta', 'efectivo', 'transferencia'], r: 'Por ahora el pedido se confirma por WhatsApp y el pago se acuerda ahí (efectivo o transferencia).' },
    { k: ['regalo', 'kit'], r: 'Los kits son ideales para regalar: incluyen 3 plantas con maceta y guía de cuidados. Están en la tienda, categoría Kits.' },
    { k: ['maceta', 'pintada'], r: 'Todas nuestras macetas están pintadas a mano, por eso cada una es ligeramente diferente.' },
    { k: ['whatsapp', 'humano', 'persona', 'asesor', 'contacto'], r: 'Con gusto te atendemos por WhatsApp. Usa el botón de abajo para abrir la conversación.' },
    { k: ['gracias', 'adios', 'adiós'], r: '¡Gracias a ti! Que tengas un día muy verde 🌱' }
  ];
  const CHIPS = ['Envíos', 'Horario', 'Cómo regar', 'Formas de pago', 'Hablar por WhatsApp'];
  function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function mountChat() {
    const w = document.createElement('div'); w.className = 'chat';
    w.innerHTML = `<button class="chat-fab" aria-label="Abrir chat">${ICONS.chat}<span class="fab-dot"></span></button>
      <section class="chat-panel" aria-label="Chat de ayuda" hidden>
        <header><span class="brand-logo sm">${LOGO}</span><div><b>Asistente ${esc(S.nombre)}</b><small>Responde al instante</small></div><button class="chat-x" aria-label="Cerrar chat">${ICONS.close}</button></header>
        <div class="chat-msgs" id="chatMsgs" aria-live="polite"></div>
        <div class="chat-chips">${CHIPS.map(c => `<button>${c}</button>`).join('')}</div>
        <form class="chat-form"><input type="text" placeholder="Escribe tu pregunta…" aria-label="Mensaje" autocomplete="off" maxlength="200"><button aria-label="Enviar">${ICONS.send}</button></form>
      </section>`;
    document.body.appendChild(w);
    const fab = $('.chat-fab', w), panel = $('.chat-panel', w), msgs = $('#chatMsgs', w), form = $('.chat-form', w), input = $('input', form);
    let started = false;
    const add = (txt, who, html) => {
      const m = document.createElement('div'); m.className = 'msg ' + who;
      if (html) m.innerHTML = txt; else m.textContent = txt;
      msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight; return m;
    };
    const toggle = open => {
      if (open) { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('in')); fab.classList.add('open'); input.focus();
        if (!started) { started = true; add(`¡Hola! 🌵 Soy el asistente de ${S.nombre}. ¿En qué te puedo ayudar?`, 'bot'); } }
      else { panel.classList.remove('in'); fab.classList.remove('open'); setTimeout(() => panel.hidden = true, 250); }
    };
    fab.addEventListener('click', () => toggle(panel.hidden));
    $('.chat-x', w).addEventListener('click', () => toggle(false));
    function answer(q) {
      const n = norm(q);
      const hit = KB.find(i => i.k.some(k => n.includes(norm(k))));
      const typing = add('<span class="dots"><i></i><i></i><i></i></span>', 'bot', true);
      setTimeout(() => {
        typing.remove();
        const txt = hit ? hit.r : 'No estoy seguro de esa pregunta, pero con gusto te ayudan por WhatsApp.';
        const m = add(txt, 'bot');
        if (!hit || /whatsapp/i.test(n) || /humano|asesor|persona/.test(n)) {
          m.insertAdjacentHTML('beforeend', `<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${S.whatsapp}?text=${encodeURIComponent('Hola, tengo una pregunta sobre ' + S.nombre)}">${ICONS.wa}<span>Abrir WhatsApp</span></a>`);
          msgs.scrollTop = msgs.scrollHeight;
        }
      }, 650);
    }
    const send = q => { q = q.trim(); if (!q) return; add(q, 'me'); answer(q); };
    form.addEventListener('submit', e => { e.preventDefault(); send(input.value); input.value = ''; });
    $$('.chat-chips button', w).forEach(b => b.addEventListener('click', () => send(b.textContent)));
  }

  Object.assign(window, { $, $$, money, esc, stars, ICONS, LOGO, Toast, Modal, observeReveal, productCard });

  document.addEventListener('DOMContentLoaded', () => {
    mountChrome(); mountCurtain(); mountChat(); observeReveal();
  });
})();
