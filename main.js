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

  // Animazione Effetto Scatto Flash
  const shutter = document.getElementById('cameraShutter');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (shutter && !prefersReduced) {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      shutter.classList.add('flash-active');
      
      setTimeout(() => {
        shutter.classList.add('shutter-open');
        document.body.style.overflow = '';
        
        setTimeout(() => {
          shutter.remove();
        }, 800);
      }, 150);
    }, 200);
  } else if (shutter) {
    shutter.remove();
  }
});
