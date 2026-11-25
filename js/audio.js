/* ==========================================================================
   WEB AUDIO API SOUND SYNTHESIZER
   Zero-Dependency Micro-Audio Feedback Engine (Always-On Mode)
   ========================================================================== */

(function () {
  let audioCtx = null;
  const isSoundEnabled = true; // Always ON per requirement

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Synthesize soft futuristic click
  function playTick(freq = 800, duration = 0.04) {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Synthesize positive chime
  function playChime() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, i) => {
        setTimeout(() => {
          if (!audioCtx || audioCtx.state === 'suspended') return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        }, i * 60);
      });
    } catch (e) {}
  }

  // Expose global sound trigger functions
  window.SoundFX = {
    playHover: () => playTick(950, 0.03),
    playClick: () => playTick(650, 0.06),
    playKeyboard: () => playTick(1400 + Math.random() * 200, 0.02),
    playSuccess: () => playChime(),
    playSimWave: () => {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx || audioCtx.state === 'suspended') return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(540, audioCtx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } catch (e) {}
    },
    toggleSound: () => true, // Sound is permanently active
    isEnabled: () => true
  };

  // Browser Autoplay Policy: Unlock AudioContext on first user interaction
  const unlockEvents = ['click', 'pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
  function unlock() {
    initAudio();
    unlockEvents.forEach(evt => window.removeEventListener(evt, unlock));
  }
  unlockEvents.forEach(evt => window.addEventListener(evt, unlock, { passive: true }));

  document.addEventListener('DOMContentLoaded', () => {
    // Attach hover sound to magnetic buttons, nav links, cards, pills, and theme toggle
    document.querySelectorAll('.btn-magnetic, .nav-link, .project-card').forEach((el) => {
      el.addEventListener('mouseenter', () => window.SoundFX.playHover());
      el.addEventListener('click', () => window.SoundFX.playClick());
    });
  });
})();
