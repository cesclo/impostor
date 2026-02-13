/* global songManager, spotifyPlayer */
// Aplicació principal del Heardle Català
class HeardleGame {
  constructor () {
    // Estat del joc
    this.currentAttempt = 1;
    this.maxAttempts = 6;
    this.attempts = [];
    this.gameOver = false;
    this.won = false;
    this.selectedSong = null;
    this.searchTimeout = null;

    // Elements del DOM
    this.elements = {
      playBtn: document.getElementById('playBtn'),
      playIcon: document.querySelector('.play-icon'),
      pauseIcon: document.querySelector('.pause-icon'),
      progressFill: document.querySelector('.progress-fill'),
      progressUnlocked: document.querySelector('.progress-unlocked'),
      currentTime: document.querySelector('.current-time'),
      attemptsHistory: document.getElementById('attemptsHistory'),
      guessSection: document.getElementById('guessSection'),
      guessInput: document.getElementById('guessInput'),
      autocompleteDropdown: document.getElementById('autocompleteDropdown'),
      skipBtn: document.getElementById('skipBtn'),
      submitBtn: document.getElementById('submitBtn'),
      resultSection: document.getElementById('resultSection'),
      resultIcon: document.getElementById('resultIcon'),
      resultTitle: document.getElementById('resultTitle'),
      albumArt: document.getElementById('albumArt'),
      revealTitle: document.getElementById('revealTitle'),
      revealArtist: document.getElementById('revealArtist'),
      shareBtn: document.getElementById('shareBtn'),
      shareCopied: document.getElementById('shareCopied'),
      statsBtn: document.getElementById('statsBtn'),
      infoBtn: document.getElementById('infoBtn'),
      statsModal: document.getElementById('statsModal'),
      infoModal: document.getElementById('infoModal'),
      closeStats: document.getElementById('closeStats'),
      closeInfo: document.getElementById('closeInfo'),
      attemptSegments: document.querySelectorAll('.attempt-segment')
    };

    this.init();
  }

  async init () {
    // Carregar estat guardat
    this.loadGameState();

    // Inicialitzar Spotify
    const spotifyReady = await spotifyPlayer.initialize();
    if (!spotifyReady) {
      console.error('No s\'ha pogut inicialitzar Spotify');
    }

    // Carregar cançons per autocomplete
    await songManager.loadSongs();

    // Configurar event listeners
    this.setupEventListeners();

    // Actualitzar UI
    this.updateUI();
    this.updateStats();
  }

  setupEventListeners () {
    // Botó de play
    this.elements.playBtn.addEventListener('click', () => this.togglePlay());

    // Input de cerca
    this.elements.guessInput.addEventListener('input', (e) => this.onInputChange(e));
    this.elements.guessInput.addEventListener('keydown', (e) => this.onInputKeydown(e));
    this.elements.guessInput.addEventListener('focus', () => this.showAutocomplete());
    document.addEventListener('click', (e) => this.onDocumentClick(e));

    // Botons
    this.elements.skipBtn.addEventListener('click', () => this.skip());
    this.elements.submitBtn.addEventListener('click', () => this.submit());

    // Compartir
    this.elements.shareBtn.addEventListener('click', () => this.share());

    // Modals
    this.elements.statsBtn.addEventListener('click', () => this.showModal('stats'));
    this.elements.infoBtn.addEventListener('click', () => this.showModal('info'));
    this.elements.closeStats.addEventListener('click', () => this.hideModal('stats'));
    this.elements.closeInfo.addEventListener('click', () => this.hideModal('info'));
    this.elements.statsModal.addEventListener('click', (e) => {
      if (e.target === this.elements.statsModal) this.hideModal('stats');
    });
    this.elements.infoModal.addEventListener('click', (e) => {
      if (e.target === this.elements.infoModal) this.hideModal('info');
    });

    // Actualització del temps de reproducció
    document.addEventListener('playerTimeUpdate', (e) => this.updateProgress(e.detail));
  }

  togglePlay () {
    if (this.gameOver) return;

    if (spotifyPlayer.isPlaying) {
      spotifyPlayer.pause();
      this.elements.playIcon.classList.remove('hidden');
      this.elements.pauseIcon.classList.add('hidden');
    } else {
      spotifyPlayer.play(this.currentAttempt, () => {
        this.elements.playIcon.classList.remove('hidden');
        this.elements.pauseIcon.classList.add('hidden');
      });
      this.elements.playIcon.classList.add('hidden');
      this.elements.pauseIcon.classList.remove('hidden');
    }
  }

  updateProgress (detail) {
    const { currentTime, duration, unlocked } = detail;

    // Actualitzar barra de progrés
    const fillPercent = (currentTime / duration) * 100;
    const unlockedPercent = (unlocked / duration) * 100;

    this.elements.progressFill.style.width = `${fillPercent}%`;
    this.elements.progressUnlocked.style.width = `${unlockedPercent}%`;

    // Actualitzar temps
    this.elements.currentTime.textContent = this.formatTime(currentTime);
  }

