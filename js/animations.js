/* ==========================================================================
   SAHANA SRINIVASAN // CINEMATIC GSAP & SCROLLTRIGGER ORCHESTRATION
   Magnetic Button Physics, Parallax Scrub, & Fluid Section Transitions
   ========================================================================== */

(function () {
  // Check if GSAP is available
  const hasGSAP = typeof gsap !== 'undefined';
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

  if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll if loaded
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      });

      // Expose globally so modals and overlays can pause/resume smooth scroll
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // --- Section Header Reveals ---
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });

    // --- Project Card Scroll Transitions ---
    gsap.utils.toArray('.project-card-wrap').forEach((cardWrap, index) => {
      const card = cardWrap.querySelector('.project-card');
      const preview = cardWrap.querySelector('.project-preview');

      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: cardWrap,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Subtle parallax scrub on preview image
      if (preview) {
        const previewAsset = preview.querySelector('img, svg');
        if (previewAsset) {
          gsap.to(previewAsset, {
            scrollTrigger: {
              trigger: cardWrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            },
            y: -25,
            ease: 'none'
          });
        }
      }
    });

    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    // --- Staggered Skill Cards Entrance ---
    ScrollTrigger.batch('.skill-card', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out'
        });
      },
      once: true
    });

    // --- Timeline Milestones Scroll Reveal ---
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }

  // --- ELASTIC MAGNETIC BUTTON PHYSICS ---
  const magneticButtons = document.querySelectorAll('.btn-magnetic');

  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull factor
      const pullX = x * 0.32;
      const pullY = y * 0.32;

      btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0px, 0px, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });
})();
