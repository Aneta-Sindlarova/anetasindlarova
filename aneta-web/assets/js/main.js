/* Aneta Šindlářová – drobné interakce. Stránka funguje i bez JavaScriptu. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobilní menu */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  function closeNav() {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); toggle.focus(); }
    });
  }

  /* Linka pod hlavičkou po odrolování */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Vykreslení linky příběhu – jediná animace na stránce */
  var journey = document.querySelector('[data-journey]');
  if (journey) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      journey.classList.add('is-drawn');
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { journey.classList.add('is-drawn'); io.disconnect(); }
        });
      }, { threshold: 0.35 });
      io.observe(journey);
    }
  }

  /* Reference – posun šipkami */
  var track = document.querySelector('[data-ref-track]');
  if (track) {
    var step = function (dir) {
      var card = track.querySelector('.ref-card');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      var amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    var prev = document.querySelector('[data-ref-prev]');
    var next = document.querySelector('[data-ref-next]');
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
  }

  /* Kontaktní formulář (Formspree) */
  var form = document.querySelector('[data-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      if (form.action.indexOf('VAS_FORM_ID') !== -1) {
        e.preventDefault();
        status.textContent = 'Formulář zatím není napojený. Napište mi prosím e-mail nebo zavolejte.';
        status.classList.add('is-error');
        return;
      }
      if (!window.fetch) return;
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.classList.remove('is-error');
      status.textContent = 'Odesílám…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('send failed');
          form.reset();
          status.textContent = 'Děkuji, zpráva je odeslaná. Ozvu se Vám co nejdřív.';
        })
        .catch(function () {
          status.textContent = 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi napište e-mail.';
          status.classList.add('is-error');
        })
        .then(function () { btn.disabled = false; });
    });
  }

  /* Aktuální rok v patičce */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
