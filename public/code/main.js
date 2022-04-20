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
// Value for stopwatch
var sValue = 1;
// False = No, True = Yes
var doubleDigits = false;
// Holds amout of Alarms
var numOfAlarms = 0;
// Contains Alarm names
var alarmNames = new Array;
// Contains Alarm times
var alarmTimes = new Array;
// Active Alarm Sound
var activeAlarmSound = 0;
// Alarm Sounds                         0                                1                             2                             3                               4                                 5                             6                               7                              8                               9
var alarmSounds = new Array("media/alarms/default.mp3","media/alarms/heavy-metal.mp3","media/alarms/harp-strumming.mp3","media/alarms/rooster.mp3","media/alarms/military-trumpet.mp3","media/alarms/cuckoo-clock.mp3","media/alarms/alien-ship.mp3","media/alarms/buzzer-alarm.wav","media/alarms/digital-alarm.wav","media/alarms/vintage-alarm.wav");
// Default alarm
var audio = new Audio(alarmSounds[activeAlarmSound]);
// False = No, True = Yes
var isStopwatch = false;
// Settings animation, True = On, False = Off
var settingsAnimation = true;
// false = Light, true = Dark
var isDark = false;

// Main Code

// Function executes when page loads
$(document).ready(function() {
  showClock();
  // Hides unnused UI onload
  $(".stopwatch").hide();
  // Gets users timezone
  var tza = () => {
    var { 1: tz } = new Date().toString().match(/\((.+)\)/);
    if (tz.includes(" ")) {
      return tz .split(" ") .map(([first]) => first) .join("");
    } else {
      return tz;
    }
  }
  // Prints users timezone
  $("#timeZoneButton").html(tza);
})

// Makes alarm loop when finished
audio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

setInterval(function() {
  
  var date = new Date();
  // Gets date in number form
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();

  // Selects which date format to use
  if(dateFormat === false) {
      var today = dd + "/" + mm + "/" + yyyy;
  } else {
      var today = mm + "/" + dd + "/" + yyyy;
  }
  // Prints out date
  $(".date").html(today);

  // Gets time values
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Creates time to compare to alarm time
  var checkTime = (hours < 10 ? "0" : "" ) + hours + ":" + minutes;

  // Cycles through all Alarms
  for (var i = 0; i < numOfAlarms; i++) {
    
    // Checks if current time matches alarm time
    if (checkTime == alarmTimes[i] && seconds == "00") {   
      // Prints alarm information
      $(".activeAlarmName").html(alarmNames[i]);
      $(".activeAlarmTime").html(alarmTimes[i]);
      
      // Plays audio and activates alarm menu
      audio.play();
      $("#alarmActive").css("display","block");
    }

  }
  
  // Clears AM / PM incase of 24 hour format
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

  // Pads integers < 10
  hours = (hours < 10 ? "0" : "" ) + hours;
  minutes = (minutes < 10 ? "0" : "" ) + minutes;
  seconds = (seconds < 10 ? "0" : "" ) + seconds;

  // Prints time
  $(".display").html(hours + ":" + minutes + ":" + seconds);

},1000);

/*
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
}                                                     <----- Unused alarm system

function openAlert() {
  // Glides box in from top
  $(".alertBox").css("top","20vh");
}

function closeAlert() {
  // Glides box out
  $(".alertBox").css("top","-5vh");
}*/

// Opens the Settings pannel
function showSettings() {

  // Checks wether animation is on
  if (settingsAnimation == true) {
    
    $("#settings").css("transition","1.5s");

    // Reveals settings list
    setTimeout(function() {
      $("#settings-container").css("display","block");
    },1750)

  } else {
    
    $("#settings").css("transition","0s");
    
    // Reveals settings list
    $("#settings-container").css("display","block");

  }

  // Stretches box to fit screen
  $("#settings").css("height","100vh");
  $("#settings").css("width","100%");

  // Moves box into view
  $("#settings").css("left","0");

  // Removes curved edges
  $("#settings").removeClass("borderRadius");
}

