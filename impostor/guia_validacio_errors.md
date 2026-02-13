# 🔍 Sistema de Validació d'Errors - Paraules.js

## 🎯 Objectiu

Detectar **TOTS** els errors possibles abans que trenquin el joc en producció.

---

## ✅ Errors que Detecta

### 1. **Errors d'Estructura de Dades** 🏗️

#### ❌ WORDS no és un array
```javascript
// INCORRECTE
const WORDS = "això no és un array";

// ERROR DETECTAT:
// ❌ CRÍTIC: WORDS no és un array
```

#### ❌ CATEGORIES no és un array
```javascript
// INCORRECTE
const CATEGORIES = { animals: 0, menjar: 1 };

// ERROR DETECTAT:
// ❌ CRÍTIC: CATEGORIES no és un array
```

---

### 2. **Errors de Sintaxi en Paraules** 📝

#### ❌ Falta claudàtor `]`
```javascript
// INCORRECTE
["gos", 0, 0,
["gat", 0, 0],

// ERROR DETECTAT:
// ❌ Línia 234: No és un array (potser falta [ o ])
```

#### ❌ Falta coma `,`
```javascript
// INCORRECTE
["gos", 0, 0]
["gat", 0, 0],  // Falta coma a la línia anterior!

// ERROR DETECTAT:
// ❌ CRÍTIC: Uncaught SyntaxError
```

#### ❌ Paraula no és un string
```javascript
// INCORRECTE
[123, 0, 0],  // La paraula és un número!

// ERROR DETECTAT:
// ❌ Línia 45: La paraula "123" no és un string (tipus: number)
```

#### ❌ Paraula buida
```javascript
// INCORRECTE
["", 0, 0],

// ERROR DETECTAT:
// ❌ Línia 67: Paraula buida (string buit)
```

#### ❌ Espais al principi o final
```javascript
// INCORRECTE
[" gos ", 0, 0],
["gat  ", 0, 0],

// ERROR DETECTAT:
// ❌ Línia 89: Paraula " gos " té espais al principi o final
```

---

### 3. **Errors de Categories** 🏷️

#### ❌ Categoria no és un número
```javascript
// INCORRECTE
["gos", "animals", 0],  // "animals" hauria de ser 0

// ERROR DETECTAT:
// ❌ Línia 123: Categoria "animals" no és un número (paraula: "gos")
```

#### ❌ Categoria fora de rang
```javascript
// INCORRECTE
["gos", 99, 0],  // Només hi ha 8 categories (0-7)

// ERROR DETECTAT:
// ❌ Línia 156: Categoria 99 fora de rang (0-7) (paraula: "gos")
```

#### ❌ Categoria negativa
```javascript
// INCORRECTE
["gos", -1, 0],

// ERROR DETECTAT:
// ❌ Línia 178: Categoria -1 fora de rang (0-7) (paraula: "gos")
```

#### ❌ Categoria decimal
```javascript
// INCORRECTE
["gos", 1.5, 0],

// ERROR DETECTAT:
// ❌ Línia 201: Categoria 1.5 no és un número enter (paraula: "gos")
```

---

### 4. **Errors de Dificultat** 📊

#### ❌ Dificultat no és un número
```javascript
// INCORRECTE
["gos", 0, "fàcil"],  // "fàcil" hauria de ser 0

// ERROR DETECTAT:
// ❌ Línia 234: Dificultat "fàcil" no és un número (paraula: "gos")
```

#### ❌ Dificultat fora de rang
```javascript
// INCORRECTE
["gos", 0, 5],  // Només hi ha 3 dificultats (0-2)

// ERROR DETECTAT:
// ❌ Línia 267: Dificultat 5 fora de rang (0-2) (paraula: "gos")
```

---

### 5. **Errors de Longitud d'Array** 📏

#### ❌ Massa elements
```javascript
// INCORRECTE
["gos", 0, 0, "extra"],  // 4 elements en lloc de 3

// ERROR DETECTAT:
// ❌ Línia 289: Ha de tenir 3 elements [paraula, categoria, dificultat], té 4
```

