// bi.elle_shot — main.js

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

  // Animazione Flash + Fotocamera Zoom-Out + Benvenuto
  const shutter = document.getElementById('cameraShutter');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (shutter && !prefersReduced) {
    document.body.style.overflow = 'hidden';

    // 1. Inizio da schermo nero -> Flash rapido
    setTimeout(() => {
      shutter.classList.add('flash-on');
      
      setTimeout(() => {
        shutter.classList.remove('flash-on');
        
        // 2. La fotocamera si rimpicciolisce al centro insieme al testo di benvenuto
        setTimeout(() => {
          shutter.classList.add('show-intro');

          // 3. Dissolvenza finale che rivela il sito
          setTimeout(() => {
            shutter.classList.add('shutter-open');
            document.body.style.overflow = '';
            
            setTimeout(() => {
              shutter.remove();
            }, 800);
          }, 1400);
        }, 100);
      }, 90);
    }, 300);
  } else if (shutter) {
    shutter.remove();
  }
});
