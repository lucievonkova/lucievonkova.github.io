// Navigace, postupné zobrazování fotek, filtr sérií a prohlížení fotek
(function () {
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');
  if (nav && hero) {
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > hero.offsetHeight - 80); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -40px 0px' });
    tiles.forEach(function (t) { io.observe(t); });
  } else {
    tiles.forEach(function (t) { t.classList.add('in'); });
  }

  var buttons = document.querySelectorAll('.series-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var s = btn.getAttribute('data-serie');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      tiles.forEach(function (t) { t.hidden = s !== '' && t.getAttribute('data-serie') !== s; });
    });
  });
  if (buttons.length) buttons[0].click();

  // Řádky stejné výšky přes celou šířku (jako na výstavní stěně)
  var grid = document.querySelector('.grid');
  function ratio(t) {
    var r = parseFloat(t.getAttribute('data-ratio'));
    if (r > 0) return r;
    var im = t.querySelector('img');
    return (im && im.naturalWidth) ? im.naturalWidth / im.naturalHeight : 1;
  }
  function justify() {
    if (!grid) return;
    var vis = tiles.filter(function (t) { return !t.hidden && grid.contains(t); });
    var W = grid.clientWidth - 1;
    if (window.innerWidth < 700) { vis.forEach(function (t) { t.style.width = ''; t.style.height = ''; }); return; }
    var gap = parseFloat(getComputedStyle(grid).columnGap) || 14;
    var target = Math.max(240, Math.min(400, W * 0.3));
    var row = [], sum = 0;
    function place(h) { row.forEach(function (t) { t.style.height = h + 'px'; t.style.width = (ratio(t) * h) + 'px'; }); row = []; sum = 0; }
    vis.forEach(function (t) {
      row.push(t); sum += ratio(t);
      if (sum * target + gap * (row.length - 1) >= W) place((W - gap * (row.length - 1)) / sum);
    });
    if (row.length) place(target);
  }
  justify();
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(justify, 120); });
  buttons.forEach(function (b) { b.addEventListener('click', justify); });
  tiles.forEach(function (t) { if (!t.getAttribute('data-ratio')) { var im = t.querySelector('img'); if (im) im.addEventListener('load', justify); } });

  var box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('.lb-img');
  var cap = box.querySelector('.lb-cap');
  var list = [], cur = 0;
  function show(i) {
    cur = (i + list.length) % list.length;
    var t = list[cur];
    img.src = t.getAttribute('data-src');
    img.alt = t.getAttribute('data-caption');
    cap.textContent = (cur + 1) + ' / ' + list.length + '   ·   ' + t.getAttribute('data-caption');
  }
  tiles.forEach(function (t) {
    t.addEventListener('click', function () {
      list = tiles.filter(function (x) { return !x.hidden; });
      show(list.indexOf(t));
      box.showModal();
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    });
  });
  box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
  box.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.open) return;
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();

// Listování básněmi klávesnicí a přejetím prstem
(function () {
  function link(rel) {
    var all = document.querySelectorAll('a[rel="' + rel + '"]');
    for (var i = 0; i < all.length; i++) { if (all[i].offsetParent !== null) return all[i]; }
    return null;
  }
  document.addEventListener('keydown', function (e) {
    var box = document.querySelector('.lightbox');
    if (box && box.open) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var a = e.key === 'ArrowLeft' ? link('prev') : e.key === 'ArrowRight' ? link('next') : null;
    if (a) { e.preventDefault(); a.click(); }
  });
  var x0 = null, y0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    var box = document.querySelector('.lightbox');
    if (box && box.open) { box.querySelector(dx < 0 ? '.lb-next' : '.lb-prev').click(); return; }
    var a = link(dx < 0 ? 'next' : 'prev');
    if (a) a.click();
  }, { passive: true });
})();
