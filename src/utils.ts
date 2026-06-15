// Sound Effects Synthesizer using standard Web Audio API
export function playStadiumWhistle() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create high pitch whistle sound
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.3);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1205, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1405, audioCtx.currentTime + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(1205, audioCtx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.3);
    osc2.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.warn('Web Audio API not supported or blocked by permissions', e);
  }
}

export function playSuccessChime() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 arpeggio
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);
      
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.4);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(audioCtx.currentTime + idx * 0.1);
      osc.stop(audioCtx.currentTime + idx * 0.1 + 0.4);
    });
  } catch (e) {
    console.warn(e);
  }
}

export function playRetroHorn() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Custom stadium air horn sound
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, audioCtx.currentTime); 
    osc.frequency.setValueAtTime(225, audioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    console.warn(e);
  }
}

// Format prices
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Generate EA FC rating class
export function getRatingColor(rating: number): string {
  if (rating >= 88) return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
  if (rating >= 84) return 'text-slate-300 bg-slate-300/10 border-slate-300/30';
  return 'text-amber-600 bg-amber-600/10 border-amber-600/30';
}
