// Define language reload anchors
var dataReload = document.querySelectorAll("[reload]");

// Language Translations (Eng,Es,Fr)
var languages = {
  eng: {
    settings: "settings",
    timer: "timer",
    clock: "clock",
    alarm: "alarm"
  },
  es: {
    settings: "ajustes",
    timer: "temporizador",
    clock: "",
  },
  fr: {
    settings: "paramètres",
    timer:  "minuteur",
    clock: "",
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
