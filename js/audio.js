// SISTEMA DE AUDIO (Simulado con Web Audio API)
const AudioManager = {
  enabled: true,
  initialized: false,
  audioContext: null,

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API no soportado');
      this.initialized = false;
    }
  },

  setEnabled(enabled) {
    this.enabled = enabled;
    GameStorage.set('audio_enabled', enabled);
  },

  isEnabled() {
    if (this.enabled === undefined) {
      this.enabled = GameStorage.get('audio_enabled', true);
    }
    return this.enabled;
  },

  // Sonidos usando Web Audio API
  playTone(frequency = 440, duration = 100, type = 'sine') {
    if (!this.isEnabled() || !this.initialized) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = frequency;
      osc.type = type;

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

      osc.start(now);
      osc.stop(now + duration / 1000);
    } catch (e) {
      console.warn('Error al reproducir sonido:', e);
    }
  },

  playSuccess() {
    this.playTone(800, 200, 'sine');
    this.playTone(1000, 150, 'sine');
  },

  playError() {
    this.playTone(300, 150, 'sine');
    this.playTone(200, 150, 'sine');
  },

  playCombo() {
    this.playTone(600, 100, 'sine');
    setTimeout(() => this.playTone(800, 100, 'sine'), 100);
  },

  playVictory() {
    this.playTone(523, 150, 'sine'); // C5
    setTimeout(() => this.playTone(659, 150, 'sine'), 160); // E5
    setTimeout(() => this.playTone(784, 300, 'sine'), 320); // G5
  },

  playGameOver() {
    this.playTone(400, 200, 'sine');
    setTimeout(() => this.playTone(300, 200, 'sine'), 250);
    setTimeout(() => this.playTone(200, 400, 'sine'), 500);
  },

  playClick() {
    this.playTone(600, 50, 'sine');
  }
};

// Inicializar al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AudioManager.init());
} else {
  AudioManager.init();
}
