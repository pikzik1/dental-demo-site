(function () {
  var hdr = document.querySelector('.hdr');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  function onScroll() { hdr.classList.toggle('scrolled', window.scrollY > 8); }
  if (hdr) { window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // demo build: phone / e-mail buttons never dial or write to the real clinic, they show a notice instead
  var dlg = document.getElementById('demo-dialog');
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-demo]');
    if (!a) return;
    e.preventDefault();
    if (dlg && dlg.showModal) { if (!dlg.open) dlg.showModal(); }
    else window.alert(dlg ? dlg.textContent.trim() : 'DEMO');
  });
  if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  // catalog search (all cards are visible without JavaScript)
  var q = document.getElementById('q');
  if (q) {
    var cards = [].slice.call(document.querySelectorAll('.cat-card'));
    var count = document.getElementById('cat-count');
    var empty = document.getElementById('cat-empty');
    var norm = function (x) { return x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    var run = function () {
      var t = norm(q.value.trim()), n = 0;
      cards.forEach(function (c) { var ok = !t || norm(c.getAttribute('data-q')).indexOf(t) !== -1; c.hidden = !ok; if (ok) n++; });
      if (count) count.textContent = n + ' / ' + cards.length;
      if (empty) empty.hidden = n !== 0;
    };
    q.addEventListener('input', run);
  }
})();
