// Variable Bank

// False = dd/mm, True = mm/dd
var dateFormat = false;
// True = 24, False = 12
var clockMode = false;
// False = No, True = Yes
var isAlertClosed = false;
// True = Digital, False = Analog
var isDigital = true;
// Value for timer
var value = 1;

// Main Code

// Function executes when page loads
$(document).ready(function() {
  showClock();
  // Gets users timezone
  var tza = () => {
    var { 1: tz } = new Date().toString().match(/\((.+)\)/);
    if (tz.includes(" ")) {
      return tz .split(" ") .map(([first]) => first) .join("");
    } else {
      return tz;
    }
  }
  $("#timeZoneButton").html(tza);
})

setInterval(function() {
  // Date declared every second to refresh
  var date = new Date();
  // Gets date in number form
  var dd = String(date.getDate()).padStart(2, '0');
  // Gets month in number form
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  // Gets year in number form
  var yyyy = date.getFullYear();
  // Selects which date format to use
  if(dateFormat === false) {
      var today = dd + "/" + mm + "/" + yyyy;
  } else {
      var today = mm + "/" + dd + "/" + yyyy;
  }
  // Prints out date
  $(".date").html(today);
  // Gets hours value
  var hours = date.getHours();
  // Clears AM / PM
  $(".ampm").html("");
  // Accounts for 12 hour
  if (clockMode === false) {
      // Selects between AM and PM
      var ampm = (hours < 12) ? "AM" : "PM";
      // Prints AM / PM
      $(".ampm").html(ampm);
      // Gets hour in 12 hour format
      hours = (hours > 12) ? hours - 12 : hours;
  }
  // Gets minute value
  var minutes = date.getMinutes();
  // Gets Second value
  var seconds = date.getSeconds();
  // Adds 0 to numbers < 10
  hours = (hours < 10 ? "0" : "" ) + hours;
  minutes = (minutes < 10 ? "0" : "" ) + minutes;
  seconds = (seconds < 10 ? "0" : "" ) + seconds;
  // Prints time
  $(".display").html(hours + ":" + minutes + ":" + seconds);
},1000);

//Sorts out Alerts
function alertBox(x) {
  // Sets text to string inputed
  $(".message").html(x);
  openAlert();
  isAlertClosed = false;

  // Closes Alert automatically after 5 seconds
  setTimeout(function() {
      if(isAlertClosed == false) {
          closeAlert();
      }
  },5000)
}

function openAlert() {
  // Glides box in from top
  $(".alertBox").css("top","20vh");
}

function closeAlert() {
  // Glides box out
  $(".alertBox").css("top","-5vh");
}

// Opens the Settings pannel
function showSettings() {
  // Stretches box to fit screen
  $("#settings").css("height","100vh");
  $("#settings").css("width","100%");
  // Moves box into view
  $("#settings").css("left","0");
  // Removes curved edges
  $("#settings").css("border-radius","0");
  // Reveals settings list
  setTimeout(function() {
    $("#settings-container").css("display","block")
  },1750)
}

// Closes the Settings pannel
function closeSettings() {
  // Shrinks box to exit screen (Length)
  $("#settings").css("height","1vh");
  // Shrinks box to exit screen (Width)
  $("#settings").css("width","1vh");
  // Moves box out of view
  $("#settings").css("left","-1vh");
  // Adds curved edges
  $("#settings").css("border-radius","0 0 150vh 0");
  // Hides settings list
  $("#settings-container").css("display","none")
}

// Shows the Timer pannel, closes others
function showTimer() {
  // Closes / Opens necessary pannels
  $("#timerPannel").show();
  $("#clockPannel").hide();
  $("#alarmPannel").hide();
}

// Shows the Clock pannel, closes others
function showClock() {
  // Closes / Opens necessary pannels
  $("#timerPannel").hide();
  $("#clockPannel").show();
  $("#alarmPannel").hide();
}

