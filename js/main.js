let jugadors = [];
let paraula = "";
let impostors = [];
let indexActual = 0;
let jocActiu = false;
let pantallaAnterior = "pantalla1";
let historialParaules = {};

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
  const paraulaInput = document.getElementById("paraulaPers");
  const categoriaInput = document.getElementById("categoriaPers");
  const filtresDiv = document.getElementById("filtresDificultat");

  const valor = sel.value;

  if (valor === "__personalitzat__") {
    // Mode personalitzat: amaga filtres, mostra inputs
    filtresDiv.style.display = "none";
    paraulaInput.style.display = "block";
    categoriaInput.style.display = "block";
    paraulaInput.placeholder = "Escriu la paraula secreta...";
    categoriaInput.placeholder = "(Opcional) Nom de la categoria (ex: 'Animals')";
  } else {
    // Mode aleatori o categoria concreta: mostra filtres, amaga inputs
    filtresDiv.style.display = "block";
    paraulaInput.style.display = "none";
    categoriaInput.style.display = "none";
    paraulaInput.value = ""; // neteja si torna enrere
    categoriaInput.value = "";
    
    if (valor === "__aleatori__") {
      // Cap text específic; es triarà aleatòriament
    } else {
      // Categoria concreta seleccionada
      const nomCat = sel.options[sel.selectedIndex].text;
      // Opcional: pots deixar un missatge invisible o res
    }
  }
}

function prepararRols() {
  const cat = document.getElementById("categoria").value;
  const paraulaPers = document.getElementById("paraulaPers").value.trim();
  const categoriaPers = document.getElementById("categoriaPers").value.trim();
  const numImpostorsInput = document.getElementById("numImpostors").value;
  const impostorSapCategoria = document.getElementById("impostorSapCategoria").checked;

  const numImpostors = Math.min(
    Math.max(parseInt(numImpostorsInput) || 1, 1),
    jugadors.length - 1
  );

  let paraulaFinal = "";
  let categoriaFinal = "";

  if (cat === "__personalitzat__") {
    // Mode manual complet
    if (!paraulaPers) {
      alert("Has d'escriure una paraula secreta.");
      return;
    }
    paraulaFinal = paraulaPers;
    categoriaFinal = categoriaPers || "";
  } else {
    // Mode basat en WORDS
    // Pas 1: determinar categories candidates
    let idsCategoriesCandidates = [];
    if (cat === "__aleatori__") {
      // Totes les categories
      idsCategoriesCandidates = CATEGORIES.map((_, i) => i);
    } else {
      // Categoria concreta
      const idx = CATEGORIES.indexOf(cat);
      if (idx === -1) {
        alert("Categoria no vàlida.");
        return;
      }
      idsCategoriesCandidates = [idx];
    }

    // Pas 2: obtenir nivells de dificultat seleccionats (com a índexs)
    const checkboxes = document.querySelectorAll('#filtresDificultat input[name="dificultat"]:checked');
    let idsDificultatPermeses = [];
    checkboxes.forEach(cb => {
      const val = cb.value;
      const idx = DIFICULTATS.indexOf(val);
      if (idx !== -1) idsDificultatPermeses.push(idx);
    });
    if (idsDificultatPermeses.length === 0) {
      idsDificultatPermeses = [0]; // fàcil per defecte
    }

    // Pas 3: filtrar paraules
    let candidates = WORDS.filter(([paraula, idCat, idDif]) => {
      return idsCategoriesCandidates.includes(idCat) && idsDificultatPermeses.includes(idDif);
    });

    if (candidates.length === 0) {
      // Fallback: sense filtre de dificultat
      candidates = WORDS.filter(([paraula, idCat, idDif]) => idsCategoriesCandidates.includes(idCat));
    }

    if (candidates.length === 0) {
      alert("No hi ha paraules disponibles per a aquesta combinació.");
      return;
    }

    // Pas 4: aplicar historial per categoria (optimitzat)
    // Creem un historial per ID de categoria
    let paraulaTriada;
    let intent = 0;
    do {
      paraulaTriada = candidates[Math.floor(Math.random() * candidates.length)];
      const [p, idCat] = paraulaTriada;
      const clauHist = `cat_${idCat}`;
      const usades = historialParaules[clauHist] || [];
      if (!usades.includes(p) || intent > 10) {
        historialParaules[clauHist] = [...usades, p].slice(-MAX_MEMORIA);
        break;
      }
      intent++;
    } while (intent < 20);

    paraulaFinal = paraulaTriada[0];
    categoriaFinal = CATEGORIES[paraulaTriada[1]];
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

    // Triar un jugador inicial aleatori
    const iniciador = jugadors[Math.floor(Math.random() * jugadors.length)];
    document.getElementById("suggerimentInici").innerHTML = 
  `💡 Comença: <span class="nom-iniciador">${iniciador}</span>`;

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
  // Amagar/mostrar el botó de guia segons la pantalla
  const btnGuia = document.getElementById("btnGuiaFooter");
  if (btnGuia) {
    if (id === "pantallaGuia") {
      btnGuia.style.display = "none";
    } else {
      btnGuia.style.display = "inline-block";
    }
  }

  // Canviar la pantalla activa
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function mostrarGuia() {
  pantallaAnterior = document.querySelector('.screen.active').id;
  canviarPantalla("pantallaGuia");
}

function tornarAPantallaAnterior() {
  canviarPantalla(pantallaAnterior);
}

function novaPartida() {
  canviarPantalla("pantallaNovaPartida");
}

function reutilitzarJugadors() {
  document.getElementById("categoria").value = "__aleatori__";
  document.getElementById("paraulaPers").value = "";
  canviarPantalla("pantalla3");
}

function novaConfiguracio() {
  jugadors = [];
  jocActiu = false;
  historialParaules = {};
  document.getElementById("numJugadors").value = "5";
  document.getElementById("categoria").value = "__aleatori__";
  document.getElementById("paraulaPers").value = "";
  canviarPantalla("pantalla1");
}