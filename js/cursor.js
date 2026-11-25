/* ==========================================================================
   FLUID CUSTOM CURSOR WITH MAGNETIC INTERPOLATION
   Spring Physics & Contextual Target Snapping
   ========================================================================== */

(function () {
  // Check if touch device
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  let dotX = -100, dotY = -100;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    // Dot moves instantly with mouse
    dotX += (mouseX - dotX) * 0.75;
    dotY += (mouseY - dotY) * 0.75;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    // Outer ring follows with smooth spring lag
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Setup hover targets
  function bindHoverTargets() {
    const targets = document.querySelectorAll('[data-cursor], a, button, .project-card, .btn-magnetic');

    targets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        isHovering = true;
        cursor.classList.add('cursor-hover');
        const customText = target.getAttribute('data-cursor') || '';
        cursor.setAttribute('data-cursor-text', customText);
      });

      target.addEventListener('mouseleave', () => {
        isHovering = false;
        cursor.classList.remove('cursor-hover');
        cursor.removeAttribute('data-cursor-text');
      });
    });
  }

  // Re-bind when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHoverTargets);
  } else {
    bindHoverTargets();
  }

  // Expose binding function for dynamic content
  window.rebindCustomCursor = bindHoverTargets;
})();
