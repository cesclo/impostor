# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**L'impostor** is a social deduction party game in Catalan where players try to identify who doesn't know the secret word. It's a 100% frontend game (no backend) designed to be played by passing a single device between players.

**Key features:**
- 3+ players (ideal for groups)
- Pass-and-play on a single device
- Secret word from categories or custom input
- Configurable impostor count and difficulty
- Zero tracking, zero cookies, 100% privacy-focused
- Fully offline-capable (no external dependencies)

**URL:** https://impostor.whym.cat

## Architecture

**Stack:** Pure vanilla JavaScript, HTML5, CSS3 - no frameworks, no build tools, no external dependencies

**Files:**
- `index.html` - Single-page app with all game screens
- `css/estil.css` - Dark theme styling with CSS variables
- `js/main.js` - Game logic and UI management
- `js/paraules.js` - Word database with categories and validation system
- `guia_validacio_errors.md` - Error validation guide for word database

**SEO & Meta:**
- Open Graph tags for social sharing
- Schema.org structured data
- Sitemap, robots.txt, manifest.json
- Apple touch icon, favicon

## Game Flow

1. **Setup (Screen 1-3)**
   - Choose number of players (minimum 3)
   - Enter player names (optional)
   - Select category or enter custom word
   - Configure impostor count and category hint option

2. **Role Assignment (Screen 4)**
   - Players pass device one by one
   - Each sees their role: citizen (sees word) or impostor (sees "IMPOSTOR")
   - Impostors may see category hint if enabled

3. **Discussion Phase**
   - Players give clues without saying the word
   - Impostors try to blend in

4. **Voting (Screen 5)**
   - Everyone points to their suspect
   - If impostor eliminated: citizens win
   - If citizen eliminated: continue without them
   - Game continues until impostor found or only impostors remain

5. **Results (Screen 6)**
   - Shows who was impostor
   - Option to play again or change settings

## Word Database (`js/paraules.js`)

### Structure

```javascript
const WORDS = [
  ["paraula", categoryIndex, difficultyLevel],
  // ...
];

const CATEGORIES = [
  "Animals",
  "Menjar i begudes",
  "Professions",
  // ... 19 total categories
];
```

### Categories (19 total)

0. Animals, 1. Menjar i begudes, 2. Professions, 3. Objectes de casa, 4. Esports i oci, 5. Accions/Verbs, 6. Natura, 7. Tecnologia, 8. Sentiments, 9. Ciutat i transport, 10. Roba i accessoris, 11. Arts i cultura, 12. Educació, 13. Salut, 14. Celebracions, 15. Personatges ficticis, 16. Ciència, 17. Paraules compostes, 18. Expressions catalanes

### Difficulty Levels

- `0` = Easy (common words)
- `1` = Medium
- `2` = Hard (rare/complex words)

### Validation System

Built-in validation detects:
- Structural errors (WORDS/CATEGORIES not arrays)
- Syntax errors (missing brackets, commas)
- Invalid entries (not arrays, wrong length)
- Duplicate words
- Invalid category/difficulty indices
- Empty/whitespace words
- Words used as category names

See `guia_validacio_errors.md` for full validation details.

## Key Features

### Privacy & Security
- 🔒 No server, no database, no user data collection
- 🛡️ Zero cookies, zero tracking
- ✅ All game logic runs locally in browser
- ✅ No external scripts or libraries (100% self-hosted)
- ✅ Works fully offline after first load

### UX Features
- Toast notifications for errors
- Screen navigation with history
- Word memory system (tracks last 5 words to avoid repetition)
- Responsive design (mobile-first)
- Dark theme with high contrast

### Accessibility
- Clear visual feedback
- Large touch targets
- Simple, intuitive UI
- Catalan language throughout

## License

CC BY-NC-SA 4.0 (Creative Commons Attribution-NonCommercial-ShareAlike 4.0)

**Can:**
- Copy and share freely
- Modify and adapt
- Use in schools, family gatherings, cultural events

**Cannot:**
- Commercial use (selling, paid products)

**Must:**
- Credit original author: _Cervesa WHYM_
- Link to this project
- License derivatives under same license

## Language

All UI text, comments, variable names are in **Catalan**.

## Related Projects

- `impostor2` - Multiplayer online version with Socket.IO and real-time sync
- Other games at https://jocs.whym.cat

## Development

No build process needed! Simply:

1. Clone repo
2. Open `index.html` in browser
3. Or serve with any static server

For testing word validation:
```javascript
// Run validation in browser console after loading paraules.js
validateWordsDatabase();
```

## Hosting

- Production: https://impostor.whym.cat
- Development: Open `index.html` locally or `python -m http.server`

## Contact

**Cervesa WHYM** - https://www.whym.cat
- Email: cervesa@whym.cat
- GitHub: @cesclo
