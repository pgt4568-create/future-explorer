// Web Speech API wrapper for Korean reading

class SpeechManager {
  public ttsEnabled: boolean = true;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string, onEnd?: () => void) {
    if (!this.ttsEnabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const cleanText = text.replace(/[*#]/g, '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95; // Slightly comfortable pace for elementary students
    utterance.pitch = 1.05;

    // Try to find a friendly Korean voice
    const voices = this.synth.getVoices();
    const koVoice = voices.find(v => v.lang.includes('ko') || v.lang.includes('KR'));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}

export const speechManager = new SpeechManager();
