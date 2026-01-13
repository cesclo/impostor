let jugadors = [];
let paraula = "";
let impostors = [];
let indexActual = 0;
let jocActiu = false;
let pantallaAnterior = "pantalla1";
let historialParaules = {};
let pantallaActual = "pantalla1";

const MAX_MEMORIA = 5;

// Sistema de Toast Notifications
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    error: '⚠️',
    success: '✅',
    warning: '⚡',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `
    <span style="font-size: 1.3em;">${icons[type] || icons.info}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function configurarNoms() {
  const n = parseInt(document.getElementById("numJugadors").value);
  if (isNaN(n) || n < 3) {
    showToast("Hi ha d'haver 3 o més jugadors.", 'error');
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
    filtresDiv.style.display = "none";
    paraulaInput.style.display = "block";
    categoriaInput.style.display = "block";
    paraulaInput.placeholder = "Escriu la paraula secreta...";
    categoriaInput.placeholder = "(Opcional) Nom de la categoria (ex: 'Animals')";
  } else {
    filtresDiv.style.display = "block";
    paraulaInput.style.display = "none";
    categoriaInput.style.display = "none";
    paraulaInput.value = "";
    categoriaInput.value = "";
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
    if (!paraulaPers) {
      showToast("Has d'escriure una paraula secreta.", 'error');
      return;
    }
    if (paraulaPers.length > 30) {
      showToast("La paraula és massa llarga (màxim 30 caràcters)", 'warning');
      return;
    }
    paraulaFinal = paraulaPers;
    categoriaFinal = categoriaPers || "";
  } else {
    // Mode basat en WORDS
    let idsCategoriesCandidates = [];
    if (cat === "__aleatori__") {
      idsCategoriesCandidates = CATEGORIES.map((_, i) => i);
    } else {
      const idx = CATEGORIES.indexOf(cat);
      if (idx === -1) {
        showToast("Categoria no vàlida.", 'error');
        return;
      }
      idsCategoriesCandidates = [idx];
    }

    const checkboxes = document.querySelectorAll('#filtresDificultat input[name="dificultat"]:checked');
    let idsDificultatPermeses = [];
    checkboxes.forEach(cb => {
      const val = cb.value;
      const idx = DIFICULTATS.indexOf(val);
      if (idx !== -1) idsDificultatPermeses.push(idx);
    });
    if (idsDificultatPermeses.length === 0) {
      idsDificultatPermeses = [0];
    }

    let candidates = WORDS.filter(([paraula, idCat, idDif]) => {
      return idsCategoriesCandidates.includes(idCat) && idsDificultatPermeses.includes(idDif);
    });

    if (candidates.length === 0) {
      candidates = WORDS.filter(([paraula, idCat, idDif]) => idsCategoriesCandidates.includes(idCat));
    }

    if (candidates.length === 0) {
      showToast("No hi ha paraules disponibles per a aquesta combinació.", 'error');
      return;
    }

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

  paraula = paraulaFinal;
  window.categoriaActual = categoriaFinal;
  window.impostorSapCategoria = impostorSapCategoria;

  const còpiaJugadors = [...jugadors];
  impostors = [];
  for (let i = 0; i < numImpostors; i++) {
    const idx = Math.floor(Math.random() * còpiaJugadors.length);
    impostors.push(còpiaJugadors.splice(idx, 1)[0]);
  }

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
  const esImpostor = impostors.includes(nom);
  const rolInfo = document.getElementById("rolInfo");

  if (esImpostor) {
    let missatge = `<div style="font-size: 2em; margin-bottom: 12px;">🕵️</div>`;
    if (window.impostorSapCategoria && window.categoriaActual) {
      const select = document.getElementById("categoria");
      const opt = Array.from(select.options).find(o => o.value === window.categoriaActual);
      const nomCategoria = opt ? opt.text : window.categoriaActual;
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l'<strong>IMPOSTOR</strong>!</span><br>
                   <small>Saps que la paraula és de la categoria:<br><strong>${nomCategoria}</strong></small>`;
    } else if (window.impostorSapCategoria && !window.categoriaActual) {
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l'<strong>IMPOSTOR</strong>!</span><br>
                   <small>Saps que la paraula és <strong>inventada</strong> (no pertany a cap categoria).</small>`;
    } else {
      missatge += `<span style="font-size: 1.4em;">🚨 Ets l'<strong>IMPOSTOR</strong>!</span><br>
                   <small>No saps ni la paraula ni la categoria.</small>`;
    }
    rolInfo.innerHTML = missatge;
    rolInfo.className = "rol-impostor";
  } else {
    rolInfo.innerHTML = `
      <div style="font-size: 2em; margin-bottom: 12px;">🔑</div>
      La paraula secreta és:<br>
      <span style="font-size: 1.8em; font-weight: 800; color: var(--color-innocent); margin-top: 8px; display: inline-block;">${paraula}</span>
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

// Sistema de transicions laterals
function canviarPantalla(nouId) {
  const btnGuia = document.getElementById("btnGuiaFooter");
  if (btnGuia) {
    btnGuia.style.display = nouId === "pantallaGuia" ? "none" : "inline-block";
  }

  const pantallaVella = document.querySelector('.screen.active');
  const pantallaNova = document.getElementById(nouId);

  if (pantallaVella && pantallaVella.id !== nouId) {
    // Determinar direcció
    const pantalles = ['pantalla1', 'pantalla2', 'pantalla3', 'pantalla4', 'pantalla5'];
    const indexVell = pantalles.indexOf(pantallaVella.id);
    const indexNou = pantalles.indexOf(nouId);
    
    let direccio = 'right';
    if (indexVell !== -1 && indexNou !== -1) {
      direccio = indexNou > indexVell ? 'right' : 'left';
    }

    pantallaVella.classList.remove('active');
    pantallaVella.classList.add(`exiting-${direccio === 'right' ? 'left' : 'right'}`);
    
    setTimeout(() => {
      pantallaVella.classList.remove(`exiting-${direccio === 'right' ? 'left' : 'right'}`);
    }, 400);
  }

  pantallaNova.classList.add('active');
  pantallaActual = nouId;
  
  // Scroll to top suau
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  document.getElementById("categoriaPers").value = "";
  actualitzarParaulaInput();
  canviarPantalla("pantalla3");
}

function novaConfiguracio() {
  jugadors = [];
  jocActiu = false;
  historialParaules = {};
  document.getElementById("numJugadors").value = "5";
  document.getElementById("categoria").value = "__aleatori__";
  document.getElementById("paraulaPers").value = "";
  document.getElementById("categoriaPers").value = "";
  actualitzarParaulaInput();
  canviarPantalla("pantalla1");
}

// Inicialització
document.addEventListener('DOMContentLoaded', () => {
  // Assegurar que la primera pantalla estigui activa
  canviarPantalla("pantalla1");
  
  // Configurar event listener per actualitzar input quan canvia categoria
  const selectCategoria = document.getElementById("categoria");
  if (selectCategoria) {
    selectCategoria.addEventListener('change', actualitzarParaulaInput);
  }
});