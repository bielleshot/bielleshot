// bi.elle_shot — main.js
// Tenuto volontariamente minimo: niente librerie, niente animazioni su ogni scroll.

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Un solo reveal orchestrato all'apertura della pagina (solo hero),
  // rispetta prefers-reduced-motion.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  if (hero && !prefersReduced) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(12px)';
    hero.style.transition = 'opacity .6s ease, transform .6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  }
});