#### ❌ Pocs elements
```javascript
// INCORRECTE
["gos", 0],  // Falta la dificultat

// ERROR DETECTAT:
// ❌ Línia 312: Ha de tenir 3 elements [paraula, categoria, dificultat], té 2
```

---

### 6. **Duplicats** 🔄

#### ❌ Paraula repetida
```javascript
// INCORRECTE
["gos", 0, 0],
// ... 50 paraules després ...
["gos", 0, 1],  // Duplicat!

// ERROR DETECTAT:
// ❌ 1 duplicat(s) detectat(s):
//    - "gos" (línia 365)
```

---

### 7. **Advertències (no crítics)** ⚠️

#### ⚠️ Paraula molt llarga
```javascript
// ACCEPTABLE però sospitós
["desenvolupador/desenvolupadora de programari", 5, 1],  // 46 caràcters

// ADVERTÈNCIA:
// ⚠️ Línia 401: Paraula molt llarga "desenvolupador/..." (46 caràcters)
```

#### ⚠️ Caràcters estranys
```javascript
// ACCEPTABLE però sospitós
["pa<ís>", 4, 0],  // Té < i >

// ADVERTÈNCIA:
// ⚠️ Línia 423: Paraula "pa<ís>" conté caràcters estranys
```

#### ⚠️ Espais múltiples
```javascript
// ACCEPTABLE però sospitós
["pa  amb  tomàquet", 1, 1],  // Espais dobles

// ADVERTÈNCIA:
// ⚠️ Línia 445: Paraula "pa  amb  tomàquet" té espais múltiples
```

#### ⚠️ Categoria amb poques paraules
```javascript
// Si una categoria té menys de 30 paraules

// ADVERTÈNCIA:
// ⚠️ Categoria "esports" té poques paraules (15)
```

#### ⚠️ Categoria sense paraules fàcils
```javascript
// Si una categoria només té paraules mitges i difícils

// ADVERTÈNCIA:
// ⚠️ Categoria "cultura" no té paraules fàcils
```

---

## 📊 Exemple de Sortida de Validació

### ✅ Cas: Tot Correcte
```
============================================================
🔍 VALIDACIÓ COMPLETA DEL FITXER DE PARAULES
============================================================

📋 1. VALIDANT ESTRUCTURA BÀSICA...
✅ Estructura bàsica correcta

📝 2. VALIDANT CADA PARAULA...
✅ Totes les 643 paraules tenen estructura correcta

🔄 3. VERIFICANT DUPLICATS...
✅ Cap duplicat detectat

📊 4. ESTADÍSTIQUES PER CATEGORIA
============================================================

🏷️  ANIMALS
   Fàcil: 45 | Mitjà: 23 | Difícil: 18
   📦 Total: 86 paraules

🏷️  MENJAR
   Fàcil: 42 | Mitjà: 33 | Difícil: 18
   📦 Total: 93 paraules

[... més categories ...]

============================================================
🎯 TOTAL: 643 paraules en 8 categories
============================================================

📏 5. PARAULES EXTREMES

📏 5 paraules més llargues:
   - "desenvolupador/desenvolupadora" (33 caràcters)
   - "dissenyador/dissenyadora UX" (29 caràcters)
   - "mandonguilles amb sípia" (24 caràcters)
   - "escudella i carn d'olla" (23 caràcters)
   - "metge/metgessa" (15 caràcters)

📏 5 paraules més curtes:
   - "pa" (2 caràcters)
   - "ou" (2 caràcters)
   - "pi" (2 caràcters)
   - "gos" (3 caràcters)
   - "gat" (3 caràcters)

============================================================
🎯 RESUM DE LA VALIDACIÓ
============================================================

✅ VALIDACIÓ CORRECTA: Cap error crític
✅ Cap advertència

============================================================
🎉 PERFECTE! El fitxer està impecable!
============================================================
```

