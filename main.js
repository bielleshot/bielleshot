/* =====================================================
   Bi.elle Shot — Shared Scripts
   ===================================================== */

/* ── Canvas particle background ── */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < W * H * 0.1; i++) {
      const x = Math.random() * W, y = Math.random() * H, b = Math.random() * 22 + 20;
      ctx.fillStyle = `rgba(${b + 4},${b + 4},${b + 2},${Math.random() * 0.055 + 0.008})`;
      ctx.fillRect(x, y, Math.random() * 1.3 + 0.2, Math.random() * 1.3 + 0.2);
    }
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * W, y = Math.random() * H, r = Math.random() * 200 + 80;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(126,207,224,${Math.random() * 0.022 + 0.004})`);
      g.addColorStop(1, 'rgba(126,207,224,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, W, H);
  }

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; draw(); }
  resize();
  window.addEventListener('resize', resize);
})();

/* ── Hamburger menu ── */
(function () {
  const ham = document.getElementById('hamburger');
  const drop = document.getElementById('navDropdown');
  const ov = document.getElementById('navOverlay');
  if (!ham) return;

  function toggle() {
    ham.classList.toggle('open');
    drop.classList.toggle('open');
    ov.classList.toggle('open');
    document.body.style.overflow = drop.classList.contains('open') ? 'hidden' : '';
  }

  ham.addEventListener('click', toggle);
  ov.addEventListener('click', toggle);
  drop.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (drop.classList.contains('open')) toggle();
  }));
})();

/* ── Scroll reveal (generic) ── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
})();

/* ── Gallery clip-path reveal ── */
(function () {
  const gObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); gObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.gallery-item').forEach(el => gObs.observe(el));
})();

/* ── Services list stagger ── */
(function () {
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll('li').forEach((li, i) => setTimeout(() => li.classList.add('visible'), i * 120));
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.services-list').forEach(el => sObs.observe(el));
})();

/* ── Counter animation ── */
(function () {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(el => {
          const t = parseInt(el.dataset.target);
          let c = 0, s = t / 60;
          const ti = setInterval(() => {
            c = Math.min(c + s, t);
            el.textContent = Math.floor(c) + '+';
            if (c >= t) { el.textContent = t + '+'; clearInterval(ti); }
          }, 24);
        });
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.about-stats').forEach(el => cObs.observe(el));
})();

/* ── Scroll hint: nasconde dopo il primo scroll ── */
(function () {
  const hint = document.querySelector('.scroll-hint');
  if (!hint) return;
  function hideHint() {
    hint.style.transition = 'opacity .6s ease';
    hint.style.opacity = '0';
    setTimeout(() => hint.style.display = 'none', 600);
    window.removeEventListener('scroll', hideHint);
  }
  window.addEventListener('scroll', hideHint, { passive: true });
})();

/* ── Booking form (Web3Forms — index.html only) ── */
(function () {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Invio in corso...';
    btn.disabled = true;
    const obj = {};
    new FormData(this).forEach((v, k) => obj[k] = v);
    obj.access_key = '13c7ab12-d78b-41a9-9a1f-ced97964ff9c';
    obj.subject = 'Nuova richiesta shooting — Bi.elle Shot';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(obj)
      });
      const json = await res.json();
      if (json.success) { window.location.href = 'https://bielleshot.it/thanks.html'; }
      else { btn.textContent = 'Errore, riprova'; btn.disabled = false; }
    } catch { btn.textContent = 'Errore, riprova'; btn.disabled = false; }
  });
})();
