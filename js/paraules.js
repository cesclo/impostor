const CATEGORIES = [
  "animals",
  "menjar",
  "objectes",
  "natura",
  "llocs",
  "professions",
  "cultura",
  "esports"
];

const DIFICULTATS = ["fàcil", "mitja", "difícil"];

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
["escorpí", 0, 1],

// DIFÍCIL (2)
["ornitorrinc", 0, 2], ["ximpanzé", 0, 2], ["iguana", 0, 2],
["mandril", 0, 2], ["coala", 0, 2], ["armadillo", 0, 2], ["quetzal", 0, 2],
["axolot", 0, 2], ["narval", 0, 2], ["tatú", 0, 2], ["visó", 0, 2],
["lèmur", 0, 2], ["okapi", 0, 2], ["uombat", 0, 2], ["peresós", 0, 2],
["albatros", 0, 2], ["linx", 0, 2], ["dragó", 0, 2],

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
["olives", 1, 0], ["nous", 1, 0],

// MITJÀ (1)
["espinacs", 1, 1], ["brou", 1, 1], ["cogombre", 1, 1],
["carbassa", 1, 1], ["síndria", 1, 1], ["albergínia", 1, 1], ["mango", 1, 1],
["kiwi", 1, 1], ["ametlla", 1, 1], ["enciam", 1, 1], ["nap", 1, 1], ["crema", 1, 1],
["llenties", 1, 1], ["pernil", 1, 1], ["salmó", 1, 1], ["tonyina", 1, 1], ["gaspatxo", 1, 1],
["paella", 1, 1], ["escudella", 1, 1], ["coca", 1, 1], ["allioli", 1, 1], ["romesco", 1, 1],
["farigola", 1, 1], ["canelons", 1, 1], ["safrà", 1, 1], ["julivert", 1, 1],

// DIFÍCIL (2)
["quinoa", 1, 2], ["miso", 1, 2], ["tempeh", 1, 2], ["wasabi", 1, 2], ["nori", 1, 2],
["kimchi", 1, 2], ["tahini", 1, 2], ["edamame", 1, 2], ["matcha", 1, 2], ["chutney", 1, 2],
["fajol", 1, 2], ["suquet", 1, 2], ["estèvia", 1, 2], ["anacard", 1, 2],

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
["serra", 2, 1], ["càmera", 2, 1], ["ascensor", 2, 1],
["tisores", 2, 1], ["trepant", 2, 1], ["tornavís", 2, 1], ["endoll", 2, 1],
["ventilador", 2, 1], ["calculadora", 2, 1],

// DIFÍCIL (2)
["baròmetre", 2, 2], ["termòmetre", 2, 2], ["dinamòmetre", 2, 2], ["fonendoscopi", 2, 2],
["estetoscopi", 2, 2], ["giroscopi", 2, 2], ["teodolit", 2, 2], ["hidròmetre", 2, 2],
["piròmetre", 2, 2], ["altímetre", 2, 2]["sismògraf", 2, 2], ["higròmetre", 2, 2], 
["anemòmetre", 2, 2], ["pluviòmetre", 2, 2],

// --- NATURA (ID: 3) ---
// FÀCIL (0)
["sol", 3, 0], ["lluna", 3, 0], ["estrella", 3, 0], ["flor", 3, 0], ["arbre", 3, 0],
["fulla", 3, 0], ["núvol", 3, 0], ["pluja", 3, 0], ["vent", 3, 0], ["neu", 3, 0],
["mar", 3, 0], ["riu", 3, 0], ["muntanya", 3, 0], ["bosc", 3, 0], ["pedra", 3, 0],
["sorra", 3, 0], ["foc", 3, 0], ["gel", 3, 0], ["cel", 3, 0], ["terra", 3, 0],
["herba", 3, 0], ["fang", 3, 0], ["pols", 3, 0], ["llamp", 3, 0], ["tro", 3, 0],
["onada", 3, 0], ["costa", 3, 0], ["branca", 3, 0], ["arrel", 3, 0], ["bolet", 3, 0],