// Closes the Settings pannel
function closeSettings() {

  if (settingsAnimation == true) {
    $("#settings").css("transition","1.5s");
  } else {
    $("#settings").css("transition","0s");
    $("#settings-container").css("display","none");
  }

  // Shrinks box to exit screen (Length)
  $("#settings").css("height","1vh");
  // Shrinks box to exit screen (Width)
  $("#settings").css("width","1vh");
  // Moves box out of view
  $("#settings").css("left","-1vh");
  // Adds curved edges
  $("#settings").addClass("borderRadius");
  // Hides settings list
  $("#settings-container").css("display","none");
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

/*
// Swaps from Digital to Analog
function dtoa() {
  // Tells system Digital clock is hidden
  isDigital = false;

  // Shrinks black background
  $(".digital").css("height","0");
  $(".digital").css("width","0");

  // Shrinks font sizes
  $(".display").css("font-size","0");
  $(".ampm").css("font-size","0");                     <----- Unused analog clock system
  $(".date").css("font-size","0");

  // Enlarges Analog clock
  // wOw such empty
}

// Swaps from Analog to Digital
function atod() {
  // TODO (Yeah rigth :p)
}
*/

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

  // Resets if empty
  if (timerSeconds == 0 && timerMinutes == 0 && timerHours == 0) {
    resetTimer();
  }

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
  
  // Resets if empty
  if (timerSeconds == 0 && timerMinutes == 0 && timerHours == 0) {
    resetTimer();
  }

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
  if (doubleDigits == true) {
    ps = (ps < 10 ? "0" : "" ) + ps;
    pm = (pm < 10 ? "0" : "" ) + pm;
    ph = (ph < 10 ? "0" : "" ) + ph;
  }

  // Prints Values
  $("#span1").html(ph);
  $("#span2").html(pm);
  $("#span3").html(ps);
}

function pauseTimer() {
  if (value == 1) {
    value = 0;
    $("#pauseTimer").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/>');
  } else {
    value = 1;
    $("#pauseTimer").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path class="barOnSVG" d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  }
}

function resetTimer() {

  value = 1;
  $("#pauseTimer").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path class="barOnSVG" d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  
  // Changes Icon
  $("#startTimer").css("display","block");
  $("#pauseTimer").css("display","none");
  
  // Changes from Input to Display
  $(".timerInput").css("display","block");
  $(".timerDisplay").css("display","none");

  clearInterval(intervalId)
}

// Swaps 24 hour format on or off
function clockModeChanger() {
  if (clockMode == false) {
    clockMode = true;
    $("#clockModeButton").html("On");
  } else {
    clockMode = false;
    $("#clockModeButton").html("Off");
  }
}

// Changes between the World and USA
function dateFormatChanger() {
  if (dateFormat == false) {
    dateFormat = true;
    $("#dateFormatButton").html("MM/DD");
  } else {
    dateFormat = false;
    $("#dateFormatButton").html("DD/MM");
  }
}

// Swaps chunky numbers on / off (Timer Panel)
function doubleDigitsChanger() {
  if (doubleDigits == false) {
    doubleDigits = true;
    $("#doubleDigitsButton").html("On");
  } else {
    doubleDigits = false;
    $("#doubleDigitsButton").html("Off");
  }
}

// Turns settings opening animation on / off
function settingsAnimControl() {
  if (settingsAnimation == true) {
    settingsAnimation = false;
    $("#setAnimButton").html("Off");
  } else {
    settingsAnimation = true;
    $("#setAnimButton").html("On");
  }
}

// Adds alarm to container
function addAlarm() {
  $(".alarms-container").prepend('<div class="alarm"><input type="text" class="alarmName" placeholder="Morning Alarm"><input type="time" class="alarmTime" placeholder="Morning Alarm"><div id="remove" onclick="removeAlarm(this)">Remove</div><div id="submit" onclick="submitAlarm(this)">Submit</div></div>');
}

// Removes alarm
function removeAlarm(x) {
  $(x).closest('.alarm').remove();
  numOfAlarms -= 1;
}