  formatTime (seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  async onInputChange (e) {
    const query = e.target.value;
    this.selectedSong = null;

    if (query.length < 2) {
      this.hideAutocomplete();
      return;
    }

    // Debounce per no fer massa crides
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(async () => {
      const results = await songManager.search(query);
      // Només mostrar si el valor no ha canviat
      if (this.elements.guessInput.value === query) {
        this.showAutocompleteResults(results);
      }
    }, 200);
  }

  onInputKeydown (e) {
    const items = this.elements.autocompleteDropdown.querySelectorAll('.autocomplete-item');
    const selectedIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIndex < items.length - 1) {
          items[selectedIndex]?.classList.remove('selected');
          items[selectedIndex + 1]?.classList.add('selected');
        } else if (selectedIndex === -1 && items.length > 0) {
          items[0].classList.add('selected');
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex > 0) {
          items[selectedIndex]?.classList.remove('selected');
          items[selectedIndex - 1]?.classList.add('selected');
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          this.selectSong(items[selectedIndex].dataset.display);
        } else {
          this.submit();
        }
        break;

      case 'Escape':
        this.hideAutocomplete();
        break;
    }
  }

  async showAutocomplete () {
    const query = this.elements.guessInput.value;
    if (query.length >= 2) {
      const results = await songManager.search(query);
      this.showAutocompleteResults(results);
    }
  }

  showAutocompleteResults (results) {
    if (results.length === 0) {
      this.hideAutocomplete();
      return;
    }

    this.elements.autocompleteDropdown.innerHTML = results.map(song => `
            <div class="autocomplete-item" data-display="${song.display}">
                <div class="song-name">${song.title}</div>
                <div class="artist-name">${song.artist}</div>
            </div>
        `).join('');

    this.elements.autocompleteDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', () => this.selectSong(item.dataset.display));
    });

    this.elements.autocompleteDropdown.classList.add('visible');
  }

  hideAutocomplete () {
    this.elements.autocompleteDropdown.classList.remove('visible');
  }

  selectSong (display) {
    this.selectedSong = songManager.getSongByDisplay(display);
    this.elements.guessInput.value = display;
    this.hideAutocomplete();
  }

  onDocumentClick (e) {
    if (!this.elements.autocompleteDropdown.contains(e.target) &&
            e.target !== this.elements.guessInput) {
      this.hideAutocomplete();
    }
  }

  async skip () {
    if (this.gameOver) return;

    spotifyPlayer.stop();

    this.attempts.push({
      type: 'skip',
      text: 'Saltat'
    });

    this.currentAttempt++;
    this.saveGameState();
    this.updateUI();

    if (this.currentAttempt > this.maxAttempts) {
      await this.endGame(false);
    }
  }

  async submit () {
    if (this.gameOver) return;

    const guess = this.elements.guessInput.value.trim();
    if (!guess) {
      this.elements.guessInput.classList.add('shake');
      setTimeout(() => this.elements.guessInput.classList.remove('shake'), 400);
      return;
    }

    spotifyPlayer.stop();

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess })
      });

      const result = await response.json();

      if (result.correct) {
        this.attempts.push({
          type: 'correct',
          text: guess
        });
        await this.endGame(true, result.song);
      } else {
        this.attempts.push({
          type: 'wrong',
          text: guess
        });
        this.currentAttempt++;
        this.elements.guessInput.value = '';
        this.selectedSong = null;
        this.saveGameState();
        this.updateUI();

        if (this.currentAttempt > this.maxAttempts) {
          await this.endGame(false);
        }
      }
    } catch (error) {
      console.error('Error verificant resposta:', error);
    }
  }

  async endGame (won, song = null) {
    this.gameOver = true;
    this.won = won;

    if (!song) {
      try {
        const response = await fetch('/api/reveal');
        song = await response.json();
      } catch (error) {
        console.error('Error obtenint la cançó:', error);
      }
    }

    // Actualitzar UI
    this.elements.guessSection.classList.add('hidden');
    this.elements.resultSection.classList.remove('hidden');

    if (won) {
      this.elements.resultSection.classList.add('won');
      this.elements.resultSection.classList.remove('lost');
      this.elements.resultIcon.textContent = '🎉';
      this.elements.resultTitle.textContent = 'Molt bé!';
    } else {
      this.elements.resultSection.classList.add('lost');
      this.elements.resultSection.classList.remove('won');
      this.elements.resultIcon.textContent = '😢';
      this.elements.resultTitle.textContent = 'No has encertat';
    }

    if (song) {
      this.elements.revealTitle.textContent = song.title;
      this.elements.revealArtist.textContent = song.artist;
      // Mostrar portada de l'àlbum
      if (song.album_image) {
        this.elements.albumArt.src = song.album_image;
      } else {
        this.elements.albumArt.style.display = 'none';
      }
    }

    // Guardar estadístiques
    this.saveStats(won, this.attempts.length);
    this.saveGameState();
    this.updateUI();
  }

  updateUI () {
    // Actualitzar segments d'intents
    this.elements.attemptSegments.forEach((segment, index) => {
      segment.classList.remove('current', 'skipped', 'wrong', 'correct');

      if (index < this.attempts.length) {
        const attempt = this.attempts[index];
        segment.classList.add(attempt.type);
      } else if (index === this.currentAttempt - 1 && !this.gameOver) {
        segment.classList.add('current');
      }
    });

    // Actualitzar historial d'intents
    this.elements.attemptsHistory.innerHTML = this.attempts.map((attempt, index) => `
            <div class="attempt-item ${attempt.type}">
                <span class="attempt-icon">
                    ${attempt.type === 'skip' ? '⏭️' : attempt.type === 'wrong' ? '❌' : '✅'}
                </span>
                <span class="attempt-text">${attempt.text}</span>
            </div>
        `).join('');

    // Actualitzar barra de progrés desbloqueada
    if (!this.gameOver) {
      const unlocked = spotifyPlayer.getUnlockedDuration(this.currentAttempt);
      const unlockedPercent = (unlocked / 30) * 100;
      this.elements.progressUnlocked.style.width = `${unlockedPercent}%`;
    }

    // Desactivar botons si el joc ha acabat
    if (this.gameOver) {
      this.elements.playBtn.disabled = true;
    }
  }

  // LocalStorage - Estat del joc
  getTodayKey () {
    const today = new Date();
    return `heardle_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  }

  saveGameState () {
    const state = {
      currentAttempt: this.currentAttempt,
      attempts: this.attempts,
      gameOver: this.gameOver,
      won: this.won
    };
    localStorage.setItem(this.getTodayKey(), JSON.stringify(state));
  }

  loadGameState () {
    const saved = localStorage.getItem(this.getTodayKey());
    if (saved) {
      const state = JSON.parse(saved);
      this.currentAttempt = state.currentAttempt;
      this.attempts = state.attempts;
      this.gameOver = state.gameOver;
      this.won = state.won;

      if (this.gameOver) {
        // Mostrar resultat si ja s'ha jugat avui
        setTimeout(() => this.showSavedResult(), 500);
      }
    }
  }

  async showSavedResult () {
    try {
      const response = await fetch('/api/reveal');
      const song = await response.json();
      await this.endGame(this.won, song);
    } catch (error) {
      console.error('Error mostrant resultat guardat:', error);
    }
  }

  // LocalStorage - Estadístiques
  getStatsKey () {
    return 'heardle_stats';
  }

  getStats () {
    const saved = localStorage.getItem(this.getStatsKey());
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      played: 0,
      won: 0,
      currentStreak: 0,
      maxStreak: 0,
      distribution: [0, 0, 0, 0, 0, 0]
    };
  }

  saveStats (won, attempts) {
    const stats = this.getStats();
    stats.played++;

    if (won) {
      stats.won++;
      stats.currentStreak++;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      stats.distribution[attempts - 1]++;
    } else {
      stats.currentStreak = 0;
    }

    localStorage.setItem(this.getStatsKey(), JSON.stringify(stats));
    this.updateStats();
  }

  updateStats () {
    const stats = this.getStats();

    document.getElementById('statPlayed').textContent = stats.played;
    document.getElementById('statWon').textContent = stats.won;
    document.getElementById('statStreak').textContent = stats.currentStreak;
    document.getElementById('statMaxStreak').textContent = stats.maxStreak;

    // Distribució
    const maxCount = Math.max(...stats.distribution, 1);
    const distributionHTML = stats.distribution.map((count, index) => {
      const width = (count / maxCount) * 100;
      return `
                <div class="distribution-row">
                    <span class="distribution-label">${index + 1}</span>
                    <div class="distribution-bar">
                        <div class="distribution-fill" style="width: ${Math.max(width, 8)}%">
                            ${count}
                        </div>
                    </div>
                </div>
            `;
    }).join('');

    document.getElementById('distributionBars').innerHTML = distributionHTML;
  }

  // Compartir
  share () {
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    let result = `🎵 Heardle Català ${dateStr}\n\n`;

    this.attempts.forEach(attempt => {
      if (attempt.type === 'skip') {
        result += '⬛';
      } else if (attempt.type === 'wrong') {
        result += '🟥';
      } else {
        result += '🟩';
      }
    });

    if (this.won) {
      result += `\n\nEncertat a l'intent ${this.attempts.length}/6! 🎉`;
    } else {
      result += '\n\nNo encertat 😢';
    }

    navigator.clipboard.writeText(result).then(() => {
      this.elements.shareCopied.classList.remove('hidden');
      setTimeout(() => {
        this.elements.shareCopied.classList.add('hidden');
      }, 2000);
    });
  }

  // Modals
  showModal (type) {
    if (type === 'stats') {
      this.updateStats();
      this.elements.statsModal.classList.remove('hidden');
    } else {
      this.elements.infoModal.classList.remove('hidden');
    }
  }

  hideModal (type) {
    if (type === 'stats') {
      this.elements.statsModal.classList.add('hidden');
    } else {
      this.elements.infoModal.classList.add('hidden');
    }
  }
}

// Iniciar l'aplicació quan el DOM estigui llest
document.addEventListener('DOMContentLoaded', () => {
  window.game = new HeardleGame();
});
