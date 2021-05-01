// Define language reload anchors
var dataReload = document.querySelectorAll("[reload]");

// Word Translations (Eng,Es,Fr)
var languages = {
  eng: {
    settings: "settings",
    timer: "timer",
    clock: "clock",
    alarm: "alarm",
    digital: "digital",
    analog: "analog",
    countdown: "countdown",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    start: "start",
    pause: "pause",
    reset: "reset",
    play: "play",
    add: "add",
    name: "name",
    time: "time",
    create: "create",
    view: "view",
    open: "open",
    on: "on",
    off: "off",
    general: "general",
    privacy_policy: "privacy policy",
    language: "language",
    change: "chane",
    github_repository: "faq",
    codepen_edition: "codepen edition",
    channel: "channel",
    clock_pannel: "clock pannel",
    clock_mode: "24 hour clock",
    date_format: "day & month format",
    system_clock: "system clock",
    time_zone: "time zone",
    second_hand_colour: "second hand colour"
  },
  es: {
    settings: "ajustes",
    timer: "temporizador",
    clock: "reloj",
    alarm: "alarme",
    digital: "digital",
    analog: "analog",
    countdown: "cuenta regresiva",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
    start: "comienzo",
    pause: "pausa",
    reset: "reiniciar",
    play: "tocar",
    add: "agregar",
    name: "nombre",
    time: "tiempo",
    create: "crear",
    view: "vista",
    open: "abierto",
    on: "en",
    off: "de",
    general: "general",
    privacy_policy: "política de privacidad",
    language: "idioma",
    change: "cambio",
    github_repository: "faq",
    codepen_edition: "codepen edición",
    channel: "canal",
    clock_pannel: "panel de reloj",
    clock_mode: "24 reloj de la hora",
    date_format: "formato de día y mes",
    system_clock: "reloj del sistema",
    time_zone: "zona horaria",
    second_hand_colour: "color de segunda mano"
  },
  fr: {
    settings: "paramètres",
    timer:  "minuteur",
    clock: "l'horloge",
    alarm: "alarma",
    digital: "numérique",
    analog: "analogique",
    countdown: "compte à rebours",
    hours: "heures",
    minutes: "minutes",
    seconds: "seconds",
    start: "démarrer",
    pause: "pause",
    reset: "réinitialiser",
    play: "jouer",
    add: "ajouter",
    name: "nom",
    time: "temps",
    create: "créer",
    view: "vue",
    open: "ouvert",
    on: "au",
    off: "désactivé",
    general: "général",
    privacy_policy: "politique de confidentialité",
    language: "langue",
    change: "monnaie",
    github_repository: "faq",
    codepen_edition: "codepen édition",
    channel: "canal",
    clock_pannel: "panneau d'horloge",
    clock_mode: "Horloge de 24 heures",
    date_format: "format jour et mois",
    system_clock: "horloge système",
    time_zone: "fuseau horaire",
    second_hand_colour: "couleur de seconde main"
  }
}

// Opens language change menu
function languageChange() {
  $("#languageList").toggle(500);
}

// Define language via window hash
if(window.location.hash) {
  if(window.location.hash === "#es") {

  }
  if(window.location.hash === "#fr") {

  }
}

// Define language reload when changed
for (var i = 0; i < dataReload.length; i++) {
  dataReload[i] = function() {
    location.reload(true);
  }
}
