// bi.elle_shot — main.js (Autofocus Intro Sincronizzata)

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

  // Animazione Autofocus + Logo Sincronizzata
  const afOverlay = document.getElementById('autofocusOverlay');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (afOverlay && !prefersReduced) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('is-blurred');

    // 1. Avvia l'apparizione del mirino
    setTimeout(() => {
      afOverlay.classList.add('af-active');

      // 2. Aggancia il fuoco (diventa verde)
      setTimeout(() => {
        afOverlay.classList.add('af-locked');

        // 3. Insieme: dissolvi l'overlay nero E rimuovi la sfocatura dello sfondo
        setTimeout(() => {
          afOverlay.classList.add('af-fade');
          document.body.classList.remove('is-blurred');
          document.body.style.overflow = '';

          // 4. Rimuovi l'elemento dal DOM alla fine della transizione
          setTimeout(() => {
            afOverlay.remove();
          }, 600);
        }, 600);
      }, 700);
    }, 150);
  } else if (afOverlay) {
    afOverlay.remove();
  }
});
