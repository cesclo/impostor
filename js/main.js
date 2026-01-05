let jugadors = [];
let paraula = "";
let impostors = [];
let indexActual = 0;
let jocActiu = false;
let pantallaAnterior = "pantalla1";
let historialParaules = {}; // ex: { "animal": ["gat", "serp", ...] }

const MAX_MEMORIA = 5;

function configurarNoms() {
  const n = parseInt(document.getElementById("numJugadors").value);
  if (isNaN(n) || n < 3) {
    alert("Hi ha d’haver entre 3 o més juadors.");
    return;
  }
  const div = document.getElementById("inputsNoms");
  div.innerHTML = "";
  for (let i = 1; i <= n; i++) {
    const placeholder = `Jugador ${i}`;
    div.innerHTML += `
      <input type="text" 
             id="nom${i}" 
             value="${placeholder}"
             placeholder="${placeholder}"
             autocomplete="off"
             autocapitalize="words"
             onfocus="netejarPlaceholder(this, '${placeholder}')"
             onblur="restaurarPlaceholder(this, '${placeholder}')">
    `;
  }
  canviarPantalla("pantalla2");
}

function netejarPlaceholder(input, placeholder) {
  if (input.value === placeholder) input.value = "";
}

function restaurarPlaceholder(input, placeholder) {
  if (input.value.trim() === "") input.value = placeholder;
}

function començarJoc() {
  const n = parseInt(document.getElementById("numJugadors").value);
  jugadors = [];
  for (let i = 1; i <= n; i++) {
    const input = document.getElementById(`nom${i}`);
    const val = input.value.trim();
    const nom = val === "" || val.startsWith("Jugador ") ? `Jugador ${i}` : val;
    jugadors.push(nom);
  }
  canviarPantalla("pantalla3");
}

function actualitzarParaulaInput() {
  const sel = document.getElementById("categoria");
  const input = document.getElementById("paraulaPers");
  if (sel.value && WORDS_CATALA[sel.value]) {
    input.value = "";
    input.placeholder = `S’usarà una paraula de "${sel.options[sel.selectedIndex].text}"`;
  } else {
    input.placeholder = "O escriu una paraula secreta...";
  }
}

function prepararRols() {
  const cat = document.getElementById("categoria").value;
  const paraulaPers = document.getElementById("paraulaPers").value.trim();
  const numImpostorsInput = document.getElementById("numImpostors").value;
  const impostorSapCategoria = document.getElementById("impostorSapCategoria").checked;

  // Validar nombre d’impostors
  const numImpostors = Math.min(
    Math.max(parseInt(numImpostorsInput) || 1, 1),
    jugadors.length - 1
  );

  let paraulaFinal = "";
  let categoriaFinal = ""; // això és clau

  if (paraulaPers) {
    // Paraules introduïdes per l'usuari
    paraulaFinal = paraulaPers;
    categoriaFinal = ""; // cap categoria
  } else {
    // Triar categoria (manual o aleatòria)
    let categoriaTriada = cat;
    if (!categoriaTriada || !WORDS_CATALA[categoriaTriada]) {
      const categories = Object.keys(WORDS_CATALA);
      if (categories.length > 0) {
        categoriaTriada = categories[Math.floor(Math.random() * categories.length)];
      } else {
        paraulaFinal = "error mots";
        categoriaFinal = "";
      }
    }

    if (categoriaTriada && WORDS_CATALA[categoriaTriada]) {
      const llista = WORDS_CATALA[categoriaTriada];
      const usades = historialParaules[categoriaTriada] || [];
      let candidates = llista.filter(p => !usades.includes(p));
      if (candidates.length === 0) {
        historialParaules[categoriaTriada] = [];
        candidates = llista;
      }
      paraulaFinal = candidates[Math.floor(Math.random() * candidates.length)];
      historialParaules[categoriaTriada] = [...usades, paraulaFinal].slice(-MAX_MEMORIA);
      categoriaFinal = categoriaTriada; // ⬅️ AQUÍ es guarda sempre si ve d’una categoria (manual o aleatòria)
    } else if (!paraulaFinal) {
      paraulaFinal = "error mots";
      categoriaFinal = "";
    }
  }

  // Assignar globalment
  paraula = paraulaFinal;
  window.categoriaActual = categoriaFinal;
  window.impostorSapCategoria = impostorSapCategoria;

  // Triar impostors
  const còpiaJugadors = [...jugadors];
  impostors = [];
  for (let i = 0; i < numImpostors; i++) {
    const idx = Math.floor(Math.random() * còpiaJugadors.length);
    impostors.push(còpiaJugadors.splice(idx, 1)[0]);
  }

  indexActual = 0;
  jocActiu = true;

  // Reiniciar interfície
  const btnVeure = document.getElementById("btnVeure");
  const btnSeguent = document.getElementById("btnSeguent");
  const rolInfo = document.getElementById("rolInfo");
  if (btnVeure && btnSeguent) {
    btnVeure.classList.remove("amagant");
    btnVeure.classList.add("actiu");
    btnSeguent.classList.remove("actiu");
    btnSeguent.classList.remove("amagant");
  }
  if (rolInfo) {
    rolInfo.innerHTML = "";
    rolInfo.className = "";
    rolInfo.classList.remove("mostrat");
  }

  canviarPantalla("pantalla4");
  actualitzarInstruccio();
}

