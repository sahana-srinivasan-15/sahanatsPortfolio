/* ==========================================================================
   3D CARD TILT & CURSOR SPOTLIGHT ENGINE
   Smooth Inertia Lerp with Perspective Transform
   ========================================================================== */

(function () {
  const cards = document.querySelectorAll('.project-card, .hero-visual-card');

  cards.forEach((card) => {
    let bounds;
    let isHovered = false;

    function updateBounds() {
      bounds = card.getBoundingClientRect();
    }

    function onMouseEnter() {
      isHovered = true;
      updateBounds();
    }

    function onMouseMove(e) {
      if (!isHovered) return;
      if (!bounds) updateBounds();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Update CSS variables for radial cursor spotlight
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      // Calculate 3D tilt angles (max 8 degrees)
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((mouseY - centerY) / centerY) * -6;
      const rotateY = ((mouseX - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    }

    function onMouseLeave() {
      isHovered = false;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
      onMouseEnter();
    });
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });
  });
})();