// MITJÀ (1)
["volcà", 3, 1], ["tsunami", 3, 1], ["terratrèmol", 3, 1], ["eclipsi", 3, 1],
["aurora", 3, 1], ["cometa", 3, 1], ["galàxia", 3, 1], ["planeta", 3, 1],
["estalactita", 3, 1], ["estalagmita", 3, 1], ["glacera", 3, 1], ["desert", 3, 1],
["prada", 3, 1], ["cova", 3, 1], ["penya-segat", 3, 1], ["badia", 3, 1],
["duna", 3, 1], ["barranc", 3, 1], ["aiguamoll", 3, 1], ["sabana", 3, 1],
["riera", 3, 1], ["estany", 3, 1], ["pantà", 3, 1], ["delta", 3, 1], ["arxipèlag", 3, 1],
["constel·lació", 3, 1], ["meteorit", 3, 1], ["boira", 3, 1], ["rosada", 3, 1], ["calamarsa", 3, 1],

// DIFÍCIL (2)
["fòssil", 3, 2], ["magma", 3, 2], ["lava", 3, 2], ["erupció", 3, 2],
["horitzó", 3, 2], ["ecosistema", 3, 2], ["biodiversitat", 3, 2], ["simbiosi", 3, 2],
["fotosíntesi", 3, 2], ["clorofil·la", 3, 2], ["atmosfera", 3, 2], ["ionosfera", 3, 2],
["estratosfera", 3, 2], ["troposfera", 3, 2], ["geotèrmia", 3, 2], ["hidrologia", 3, 2],
["glaciologia", 3, 2], ["sismologia", 3, 2], ["vulcanologia", 3, 2], ["paleontologia", 3, 2],

// --- LLOCS (ID: 4) ---
// FÀCIL (0)
["casa", 4, 0], ["escola", 4, 0], ["hospital", 4, 0], ["botiga", 4, 0], ["parc", 4, 0],
["platja", 4, 0], ["camp", 4, 0], ["rètol", 4, 0], ["carrer", 4, 0], ["poble", 4, 0],
["ciutat", 4, 0], ["país", 4, 0], ["jungla", 4, 0], ["estany", 4, 0], ["golf", 4, 0],
["estació", 4, 0], ["aeroport", 4, 0], ["zoo", 4, 0], ["biblioteca", 4, 0], ["cinema", 4, 0],
["piscina", 4, 0], ["cuina", 4, 0], ["bany", 4, 0], ["habitació", 4, 0], ["garatge", 4, 0],
["pati", 4, 0], ["gimnàs", 4, 0], ["circ", 4, 0], ["hotel", 4, 0], ["restaurant", 4, 0],

// MITJÀ (1)
["museu", 4, 1], ["teatre", 4, 1], ["estadi", 4, 1], ["mercat", 4, 1], ["oficina", 4, 1],
["fàbrica", 4, 1], ["granja", 4, 1], ["jardí", 4, 1], ["hivernacle", 4, 1],
["nucli antic", 4, 1], ["barri", 4, 1], ["autopista", 4, 1], ["túnel", 4, 1], ["pont", 4, 1],
["península", 4, 1], ["continent", 4, 1], ["pol", 4, 1], ["equador", 4, 1], ["illa", 4, 1],
["ajuntament", 4, 1], ["comissaria", 4, 1], ["farmàcia", 4, 1], ["fleca", 4, 1], ["perruqueria", 4, 1],
["taller", 4, 1], ["port", 4, 1], ["far", 4, 1], ["castell", 4, 1], ["palau", 4, 1],

// DIFÍCIL (2)
["penitenciaria", 4, 2], ["asil", 4, 2], ["monestir", 4, 2], ["abadia", 4, 2],
["catedral", 4, 2], ["basílica", 4, 2], ["mesquita", 4, 2], ["sinagoga", 4, 2],
["observatori", 4, 2], ["laboratori", 4, 2], ["reserva", 4, 2], ["parc natural", 4, 2],
["biosfera", 4, 2], ["estació espacial", 4, 2], ["submarí", 4, 2], ["refugi", 4, 2],
["búnquer", 4, 2], ["fòrum", 4, 2], ["àgora", 4, 2], ["cràter", 4, 2],

