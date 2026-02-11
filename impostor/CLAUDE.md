# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**L'impostor** is a Catalan-language social deduction party game (similar to Spyfall/Infiltrator). Players pass a mobile device to receive secret roles - most learn a secret word while one or more "impostors" don't know it. Players give clues without revealing the word, then vote to identify the impostor.

Key characteristics:
- 100% client-side (no backend, no cookies, no tracking)
- Zero external dependencies (no CDN, no frameworks, no third-party libraries)
- Mobile-first design optimized for device passing
- All content in Catalan

## Repository Structure

- **`repo/`** - Main production codebase (deployed to impostor.whym.cat)
- **`v1.0/` through `v1.3/`** - Version snapshots for reference

## Development

### Running Locally

Open `repo/index.html` directly in a browser, or serve via any local HTTP server:
```bash
# Python
python -m http.server 8000 --directory repo

# Node
npx serve repo
```

When running on `localhost` or `127.0.0.1`, the word validation system runs automatically and outputs detailed diagnostics to the browser console.

### File Structure (repo/)

```
repo/
├── index.html       # Single-page app with all screens
├── css/estil.css    # All styles, CSS custom properties for theming
├── js/
│   ├── main.js      # Game logic and screen transitions
│   └── paraules.js  # Word database and validation system
└── [assets]         # favicon, manifest, sitemap, etc.
```

## Architecture

### Screen Flow System

The app uses a multi-screen single-page architecture with lateral slide transitions. Screens are defined as `<div class="screen">` elements in `index.html` and controlled by `canviarPantalla(nouId)` in `main.js`.

Screen progression: `pantalla1` (player count) → `pantalla2` (names) → `pantalla3` (word selection) → `pantalla4` (role distribution) → `pantalla5` (game start) → `pantallaNovaPartida` (replay options)

### Word Data Format (paraules.js)

Words are stored as tuples in the `WORDS` array:
```javascript
["paraula", categoryIndex, difficultyIndex]
// Example: ["gos", 0, 0] = word "gos", category 0 (animals), difficulty 0 (easy)
```

Categories (0-7): animals, menjar, objectes, natura, llocs, professions, cultura, esports
Difficulties (0-2): fàcil, mitja, difícil

### Word Validation System

`paraules.js` includes a comprehensive validation function `validarParaules()` that runs automatically in development mode. It checks:
- Array structure integrity
- Valid category/difficulty indices
- Duplicates
- Whitespace issues
- Word length warnings

Run `validarParaules()` in browser console to validate manually. See `guia_validacio_errors.md` for detailed error documentation.

### Key Global Variables (main.js)

- `jugadors[]` - Player names array
- `paraula` - Current secret word
- `impostors[]` - Names of impostor players
- `indexActual` - Current player index during role distribution
- `jocActiu` - Game state flag
- `historialParaules{}` - Tracks recently used words per category (avoids repeats)

## Adding New Words

1. Add entries to `WORDS` array in `paraules.js` following the tuple format
2. Open the game on localhost and check browser console for validation results
3. Ensure validation shows "VALIDACIO CORRECTA" before committing

## Language

All UI text, code comments, variable names, and word content are in Catalan. Maintain this convention when making changes.
