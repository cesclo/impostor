// Gestió de reproducció d'àudio
class AudioPlayer {
  constructor () {
    this.audio = new Audio();
    this.currentSong = null;
    this.isPlaying = false;
    this.maxDuration = 30; // 30 segons màxim de preview

    // Durades per intent (en segons)
    this.attemptDurations = [1, 2, 4, 7, 11, 16];

    // Event listeners
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('ended', () => this.onEnded());
    this.audio.addEventListener('error', (e) => this.onError(e));
  }

  async initialize () {
    try {
      // Obtenir la cançó del dia
      const songResponse = await fetch('/api/song-of-day');

      if (!songResponse.ok) {
        const error = await songResponse.json();
        console.error('Error:', error);
        return false;
      }

      this.currentSong = await songResponse.json();

      // Pre-carregar l'àudio
      if (this.currentSong.preview_url) {
        this.audio.src = this.currentSong.preview_url;
        this.audio.load();
      }

      return true;
    } catch (error) {
      console.error('Error inicialitzant el reproductor:', error);
      return false;
    }
  }

  getDurationForAttempt (attemptNumber) {
    // attemptNumber és 1-indexed
    const index = Math.min(attemptNumber - 1, this.attemptDurations.length - 1);
    return this.attemptDurations[index];
  }

  play (attemptNumber, onComplete) {
    if (!this.currentSong || !this.currentSong.preview_url) {
      console.error('No hi ha cançó disponible');
      return false;
    }

    const maxPlayTime = this.getDurationForAttempt(attemptNumber);

    this.audio.currentTime = 0;
    this.isPlaying = true;
    this.playEndTime = maxPlayTime;
    this.onPlayComplete = onComplete;

    this.audio.play().catch(error => {
      console.error('Error reproduint àudio:', error);
      this.isPlaying = false;
    });

    return true;
  }

  pause () {
    this.audio.pause();
    this.isPlaying = false;
  }

  stop () {
    this.pause();
    this.audio.currentTime = 0;
  }

  onTimeUpdate () {
    if (this.isPlaying && this.audio.currentTime >= this.playEndTime) {
      this.pause();
      if (this.onPlayComplete) {
        this.onPlayComplete();
      }
    }

    // Disparar event per actualitzar la UI
    const event = new CustomEvent('playerTimeUpdate', {
      detail: {
        currentTime: this.audio.currentTime,
        duration: this.maxDuration,
        unlocked: this.playEndTime
      }
    });
    document.dispatchEvent(event);
  }

  onEnded () {
    this.isPlaying = false;
    if (this.onPlayComplete) {
      this.onPlayComplete();
    }
  }

  onError (error) {
    console.error('Error de reproducció:', error);
    this.isPlaying = false;
  }

  getCurrentTime () {
    return this.audio.currentTime;
  }

  getUnlockedDuration (attemptNumber) {
    return this.getDurationForAttempt(attemptNumber);
  }
}

// Instància global (mantenim el nom per compatibilitat)
const spotifyPlayer = new AudioPlayer(); // eslint-disable-line no-unused-vars
