/* ============================================= */
/*  ✨ PARTÍCULAS DE FONDO                       */
/* ============================================= */

function createBioParticles() {
   // Buscamos el contenedor de las partículas (solo existe en algunas páginas)
   const particleSystem = document.getElementById('particleSystem');
   if (!particleSystem) return;
   const particleCount = 40;

   // Creamos 40 puntos con posición, retraso y velocidad al azar;
   // el CSS (@keyframes bio-float) se encarga de moverlos
   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'bio-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particleSystem.appendChild(particle);
   }
}

/* ============================================= */
/*  🎧 PESTAÑAS DEL PORTFOLIO                    */
/* ============================================= */

function initializePortfolioTabs() {
   // Los botones de creadores y los paneles con sus vídeos
   const buttons = document.querySelectorAll('button.artist-btn');
   const panels = document.querySelectorAll('.feature-panel');
   if (buttons.length === 0) return; // Si esta página no tiene pestañas, no hacemos nada

   buttons.forEach(button => {
      button.addEventListener('click', () => {
         // 1. Quitamos la clase "active" a todos los botones y paneles
         buttons.forEach(b => b.classList.remove('active'));
         panels.forEach(p => p.classList.remove('active'));

         // 2. Se la ponemos al botón pulsado y al panel que le corresponde
         //    (el data-feature del botón coincide con el id del panel)
         button.classList.add('active');
         const targetPanel = document.getElementById(button.dataset.feature);
         if (targetPanel) {
            targetPanel.classList.add('active');
         }
      });
   });
}

/* ============================================= */
/*  📩 FORMULARIO DE CONTACTO                    */
/* ============================================= */

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

/* ============================================= */
/*  🚀 ARRANQUE                                  */
/* ============================================= */

// Cuando el HTML ya está cargado, ponemos en marcha cada parte.
// Cada función comprueba si la página tiene lo que necesita.
document.addEventListener('DOMContentLoaded', function () {
   createBioParticles();
   initializePortfolioTabs();
   initializeContactForm();
});
