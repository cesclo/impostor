// Categories disponibles
const CATEGORIES = [
  "animals",      // 0
  "menjar",       // 1
  "objectes",     // 2
  "natura",       // 3
  "llocs",        // 4
  "professions",  // 5
  "cultura",      // 6
  "esports"       // 7
];

// Nivells de dificultat
const DIFICULTATS = [
  "fàcil",    // 0
  "mitja",    // 1
  "difícil"   // 2
];

// Format: ["paraula", idCategoria, idDificultat]
const WORDS = [
// --- ANIMALS (ID: 0) ---
// FÀCIL (0)
["gos", 0, 0], ["gat", 0, 0], ["ocell", 0, 0], ["peix", 0, 0], ["vaca", 0, 0],
["cavall", 0, 0], ["ànec", 0, 0], ["porc", 0, 0], ["ovella", 0, 0], ["conill", 0, 0],
["gall", 0, 0], ["colom", 0, 0], ["ratolí", 0, 0], ["granota", 0, 0], ["tortuga", 0, 0],
["abella", 0, 0], ["mosca", 0, 0], ["aranya", 0, 0], ["cuc", 0, 0], ["papallona", 0, 0],
["girafa", 0, 0], ["ase", 0, 0], ["cabra", 0, 0], ["tauró", 0, 0], ["cranc", 0, 0],
["cérvol", 0, 0], ["panda", 0, 0], ["cangur", 0, 0], ["burro", 0, 0], ["hàmster", 0, 0],
["formiga", 0, 0], ["llop", 0, 0], ["ós", 0, 0], ["mussol", 0, 0], ["tigre", 0, 0],
["elefant", 0, 0], ["mico", 0, 0], ["dofí", 0, 0], ["balena", 0, 0], ["esquirol", 0, 0],
["serp", 0, 0], ["camell", 0, 0], ["zebra", 0, 0], ["lleó", 0, 0], ["pingüí", 0, 0],

// MITJÀ (1)
["llagosta", 0, 1], ["guineu", 0, 1], ["hipopòtam", 0, 1], ["rinoceront", 0, 1], ["morsa", 0, 1],
["castor", 0, 1], ["eriçó", 0, 1], ["medusa", 0, 1], ["pop", 0, 1], ["voltor", 0, 1],
["falcó", 0, 1], ["hiena", 0, 1], ["guepard", 0, 1], ["flamenc", 0, 1], ["talp", 0, 1],
["escorpí", 0, 1], ["escarabat", 0, 1], ["llagosta de mar", 0, 1], ["gambet", 0, 1],
["sargantana", 0, 1], ["tudó", 0, 1], ["gaig", 0, 1], ["oreneta", 0, 1],

// DIFÍCIL (2)
["ornitorrinc", 0, 2], ["ximpanzé", 0, 2], ["iguana", 0, 2], ["mandril", 0, 2], 
["coala", 0, 2], ["armadillo", 0, 2], ["quetzal", 0, 2], ["axolot", 0, 2], 
["narval", 0, 2], ["tatú", 0, 2], ["visó", 0, 2], ["lèmur", 0, 2], 
["okapi", 0, 2], ["uombat", 0, 2], ["peresós", 0, 2], ["albatros", 0, 2], 
["linx", 0, 2], ["dragó de komodo", 0, 2],

// --- MENJAR (ID: 1) ---
// FÀCIL (0)
["poma", 1, 0], ["plàtan", 1, 0], ["pa", 1, 0], ["llet", 1, 0], ["aigua", 1, 0],
["ou", 1, 0], ["formatge", 1, 0], ["iogurt", 1, 0], ["galeta", 1, 0], ["pera", 1, 0],
["taronja", 1, 0], ["maduixa", 1, 0], ["raïm", 1, 0], ["coco", 1, 0], ["pinya", 1, 0],
["pastís", 1, 0], ["gelat", 1, 0], ["xocolata", 1, 0], ["suc", 1, 0], ["patata", 1, 0],
["pasta", 1, 0], ["pizza", 1, 0], ["sopa", 1, 0], ["carn", 1, 0], ["peix", 1, 0],
["oli", 1, 0], ["sal", 1, 0], ["sucre", 1, 0], ["mel", 1, 0], ["cirera", 1, 0],
["préssec", 1, 0], ["entrepà", 1, 0], ["arròs", 1, 0], ["llimona", 1, 0],
["macarrons", 1, 0], ["truita", 1, 0], ["botifarra", 1, 0], ["fuet", 1, 0],
["olives", 1, 0], ["nous", 1, 0], ["tomàquet", 1, 0], ["ceba", 1, 0],

// MITJÀ (1) - Cuina catalana i mediterrània
["espinacs", 1, 1], ["brou", 1, 1], ["cogombre", 1, 1], ["carbassa", 1, 1], 
["síndria", 1, 1], ["albergínia", 1, 1], ["mango", 1, 1], ["kiwi", 1, 1], 
["ametlla", 1, 1], ["enciam", 1, 1], ["nap", 1, 1], ["crema", 1, 1],
["llenties", 1, 1], ["pernil", 1, 1], ["salmó", 1, 1], ["tonyina", 1, 1], 
["gaspatxo", 1, 1], ["paella", 1, 1], ["escudella", 1, 1], ["coca", 1, 1], 
["allioli", 1, 1], ["romesco", 1, 1], ["farigola", 1, 1], ["canelons", 1, 1], 
["safrà", 1, 1], ["julivert", 1, 1], ["calçots", 1, 1], ["samfaina", 1, 1],
["butifarra d'ou", 1, 1], ["llangonissa", 1, 1], ["pa amb tomata", 1, 1],
["crema catalana", 1, 1], ["mel i mató", 1, 1],

// DIFÍCIL (2) - Plats tradicionals catalans
["suquet de peix", 1, 2], ["escudella i carn d'olla", 1, 2], ["fricandó", 1, 2], 
["esqueixada", 1, 2], ["xató", 1, 2], ["cap i pota", 1, 2], 
["mandonguilles amb sípia", 1, 2], ["mar i muntanya", 1, 2], ["trinxat", 1, 2],
["cargols a la llauna", 1, 2], ["escalivada", 1, 2], ["pa de pessic", 1, 2],
["anguiles", 1, 2], ["botifarra amb mongetes", 1, 2], ["panellets", 1, 2],
["xuixo", 1, 2], ["carquinyolis", 1, 2], ["neules", 1, 2],

// --- OBJECTES (ID: 2) ---
// FÀCIL (0)
["taula", 2, 0], ["cadira", 2, 0], ["llit", 2, 0], ["llibre", 2, 0], ["llapis", 2, 0],
["pilota", 2, 0], ["clau", 2, 0], ["finestra", 2, 0], ["porta", 2, 0], ["bombeta", 2, 0],
["mirall", 2, 0], ["tassa", 2, 0], ["bossa", 2, 0], ["cotxe", 2, 0], ["bicicleta", 2, 0],
["rellotge", 2, 0], ["telèfon", 2, 0], ["raspall", 2, 0], ["goma", 2, 0], ["forquilla", 2, 0],
["plat", 2, 0], ["got", 2, 0], ["cullera", 2, 0], ["ganivet", 2, 0], ["sabó", 2, 0],
["tovallola", 2, 0], ["llençol", 2, 0], ["coixí", 2, 0], ["joguina", 2, 0], ["nina", 2, 0],

// MITJÀ (1)
["brúixola", 2, 1], ["telescopi", 2, 1], ["microscopi", 2, 1], ["paraigua", 2, 1],
["guitarra", 2, 1], ["violí", 2, 1], ["tambor", 2, 1], ["radiador", 2, 1],
["xarxa", 2, 1], ["ordinador", 2, 1], ["impressora", 2, 1], ["martell", 2, 1],
["serra", 2, 1], ["càmera", 2, 1], ["ascensor", 2, 1], ["tisores", 2, 1], 
["trepant", 2, 1], ["tornavís", 2, 1], ["endoll", 2, 1], ["ventilador", 2, 1], 
["calculadora", 2, 1], ["escombra", 2, 1], ["galleda", 2, 1],

// DIFÍCIL (2)
["baròmetre", 2, 2], ["termòmetre", 2, 2], ["dinamòmetre", 2, 2], ["fonendoscopi", 2, 2],
["estetoscopi", 2, 2], ["giroscopi", 2, 2], ["teodolit", 2, 2], ["hidròmetre", 2, 2],
["piròmetre", 2, 2], ["altímetre", 2, 2], ["sismògraf", 2, 2], ["higròmetre", 2, 2], 
["anemòmetre", 2, 2], ["pluviòmetre", 2, 2],

// --- NATURA (ID: 3) ---
// FÀCIL (0) - Elements naturals visuals i catalans
["sol", 3, 0], ["lluna", 3, 0], ["estrella", 3, 0], ["flor", 3, 0], ["arbre", 3, 0],
["fulla", 3, 0], ["núvol", 3, 0], ["pluja", 3, 0], ["vent", 3, 0], ["neu", 3, 0],
["mar", 3, 0], ["riu", 3, 0], ["muntanya", 3, 0], ["bosc", 3, 0], ["pedra", 3, 0],
["sorra", 3, 0], ["foc", 3, 0], ["gel", 3, 0], ["cel", 3, 0], ["terra", 3, 0],
["herba", 3, 0], ["fang", 3, 0], ["pols", 3, 0], ["llamp", 3, 0], ["tro", 3, 0],
["onada", 3, 0], ["costa", 3, 0], ["branca", 3, 0], ["arrel", 3, 0], ["bolet", 3, 0],
["jardí", 3, 0], ["olivera", 3, 0], ["pi", 3, 0], ["roure", 3, 0], ["cascada", 3, 0],
["llac", 3, 0], ["vall", 3, 0], ["cim", 3, 0], ["penya", 3, 0], ["camp", 3, 0],

// MITJÀ (1) - Natura catalana i fenòmens
["volcà", 3, 1], ["tsunami", 3, 1], ["terratrèmol", 3, 1], ["eclipsi", 3, 1],
["aurora", 3, 1], ["cometa", 3, 1], ["galàxia", 3, 1], ["planeta", 3, 1],
["estalactita", 3, 1], ["estalagmita", 3, 1], ["glacera", 3, 1], ["desert", 3, 1],
["prada", 3, 1], ["cova", 3, 1], ["penya-segat", 3, 1], ["badia", 3, 1],
["duna", 3, 1], ["barranc", 3, 1], ["aiguamoll", 3, 1], ["sabana", 3, 1],
["riera", 3, 1], ["estany", 3, 1], ["pantà", 3, 1], ["delta", 3, 1], 
["arxipèlag", 3, 1], ["constel·lació", 3, 1], ["meteorit", 3, 1], ["boira", 3, 1], 
["rosada", 3, 1], ["calamarsa", 3, 1], ["tramuntana", 3, 1], ["llevant", 3, 1], 
["mestral", 3, 1], ["torrent", 3, 1], ["congost", 3, 1], ["collada", 3, 1],
["pedruscall", 3, 1], ["clot", 3, 1], ["serra", 3, 1],

// DIFÍCIL (2) - Termes específics catalans
["fòssil", 3, 2], ["magma", 3, 2], ["lava", 3, 2], ["erupció", 3, 2],
["horitzó", 3, 2], ["ecosistema", 3, 2], ["fotosíntesi", 3, 2], ["clorofil·la", 3, 2],
["tossals", 3, 2], ["clotada", 3, 2], ["serrat", 3, 2], ["ubac", 3, 2],
["solà", 3, 2], ["aiguabarreig", 3, 2], ["planell", 3, 2], ["turó", 3, 2],
["puig", 3, 2], ["cingle", 3, 2], ["avenc", 3, 2],

// --- LLOCS (ID: 4) ---
// FÀCIL (0) - Llocs genèrics + ciutats catalanes
["casa", 4, 0], ["escola", 4, 0], ["hospital", 4, 0], ["botiga", 4, 0], ["parc", 4, 0],
["platja", 4, 0], ["camp", 4, 0], ["carrer", 4, 0], ["poble", 4, 0], ["ciutat", 4, 0],
["jungla", 4, 0], ["estació", 4, 0], ["aeroport", 4, 0], ["zoo", 4, 0], ["biblioteca", 4, 0], 
["cinema", 4, 0], ["piscina", 4, 0], ["cuina", 4, 0], ["bany", 4, 0], ["habitació", 4, 0], 
["garatge", 4, 0], ["pati", 4, 0], ["gimnàs", 4, 0], ["circ", 4, 0], ["hotel", 4, 0], 
["restaurant", 4, 0], ["Barcelona", 4, 0], ["Girona", 4, 0], ["Tarragona", 4, 0],
["Lleida", 4, 0], ["Manresa", 4, 0], ["Vic", 4, 0], ["Reus", 4, 0],

// MITJÀ (1) - Llocs específics + ciutats europees
["museu", 4, 1], ["teatre", 4, 1], ["estadi", 4, 1], ["mercat", 4, 1], ["oficina", 4, 1],
["fàbrica", 4, 1], ["granja", 4, 1], ["jardí", 4, 1], ["hivernacle", 4, 1],
["barri", 4, 1], ["autopista", 4, 1], ["túnel", 4, 1], ["pont", 4, 1],
["península", 4, 1], ["continent", 4, 1], ["pol", 4, 1], ["equador", 4, 1], ["illa", 4, 1],
["ajuntament", 4, 1], ["comissaria", 4, 1], ["farmàcia", 4, 1], ["fleca", 4, 1], 
["perruqueria", 4, 1], ["taller", 4, 1], ["port", 4, 1], ["far", 4, 1], 
["castell", 4, 1], ["palau", 4, 1], ["Figueres", 4, 1], ["Sabadell", 4, 1],
["Terrassa", 4, 1], ["Mataró", 4, 1], ["Berga", 4, 1], ["Ripoll", 4, 1],
["París", 4, 1], ["Londres", 4, 1], ["Roma", 4, 1], ["Berlín", 4, 1],
["Lisboa", 4, 1], ["Amsterdam", 4, 1], ["Viena", 4, 1], ["Praga", 4, 1],

// DIFÍCIL (2) - Llocs peculiars + ciutats poc conegudes
["monestir", 4, 2], ["abadia", 4, 2], ["catedral", 4, 2], ["basílica", 4, 2],
["mesquita", 4, 2], ["sinagoga", 4, 2], ["observatori", 4, 2], ["laboratori", 4, 2],
["reserva", 4, 2], ["parc natural", 4, 2], ["refugi", 4, 2], ["búnquer", 4, 2],
["Montserrat", 4, 2], ["Poblet", 4, 2], ["Ripoll", 4, 2], ["Cardona", 4, 2],
["Tallin", 4, 2], ["Riga", 4, 2], ["Bratislava", 4, 2], ["Ljubljana", 4, 2],

// --- PROFESSIONS (ID: 5) ---
// FÀCIL (0) - Professions bàsiques + modernes (amb inclusió de gènere)
["docent", 5, 0], ["mestre/mestra", 5, 0], ["metge/metgessa", 5, 0], 
["bomber/a", 5, 0], ["policia", 5, 0], ["cuiner/a", 5, 0],
["pilot", 5, 0], ["mecànic/a", 5, 0], ["granjer/a", 5, 0], 
["dentista", 5, 0], ["atleta", 5, 0], ["cantant", 5, 0], 
["actor/actriu", 5, 0], ["jardiner/a", 5, 0], ["pescador/a", 5, 0], 
["fuster/a", 5, 0], ["sastre/ssa", 5, 0], ["pastor/a", 5, 0], 
["carter/a", 5, 0], ["flequer/a", 5, 0], ["pallasso/a", 5, 0], 
["mag", 5, 0], ["porter/a", 5, 0], ["venedor/a", 5, 0],
["xofer", 5, 0], ["detectiu", 5, 0], ["dissenyador/a", 5, 0], 
["programador/a", 5, 0], ["youtuber", 5, 0], ["influencer", 5, 0],

// MITJÀ (1) - Professions especialitzades + tecnològiques
["arquitecte/a", 5, 1], ["enginyer/a", 5, 1], ["advocat/da", 5, 1], 
["jutge/ssa", 5, 1], ["fotògraf/a", 5, 1], ["periodista", 5, 1], 
["escenògraf/a", 5, 1], ["coreògraf/a", 5, 1], ["geòleg/geòloga", 5, 1], 
["biòleg/biòloga", 5, 1], ["químic/a", 5, 1], ["físic/a", 5, 1], 
["astrònom/a", 5, 1], ["historiador/a", 5, 1], 
["traductor/a", 5, 1], ["intèrpret", 5, 1], ["psicòleg/psicòloga", 5, 1], 
["veterinari/a", 5, 1], ["mariner/a", 5, 1], ["electricista", 5, 1], 
["lampista", 5, 1], ["paleta", 5, 1], ["escriptor/a", 5, 1], 
["bibliotecari/a", 5, 1], ["comptable", 5, 1], ["model", 5, 1], 
["entrenador/a", 5, 1], ["àrbitre/a", 5, 1],
["desenvolupador/a", 5, 1], ["analista de dades", 5, 1], 
["community manager", 5, 1], ["dissenyador/a UX", 5, 1], 
["streamer", 5, 1], ["podcaster", 5, 1],

// DIFÍCIL (2) - Professions específiques
["criptògraf/a", 5, 2], ["paleontòleg/oga", 5, 2], 
["arqueòleg/oga", 5, 2], ["entomòleg/a", 5, 2],
["ornitòleg/a", 5, 2], ["cartògraf/ca", 5, 2], 
["topògraf/a", 5, 2], ["oceanògraf/a", 5, 2], 
["meteoròleg/a", 5, 2], ["etnòleg/a", 5, 2], 
["lexicògraf/a", 5, 2], ["patòleg/a", 5, 2], 
["anestesista", 5, 2], ["radiòleg/oga", 5, 2], ["sommelier", 5, 2], 
["enòleg/a", 5, 2], ["actuari/a", 5, 2], ["agrònom/a", 5, 2],

// --- CULTURA (ID: 6) ---
// FÀCIL (0) - Cultura popular catalana i universal
["conte", 6, 0], ["dibuix", 6, 0], ["música", 6, 0], ["cançó", 6, 0], ["fotografia", 6, 0],
["pintura", 6, 0], ["dansa", 6, 0], ["obra", 6, 0], ["pel·lícula", 6, 0], ["història", 6, 0],
["joc", 6, 0], ["festa", 6, 0], ["nadal", 6, 0], ["pasqua", 6, 0],
["bandera", 6, 0], ["himne", 6, 0], ["monument", 6, 0], ["castell", 6, 0],
["màgia", 6, 0], ["circ", 6, 0], ["ràdio", 6, 0], ["tele", 6, 0], ["vídeo", 6, 0],
["notícia", 6, 0], ["premi", 6, 0], ["disfressa", 6, 0], ["màscara", 6, 0], 
["castellers", 6, 0], ["correfoc", 6, 0], ["diada", 6, 0], ["sant jordi", 6, 0],
["tió", 6, 0], ["caganera", 6, 0], ["revetlla", 6, 0], ["sardana", 6, 0],

// MITJÀ (1) - Cultura catalana tradicional i arts
["escultura", 6, 1], ["mosaic", 6, 1], ["òpera", 6, 1], ["simfonia", 6, 1], 
["poema", 6, 1], ["novel·la", 6, 1], ["mite", 6, 1], ["mural", 6, 1],
["ceràmica", 6, 1], ["ballet", 6, 1], ["jazz", 6, 1], ["rock", 6, 1], 
["còmic", 6, 1], ["llegenda", 6, 1], ["faula", 6, 1], ["refrany", 6, 1], 
["tradició", 6, 1], ["patum", 6, 1], ["mercè", 6, 1], ["gràcia", 6, 1],
["calçotada", 6, 1], ["castanyada", 6, 1], ["sant joan", 6, 1], 
["carnestoltes", 6, 1], ["havanera", 6, 1], ["gegants", 6, 1], ["capgrossos", 6, 1],
["ball de bastons", 6, 1], ["ball de cercolets", 6, 1], ["moixiganga", 6, 1],
["trabucaires", 6, 1], ["colla", 6, 1], ["penyes", 6, 1], ["rom cremat", 6, 1],

// DIFÍCIL (2) - Cultura catalana específica i tradicional
["senyera", 6, 2], ["muixeranga", 6, 2], ["falcons", 6, 2], ["marrecs", 6, 2],
["àliga", 6, 2], ["mulassa", 6, 2], ["drac", 6, 2], ["bou", 6, 2],
["tabal", 6, 2], ["gralla", 6, 2], ["tenora", 6, 2], ["tible", 6, 2],
["enramades", 6, 2], ["cobles", 6, 2], ["pessebre", 6, 2],
["pubilla", 6, 2], ["hereu", 6, 2], ["esbart", 6, 2], 
["coral", 6, 2], ["orfeó", 6, 2], ["truc", 7, 2]

// --- ESPORTS (ID: 7) ---
// FÀCIL (0) - Esports populars + catalans
["futbol", 7, 0], ["bàsquet", 7, 0], ["tennis", 7, 0], ["natació", 7, 0], 
["atletisme", 7, 0], ["ciclisme", 7, 0], ["handbol", 7, 0], ["voleibol", 7, 0], 
["gimnàstica", 7, 0], ["boxa", 7, 0], ["patinatge", 7, 0], ["esquí", 7, 0], 
["hoquei", 7, 0], ["rugbi", 7, 0], ["beisbol", 7, 0], ["pilota", 7, 0], 
["escacs", 7, 0], ["dards", 7, 0], ["bowling", 7, 0], ["bitlles", 7, 0],
["petanca", 7, 0], ["castells", 7, 0],

// MITJÀ (1) - Esports especialitzats + catalans moderns
["waterpolo", 7, 1], ["halterofília", 7, 1], ["lluita", 7, 1], ["esgrima", 7, 1], 
["pentatló", 7, 1], ["orientació", 7, 1], ["rem", 7, 1], ["piragüisme", 7, 1], 
["vela", 7, 1], ["surf", 7, 1], ["paracaigudisme", 7, 1], ["escalada", 7, 1], 
["trail", 7, 1], ["biatló", 7, 1], ["curling", 7, 1], ["polo", 7, 1], 
["pàdel", 7, 1], ["futbol sala", 7, 1], ["bitlles catalanes", 7, 1], 
["pilota valenciana", 7, 1], ["jocs olímpics", 7, 1],

// DIFÍCIL (2) - Esports poc coneguts + jocs tradicionals catalans
["criquet", 7, 2], ["squash", 7, 2], ["badminton", 7, 2], ["taekwondo", 7, 2], 
["judo", 7, 2], ["karate", 7, 2], ["aikido", 7, 2], ["sumo", 7, 2], 
["bob", 7, 2], ["luge", 7, 2], ["skeleton", 7, 2], ["lacrosse", 7, 2],
["bòlit", 7, 2], ["bèlit", 7, 2], ["birles", 7, 2], ["marro", 7, 2],
["nyoca", 7, 2], ["rínxols", 7, 2], ["trípit i trapot", 7, 2], ["sambori", 7, 2],
];

