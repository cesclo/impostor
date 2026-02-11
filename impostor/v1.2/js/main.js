let jugadors = [];
let paraula = "";
let impostor = "";
let indexActual = 0;
let jocActiu = false;
let pantallaAnterior = "pantalla1";

let historialParaules = {}; // ex: { "animal": ["gat", "serp", ...] }
const MAX_MEMORIA = 5;

function configurarNoms() {
  const n = parseInt(document.getElementById("numJugadors").value);
  if (isNaN(n) || n < 3 || n > 10) {
    alert("Hi ha d’haver entre 3 i 10 jugadors.");
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

  if (paraulaPers) {
    paraula = paraulaPers;
  } else {
    let categoriaTriada = cat;

    if (!categoriaTriada || !WORDS_CATALA[categoriaTriada]) {
      const categories = Object.keys(WORDS_CATALA);
      if (categories.length > 0) {
        categoriaTriada = categories[Math.floor(Math.random() * categories.length)];
      } else {
        paraula = "error mots";
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

      paraula = candidates[Math.floor(Math.random() * candidates.length)];
      historialParaules[categoriaTriada] = [...usades, paraula].slice(-MAX_MEMORIA);
    } else {
      paraula = "error mots";
    }
  }

  impostor = jugadors[Math.floor(Math.random() * jugadors.length)];
  indexActual = 0;
  jocActiu = true;

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
  const rolInfo = document.getElementById("rolInfo");
  
  if (nom === impostor) {
    rolInfo.innerHTML = `
      <i class="fas fa-user-secret fa-2x"></i><br>
      <span style="font-size: 1.4em;">🚨 Ets l’<strong>INFLITRAT</strong>!</span><br>
      <small>No saps la paraula secreta.</small>
    `;
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
  if (id !== "pantallaGuia") {
    pantallaAnterior = document.querySelector('.screen.active').id;
  }

  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function mostrarGuia() {
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