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
    timer: "timer",
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
    github_repository: "faq",
    codepen_edition: "codepen edition",
    channel: "channel",
    clock_pannel: "clock pannel",
    clock_mode: "24 hour clock",
    date_format: "day & month format",
    system_clock: "system clock",
    time_zone: "time zone",
    second_hand_colour: "second hand colour";
  },
  es: {
    settings: "ajustes",
    timer: "temporizador",
    clock: "reloj",
    alarm: "alarme",
  },
  fr: {
    settings: "paramètres",
    timer:  "minuteur",
    clock: "l'horloge",
    alarm: "alarma",
  }
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
