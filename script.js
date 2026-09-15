// ===== 3G Sport — interactions =====
(function () {
  'use strict';

  // Sticky header
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.card, .cat-card, .ach-card, .section-head, .despre-text, .despre-quote, .contact-form, .contact-info');
  var forceReveal = /[?&]reveal=1/.test(location.search) || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (forceReveal) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Contact form (demo handler)
function handleSubmit(e) {
  e.preventDefault();
  var note = document.getElementById('formNote');
  if (note) note.hidden = false;
  e.target.querySelector('button[type="submit"]').textContent = 'Trimis ✓';
  return false;
}