### ❌ Cas: Amb Errors
```
============================================================
🔍 VALIDACIÓ COMPLETA DEL FITXER DE PARAULES
============================================================

📋 1. VALIDANT ESTRUCTURA BÀSICA...
✅ Estructura bàsica correcta

📝 2. VALIDANT CADA PARAULA...
❌ S'han trobat 3 errors d'estructura

🔄 3. VERIFICANT DUPLICATS...
❌ 1 duplicat(s) detectat(s):
   - "gos" (línia 234)

[... estadístiques ...]

============================================================
🎯 RESUM DE LA VALIDACIÓ
============================================================

❌ VALIDACIÓ FALLIDA: 4 error(s) crític(s)

🔴 ERRORS CRÍTICS:
   ❌ Línia 156: Categoria 99 fora de rang (0-7) (paraula: "elefant")
   ❌ Línia 234: Paraula " gos " té espais al principi o final
   ❌ Línia 401: Dificultat "fàcil" no és un número (paraula: "pizza")
   ❌ 1 duplicat(s): "gos"

⚠️  2 advertència(s):
   ⚠️ Línia 501: Paraula molt llarga "desenvolupador..." (46 caràcters)
   ⚠️ Categoria "esports" té poques paraules (12)

============================================================
❌ El fitxer té errors que han de ser corregits
============================================================
```

---

## 🔧 Com Utilitzar la Validació

### 1. **Mode Desenvolupament (Localhost)**

Simplement obre el joc en `localhost` i mira la consola (F12):

```javascript
// S'executa automàticament
// Mostra tots els detalls
```

### 2. **Mode Producció**

Validació silenciosa. Només mostra errors crítics:

```javascript
// Si hi ha errors:
⚠️ Error en el fitxer de paraules. Contacta amb l'administrador.
```

### 3. **Validació Manual**

Des de la consola del navegador:

```javascript
// Executar validació completa
validarParaules();

// Comprovar una paraula específica
getParaulaAleatoria("cultura", "difícil");
```

---

## 🎯 Beneficis del Sistema

### ✅ Preveu Errors en Producció
- El joc no es trencarà mai per un error de paraules
- Els usuaris no veuran errors estranys

### ✅ Feedback Immediat
- Saps exactament quina línia té el problema
- Saps exactament quin és el problema

### ✅ Facilita l'Edició
- Pots afegir paraules amb confiança
- La validació t'avisa immediatament

### ✅ Manteniment Fàcil
- Qualsevol col·laborador pot afegir paraules
- El sistema evita que introdueixin errors

---

## 📋 Checklist per Afegir Paraules

Abans de fer commit, comprova:

- [ ] Obre el joc en localhost
- [ ] Obre la consola (F12)
- [ ] Verifica que surt: `✅ VALIDACIÓ CORRECTA`
- [ ] Si hi ha errors, corregeix-los
- [ ] Torna a comprovar
- [ ] Fes commit

---

## 🚨 Què Fer si Trobes Errors

1. **Obre la consola** del navegador (F12)
2. **Llegeix el missatge d'error** - diu exactament què va malament
3. **Ves a la línia indicada** del fitxer `paraules.js`
4. **Corregeix l'error**
5. **Refresca la pàgina** i torna a comprovar

---

## 🎓 Errors Comuns i Solucions

| Error | Causa | Solució |
|-------|-------|---------|
| `No és un array` | Falta `[` o `]` | Afegir claudàtors |
| `Falta coma` | Copiar/enganxar mal | Afegir `,` al final |
| `No és un número` | Categoria com string | Canviar `"0"` per `0` |
| `Fora de rang` | Número incorrecte | Usar 0-7 (categories) o 0-2 (dificultat) |
| `Espais al final` | Error de formatació | Fer trim de la paraula |
| `Duplicat` | Paraula repetida | Eliminar duplicat o canviar-la |

---

**Amb aquest sistema, el fitxer de paraules és a prova de bombes!** 💪🔒
