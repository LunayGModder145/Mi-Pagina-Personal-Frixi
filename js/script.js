function createBioParticles() {
   const particleSystem = document.getElementById('particleSystem');
   if (!particleSystem) return;
   const particleCount = 40;

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'bio-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particleSystem.appendChild(particle);
   }
}

function initializeFeatures() {
   const navItems = document.querySelectorAll('.nav-item');
   const featurePanels = document.querySelectorAll('.feature-panel');

   navItems.forEach(item => {
      item.addEventListener('click', () => {
         const targetFeature = item.getAttribute('data-feature');

         navItems.forEach(nav => nav.classList.remove('active'));
         featurePanels.forEach(panel => panel.classList.remove('active'));

         item.classList.add('active');
         const targetPanel = document.getElementById(targetFeature);
         if (targetPanel) {
            targetPanel.classList.add('active');
         }
      });
   });
}

function initializeContactForm() {
   // Buscamos el formulario, el hueco del aviso y el botón
   const form = document.getElementById('contactForm');
   if (!form) return; // Si esta página no tiene formulario, no hacemos nada

   const status = document.getElementById('formStatus');
   const button = form.querySelector('button[type="submit"]');

   form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Evita que la página se recargue al enviar
      button.disabled = true; // Bloquea el botón para que no lo pulsen varias veces
      status.className = 'form-status';
      status.textContent = 'Enviando...';

      try {
         // Mandamos los datos del formulario a Formspree
         const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
         });

         if (!response.ok) throw new Error('Respuesta no válida');

         // Si todo fue bien: vaciamos el formulario y avisamos
         form.reset();
         status.textContent = '¡Mensaje enviado! Te responderé pronto.';
         status.classList.add('ok');
      } catch (error) {
         // Si algo falló: avisamos del error
         status.textContent = 'No se pudo enviar. Inténtalo de nuevo o escríbeme por mis redes.';
         status.classList.add('error');
      } finally {
         button.disabled = false; // Desbloqueamos el botón
      }
   });
}

document.addEventListener('DOMContentLoaded', function () {
   createBioParticles();
   initializeFeatures();
   initializeContactForm();
});