/* Aneta Šindlářová – interakce webu. Obsah funguje i bez JavaScriptu. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Úvodní animace */
  var start = function () { requestAnimationFrame(function () { root.classList.add('is-loaded'); }); };
  if (reduce) { root.classList.add('is-loaded'); }
  else if (document.readyState === 'complete') { start(); }
  else {
    window.addEventListener('load', start, { once: true });
    setTimeout(start, 1200); /* pojistka při pomalém načítání obrázků */
  }

  /* Hlavička a mobilní menu */
  var header = document.querySelector('[data-header]');
  var burger = document.querySelector('[data-burger]');
  var nav = document.querySelector('[data-nav]');

  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.querySelector('.sr-only').textContent = open ? 'Zavřít menu' : 'Otevřít menu';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }
  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  var mobileCta = document.querySelector('[data-mobile-cta]');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('kontakt');
  var contactVisible = false;

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (mobileCta && hero) {
      var pastHero = y > hero.offsetTop + hero.offsetHeight * 0.6;
      mobileCta.classList.toggle('is-visible', pastHero && !contactVisible);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    if (contact) {
      new IntersectionObserver(function (entries) {
        contactVisible = entries[0].isIntersecting; onScroll();
      }, { threshold: 0.05 }).observe(contact);
    }

    /* Zvýraznění aktivní sekce v menu */
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__list a'));
    var map = {};
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) map[s.id] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }
  onScroll();

  /* Graf příběhu */
  var journey = document.querySelector('[data-journey]');
  if (journey) {
    if (reduce || !('IntersectionObserver' in window)) journey.classList.add('is-drawn');
    else {
      var jo = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { journey.classList.add('is-drawn'); jo.disconnect(); }
      }, { threshold: 0.35 });
      jo.observe(journey);
    }
  }

  /* Akordeon – v jedné skupině je otevřená jen jedna položka */
  document.querySelectorAll('[data-acc]').forEach(function (group) {
    var items = group.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  /* Reference – šipky */
  var track = document.querySelector('[data-refs-track]');
  var prev = document.querySelector('[data-refs-prev]');
  var next = document.querySelector('[data-refs-next]');
  if (track && prev && next) {
    var step = function (dir) {
      var card = track.querySelector('.ref');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      track.scrollBy({ left: dir * ((card ? card.offsetWidth : 300) + gap), behavior: reduce ? 'auto' : 'smooth' });
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Formulář */
  var form = document.querySelector('[data-form]');
  if (form) {
    form.noValidate = true;
    var status = form.querySelector('[data-form-status]');
    var say = function (msg, err) { status.textContent = msg; status.classList.toggle('is-error', !!err); };
    var validate = function () {
      var ok = true, first = null;
      form.querySelectorAll('[required]').forEach(function (el) {
        var valid = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
        var wrap = el.closest('.field') || el.closest('.consent');
        if (wrap) wrap.classList.toggle('is-invalid', !valid);
        el.setAttribute('aria-invalid', String(!valid));
        if (!valid) { ok = false; if (!first) first = el; }
      });
      if (first) first.focus();
      return ok;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { say('Doplňte prosím jméno, platný e-mail a souhlas se zpracováním údajů.', true); return; }
      if (form.action.indexOf('VAS_FORM_ID') !== -1) {
        say('Formulář zatím není napojený. Napište mi prosím e-mail nebo zavolejte.', true); return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; say('Odesílám…');
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say('Děkuji, zpráva je odeslaná. Ozvu se Vám co nejdřív.'); })
        .catch(function () { say('Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi napište e-mail.', true); })
        .then(function () { btn.disabled = false; });
    });
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.is-invalid');
      if (wrap) { wrap.classList.remove('is-invalid'); e.target.removeAttribute('aria-invalid'); }
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
