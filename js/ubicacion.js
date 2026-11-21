/* Página de ubicación: mete el mapa de Google y los datos del negocio.
   Todo sale de config.js, menos las zonas de entrega. */
(function () {
  const S = window.SITE;
  $('#mapBox').innerHTML = `<iframe title="Mapa de ${esc(S.nombre)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(S.mapa)}&output=embed"></iframe>`;
  $('.info-list').innerHTML = `
    <div class="info" data-reveal>${ICONS.pin}<div><b>Dirección</b><p>${esc(S.direccion)}</p></div></div>
    <div class="info" data-reveal>${ICONS.clock}<div><b>Horario</b><p>${esc(S.horario)}</p></div></div>
    <div class="info" data-reveal>${ICONS.wa}<div><b>WhatsApp</b><p><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">Escríbenos aquí</a></p></div></div>
    <div class="info" data-reveal>${ICONS.truck}<div><b>Zonas de entrega</b><div class="zones"><span>Zapopan</span><span>Guadalajara</span><span>Tlaquepaque</span><span>Tonalá</span><span>Tlajomulco</span></div></div></div>`;
  observeReveal();
})();
