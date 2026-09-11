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

  // Sequenza Scatto Fotografico
  const shutter = document.getElementById('cameraShutter');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (shutter && !prefersReduced) {
    document.body.style.overflow = 'hidden';

    // 1. Schermata completamente nera all'inizio
    setTimeout(() => {
      // 2. Flash rapido (apertura otturatore)
      shutter.classList.add('flash-on');
      
      setTimeout(() => {
        // 3. Ritorno immediato al buio
        shutter.classList.remove('flash-on');
        
        setTimeout(() => {
          // 4. Apertura finale e svelamento del sito
          shutter.classList.add('shutter-open');
          document.body.style.overflow = '';
          
          setTimeout(() => {
            shutter.remove();
          }, 600);
        }, 100);
      }, 80);
    }, 400);
  } else if (shutter) {
    shutter.remove();
  }
});
