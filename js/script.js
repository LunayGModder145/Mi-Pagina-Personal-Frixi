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

document.addEventListener('DOMContentLoaded', function () {
   createBioParticles();
   initializeFeatures();
});