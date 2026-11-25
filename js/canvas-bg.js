/* ==========================================================================
   AURA FLUID // NEAT & ATTRACTIVE CHROMATIC AURORA ENGINE
   Clean, Luxurious, Awwwards-Caliber Dark Mode Canvas Experience
   - Velvet Obsidian Background with Organic Chromatic Gradient Mesh Pools
   - Smooth Breathing Lissajous Trajectory (Cyan, Indigo, Violet & Azure)
   - Interactive Cursor Spotlight Halo with Damped Inertial Tracking
   - Microscopic Architectural Coordinate Dot Matrix (Illuminates near cursor)
   - Floating Ethereal Stardust Motes with Gentle Upward Drift
   - 100% Neat, Professional, High-Contrast & Butter-Smooth 60 FPS
   ========================================================================== */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // --- INTERACTIVE CURSOR SPOTLIGHT STATE ---
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 340
  };

  // --- EXECUTIVE TECH LIGHT POOLS ---
  const auroraPools = [
    {
      baseX: 0.28,
      baseY: 0.25,
      radius: 420,
      color1: 'rgba(59, 130, 246, 0.16)',   // Enterprise Cobalt
      color2: 'rgba(59, 130, 246, 0.04)',
      freqX: 0.0008,
      freqY: 0.0011,
      ampX: 140,
      ampY: 100
    },
    {
      baseX: 0.72,
      baseY: 0.32,
      radius: 460,
      color1: 'rgba(56, 189, 248, 0.14)',    // Precision Sky Azure
      color2: 'rgba(56, 189, 248, 0.03)',
      freqX: 0.0012,
      freqY: 0.0009,
      ampX: 160,
      ampY: 120
    },
    {
      baseX: 0.50,
      baseY: 0.68,
      radius: 520,
      color1: 'rgba(37, 99, 235, 0.12)',   // Deep Tech Blue
      color2: 'rgba(37, 99, 235, 0.03)',
      freqX: 0.0007,
      freqY: 0.0013,
      ampX: 180,
      ampY: 110
    },
    {
      baseX: 0.20,
      baseY: 0.80,
      radius: 380,
      color1: 'rgba(30, 41, 59, 0.20)',   // Slate Navy
      color2: 'rgba(30, 41, 59, 0.04)',
      freqX: 0.0010,
      freqY: 0.0008,
      ampX: 120,
      ampY: 90
    }
  ];

  // --- FLOATING ETHEREAL STARDUST MOTES ---
  const MOTE_COUNT = 85;
  const motes = [];

  class Mote {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 40;
      this.size = Math.random() * 1.5 + 0.6;
      this.speedY = Math.random() * 0.35 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.phase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.6 ? '#38bdf8' : (Math.random() > 0.3 ? '#93c5fd' : '#ffffff');
    }

    update(time) {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(time * 0.02 + this.phase) * 0.18;

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset(false);
      }
    }

    draw(time) {
      const pulseAlpha = this.baseAlpha + Math.sin(time * 0.03 + this.phase) * 0.18;
      
      // Distance to cursor spotlight
      let extraGlow = 0;
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          extraGlow = (1 - dist / mouse.radius) * 0.65;
        }
      }

      const finalAlpha = Math.min(1, pulseAlpha + extraGlow);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * (1 + extraGlow * 0.8), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = finalAlpha;
      ctx.fill();

      if (extraGlow > 0.3) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = extraGlow * 0.25;
        ctx.fill();
      }
    }
  }

  // --- INITIALIZE & RESIZE ---
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (motes.length === 0) {
      for (let i = 0; i < MOTE_COUNT; i++) {
        motes.push(new Mote());
      }
    }
  }

  // --- DRAWING PROCEDURES ---

  // 1. Organic Chromatic Aurora Gradient Mesh Pools
  function drawAuroraPools(timestamp) {
    for (let i = 0; i < auroraPools.length; i++) {
      const p = auroraPools[i];

      // Lissajous Organic Trajectory
      const currentX = p.baseX * width + Math.sin(timestamp * p.freqX + i * 1.7) * p.ampX;
      const currentY = p.baseY * height + Math.cos(timestamp * p.freqY + i * 2.3) * p.ampY;
      const breatheRadius = p.radius + Math.sin(timestamp * 0.0015 + i) * 35;

      const grad = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        breatheRadius
      );
      grad.addColorStop(0, p.color1);
      grad.addColorStop(0.5, p.color2);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(currentX, currentY, breatheRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Microscopic Architectural Coordinate Dot Matrix
  function drawDotMatrix() {
    const spacing = 48;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    ctx.save();
    for (let r = 0; r <= rows; r++) {
      const y = r * spacing;
      for (let c = 0; c <= cols; c++) {
        const x = c * spacing;

        let alpha = 0.035; // Whisper-quiet base alpha

        // Light up subtly near cursor spotlight
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 260) {
            const proximity = Math.pow(1 - dist / 260, 2);
            alpha += proximity * 0.22;
          }
        }

        ctx.beginPath();
        ctx.arc(x, y, 0.85, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // 3. Interactive Cursor Spotlight Halo
  function drawCursorSpotlight() {
    if (!mouse.active) return;

    ctx.save();
    const haloGrad = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      mouse.radius
    );
    haloGrad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
    haloGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.06)');
    haloGrad.addColorStop(0.7, 'rgba(37, 99, 235, 0.02)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- MAIN ANIMATION PIPELINE ---
  function animate(timestamp) {
    // Smooth Cursor LERP
    if (mouse.targetX > -1000 && mouse.targetY > -1000) {
      if (mouse.x < -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }
    }

    // 1. Refined Obsidian Slate Base
    ctx.fillStyle = '#0b0f17';
    ctx.fillRect(0, 0, width, height);

    // 2. Chromatic Aurora Pools
    drawAuroraPools(timestamp);

    // 3. Cursor Spotlight Halo
    drawCursorSpotlight();

    // 4. Subtle Coordinate Dot Matrix
    drawDotMatrix();

    // 5. Floating Ethereal Stardust Motes
    for (let i = 0; i < motes.length; i++) {
      motes[i].update(timestamp * 0.05);
      motes[i].draw(timestamp * 0.05);
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  }

  // --- EVENTS ---
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = -9999;
    mouse.targetY = -9999;
  });

  window.addEventListener('resize', resize);

  // Initialize
  resize();
  requestAnimationFrame(animate);
})();