// Funció de validació completa amb detecció d'errors d'estructura
function validarParaules() {
  console.log("=".repeat(60));
  console.log("🔍 VALIDACIÓ COMPLETA DEL FITXER DE PARAULES");
  console.log("=".repeat(60));
  
  let errorsGreus = 0;
  let advertencies = 0;
  const errors = [];
  const warns = [];
  
  // ========================================
  // 1. VALIDAR ESTRUCTURA BÀSICA
  // ========================================
  console.log("\n📋 1. VALIDANT ESTRUCTURA BÀSICA...");
  
  // Validar que WORDS és un array
  if (!Array.isArray(WORDS)) {
    errors.push("❌ CRÍTIC: WORDS no és un array");
    errorsGreus++;
  }
  
  // Validar que CATEGORIES és un array
  if (!Array.isArray(CATEGORIES)) {
    errors.push("❌ CRÍTIC: CATEGORIES no és un array");
    errorsGreus++;
  }
  
  // Validar que DIFICULTATS és un array
  if (!Array.isArray(DIFICULTATS)) {
    errors.push("❌ CRÍTIC: DIFICULTATS no és un array");
    errorsGreus++;
  }
  
  if (errorsGreus > 0) {
    console.error("❌ ERRORS CRÍTICS D'ESTRUCTURA!");
    errors.forEach(e => console.error(e));
    return { valid: false, errors, warns };
  }
  
  console.log("✅ Estructura bàsica correcta");
  
  // ========================================
  // 2. VALIDAR CADA PARAULA
  // ========================================
  console.log("\n📝 2. VALIDANT CADA PARAULA...");
  
  WORDS.forEach((word, index) => {
    const lineNum = index + 1;
    
    // Validar que és un array
    if (!Array.isArray(word)) {
      errors.push(`❌ Línia ${lineNum}: No és un array (potser falta [ o ])`);
      errorsGreus++;
      return;
    }
    
    // Validar que té exactament 3 elements
    if (word.length !== 3) {
      errors.push(`❌ Línia ${lineNum}: Ha de tenir 3 elements [paraula, categoria, dificultat], té ${word.length}`);
      errorsGreus++;
      return;
    }
    
    const [paraula, idCat, idDif] = word;
    
    // ========================================
    // 2.1 VALIDAR PARAULA (primer element)
    // ========================================
    
    // Validar que la paraula és un string
    if (typeof paraula !== 'string') {
      errors.push(`❌ Línia ${lineNum}: La paraula "${paraula}" no és un string (tipus: ${typeof paraula})`);
      errorsGreus++;
      return;
    }
    
    // Validar que la paraula no està buida
    if (paraula.trim() === '') {
      errors.push(`❌ Línia ${lineNum}: Paraula buida (string buit)`);
      errorsGreus++;
      return;
    }
    
    // Validar llargada de la paraula
    if (paraula.length > 40) {
      warns.push(`⚠️  Línia ${lineNum}: Paraula molt llarga "${paraula}" (${paraula.length} caràcters)`);
      advertencies++;
    }
    
    // Validar caràcters estranys o problemàtics
    if (/[<>{}[\]\\|`~^]/.test(paraula)) {
      warns.push(`⚠️  Línia ${lineNum}: Paraula "${paraula}" conté caràcters estranys`);
      advertencies++;
    }
    
    // Validar espais múltiples
    if (/\s{2,}/.test(paraula)) {
      warns.push(`⚠️  Línia ${lineNum}: Paraula "${paraula}" té espais múltiples`);
      advertencies++;
    }
    
    // Validar espais al principi o final
    if (paraula !== paraula.trim()) {
      errors.push(`❌ Línia ${lineNum}: Paraula "${paraula}" té espais al principi o final`);
      errorsGreus++;
    }
    
    // ========================================
    // 2.2 VALIDAR CATEGORIA (segon element)
    // ========================================
    
    // Validar que la categoria és un número
    if (typeof idCat !== 'number') {
      errors.push(`❌ Línia ${lineNum}: Categoria "${idCat}" no és un número (paraula: "${paraula}")`);
      errorsGreus++;
      return;
    }
    
    // Validar que la categoria no és decimal
    if (!Number.isInteger(idCat)) {
      errors.push(`❌ Línia ${lineNum}: Categoria ${idCat} no és un número enter (paraula: "${paraula}")`);
      errorsGreus++;
      return;
    }
    
    // Validar que la categoria està dins del rang
    if (idCat < 0 || idCat >= CATEGORIES.length) {
      errors.push(`❌ Línia ${lineNum}: Categoria ${idCat} fora de rang (0-${CATEGORIES.length - 1}) (paraula: "${paraula}")`);
      errorsGreus++;
    }
    
    // ========================================
    // 2.3 VALIDAR DIFICULTAT (tercer element)
    // ========================================
    
    // Validar que la dificultat és un número
    if (typeof idDif !== 'number') {
      errors.push(`❌ Línia ${lineNum}: Dificultat "${idDif}" no és un número (paraula: "${paraula}")`);
      errorsGreus++;
      return;
    }
    
    // Validar que la dificultat no és decimal
    if (!Number.isInteger(idDif)) {
      errors.push(`❌ Línia ${lineNum}: Dificultat ${idDif} no és un número enter (paraula: "${paraula}")`);
      errorsGreus++;
      return;
    }
    
    // Validar que la dificultat està dins del rang
    if (idDif < 0 || idDif >= DIFICULTATS.length) {
      errors.push(`❌ Línia ${lineNum}: Dificultat ${idDif} fora de rang (0-${DIFICULTATS.length - 1}) (paraula: "${paraula}")`);
      errorsGreus++;
    }
  });
  
  if (errorsGreus === 0) {
    console.log(`✅ Totes les ${WORDS.length} paraules tenen estructura correcta`);
  } else {
    console.error(`❌ S'han trobat ${errorsGreus} errors d'estructura`);
  }
  
  // ========================================
  // 3. VERIFICAR DUPLICATS
  // ========================================
  console.log("\n🔄 3. VERIFICANT DUPLICATS...");
  
  const paraulesList = WORDS.map(w => w[0].toLowerCase());
  const duplicats = [];
  const seen = new Set();
  
  paraulesList.forEach((p, idx) => {
    if (seen.has(p)) {
      duplicats.push({ paraula: WORDS[idx][0], linia: idx + 1 });
    }
    seen.add(p);
  });
  
  if (duplicats.length > 0) {
    console.error(`❌ ${duplicats.length} duplicat(s) detectat(s):`);
    duplicats.forEach(d => {
      console.error(`   - "${d.paraula}" (línia ${d.linia})`);
    });
    errorsGreus += duplicats.length;
  } else {
    console.log("✅ Cap duplicat detectat");
  }
  
  // ========================================
  // 4. ESTADÍSTIQUES PER CATEGORIA
  // ========================================
  console.log("\n📊 4. ESTADÍSTIQUES PER CATEGORIA");
  console.log("=".repeat(60));
  
  const stats = {};
  let total = 0;
  
  CATEGORIES.forEach((cat, idCat) => {
    stats[cat] = { facil: 0, mitja: 0, dificil: 0, total: 0 };
    
    DIFICULTATS.forEach((dif, idDif) => {
      const count = WORDS.filter(w => w[1] === idCat && w[2] === idDif).length;
      stats[cat][dif] = count;
      stats[cat].total += count;
    });
    
    total += stats[cat].total;
    
    // Mostrar estadístiques per categoria
    console.log(`\n🏷️  ${cat.toUpperCase()}`);
    console.log(`   Fàcil: ${stats[cat].facil} | Mitjà: ${stats[cat].mitja} | Difícil: ${stats[cat].dificil}`);
    console.log(`   📦 Total: ${stats[cat].total} paraules`);
    
    // Advertències d'equilibri
    if (stats[cat].total === 0) {
      warns.push(`⚠️  Categoria "${cat}" no té cap paraula`);
      advertencies++;
    } else if (stats[cat].total < 30) {
      warns.push(`⚠️  Categoria "${cat}" té poques paraules (${stats[cat].total})`);
      advertencies++;
    }
    
    if (stats[cat].facil === 0 && stats[cat].total > 0) {
      warns.push(`⚠️  Categoria "${cat}" no té paraules fàcils`);
      advertencies++;
    }
  });
  
  console.log("\n" + "=".repeat(60));
  console.log(`🎯 TOTAL: ${total} paraules en ${CATEGORIES.length} categories`);
  console.log("=".repeat(60));
  
  // ========================================
  // 5. PARAULES EXTREMES
  // ========================================
  console.log("\n📏 5. PARAULES EXTREMES");
  
  const mesLlargues = [...WORDS]
    .sort((a, b) => b[0].length - a[0].length)
    .slice(0, 5)
    .map(w => `"${w[0]}" (${w[0].length} caràcters)`);
  
  console.log(`\n📏 5 paraules més llargues:`);
  mesLlargues.forEach(p => console.log(`   - ${p}`));
  
  const mesCurtes = [...WORDS]
    .sort((a, b) => a[0].length - b[0].length)
    .slice(0, 5)
    .map(w => `"${w[0]}" (${w[0].length} caràcters)`);
  
  console.log(`\n📏 5 paraules més curtes:`);
  mesCurtes.forEach(p => console.log(`   - ${p}`));
  
  // ========================================
  // 6. RESUM FINAL
  // ========================================
  console.log("\n" + "=".repeat(60));
  console.log("🎯 RESUM DE LA VALIDACIÓ");
  console.log("=".repeat(60));
  
  if (errorsGreus > 0) {
    console.error(`\n❌ VALIDACIÓ FALLIDA: ${errorsGreus} error(s) crític(s)`);
    console.error("\n🔴 ERRORS CRÍTICS:");
    errors.forEach(e => console.error(`   ${e}`));
  } else {
    console.log("\n✅ VALIDACIÓ CORRECTA: Cap error crític");
  }
  
  if (advertencies > 0) {
    console.warn(`\n⚠️  ${advertencies} advertència(s):`);
    warns.forEach(w => console.warn(`   ${w}`));
  } else {
    console.log("✅ Cap advertència");
  }
  
  console.log("\n" + "=".repeat(60));
  
  if (errorsGreus === 0 && advertencies === 0) {
    console.log("🎉 PERFECTE! El fitxer està impecable!");
  } else if (errorsGreus === 0) {
    console.log("✅ El fitxer és vàlid però té algunes advertències menors");
  } else {
    console.log("❌ El fitxer té errors que han de ser corregits");
  }
  
  console.log("=".repeat(60));
  
  return { 
    valid: errorsGreus === 0, 
    errors, 
    warns, 
    stats,
    errorsGreus,
    advertencies
  };
}

// Funció per obtenir paraula aleatòria (per testing)
function getParaulaAleatoria(categoria = null, dificultat = null) {
  let candidates = WORDS;
  
  if (categoria !== null) {
    const idCat = typeof categoria === 'string' ? CATEGORIES.indexOf(categoria) : categoria;
    candidates = candidates.filter(w => w[1] === idCat);
  }
  
  if (dificultat !== null) {
    const idDif = typeof dificultat === 'string' ? DIFICULTATS.indexOf(dificultat) : dificultat;
    candidates = candidates.filter(w => w[2] === idDif);
  }
  
  if (candidates.length === 0) return null;
  
  const paraula = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    paraula: paraula[0],
    categoria: CATEGORIES[paraula[1]],
    dificultat: DIFICULTATS[paraula[2]]
  };
}

// Executar validació automàticament en desenvolupament
if (typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  console.log('\n🔧 MODE DESENVOLUPAMENT - Validant paraules...\n');
  const resultat = validarParaules();
  
  // Si hi ha errors crítics, alertar a l'usuari
  if (!resultat.valid) {
    console.error('\n🚨 ATENCIÓ: El fitxer de paraules té errors crítics!');
    console.error('El joc podria no funcionar correctament.');
    console.error('Revisa els errors a la consola i corregeix-los.');
  }
  
  // Exemples d'ús
  console.log('\n💡 EXEMPLES D\'ÚS:');
  console.log('   getParaulaAleatoria() →', getParaulaAleatoria());
  console.log('   getParaulaAleatoria("cultura") →', getParaulaAleatoria("cultura"));
  console.log('   getParaulaAleatoria("esports", "difícil") →', getParaulaAleatoria("esports", "difícil"));
}

// Executar validació bàsica en producció (sense logs detallats)
if (typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1') {
  
  // Validació silenciosa en producció
  try {
    let valid = true;
    
    // Comprovar estructura bàsica
    if (!Array.isArray(WORDS) || !Array.isArray(CATEGORIES) || !Array.isArray(DIFICULTATS)) {
      valid = false;
    }
    
    // Comprovar algunes paraules aleatòries
    const sampled = [0, Math.floor(WORDS.length / 2), WORDS.length - 1];
    sampled.forEach(idx => {
      if (idx < WORDS.length) {
        const w = WORDS[idx];
        if (!Array.isArray(w) || w.length !== 3 || 
            typeof w[0] !== 'string' || typeof w[1] !== 'number' || typeof w[2] !== 'number') {
          valid = false;
        }
      }
    });
    
    if (!valid) {
      console.error('⚠️ Error en el fitxer de paraules. Contacta amb l\'administrador.');
    }
  } catch (e) {
    console.error('⚠️ Error validant paraules:', e.message);
  }
}