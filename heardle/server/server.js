const express = require('express');

// Client del portal central (opcional)
let portalClient = null;
try {
  portalClient = require('../../jocs-portal/lib/portal-client');
  console.log('[Heardle] Portal client carregat');
} catch (e) {
  console.log('[Heardle] Portal client no disponible, usant mode local');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Cache per a les cançons de Deezer
const trackCache = new Map();

// Cache de la cançó del dia del portal
let cachedPortalSong = null;
let cachedPortalDate = null;

// Cercar una cançó a Deezer
async function searchDeezer (title, artist) {
  const cacheKey = `${title}-${artist}`;
  if (trackCache.has(cacheKey)) {
    return trackCache.get(cacheKey);
  }

  try {
    const query = encodeURIComponent(`${title} ${artist}`);
    const response = await fetch(`https://api.deezer.com/search?q=${query}&limit=1`);

    if (!response.ok) {
      console.error('Error cercant a Deezer:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const track = data.data[0];
      const trackInfo = {
        preview_url: track.preview,
        album_image: track.album?.cover_medium || track.album?.cover || null,
        deezer_id: track.id
      };
      trackCache.set(cacheKey, trackInfo);
      return trackInfo;
    }

    return null;
  } catch (error) {
    console.error('Error cercant a Deezer:', error);
    return null;
  }
}

// Carregar cançons
const songs = require('../data/songs.json');

// Obtenir la cançó del dia (determinada per la data) - versió local
function getSongOfDayLocal () {
  const today = new Date();
  const startDate = new Date('2024-01-01');
  const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const songIndex = daysDiff % songs.length;
  return songs[songIndex];
}

// Obtenir la cançó del dia (des del portal o local)
async function getSongOfDay () {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Comprovar cache
  if (cachedPortalSong && cachedPortalDate === todayStr) {
    return cachedPortalSong;
  }

  // Intentar obtenir del portal
  if (portalClient) {
    const localFallback = () => getSongOfDayLocal();

    const content = await portalClient.getTodayContent('heardle', localFallback);
    if (content && content.source === 'portal') {
      cachedPortalSong = { title: content.title, artist: content.artist };
      cachedPortalDate = todayStr;
      return cachedPortalSong;
    }
    return localFallback();
  }

  // Sense portal client, usar dades locals
  return getSongOfDayLocal();
}

// Endpoint per obtenir la cançó del dia
app.get('/api/song-of-day', async (req, res) => {
  try {
    const song = await getSongOfDay();

    // Cercar la cançó a Deezer per obtenir la preview
    const trackInfo = await searchDeezer(song.title, song.artist);

    if (!trackInfo || !trackInfo.preview_url) {
      return res.status(404).json({
        error: 'Aquesta cançó no té preview disponible',
        title: song.title,
        artist: song.artist
      });
    }

    // Només enviem la preview_url (no el títol ni artista!)
    res.json({
      preview_url: trackInfo.preview_url
    });
  } catch (error) {
    console.error('Error obtenint cançó del dia:', error);
    res.status(500).json({ error: 'No s\'ha pogut obtenir la cançó del dia' });
  }
});

// Endpoint per verificar la resposta
app.post('/api/verify', async (req, res) => {
  const { guess } = req.body;
  const song = await getSongOfDay();

  // Normalitzar les respostes per comparar
  const normalize = (str) => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[·]/g, '')
    .trim();

  const normalizedGuess = normalize(guess);
  const normalizedTitle = normalize(song.title);
  const normalizedArtist = normalize(song.artist);
  const fullAnswer = `${normalizedTitle} - ${normalizedArtist}`;

  // Comprovar si la resposta és correcta
  const isCorrect = normalizedGuess === fullAnswer ||
                      normalizedGuess === normalizedTitle ||
                      (normalizedGuess.includes(normalizedTitle) && normalizedGuess.includes(normalizedArtist.split(' ')[0]));

  if (isCorrect) {
    const trackInfo = await searchDeezer(song.title, song.artist);
    res.json({
      correct: true,
      song: {
        title: song.title,
        artist: song.artist,
        album_image: trackInfo?.album_image || null
      }
    });
  } else {
    res.json({ correct: false });
  }
});

// Endpoint per obtenir la resposta (quan s'acaba el joc)
app.get('/api/reveal', async (req, res) => {
  const song = await getSongOfDay();
  const trackInfo = await searchDeezer(song.title, song.artist);

  res.json({
    title: song.title,
    artist: song.artist,
    album_image: trackInfo?.album_image || null
  });
});

// Endpoint per obtenir totes les cançons locals (per l'autocomplete inicial)
app.get('/api/songs', (req, res) => {
  // Enviem només títol i artista per l'autocomplete
  const songList = songs.map(s => ({
    title: s.title,
    artist: s.artist,
    display: `${s.title} - ${s.artist}`
  }));
  res.json(songList);
});

// Endpoint per cercar cançons a Deezer en temps real
app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  if (!query || query.length < 2) {
    return res.json([]);
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`https://api.deezer.com/search?q=${encodedQuery}&limit=10`);

    if (!response.ok) {
      return res.json([]);
    }

    const data = await response.json();

    if (!data.data) {
      return res.json([]);
    }

    // Formatejar resultats
    const results = data.data.map(track => ({
      title: track.title,
      artist: track.artist.name,
      display: `${track.title} - ${track.artist.name}`
    }));

    res.json(results);
  } catch (error) {
    console.error('Error cercant a Deezer:', error);
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Heardle Català executant-se a http://localhost:${PORT}`);
  console.log(`Cançons carregades: ${songs.length}`);
  console.log('Usant API de Deezer (sense autenticació)');
});