function submitAlarm(x) {
  if ($(".alarmName").val() == "" || $(".alarmTime").val() == "") {
    // Nothing
  } else {
    // Adds data to arrays
    alarmNames[numOfAlarms] = $(".alarmName").val();
    alarmTimes[numOfAlarms] = $(".alarmTime").val();

    // Adds final alarm to container
    $(x).closest('.alarm').css("height","15vh");
    $(x).closest('.alarm').html('<div class="printAlarmName">' + alarmNames[numOfAlarms] + '</div><div class="printAlarmTime">' + alarmTimes[numOfAlarms] + '</div>');

    numOfAlarms += 1;
  }
}

// Stops alarm from playing
function cancelAlarm() {
  $("#alarmActive").css("display","none");
  audio.pause();
  audio.remove();
}

// Changes alarm sound
function changeAlarmSound(x) {
  // Gets chosen alarm ready to play
  activeAlarmSound = x;
  audio = new Audio(alarmSounds[activeAlarmSound]);

  // Resets alarm to beginning if already used
  audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

  // Hides alarm sound menu and plays alarm taster
  $(".alarmSwitcher").css("display","none");
  audio.play();

  setTimeout(function() {
    cancelAlarm();
    audio.currentTime = 0;
  }, 5000)
}

// Swaps between timer and stopwatch
function timerChanger() {
  if (isStopwatch === false) {
    $(".timerMain").hide();
    $(".timerControls").hide();
    $(".stopwatch").show();
    $("#stopwatchLabel").html("Timer");
    isStopwatch = true;
  } else {
    $(".timerMain").show();
    $(".timerControls").show();
    $(".stopwatch").hide();
    $("#stopwatchLabel").html("Stopwatch");
    isStopwatch = false;
  }
}

// Changes between light and dark
function themeChanger() {
  if (isDark === false) {
    isDark = true;
    $("html").addClass("dark");
    $("#themeButton").html("Dark");
    $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
  } else if (isDark === true) {
    isDark = false;
    $("html").removeClass("dark");
    $("#themeButton").html("Light");
    $("meta[name='theme-color']").attr("content", "#D3D3D3");
  }
}

// Starts stopwatch
function startStopwatch() {
  // Values
  stopwatchS = 0;
  stopwatchM = 0;
  stopwatchH = 0;

  // Prints values
  $("#span4").html(stopwatchH);
  $("#span5").html(stopwatchM);
  $("#span6").html(stopwatchS);

  // Changes Icon
  $("#startStopwatch").css("display","none");
  $("#pauseStopwatch").css("display","block");

  stopwatchCycle = setInterval(stopwatch, 1000);
}

// Main code for stopwatch
function stopwatch() {
  // increments stopwatch
  stopwatchS += sValue;

  // sorts out number changing
  if (stopwatchS > 59) {
    stopwatchS = 0;
    stopwatchM += 1;
    if (stopwatchM > 59) {
      stopwatchM = 0;
      stopwatchH += 1;
    }
  }

  // Print variables
  pSS = stopwatchS;
  pSM = stopwatchM;
  pSH = stopwatchH;

  // Pads integers
  if (doubleDigits === true) {
    pSS = (pSS < 10 ? "0" : "" ) + pSS;
    pSM = (pSM < 10 ? "0" : "" ) + pSM;
    pSH = (pSH < 10 ? "0" : "" ) + pSH;
  }

  // Prints values
  $("#span4").html(pSH);
  $("#span5").html(pSM);
  $("#span6").html(pSS);
}

// Pauses stopwatch
function pauseStopwatch() {
  if (sValue == 1) {
    sValue = 0;
    $("#pauseStopwatch").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/>')
  } else {
    sValue = 1;
    $("#pauseStopwatch").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  }
}

// Resets to factory settings
function resetStopwatch() {
  // Stops stopwatch code
  clearInterval(stopwatchCycle);

  // Clears values
  $("#span4").html("0");
  $("#span5").html("0");
  $("#span6").html("0");

  sValue = 1;
  $("#pauseStopwatch").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
  // Changes Icon
  $("#startStopwatch").css("display","block");
  $("#pauseStopwatch").css("display","none");
}
