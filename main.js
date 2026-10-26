// bi.elle_shot — main.js (Autofocus Intro)

document.addEventListener('DOMContentLoaded', () => {
  // Anno dinamico nel footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animazione Autofocus
  const afOverlay = document.getElementById('autofocusOverlay');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (afOverlay && !prefersReduced) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('is-blurred');

    setTimeout(() => {
      afOverlay.classList.add('af-active');

      setTimeout(() => {
        afOverlay.classList.add('af-locked');
        document.body.classList.remove('is-blurred');

        setTimeout(() => {
          afOverlay.classList.add('af-fade');
          document.body.style.overflow = '';

          setTimeout(() => {
            afOverlay.remove();
          }, 600);
        }, 500);
      }, 700);
    }, 200);
  } else if (afOverlay) {
    afOverlay.remove();
  }
});