// --- PROFESSIONS (ID: 5) ---
// FÀCIL (0)
["mestre", 5, 0], ["metge", 5, 0], ["bomber", 5, 0], ["policia", 5, 0], ["cuiner", 5, 0],
["pilot", 5, 0], ["mecànic", 5, 0], ["granjer", 5, 0], ["dentista", 5, 0], ["corredor", 5, 0],
["cantant", 5, 0], ["actor", 5, 0], ["jardiner", 5, 0], ["pescador", 5, 0], ["fuster", 5, 0],
["sastre", 5, 0], ["pastor", 5, 0], ["carter", 5, 0], ["ferrer", 5, 0], ["flequer", 5, 0],
["pallasso", 5, 0], ["mag", 5, 0], ["soldat", 5, 0], ["porter", 5, 0], ["venedor", 5, 0],
["xofer", 5, 0], ["detectiu", 5, 0],

// MITJÀ (1)
["arquitecte", 5, 1], ["enginyer", 5, 1], ["advocat", 5, 1], ["jutge", 5, 1], ["fotògraf", 5, 1],
["periodista", 5, 1], ["escenògraf", 5, 1], ["coreògraf", 5, 1], ["geòleg", 5, 1], ["biòleg", 5, 1],
["químic", 5, 1], ["físic", 5, 1], ["astrònom", 5, 1], ["historiador", 5, 1], ["traductor", 5, 1],
["intèrpret", 5, 1], ["psicòleg", 5, 1], ["veterinari", 5, 1], ["conductor", 5, 1], ["mariner", 5, 1],
["electricista", 5, 1], ["lampista", 5, 1], ["paleta", 5, 1], ["escriptor", 5, 1], ["bibliotecari", 5, 1],
["secretari", 5, 1], ["comptable", 5, 1], ["model", 5, 1], ["entrenador", 5, 1], ["àrbitre", 5, 1],

// DIFÍCIL (2)
["criptògraf", 5, 2], ["paleontòleg", 5, 2], ["arqueòleg", 5, 2], ["entomòleg", 5, 2],
["ornitòleg", 5, 2], ["herpetòleg", 5, 2], ["cartògraf", 5, 2], ["topògraf", 5, 2],
["dendròleg", 5, 2], ["micòleg", 5, 2], ["oceanògraf", 5, 2], ["meteoròleg", 5, 2],
["vulcanòleg", 5, 2], ["sismòleg", 5, 2], ["etnòleg", 5, 2], ["lexicògraf", 5, 2],
["criptòleg", 5, 2], ["patòleg", 5, 2], ["anestesista", 5, 2], ["radiòleg", 5, 2],

// --- CULTURA (ID: 6) ---
// FÀCIL (0)
["conte", 6, 0], ["dibuix", 6, 0], ["música", 6, 0], ["cançó", 6, 0], ["fotografia", 6, 0],
["pintura", 6, 0], ["dansa", 6, 0], ["obra", 6, 0], ["pel·lícula", 6, 0], ["història", 6, 0],
["joc", 6, 0], ["festa", 6, 0], ["nadala", 6, 0], ["pasqua", 6, 0],
["flama", 6, 0], ["bandera", 6, 0], ["himne", 6, 0], ["monument", 6, 0], ["castell", 6, 0],
["màgia", 6, 0], ["circ", 6, 0], ["ràdio", 6, 0], ["tele", 6, 0], ["vídeo", 6, 0],
["notícia", 6, 0], ["premi", 6, 0], ["disfressa", 6, 0], ["màscara", 6, 0], ["piano", 6, 0], 