function mostrarRolActual() {
  if (!jocActiu) return;

  const nom = jugadors[indexActual];
  const esImpostor = impostors.includes(nom);
  const rolInfo = document.getElementById("rolInfo");

  if (esImpostor) {
    let missatge = `<i class="fas fa-user-secret fa-2x"></i><br>`;
    if (window.impostorSapCategoria && window.categoriaActual) {
      // Buscar nom amigable de la categoria
      const select = document.getElementById("categoria");
      const opt = Array.from(select.options).find(o => o.value === window.categoriaActual);
      const nomCategoria = opt ? opt.text : window.categoriaActual;
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l’<strong>IMPOSTOR</strong>!</span><br>
                   <small>Saps que la paraula és de la categoria:<br><strong>${nomCategoria}</strong></small>`;
    } else if (window.impostorSapCategoria && !window.categoriaActual) {
      // Paraula personalitzada → impostor sap que és inventada
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l’<strong>IMPOSTOR</strong>!</span><br>
                   <small>Saps que la paraula és <strong>inventada</strong> (no pertany a cap categoria).</small>`;
    } else {
      // No sap res
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l’<strong>IMPOSTOR</strong>!</span><br>
                   <small>No saps ni la paraula ni la categoria.</small>`;
    }
    rolInfo.innerHTML = missatge;
    rolInfo.className = "rol-impostor";
  } else {
    rolInfo.innerHTML = `
      <i class="fas fa-key fa-2x"></i><br>
      La paraula secreta és:<br>
      <span style="font-size: 1.6em; color: var(--color-innocent);">${paraula}</span>
    `;
    rolInfo.className = "rol-innocent";
  }

  rolInfo.classList.add("mostrat");

  const btnVeure = document.getElementById("btnVeure");
  const btnSeguent = document.getElementById("btnSeguent");
  btnVeure.classList.remove("actiu");
  btnVeure.classList.add("amagant");
  setTimeout(() => {
    btnVeure.classList.remove("amagant");
    btnSeguent.classList.add("actiu");
  }, 300);
}

function següentJugador() {
  if (!jocActiu) return;

  document.getElementById("rolInfo").classList.remove("mostrat");
  indexActual++;

  if (indexActual >= jugadors.length) {
    jocActiu = false;
    canviarPantalla("pantalla5");
    return;
  }

  const btnVeure = document.getElementById("btnVeure");
  const btnSeguent = document.getElementById("btnSeguent");
  btnSeguent.classList.remove("actiu");
  btnSeguent.classList.add("amagant");
  setTimeout(() => {
    btnSeguent.classList.remove("amagant");
    btnVeure.classList.add("actiu");
  }, 300);

  actualitzarInstruccio();
}

function actualitzarInstruccio() {
  if (!jocActiu) return;
  const nom = jugadors[indexActual];
  document.getElementById("instruccio").innerHTML = `Passa el mòbil a <strong>${nom}</strong>`;
}

function canviarPantalla(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function mostrarGuia() {
  const pantallaAnterior = document.querySelector('.screen.active').id;
  canviarPantalla("pantallaGuia");
}

function tornarAPantallaAnterior() {
  canviarPantalla(pantallaAnterior);
}

function novaPartida() {
  // Ara no anem directament a pantalla1, sinó a una pantalla intermèdia
  // (has d'afegir aquesta pantalla al teu HTML – veure més avall)
  canviarPantalla("pantallaNovaPartida");
}

function reutilitzarJugadors() {
  // Mantenim els jugadors actuals
  document.getElementById("categoria").value = "";
  document.getElementById("paraulaPers").value = "";
  canviarPantalla("pantalla3");
}

function novaConfiguracio() {
  // Reiniciar tot
  jugadors = [];
  jocActiu = false;
  historialParaules = {}; // Opcional: pots esborrar-ho o mantenir-lo
  document.getElementById("numJugadors").value = "5";
  document.getElementById("categoria").value = "";
  document.getElementById("paraulaPers").value = "";
  canviarPantalla("pantalla1");
}

// Gestió bàsica del viewport mòbil (ajust opcional des d’aquí, però recomanat al HTML)
document.addEventListener('touchmove', e => {
  if (e.scale !== 1) e.preventDefault();
}, { passive: false });