// Shows the Alarm pannel, closes others
function showAlarm() {
  // Closes / Opens necessary pannels
  $("#timerPannel").hide();
  $("#clockPannel").hide();
  $("#alarmPannel").show();
}

// Swaps from Digital to Analog
function dtoa() {
  // Tells system Digital clock is hidden
  isDigital = false;

  // Shrinks black background
  $(".digital").css("height","0");
  $(".digital").css("width","0");
  // Shrinks font sizes
  $(".display").css("font-size","0");
  $(".ampm").css("font-size","0");
  $(".date").css("font-size","0");

  // Enlarges Analog clock

}

// Swaps from Analog to Digital
function atod() {
  // TODO
}

// Starts Timer
function startTimer() {
  // Gets Values
  timerHours = $("#hours").val();
  timerMinutes = $("#minutes").val();
  timerSeconds = $("#seconds").val();

  // Defaults values
  if (timerHours == "") {timerHours = 0}
  if (timerMinutes == "") {timerMinutes = 0}
  if (timerSeconds == "") {timerSeconds = 0}

  // Makes values positive
  if (timerHours < 0) {timerHours = 0}
  if (timerMinutes < 0) {timerMinutes = 0}
  if (timerSeconds < 0) {timerSeconds = 0}

  // Changes Icon
  $("#startTimer").css("display","none");
  $("#pauseTimer").css("display","block");

  // Changes from Input to Display
  $(".timerInput").css("display","none");
  $(".timerDisplay").css("display","block");

  // Prints values
  $("#span1").html(timerHours);
  $("#span2").html(timerMinutes);
  $("#span3").html(timerSeconds);

  intervalId = setInterval(countdown, 1000)
}

function countdown() {
  timerSeconds -= value;
  // Main time keeping
  if(timerSeconds < 0) {
    timerSeconds = 59;
    timerMinutes -= 1;
  }
  if(timerMinutes < 0) {
    timerSeconds = 59;
    timerMinutes = 59;
    timerHours -= 1;
  }
  if(timerHours < 0) {
    timerSeconds = 59;
    timerMinutes = 59;
  }

  // Print Values
  var ps = timerSeconds;
  var pm = timerMinutes;
  var ph = timerHours;

  // Pads with zeros
  ps = (ps < 10 ? "0" : "" ) + ps;
  pm = (pm < 10 ? "0" : "" ) + pm;
  ph = (ph < 10 ? "0" : "" ) + ph;

  if (timerSeconds == 0 && timerMinutes == 0 && timerHours == 0) {
    resetTimer();
  }

  // Prints Values
  $("#span1").html(ph);
  $("#span2").html(pm);
  $("#span3").html(ps);
}

function pauseTimer() {
  if (value == 1) {
    value = 0;
    $("#pauseTimer").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/>')
  } else {
    value = 1;
    $("#pauseTimer").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  }
}

function resetTimer() {
  value = 1;
  $("#pauseTimer").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  // Changes Icon
  $("#startTimer").css("display","block");
  $("#pauseTimer").css("display","none");
  // Resets value
  $(".timerInput").html('<input id="hours" placeholder="00" type="number"/ min="0" max="99" />h <input id="minutes" placeholder="00" type="number" min="0" max="99"/>m <input id="seconds" placeholder="00" type="number" min="0" max="99"/>s')
  // Changes from Input to Display
  $(".timerInput").css("display","block");
  $(".timerDisplay").css("display","none");
  clearInterval(intervalId)
}

function clockModeChanger() {
  if (clockMode == false) {
    clockMode = true;
    $("#clockModeButton").html("On");
  } else {
    clockMode = false;
    $("#clockModeButton").html("Off");
  }
}

function dateFormatChanger() {
  if (dateFormat == false) {
    dateFormat = true;
    $("#dateFormatButton").html("MM/DD");
  } else {
    dateFormat = false;
    $("#dateFormatButton").html("DD/DD");
  }
}

function addAlarm() {

}
