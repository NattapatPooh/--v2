/**
 * Web Audio API synthesizer for kid-friendly game sound effects and Thai Text-To-Speech.
 * Offline 100% without external assets.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true; // SFX (Sound Effects)
  private bgmEnabled: boolean = true; // BGM (Background Music)
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmVolume: number = 0.45;
  private bgmTrackName: string = 'ดนตรีสนุกสนาน (BGM)';
  private isUserInteracted: boolean = false;
  private pendingBgmPlay: boolean = false;
  private isSynthBgmPlaying: boolean = false;
  private synthBgmInterval: number | null = null;
  private synthMasterGain: GainNode | null = null;
  private currentUrlCandidateIndex: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedSfx = localStorage.getItem('game_sfx_enabled');
        if (savedSfx !== null) {
          this.soundEnabled = savedSfx === 'true';
        }
        const savedBgm = localStorage.getItem('game_bgm_enabled');
        if (savedBgm !== null) {
          this.bgmEnabled = savedBgm === 'true';
        } else {
          this.bgmEnabled = true;
        }
        const savedVol = localStorage.getItem('game_bgm_volume');
        if (savedVol !== null) {
          this.bgmVolume = Math.max(0, Math.min(1, parseFloat(savedVol) || 0.45));
        }
        const savedTrack = localStorage.getItem('game_bgm_track_name');
        if (savedTrack) {
          this.bgmTrackName = savedTrack;
        }
      } catch {
        // ignore
      }

      this.initBgmAudio();
      this.setupInteractionListener();

      // Initialize and preload Web Speech API voices
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

  private getCandidateUrls(): string[] {
    const urls: string[] = [];
    if (typeof window !== 'undefined') {
      try {
        urls.push(new URL('/audio/bgm.mp3', window.location.origin).href);
      } catch {
        // ignore
      }
      urls.push('/audio/bgm.mp3');
      urls.push('./audio/bgm.mp3');
      try {
        urls.push(new URL('audio/bgm.mp3', window.location.href).href);
      } catch {
        // ignore
      }
    } else {
      urls.push('/audio/bgm.mp3');
    }
    return Array.from(new Set(urls));
  }

  private initBgmAudio(srcUrl?: string) {
    if (typeof window === 'undefined') return;
    const candidates = srcUrl ? [srcUrl] : this.getCandidateUrls();
    const url = srcUrl || candidates[this.currentUrlCandidateIndex] || candidates[0];

    try {
      if (this.bgmAudio) {
        this.bgmAudio.pause();
        this.bgmAudio.removeAttribute('src');
        this.bgmAudio.load();
        this.bgmAudio = null;
      }

      const audio = new Audio();
      audio.src = url;
      audio.loop = true;
      audio.volume = this.bgmVolume;
      audio.preload = 'auto';

      // Robust looping: even if native loop property glitches in iframe/safari, restart on ended
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });

      audio.addEventListener('playing', () => {
        this.stopSynthBGM();
        this.pendingBgmPlay = false;
      });

      audio.addEventListener('error', () => {
        console.warn(`BGM failed to load from ${url}, checking candidate fallbacks...`);
        if (!srcUrl && this.currentUrlCandidateIndex + 1 < candidates.length) {
          this.currentUrlCandidateIndex++;
          this.initBgmAudio();
        } else {
          // If all MP3 URL sources fail, automatically fallback to Web Audio synthesized BGM!
          if (this.bgmEnabled && this.isUserInteracted) {
            this.startSynthBGM();
          }
        }
      });

      this.bgmAudio = audio;
      if (this.bgmEnabled && this.isUserInteracted) {
        this.playBGM();
      }
    } catch (e) {
      console.warn('Error initializing BGM audio:', e);
      if (this.bgmEnabled && this.isUserInteracted) {
        this.startSynthBGM();
      }
    }
  }

  private setupInteractionListener() {
    if (typeof window === 'undefined') return;
    const onUserAction = () => {
      this.isUserInteracted = true;
      this.init();
      if (this.bgmEnabled) {
        this.playBGM();
      }
    };

    window.addEventListener('click', onUserAction, { passive: true });
    window.addEventListener('touchstart', onUserAction, { passive: true });
    window.addEventListener('touchend', onUserAction, { passive: true });
    window.addEventListener('pointerdown', onUserAction, { passive: true });
    window.addEventListener('keydown', onUserAction, { passive: true });
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // ========== WEBAUDIO SYNTHESIZER BGM (100% OFFLINE / RESILIENT FALLBACK) ==========
  /**
   * Cheerful, gentle tropical game marimba background music.
   * Plays completely client-side in Web Audio API so it NEVER fails even if MP3 is blocked or offline!
   */
  private startSynthBGM() {
    if (this.isSynthBgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.isSynthBgmPlaying = true;
      const ctx = this.ctx;

      if (!this.synthMasterGain) {
        this.synthMasterGain = ctx.createGain();
        this.synthMasterGain.gain.setValueAtTime(this.bgmVolume * 0.45, ctx.currentTime);
        this.synthMasterGain.connect(ctx.destination);
      } else {
        this.synthMasterGain.gain.setValueAtTime(this.bgmVolume * 0.45, ctx.currentTime);
      }

      // Pentatonic marimba melody for Thai children game (C Major Pentatonic: C4, D4, E4, G4, A4, C5)
      const melody = [
        { note: 261.63, dur: 0.22, beat: 0.0 }, // C4
        { note: 329.63, dur: 0.22, beat: 0.3 }, // E4
        { note: 392.00, dur: 0.22, beat: 0.6 }, // G4
        { note: 523.25, dur: 0.35, beat: 0.9 }, // C5
        { note: 440.00, dur: 0.22, beat: 1.35 }, // A4
        { note: 392.00, dur: 0.35, beat: 1.65 }, // G4
        { note: 329.63, dur: 0.22, beat: 2.1 }, // E4
        { note: 293.66, dur: 0.25, beat: 2.4 }, // D4

        { note: 261.63, dur: 0.22, beat: 2.8 }, // C4
        { note: 293.66, dur: 0.22, beat: 3.1 }, // D4
        { note: 329.63, dur: 0.25, beat: 3.4 }, // E4
        { note: 392.00, dur: 0.35, beat: 3.75 }, // G4
        { note: 440.00, dur: 0.22, beat: 4.2 }, // A4
        { note: 523.25, dur: 0.35, beat: 4.5 }, // C5
        { note: 392.00, dur: 0.4, beat: 4.95 }, // G4
        { note: 329.63, dur: 0.4, beat: 5.5 }, // E4
      ];

      const bassline = [
        { note: 130.81, beat: 0.0 }, // C3
        { note: 196.00, beat: 1.5 }, // G3
        { note: 174.61, beat: 2.8 }, // F3
        { note: 196.00, beat: 4.2 }, // G3
      ];

      const loopLength = 6.0; // 6 seconds per loop
      let loopStartTime = ctx.currentTime + 0.05;

      const scheduleLoop = (startTime: number) => {
        if (!this.isSynthBgmPlaying || !this.ctx || !this.synthMasterGain) return;

        // Schedule melody notes
        melody.forEach((m) => {
          const t = startTime + m.beat;
          if (t < ctx.currentTime - 0.1) return;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(m.note, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + m.dur);

          osc.connect(gain);
          gain.connect(this.synthMasterGain!);

          osc.start(t);
          osc.stop(t + m.dur + 0.05);
        });

        // Schedule gentle acoustic bass
        bassline.forEach((b) => {
          const t = startTime + b.beat;
          if (t < ctx.currentTime - 0.1) return;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(b.note, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

          osc.connect(gain);
          gain.connect(this.synthMasterGain!);

          osc.start(t);
          osc.stop(t + 0.7);
        });
      };

      // Initial schedule
      scheduleLoop(loopStartTime);

      // Repeat loop interval
      if (this.synthBgmInterval) {
        clearInterval(this.synthBgmInterval);
      }

      this.synthBgmInterval = window.setInterval(() => {
        if (!this.isSynthBgmPlaying || !this.ctx) return;
        loopStartTime += loopLength;
        scheduleLoop(loopStartTime);
      }, (loopLength * 1000) - 250);
    } catch {
      // ignore
    }
  }

  private stopSynthBGM() {
    this.isSynthBgmPlaying = false;
    if (this.synthBgmInterval) {
      clearInterval(this.synthBgmInterval);
      this.synthBgmInterval = null;
    }
    if (this.synthMasterGain && this.ctx) {
      try {
        this.synthMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      } catch {
        // ignore
      }
    }
  }

  // ========== SOUND EFX (SFX) CONTROLS ==========
  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    try {
      localStorage.setItem('game_sfx_enabled', String(enabled));
    } catch {
      // ignore
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // ========== BGM (BACKGROUND MUSIC) CONTROLS ==========
  public setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    try {
      localStorage.setItem('game_bgm_enabled', String(enabled));
    } catch {
      // ignore
    }

    if (enabled) {
      this.playBGM();
    } else {
      this.pauseBGM();
    }
  }

  public isBgmEnabled(): boolean {
    return this.bgmEnabled;
  }

  public playBGM() {
    this.bgmEnabled = true;
    try {
      localStorage.setItem('game_bgm_enabled', 'true');
    } catch {
      // ignore
    }

    this.init();

    if (!this.bgmAudio) {
      this.initBgmAudio();
    }

    if (this.bgmAudio) {
      this.bgmAudio.volume = this.bgmVolume;
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.pendingBgmPlay = false;
            this.stopSynthBGM();
          })
          .catch(() => {
            this.pendingBgmPlay = true;
            // If user has already interacted, start synth BGM as immediate fallback
            if (this.isUserInteracted) {
              this.startSynthBGM();
            }
          });
      }
    } else if (this.isUserInteracted) {
      this.startSynthBGM();
    }
  }

  public pauseBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    this.stopSynthBGM();
    this.pendingBgmPlay = false;
  }

  public stopBGM() {
    this.pauseBGM();
  }

  public setBgmVolume(volume: number) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.bgmVolume;
    }
    if (this.synthMasterGain && this.ctx) {
      this.synthMasterGain.gain.setValueAtTime(this.bgmVolume * 0.45, this.ctx.currentTime);
    }
    try {
      localStorage.setItem('game_bgm_volume', String(this.bgmVolume));
    } catch {
      // ignore
    }
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public getBgmTrackName(): string {
    return this.bgmTrackName;
  }

  /**
   * Load a custom user MP3 file directly from browser file picker
   */
  public setCustomBgm(file: File): string {
    try {
      const objectUrl = URL.createObjectURL(file);
      this.bgmTrackName = file.name || 'ไฟล์เพลงของฉัน.mp3';
      try {
        localStorage.setItem('game_bgm_track_name', this.bgmTrackName);
      } catch {
        // ignore
      }
      this.initBgmAudio(objectUrl);
      if (this.bgmEnabled) {
        this.playBGM();
      }
      return this.bgmTrackName;
    } catch (e) {
      console.error('Failed to load custom BGM file:', e);
      return '';
    }
  }

  public resetToDefaultBgm() {
    this.bgmTrackName = 'เพลงประกอบเกม (bgm.mp3)';
    this.currentUrlCandidateIndex = 0;
    try {
      localStorage.setItem('game_bgm_track_name', this.bgmTrackName);
    } catch {
      // ignore
    }
    this.initBgmAudio();
    if (this.bgmEnabled) {
      this.playBGM();
    }
  }

  // Button click pop sound
  public playPop() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore
    }
  }

  // Cute bubbly sound effect for scene transitions
  public playBubbleTransition() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const bubbleTones = [
        { freq1: 420, freq2: 780, time: 0.0 },
        { freq1: 580, freq2: 960, time: 0.09 },
        { freq1: 720, freq2: 1250, time: 0.17 },
        { freq1: 900, freq2: 1550, time: 0.25 },
      ];

      bubbleTones.forEach(({ freq1, freq2, time }) => {
        if (!this.ctx) return;
        const start = this.ctx.currentTime + time;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq1, start);
        osc.frequency.exponentialRampToValueAtTime(freq2, start + 0.07);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.22, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.075);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.08);
      });
    } catch {
      // ignore
    }
  }

  // Correct answer cheerful arpeggio (C-E-G-C high)
  public playCorrect() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch {
      // ignore
    }
  }

  // Wrong answer soft wobble
  public playWrong() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  // Star pop sound for 1, 2, 3 stars
  public playStarPop(starIndex: number) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const freqs = [659.25, 880, 1318.51]; // E5, A5, E6
      const freq = freqs[starIndex % freqs.length] || 880;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // ignore
    }
  }

  // Victory Fanfare
  public playVictory() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const fanfare = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 523.25, d: 0.12, t: 0.12 },
        { f: 523.25, d: 0.12, t: 0.24 },
        { f: 659.25, d: 0.3, t: 0.36 },
        { f: 587.33, d: 0.15, t: 0.68 },
        { f: 659.25, d: 0.15, t: 0.85 },
        { f: 783.99, d: 0.5, t: 1.02 },
      ];

      fanfare.forEach((item) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + item.t;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + item.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Timer Tick
  public playTick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Thai Speech Synthesis & Thai Consonants Dictionary
  // Standard 44 Thai Consonants official names (e.g. ก -> "กอ ไก่", อ -> "ออ อ่าง", ม -> "มอ ม้า")
  public static readonly THAI_CONSONANTS: Record<string, string> = {
    ก: 'กอ ไก่',
    ข: 'ขอ ไข่',
    ฃ: 'ฃอ ขวด',
    ค: 'คอ ควาย',
    ฅ: 'ฅอ คน',
    ฆ: 'ฆอ ระฆัง',
    ง: 'งอ งู',
    จ: 'จอ จาน',
    ฉ: 'ฉอ ฉิ่ง',
    ช: 'ชอ ช้าง',
    ซ: 'ซอ โซ่',
    ฌ: 'ฌอ กะเฌอ',
    ญ: 'ญอ หญิง',
    ฎ: 'ฎอ ชฎา',
    ฏ: 'ฏอ ปฏัก',
    ฐ: 'ฐอ ฐาน',
    ฑ: 'ฑอ มณโฑ',
    ฒ: 'ฒอ ผู้เฒ่า',
    ณ: 'ณอ เณร',
    ด: 'ดอ เด็ก',
    ต: 'ตอ เต่า',
    ถ: 'ถอ ถุง',
    ท: 'ทอ ทหาร',
    ธ: 'ธอ ธง',
    น: 'นอ หนู',
    บ: 'บอ ใบไม้',
    ป: 'ปอ ปลา',
    ผ: 'ผอ ผึ้ง',
    ฝ: 'ฝอ ฝา',
    พ: 'พอ พาน',
    ฟ: 'ฟอ ฟัน',
    ภ: 'ภอ สำเภา',
    ม: 'มอ ม้า',
    ย: 'ยอ ยักษ์',
    ร: 'รอ เรือ',
    ล: 'ลอ ลิง',
    ว: 'วอ แหวน',
    ศ: 'ศอ ศาลา',
    ษ: 'ษอ ฤๅษี',
    ส: 'สอ เสือ',
    ห: 'หอ หีบ',
    ฬ: 'ฬอ จุฬา',
    อ: 'ออ อ่าง',
    ฮ: 'ฮอ นกฮูก',
  };

  /**
   * Finds high-quality cute female Thai voice, strictly prioritizing 'Premwadee' (Microsoft Natural Thai Female Voice).
   * Strictly excludes male voices. Gives a sweet, cheerful, articulate young girl persona for the game.
   */
  private getCuteFemaleThaiVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. SPECIFIC REQUIREMENT: Explicitly look for 'Premwadee' first!
    // (e.g. "Microsoft Premwadee Online (Natural) - Thai (Thailand)" or "Premwadee")
    const premwadeeVoice = voices.find((v) => {
      const name = (v.name || '').toLowerCase();
      const uri = (v.voiceURI || '').toLowerCase();
      return name.includes('premwadee') || uri.includes('premwadee');
    });
    if (premwadeeVoice) {
      return premwadeeVoice;
    }

    // 2. Filter all Thai voices
    const thaiVoices = voices.filter((v) => {
      const lang = (v.lang || '').replace('_', '-').toLowerCase();
      return lang.startsWith('th') || v.name.toLowerCase().includes('thai');
    });

    if (thaiVoices.length === 0) return null;

    // Strictly exclude male voices ('niwat', 'sarit', 'male', 'man', 'boy', 'guy')
    const isMaleVoice = (v: SpeechSynthesisVoice) => {
      const name = (v.name || '').toLowerCase();
      const uri = (v.voiceURI || '').toLowerCase();
      return (
        name.includes('niwat') ||
        name.includes('sarit') ||
        name.includes('male') ||
        uri.includes('niwat') ||
        uri.includes('sarit') ||
        uri.includes('male')
      );
    };

    const femaleThaiVoices = thaiVoices.filter((v) => !isMaleVoice(v));

    // Priority keywords for clear, sweet, articulate female Thai voices:
    // Premwadee (Microsoft Online Natural Thai - female), Achara (Microsoft), Kanya (Apple Siri Thai), Narisa, Google
    const priorityKeywords = ['premwadee', 'achara', 'kanya', 'narisa', 'google', 'female', 'woman', 'siri'];
    for (const kw of priorityKeywords) {
      const matched = femaleThaiVoices.find(
        (v) => v.name.toLowerCase().includes(kw) || v.voiceURI.toLowerCase().includes(kw)
      );
      if (matched) return matched;
    }

    if (femaleThaiVoices.length > 0) {
      return femaleThaiVoices[0];
    }

    return thaiVoices[0] || null;
  }

  /**
   * Pronounce a Thai consonant by its full official name (e.g. ก -> "กอ ไก่", อ -> "ออ อ่าง", ม -> "มอ ม้า")
   * Never pronounces shortened syllables like "กะ", "ดะ", "มะ", "ชะ".
   * Speaks in a clear, cheerful, articulate young girl voice.
   */
  public speakConsonant(char: string) {
    if (!this.soundEnabled) return;
    const trimmed = (char || '').trim();
    if (!trimmed) return;
    const fullName = SoundEngine.THAI_CONSONANTS[trimmed] || (trimmed + 'อ');
    this.speakThai(fullName, { pitch: 1.3, rate: 1.0 });
  }

  /**
   * Thai Speech Synthesis with cute, cheerful, clear young girl voice
   * ("เสียงเด็กผู้หญิงน่ารักๆ เสียงใสชัดเจน อ่านคล่องชัดเจน")
   */
  public speakThai(text: string, options?: { pitch?: number; rate?: number }) {
    if (!this.soundEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      const trimmed = (text || '').trim();
      if (!trimmed) return;

      // If text is a single Thai consonant, automatically pronounce its full official name!
      const textToSpeak = SoundEngine.THAI_CONSONANTS[trimmed] || text;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'th-TH';
      // Pitch tuned to 1.28-1.30: bright, sweet, cute young girl tone, never deep/male
      utterance.pitch = options?.pitch ?? 1.28;
      // Rate tuned to 1.0: articulate, fluent reading speed ("อ่านคล่องชัดเจน")
      utterance.rate = options?.rate ?? 1.0;
      utterance.volume = 1.0;

      const cuteVoice = this.getCuteFemaleThaiVoice();
      if (cuteVoice) {
        utterance.voice = cuteVoice;
        const isPremwadee = (cuteVoice.name || '').toLowerCase().includes('premwadee');
        if (isPremwadee) {
          utterance.pitch = options?.pitch ?? 1.12;
          utterance.rate = options?.rate ?? 1.0;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
export const THAI_CONSONANT_NAMES = SoundEngine.THAI_CONSONANTS;
