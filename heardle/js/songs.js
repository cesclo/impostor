// Gestió de la llista de cançons
class SongManager {
  constructor () {
    this.songs = [];
    this.loaded = false;
    this.searchTimeout = null;
  }

  async loadSongs () {
    try {
      const response = await fetch('/api/songs');
      if (!response.ok) throw new Error('Error carregant cançons');
      this.songs = await response.json();
      this.loaded = true;
      return this.songs;
    } catch (error) {
      console.error('Error carregant la llista de cançons:', error);
      return [];
    }
  }

  // Cerca local (en les cançons carregades)
  searchLocal (query) {
    if (!query || query.length < 2) return [];

    const normalizedQuery = this.normalize(query);

    return this.songs
      .filter(song => {
        const normalizedTitle = this.normalize(song.title);
        const normalizedArtist = this.normalize(song.artist);
        const normalizedDisplay = this.normalize(song.display);

        return normalizedTitle.includes(normalizedQuery) ||
                       normalizedArtist.includes(normalizedQuery) ||
                       normalizedDisplay.includes(normalizedQuery);
      })
      .slice(0, 5);
  }

  // Cerca online a Deezer
  async searchOnline (query) {
    if (!query || query.length < 2) return [];

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) return [];
      const results = await response.json();
      return results.slice(0, 8);
    } catch (error) {
      console.error('Error cercant online:', error);
      return [];
    }
  }

  // Cerca combinada: primer local, després online
  async search (query) {
    if (!query || query.length < 2) return [];

    // Primer cerquem localment
    const localResults = this.searchLocal(query);

    // Després cerquem online
    const onlineResults = await this.searchOnline(query);

    // Combinem resultats (locals primer, després online sense duplicats)
    const combined = [...localResults];
    const localDisplays = new Set(localResults.map(s => this.normalize(s.display)));

    for (const result of onlineResults) {
      if (!localDisplays.has(this.normalize(result.display))) {
        combined.push(result);
      }
    }

    return combined.slice(0, 10);
  }

  normalize (str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina accents
      .replace(/[·]/g, '') // Elimina punt volat
      .trim();
  }

  getSongByDisplay (display) {
    return this.songs.find(song => song.display === display) ||
               { title: display.split(' - ')[0], artist: display.split(' - ')[1] || '', display };
  }
}

// Instància global
const songManager = new SongManager(); // eslint-disable-line no-unused-vars
