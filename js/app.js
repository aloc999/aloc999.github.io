/* aloc999 // Hashemi Rafsanjani — portfolio behaviour. Vanilla JS, no deps. */
(function () {
  'use strict';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var IMPACT = [
    { place: '5Y', rank: 'gold-solo', name: 'Banking SOC — 24/7 Security Operations', badges: ['~50 alerts / shift', 'Splunk + Sentinel + Defender'], url: 'https://github.com/aloc999/DetectionEngineeringPortfolio', w: 100 },
    { place: '2X', rank: 'gold', name: 'Bug Bounty — Intigriti + Bugcrowd', badges: ['Web / API pentest', 'PoC + remediation'], url: 'https://github.com/aloc999/Bug-Hunting-Methodology', w: 88 },
    { place: '5X', rank: 'gold', name: 'Security Tools Shipped', badges: ['redgun · Xploit47', 'ZER0CODE · CODA · CavalryHive'], url: 'https://github.com/aloc999/redgun', w: 80 },
    { place: '147', rank: 'silver', name: 'Pentest Skills Codified — ExploitNinja', badges: ['bounty · web3 · mobile', 'cloud · OSINT · AI/LLM'], url: 'https://github.com/aloc999/ExploitNinja', w: 72 },
    { place: '36', rank: 'bronze', name: 'Vuln Classes Documented', badges: ['payloads + bypasses', 'severity + impact'], url: 'https://github.com/aloc999/Bug-Hunting-Methodology', w: 58 },
    { place: '<30', rank: 'medal', name: 'Sub-30-min Regression Gate — QARonin', badges: ['Playwright · Selenium', '4-shard GHA + GitLab'], url: 'https://github.com/aloc999/QARonin', w: 44 }
  ];
  var MEDALS = { 'gold-solo': '🛡️', gold: '🎯', silver: '🥷', bronze: '📖', medal: '⚡' };

  var STACK = ['Sigma', 'KQL', 'SPL', 'YARA-L', 'MITRE ATT&CK', 'SOAR Playbooks', 'pytest + CI'];

  // All public repos mapped to categories. cat: offensive | defensive | engineering. featured flag for filter.
  var EVENTS = [
    { name: 'Bug-Hunting-Methodology', url: 'https://github.com/aloc999/Bug-Hunting-Methodology', year: 'offensive', count: 36, place: 'gold', lang: 'Methodology', feat: 1, desc: '36 vuln classes' },
    { name: 'PENTESTING-TECHNIQUES', url: 'https://github.com/aloc999/PENTESTING-TECHNIQUES', year: 'offensive', place: 'gold', lang: 'Methodology', feat: 1, desc: 'web · network · AD · cloud' },
    { name: 'ExploitNinja', url: 'https://github.com/aloc999/ExploitNinja', year: 'offensive', count: 147, place: 'gold', lang: 'JavaScript', feat: 1, desc: '147 pentest skills' },
    { name: 'redgun', url: 'https://github.com/aloc999/redgun', year: 'offensive', place: 'gold', lang: 'JavaScript', feat: 1, desc: '~120 modules' },
    { name: 'Xploit47', url: 'https://github.com/aloc999/Xploit47', year: 'offensive', place: 'gold', lang: 'TypeScript', feat: 1, desc: 'Beam Search + MCTS' },
    { name: 'ZER0CODE', url: 'https://github.com/aloc999/ZER0CODE', year: 'offensive', lang: 'Python', feat: 1, desc: 'red-team agent' },
    { name: 'CODA', url: 'https://github.com/aloc999/CODA', year: 'offensive', lang: 'Shell', feat: 1, desc: '26 audit tools' },
    { name: 'CavalryHive', url: 'https://github.com/aloc999/CavalryHive', year: 'offensive', lang: 'Python', feat: 1, desc: 'autonomous assessment' },
    { name: 'DetectionEngineeringPortfolio', url: 'https://github.com/aloc999/DetectionEngineeringPortfolio', year: 'defensive', place: 'silver', lang: 'Python', feat: 1, desc: 'Sigma/KQL/SPL/YARA' },
    { name: 'DevSecOpsPortfolio', url: 'https://github.com/aloc999/DevSecOpsPortfolio', year: 'defensive', lang: 'HCL', feat: 1, desc: 'Jenkins · IaC · SCA' },
    { name: 'QARonin', url: 'https://github.com/aloc999/QARonin', year: 'engineering', lang: 'Python', feat: 1, desc: 'SDET monorepo' },
    { name: 'ticketmind', url: 'https://github.com/aloc999/ticketmind', year: 'engineering', lang: 'TypeScript', feat: 1, desc: 'AI support desk SaaS' },
    { name: 'snaplink', url: 'https://github.com/aloc999/snaplink', year: 'engineering', lang: 'TypeScript', desc: 'URL shortener + analytics' },
    { name: 'invoicely', url: 'https://github.com/aloc999/invoicely', year: 'engineering', lang: 'TypeScript', desc: 'multi-tenant invoicing' },
    { name: 'orangehrm-ui-automation-playwright', url: 'https://github.com/aloc999/orangehrm-ui-automation-playwright', year: 'engineering', lang: 'TypeScript', desc: 'Playwright + BDD' },
    { name: 'stripe-testmode-api-automation', url: 'https://github.com/aloc999/stripe-testmode-api-automation', year: 'engineering', lang: 'Python', desc: 'pytest API' },
    { name: 'vatcomply-api-automation-pytest', url: 'https://github.com/aloc999/vatcomply-api-automation-pytest', year: 'engineering', lang: 'Python', desc: 'pytest API' },
    { name: 'framepipe', url: 'https://github.com/aloc999/framepipe', year: 'engineering', lang: 'C++', desc: '5000+ FPS pipeline' },
    { name: 'streamforge', url: 'https://github.com/aloc999/streamforge', year: 'engineering', lang: 'Python', desc: 'RTSP manager' },
    { name: 'picam-edge', url: 'https://github.com/aloc999/picam-edge', year: 'engineering', lang: 'C', desc: 'Pi video appliance' },
    { name: 'v4l2-virtual-cam', url: 'https://github.com/aloc999/v4l2-virtual-cam', year: 'engineering', lang: 'C', desc: 'V4L2 driver' },
    { name: 'poescope', url: 'https://github.com/aloc999/poescope', year: 'engineering', lang: 'Python', desc: 'LLDP/CDP + SNMP' },
    { name: 'visionflow', url: 'https://github.com/aloc999/visionflow', year: 'engineering', lang: 'Python', desc: 'YOLO/PyTorch' },
    { name: 'aloc999.github.io', url: 'https://github.com/aloc999/aloc999.github.io', year: 'engineering', lang: 'HTML', desc: 'live CV site' }
  ];
  var PLACE_ICON = { gold: '●', 'gold-solo': '●', silver: '●', bronze: '●', medal: '●' };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function buildTicker() {
    var track = $('#ticker-track');
    if (!track) return;
    var frags = [
      'SOC + BOUNTY NODE // @aloc999',
      'BANKING SOC <b>5Y</b>', 'ALERTS <b>50/SHIFT</b>', 'CERTS <b>20+</b>',
      'TOOLS <b>5</b>', 'SKILLS <b>147</b>', 'REPOS <b>25</b>',
      'FOCUS: SOC / BOUNTY / OSINT / AI', 'INTIGRITI // BUGCROWD',
      'SECURITY_FIRST · INTELLIGENCE_LED · CONTINUOUS_IMPROVEMENT'
    ];
    var line = frags.join('  <span style="color:var(--dim)">///</span>  ');
    track.innerHTML = '<span>' + line + '</span>&nbsp;&nbsp;&nbsp;<span>' + line + '</span>&nbsp;&nbsp;&nbsp;';
  }

  function animateCount(node) {
    var target = parseInt(node.getAttribute('data-count'), 10) || 0;
    var suffix = node.getAttribute('data-suffix') || '';
    if (REDUCED) { node.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(eased * target) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var nums = document.querySelectorAll('.stat__num[data-count]');
    if (!('IntersectionObserver' in window)) { nums.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function renderTrophies() {
    var grid = $('#trophy-grid');
    if (!grid) return;
    IMPACT.forEach(function (t) {
      var rankClass = t.rank === 'gold-solo' ? 'gold' : t.rank;
      var a = el('a', 'trophy trophy--' + rankClass);
      a.href = t.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', t.place + ' — ' + t.name);
      var badges = t.badges.map(function (b) { return '<span class="trophy__badge">' + esc(b) + '</span>'; }).join('');
      a.innerHTML =
        '<div class="trophy__rank"><span class="trophy__medal" aria-hidden="true">' + MEDALS[t.rank] + '</span>' +
        '<span class="trophy__place">' + esc(t.place) + '</span></div>' +
        '<h3 class="trophy__name">' + esc(t.name) + '</h3>' +
        '<div class="trophy__meta">' + badges + '</div>' +
        '<span class="trophy__link">Open repo &#8599;</span>' +
        '<div class="trophy__bar"><i style="--w:' + t.w + '%"></i></div>';
      grid.appendChild(a);
    });
  }

  function renderMachines() {
    var ul = $('#box-list');
    if (!ul) return;
    STACK.forEach(function (m) { var li = el('li'); li.textContent = m; ul.appendChild(li); });
  }

  var state = { year: 'all', podium: false, q: '' };
  function isFeat(ev) { return !!ev.feat; }
  function makeCard(ev) {
    var a = el('a', 'card' + (isFeat(ev) ? ' card--podium' : ''));
    a.href = ev.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute('data-year', ev.year);
    a.setAttribute('data-podium', isFeat(ev) ? '1' : '0');
    a.setAttribute('data-name', (ev.name + ' ' + (ev.desc || '') + ' ' + (ev.lang || '')).toLowerCase());
    var tags = '';
    if (ev.place) tags += '<span class="card__tag card__tag--gold">' + esc(ev.year.toUpperCase()) + '</span>';
    else tags += '<span class="card__tag">' + esc(ev.year.toUpperCase()) + '</span>';
    if (ev.count) tags += '<span class="card__tag card__tag--count">' + ev.count + '</span>';
    if (ev.lang) tags += '<span class="card__tag">' + esc(ev.lang) + '</span>';
    a.innerHTML =
      '<div class="card__top"><span class="card__year">' + esc(ev.year) + '</span>' +
      (ev.place ? '<span class="card__place" aria-hidden="true">' + PLACE_ICON[ev.place] + '</span>' : '') + '</div>' +
      '<h3 class="card__name">' + esc(ev.name) + '</h3>' +
      '<p class="card__desc" style="color:var(--muted);font-size:.82rem;margin:.2rem 0 0">' + esc(ev.desc || '') + '</p>' +
      '<div class="card__tags">' + tags + '</div><span class="card__go">Open repo &#8599;</span>';
    return a;
  }
  function renderGrid() {
    var grid = $('#writeup-grid');
    if (!grid) return;
    EVENTS.forEach(function (ev) { grid.appendChild(makeCard(ev)); });
    applyFilters();
  }
  function applyFilters() {
    var grid = $('#writeup-grid');
    if (!grid) return;
    var cards = grid.querySelectorAll('.card');
    var shown = 0;
    cards.forEach(function (c) {
      var okYear = state.year === 'all' || c.getAttribute('data-year') === state.year;
      var okPod = !state.podium || c.getAttribute('data-podium') === '1';
      var okQ = !state.q || c.getAttribute('data-name').indexOf(state.q) !== -1;
      var show = okYear && okPod && okQ;
      c.classList.toggle('is-hidden', !show);
      if (show) shown++;
    });
    var count = $('#result-count');
    if (count) count.textContent = shown + ' / ' + EVENTS.length + ' repos';
    var empty = $('#grid-empty');
    if (empty) empty.hidden = shown !== 0;
  }
  function initFilters() {
    var chips = document.querySelectorAll('#year-chips .chip-btn');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (chip.hasAttribute('data-place')) {
          state.podium = !state.podium;
          chip.classList.toggle('is-active', state.podium);
          chip.setAttribute('aria-pressed', state.podium ? 'true' : 'false');
        } else {
          var y = chip.getAttribute('data-year');
          state.year = y;
          chips.forEach(function (c) {
            if (c.hasAttribute('data-year')) {
              var active = c === chip;
              c.classList.toggle('is-active', active);
              c.setAttribute('aria-pressed', active ? 'true' : 'false');
            }
          });
        }
        applyFilters();
      });
    });
    var search = $('#search');
    if (search) search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); applyFilters(); });
    var clear = $('#clear-filters');
    if (clear) clear.addEventListener('click', function () {
      state = { year: 'all', podium: false, q: '' };
      if (search) search.value = '';
      chips.forEach(function (c) {
        var isAll = c.getAttribute('data-year') === 'all';
        c.classList.toggle('is-active', isAll);
        c.setAttribute('aria-pressed', isAll ? 'true' : 'false');
      });
      applyFilters();
      if (search) search.focus();
    });
  }

  function initToTop() {
    var btn = $('#totop');
    if (!btn) return;
    function toggle() { btn.hidden = !(window.scrollY > 600); }
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });
    toggle();
  }

  function initCanvas() {
    var canvas = $('#bg-canvas');
    if (!canvas || REDUCED) return;
    var ctx = canvas.getContext('2d');
    var w, h, dpr, particles = [], raf;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      var n = Math.min(70, Math.floor((w * h) / 26000));
      particles = [];
      for (var i = 0; i < n; i++) {
        particles.push({ x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
          hue: Math.random() < 0.55 ? '0,255,156' : (Math.random() < 0.5 ? '0,212,255' : '0,196,122') });
      }
    }
    var LINK = 120;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.hue + ',0.7)'; ctx.fill();
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < LINK * LINK) {
            var alpha = (1 - Math.sqrt(d) / LINK) * 0.18;
            ctx.strokeStyle = 'rgba(0,212,255,' + alpha + ')';
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    function start() { resize(); seed(); cancelAnimationFrame(raf); frame(); }
    window.addEventListener('resize', function () { resize(); seed(); }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) cancelAnimationFrame(raf); else frame(); });
    start();
  }

  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
        if (history.pushState) history.pushState(null, '', id);
      });
    });
  }

  function init() { buildTicker(); renderTrophies(); renderMachines(); renderGrid(); initFilters(); initCounters(); initToTop(); initAnchors(); initCanvas(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
