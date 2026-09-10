// Anno dinamico nel footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Menu Mobile Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });
}

// Gestione invio modulo contatti senza ricaricare la pagina
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const formData = new FormData(contactForm);
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.style.display = 'block';
        status.style.color = '#4CAF50';
        status.textContent = 'Grazie! Il tuo messaggio è stato inviato con successo.';
        contactForm.reset();
        submitBtn.style.display = 'none';
      } else {
        throw new Error('Errore durante l’invio');
      }
    } catch (error) {
      status.style.display = 'block';
      status.style.color = '#e53935';
      status.textContent = 'Si è verificato un errore. Per favore riprova o scrivimi su Instagram.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Invia richiesta';
    }
  });
}
