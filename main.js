// bi.elle_shot — main.js (con effetto sonoro otturatore)

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

  // Funzione per generare il suono meccanico dell'otturatore
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Rumore meccanico (click/pop rapido)
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      // I browser bloccano l'audio automatico se l'utente non ha interagito prima con la pagina
    }
  };

  // Animazione Flash + Suono + Fotocamera Zoom-Out + Benvenuto
  const shutter = document.getElementById('cameraShutter');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (shutter && !prefersReduced) {
    document.body.style.overflow = 'hidden';

    // 1. Inizio da schermo nero -> Flash rapido e Suono
    setTimeout(() => {
      shutter.classList.add('flash-on');
      playShutterSound();
      
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