// MITJÀ (1)
["escultura", 6, 1], ["mosaic", 6, 1], ["òpera", 6, 1], ["simfonia", 6, 1], ["sonata", 6, 1],
["poema", 6, 1], ["novel·la", 6, 1], ["assaig", 6, 1], ["mite", 6, 1], ["mural", 6, 1],
["grafit", 6, 1], ["ceràmica", 6, 1], ["tèxtil", 6, 1], ["gastronomia", 6, 1], ["vinicultura", 6, 1],
["carnaval", 6, 1], ["faller", 6, 1], ["geganter", 6, 1], ["sardana", 6, 1], ["havanera", 6, 1],
["ballet", 6, 1], ["jazz", 6, 1], ["rock", 6, 1], ["còmic", 6, 1], ["llegenda", 6, 1],
["faula", 6, 1], ["refrany", 6, 1], ["dita", 6, 1], ["tradició", 6, 1], ["ritual", 6, 1],

// DIFÍCIL (2)
["patrimoni", 6, 2], ["herència", 6, 2], ["iconografia", 6, 2], ["hagiografia", 6, 2],
["epigrafia", 6, 2], ["numismàtica", 6, 2], ["filatèlia", 6, 2], ["criptografia", 6, 2],
["heràldica", 6, 2], ["genealogia", 6, 2], ["etnografia", 6, 2], ["sociolingüística", 6, 2],
["paleografia", 6, 2], ["sigil·lografia", 6, 2], ["vexil·lologia", 6, 2],
["toponímia", 6, 2], ["antroponímia", 6, 2], ["filologia", 6, 2], ["semiòtica", 6, 2],
["hermenèutica", 6, 2], ["metafísica", 6, 2], ["epistemologia", 6, 2], ["teologia", 6, 2],
["cosmogonia", 6, 2], ["litúrgia", 6, 2], ["jurisprudència", 6, 2], ["museologia", 6, 2],
["arxivística", 6, 2], ["demografia", 6, 2], ["antropologia", 6, 2], ["etnologia", 6, 2],

// --- ESPORTS (ID: 7) ---
// FÀCIL (0)
["futbol", 7, 0], ["bàsquet", 7, 0], ["tennis", 7, 0], ["natació", 7, 0], ["atletisme", 7, 0],
["ciclisme", 7, 0], ["handbol", 7, 0], ["voleibol", 7, 0], ["gimnàstica", 7, 0], ["boxa", 7, 0],
["patinatge", 7, 0], ["esquí", 7, 0], ["hoquei", 7, 0], ["rugbi", 7, 0], ["beisbol", 7, 0],
["pilota", 7, 0], ["frontó", 7, 0], ["escacs", 7, 0], ["dards", 7, 0], ["bowling", 7, 0],

// MITJÀ (1)
["waterpolo", 7, 1], ["halterofília", 7, 1], ["lluita", 7, 1], ["esgrima", 7, 1], ["pentatló", 7, 1],
["orientació", 7, 1], ["rem", 7, 1], ["piragüisme", 7, 1], ["vela", 7, 1], ["surf", 7, 1],
["paracaigudisme", 7, 1], ["escalada", 7, 1], ["trail", 7, 1], ["ultramarató", 7, 1],
["biatló", 7, 1], ["curling", 7, 1], ["softbol", 7, 1], ["polo", 7, 1], ["pàdel", 7, 1], ["futbol sala", 7, 1],  

// DIFÍCIL (2)
["criquet", 7, 2], ["squash", 7, 2], ["badminton", 7, 2], ["taekwondo", 7, 2], ["judoka", 7, 2],
["kàrate", 7, 2], ["aikido", 7, 2], ["sumo", 7, 2], ["pentatló modern", 7, 2], ["decatló", 7, 2],
["heptatló", 7, 2], ["eslàlom", 7, 2], ["bob", 7, 2], ["luge", 7, 2], ["skeleton", 7, 2],
["kin-ball", 7, 2], ["bossaball", 7, 2], ["pickleball", 7, 2], ["bobsleigh", 7, 2],  ["lacrosse", 7, 2],
];