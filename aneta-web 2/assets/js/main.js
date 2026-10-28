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
    var wide = window.matchMedia('(min-width: 1100px)');
    var onWide = function (m) { if (m.matches) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
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
    /* Vnořené cíle (Můj příběh uvnitř O mně): vyhrává poslední viditelný v pořadí dokumentu. */
    var targets = Object.keys(map).map(function (id) { return document.getElementById(id); });
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var active = null;
      targets.forEach(function (t) { if (visible[t.id]) active = t.id; });
      links.forEach(function (l) { l.removeAttribute('aria-current'); });
      if (active) map[active].setAttribute('aria-current', 'true');
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
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

  /* Proměna na fotkách – přepínání zepředu / z boku */
  var gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    var vbtns = gallery.querySelectorAll('[data-view-btn]');
    vbtns.forEach(function (b) {
      b.addEventListener('click', function () {
        gallery.setAttribute('data-view', b.getAttribute('data-view-btn'));
        vbtns.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      });
    });
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

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
