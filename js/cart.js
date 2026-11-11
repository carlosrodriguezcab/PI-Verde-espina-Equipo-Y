/* Carrito de compras. Se guarda en el navegador (localStorage) y el pago es de mentiritas:
   el pedido se manda por WhatsApp porque no hay servidor ni cobro real.
   Aquí no hay que tocar nada; precios y envío se cambian en config.js y products.js. */
(function () {
  const S = window.SITE, KEY = 'vs_cart';
  const byId = id => window.PRODUCTS.find(p => p.id === id);

  const Cart = {
    items: {},
    load() { try { this.items = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { this.items = {}; } },
    save() { try { localStorage.setItem(KEY, JSON.stringify(this.items)); } catch (e) { /* si no deja guardar, el carrito dura mientras la página esté abierta */ } },
    count() { return Object.values(this.items).reduce((a, b) => a + b, 0); },
    subtotal() { return Object.entries(this.items).reduce((s, [id, q]) => s + (byId(id) ? byId(id).precio * q : 0), 0); },
    envio() { const s = this.subtotal(); return s === 0 || s >= S.envio.gratisDesde ? 0 : S.envio.costo; },
    add(id, qty = 1) {
      const p = byId(id); if (!p || p.stock <= 0) return;
      const cur = this.items[id] || 0;
      if (cur + qty > p.stock) { Toast.show(`Solo hay ${p.stock} pieza(s) de “${p.nombre}”`, 'warn'); return; }
      this.items[id] = cur + qty; this.save(); this.refresh(true);
      Toast.show(`“${p.nombre}” agregado al carrito`);
    },
    setQty(id, q) {
      const p = byId(id); if (!p) return;
      if (q <= 0) delete this.items[id];
      else if (q > p.stock) { Toast.show(`Solo hay ${p.stock} pieza(s) disponibles`, 'warn'); return; }
      else this.items[id] = q;
      this.save(); this.refresh();
    },
    clear() { this.items = {}; this.save(); this.refresh(); },

    /* ---- interfaz del carrito ---- */
    view: 'list',
    mount() {
      const d = document.createElement('div');
      d.innerHTML = `<div class="drawer-shade" id="drawerShade"></div>
        <aside class="drawer" id="drawer" aria-label="Carrito de compras" aria-hidden="true">
          <header><h2>Tu carrito</h2><button class="icon-btn" id="drawerX" aria-label="Cerrar carrito">${ICONS.close}</button></header>
          <div class="drawer-body" id="drawerBody"></div>
        </aside>`;
      document.body.append(...d.children);
      $('#drawerShade').addEventListener('click', () => this.close());
      $('#drawerX').addEventListener('click', () => this.close());
      document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
      document.addEventListener('click', e => {
        const open = e.target.closest('[data-open-cart]'); if (open) { this.view = 'list'; this.open(); return; }
        const add = e.target.closest('[data-add]');
        if (add && !add.disabled) {
          this.add(add.dataset.add, +(add.dataset.qty || 1));
          add.classList.add('pop'); setTimeout(() => add.classList.remove('pop'), 400);
        }
      });
      this.refresh();
    },
    open() { $('#drawer').classList.add('open'); $('#drawerShade').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); document.body.classList.add('noscroll'); this.render(); },
    close() { const d = $('#drawer'); if (!d) return; d.classList.remove('open'); $('#drawerShade').classList.remove('open'); d.setAttribute('aria-hidden', 'true'); document.body.classList.remove('noscroll'); },
    refresh(bump) {
      const n = this.count();
      $$('.cart-count').forEach(c => { c.textContent = n; c.hidden = n === 0; if (bump) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); } });
      if ($('#drawer') && $('#drawer').classList.contains('open')) this.render();
    },
    render() {
      const body = $('#drawerBody'); if (!body) return;
      if (this.view === 'checkout') return this.renderCheckout(body);
      if (this.view === 'done') return;
      const ids = Object.keys(this.items).filter(id => byId(id));
      if (!ids.length) {
        body.innerHTML = `<div class="empty"><div class="empty-art">${ART.product(byId('s01'))}</div><h3>Tu carrito está vacío</h3><p>Agrega alguna planta o maceta para comenzar.</p><a class="btn btn-primary" href="tienda.html">Ir a la tienda</a></div>`;
        return;
      }
      const sub = this.subtotal(), falta = Math.max(0, S.envio.gratisDesde - sub), pct = Math.min(100, sub / S.envio.gratisDesde * 100);
      body.innerHTML = `<div class="ship"><p>${falta > 0 ? `Te faltan <b>${money(falta)}</b> para envío gratis` : '¡Tienes <b>envío gratis</b>! 🎉'}</p><div class="bar"><i style="width:${pct}%"></i></div></div>
        <ul class="lines">${ids.map(id => { const p = byId(id), q = this.items[id]; return `<li>
          <div class="l-art">${window.productArt(p)}</div>
          <div class="l-info"><b>${esc(p.nombre)}</b><small>${money(p.precio)} c/u</small>
            <div class="qty"><button data-q="${id}" data-d="-1" aria-label="Quitar uno">${ICONS.minus}</button><span>${q}</span><button data-q="${id}" data-d="1" aria-label="Agregar uno">${ICONS.plus}</button></div></div>
          <div class="l-end"><strong>${money(p.precio * q)}</strong><button class="link-del" data-del="${id}">Quitar</button></div></li>`; }).join('')}</ul>
        <div class="totals"><div><span>Subtotal</span><span>${money(sub)}</span></div><div><span>Envío</span><span>${this.envio() ? money(this.envio()) : 'Gratis'}</span></div><div class="grand"><span>Total</span><span>${money(sub + this.envio())}</span></div></div>
        <button class="btn btn-primary btn-block" id="goCheckout">Continuar con el pedido</button>
        <button class="btn btn-ghost btn-block" id="clearCart">Vaciar carrito</button>`;
      $$('[data-q]', body).forEach(b => b.addEventListener('click', () => this.setQty(b.dataset.q, (this.items[b.dataset.q] || 0) + +b.dataset.d)));
      $$('[data-del]', body).forEach(b => b.addEventListener('click', () => this.setQty(b.dataset.del, 0)));
      $('#goCheckout', body).addEventListener('click', () => { this.view = 'checkout'; this.render(); });
      $('#clearCart', body).addEventListener('click', () => this.clear());
    },
    renderCheckout(body) {
      const total = this.subtotal() + this.envio();
      body.innerHTML = `<button class="link-back" id="backCart">${ICONS.left} Volver al carrito</button>
        <h3>Datos de entrega</h3>
        <p class="muted">Este es un pedido de demostración: no se cobra nada. Al final podrás enviarlo por WhatsApp.</p>
        <form id="coForm" novalidate>
          <label>Nombre<input name="nombre" required minlength="3" autocomplete="name"><em class="err"></em></label>
          <label>Teléfono (10 dígitos)<input name="tel" required inputmode="numeric" maxlength="10" autocomplete="tel"><em class="err"></em></label>
          <label>Dirección o colonia<input name="dir" required minlength="5" autocomplete="street-address"><em class="err"></em></label>
          <label>Forma de pago<select name="pago"><option>Efectivo al recibir</option><option>Transferencia</option></select></label>
          <div class="totals"><div class="grand"><span>Total a pagar</span><span>${money(total)}</span></div></div>
          <button class="btn btn-primary btn-block" type="submit">Confirmar pedido</button>
        </form>`;
      $('#backCart', body).addEventListener('click', () => { this.view = 'list'; this.render(); });
      const f = $('#coForm', body);
      const rules = {
        nombre: v => v.trim().length >= 3 || 'Escribe tu nombre completo',
        tel: v => /^\d{10}$/.test(v) || 'Deben ser 10 dígitos',
        dir: v => v.trim().length >= 5 || 'Escribe tu dirección o colonia'
      };
      f.addEventListener('submit', e => {
        e.preventDefault(); let ok = true;
        Object.keys(rules).forEach(k => {
          const el = f.elements[k], r = rules[k](el.value), err = el.parentElement.querySelector('.err');
          err.textContent = r === true ? '' : r; el.classList.toggle('bad', r !== true); if (r !== true) ok = false;
        });
        if (!ok) { f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); return; }
        const data = Object.fromEntries(new FormData(f));
        const btn = $('button[type=submit]', f); btn.disabled = true; btn.innerHTML = '<span class="spin"></span> Procesando…';
        setTimeout(() => this.done(data, total), 1400);
      });
    },
    done(data, total) {
      const folio = 'VE-' + Date.now().toString(36).toUpperCase().slice(-6);
      const lines = Object.entries(this.items).filter(([id]) => byId(id)).map(([id, q]) => `• ${q} x ${byId(id).nombre} (${money(byId(id).precio * q)})`);
      const msg = `Hola, quiero confirmar mi pedido ${folio}:\n${lines.join('\n')}\nTotal: ${money(total)}\nNombre: ${data.nombre}\nTel: ${data.tel}\nDirección: ${data.dir}\nPago: ${data.pago}`;
      this.view = 'done';
      $('#drawerBody').innerHTML = `<div class="done"><div class="check-big"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M14 27l8 8 16-17" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h3>¡Pedido registrado!</h3><p>Tu folio es <b>${folio}</b>. Envíalo por WhatsApp para coordinar la entrega.</p>
        <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}">${ICONS.wa}<span>Enviar pedido por WhatsApp</span></a>
        <button class="btn btn-ghost btn-block" id="doneClose">Seguir comprando</button></div>`;
      this.clear();
      $('#doneClose').addEventListener('click', () => { this.view = 'list'; this.close(); });
    }
  };

  Cart.load();
  window.Cart = Cart;
  document.addEventListener('DOMContentLoaded', () => Cart.mount());
})();
