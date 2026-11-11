/* Formulario de contacto: valida los campos y muestra la animación al enviar.
   Es de mentiras, no manda correo porque no hay servidor. No hay que tocarlo. */
(function () {
  const S = window.SITE;
  $('#cInfo').innerHTML = `
    <div class="info">${ICONS.mail}<div><b>Correo</b><p>${esc(S.correo)}</p></div></div>
    <div class="info">${ICONS.wa}<div><b>WhatsApp</b><p><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">Abrir conversación</a></p></div></div>
    <div class="info">${ICONS.clock}<div><b>Horario</b><p>${esc(S.horario)}</p></div></div>
    <div class="info"><div><b>Síguenos</b><div class="social dark">
      <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.fb}</a>
      <a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
      <a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.wa}</a></div></div></div>`;

  const f = $('#cForm');
  const rules = {
    nombre: v => v.trim().length >= 3 || 'Escribe tu nombre (mínimo 3 letras)',
    correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Escribe un correo válido',
    msg: v => v.trim().length >= 10 || 'El mensaje debe tener al menos 10 caracteres'
  };
  Object.keys(rules).forEach(k => f.elements[k].addEventListener('input', () => check(k)));
  function check(k) {
    const el = f.elements[k], r = rules[k](el.value);
    el.parentElement.querySelector('.err').textContent = r === true ? '' : r;
    el.classList.toggle('bad', r !== true); return r === true;
  }
  f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); return; }
    const btn = $('button[type=submit]', f); btn.disabled = true; btn.innerHTML = '<span class="spin"></span> Enviando…';
    setTimeout(() => {
      $('#formCard').innerHTML = `<div class="success"><div class="check-big"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M14 27l8 8 16-17" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h2>¡Mensaje enviado!</h2><p class="muted" style="margin:.6rem 0 1.2rem">Gracias por escribirnos. Te responderemos pronto.</p><a class="btn btn-primary" href="tienda.html">Seguir en la tienda</a></div>`;
    }, 1200);
  });
})();
