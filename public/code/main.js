// Variable Bank

// Value for timer
var value = 1;
// Value for stopwatch
var sValue = 1;
// Holds amout of Alarms
var numOfAlarms = 0;
// Alarms container
const alarms = []
// Alarm Sounds                         0                                1                             2                             3                               4                                 5                             6                               7                              8                               9
var alarmSounds = new Array("media/alarms/default.mp3","media/alarms/heavy-metal.mp3","media/alarms/harp-strumming.mp3","media/alarms/rooster.mp3","media/alarms/military-trumpet.mp3","media/alarms/cuckoo-clock.mp3","media/alarms/alien-ship.mp3","media/alarms/buzzer-alarm.wav","media/alarms/digital-alarm.wav","media/alarms/vintage-alarm.wav");
// False = Normal, True = Focus
var isFocus = false;
// Timezones
const timeZones = [
	"Etc/GMT+12",
	"Pacific/Pago_Pago",
	"Pacific/Honolulu",
	"America/Juneau",
	"America/Los_Angeles",
	"America/Denver",
	"America/Chicago",
	"America/New_York",
	"America/Halifax",
	"America/Argentina/Buenos_Aires",
	"America/Sao_Paulo",
	"Atlantic/Cape_Verde",
	"Europe/London",
	"Europe/Paris",
	"Europe/Istanbul",
	"Asia/Baghdad",
	"Asia/Dubai",
	"Asia/Karachi",
	"Asia/Kolkata",
	"Asia/Dhaka",
	"Asia/Bangkok",
	"Asia/Shanghai",
	"Asia/Tokyo",
	"Pacific/Guam"
];
// Stores what time zone is active
var timeZoneNumber = 24;
// Stores local timezone number
var localTimeZoneNumber = 0;

// Sets dark theme if system is dark on first load

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  if (localStorage.getItem('darkMode') == null) {
    $("html").addClass("dark");
    $("#themeButton").html("Dark");
    $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
    isDark = "true";
    localStorage.setItem('darkMode', isDark);
  }
} else {
  // Theme set to light. Light is default.
}

// Local Storage Variables

// False = dd/mm, True = mm/dd
var dateFormat = localStorage.getItem('dateFormat') || "false";
// True = 12, False = 24
var clockMode = localStorage.getItem('clockMode') || "true";
// False = Light, True = Dark
var isDark = localStorage.getItem('darkMode') || "false";
// False = No, True = Yes
var doubleDigits = localStorage.getItem('doubleDigits') || "false";
// Settings animation, True = On, False = Off
var settingsAnimation = localStorage.getItem('settingsAnim') || "true";
// Timer Transition, True = On, False = Off
var timerTransition = localStorage.getItem("timerTrans") || "true";
// False = Timer, True = Stopwatch
var isStopwatch = localStorage.getItem("isStopwatch") || "false";
// Active Alarm Sound
var activeAlarmSound = localStorage.getItem("activeAlarmSound") || "0";
// Hide focus mode
var hideFocusMode = localStorage.getItem("hideFocusMode") || "false";
// Play sound when timer completed
var timerSound = localStorage.getItem("timerSound") || "true";
// Current Font
var currentFont = localStorage.getItem("currentFont") || "0";

// Initiates alarm sound
var audio = new Audio(alarmSounds[parseInt(activeAlarmSound, 10)]);

// Local Storage retrieval and setups

if (localStorage.getItem('darkMode') == "true") {
  $("html").addClass("dark");
  $("#themeButton").html("Dark");
  $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
}

if (localStorage.getItem('clockMode') == "false") {
  $("#clockModeButton").html("On");
}

if (localStorage.getItem('dateFormat') == "true") {
  $("#dateFormatButton").html("MM/DD");
}

if (localStorage.getItem('doubleDigits') == "true") {
  $("#doubleDigitsButton").html("On");
}

if (localStorage.getItem('settingsAnim') == "false") {
  $("#setAnimButton").html("Off");
}

if (localStorage.getItem('timerTrans') == "false") {
  $("#ttsTransButton").html("Off");
  $("#timerChange").css("transition","0s");
}

if (localStorage.getItem('isStopwatch') == "true") {
  $("#timerChange").css("transform","rotate(180deg)");
  $(".timerMain").hide();
  $(".stopwatch").show();
  $("#timerResetContainer").hide();
  $("#stopwatchResetContainer").show();
  $("#timerPlayContainer").hide();
  $("#stopwatchPlayContainer").show();
}

if (localStorage.getItem("hideFocusMode") == "true") {
  $("#hideFocusModeBttn").html("On");
  $("#focusMode").hide();
}

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
  // Prints users timezone
  $("#timeZoneButton").html(tza);
  // Sets Font
  changeFont(currentFont);
  // Loads timezones
  for (let i = 0; i < timeZones.length; i++) {
    $("#timezoneList").append("<div class=\"switcherOption\" onclick=\"timeZoneNumber = " + [i] + "\">" + timeZones[i] + "</div>");
    if (timeZones[i] == Intl.DateTimeFormat().resolvedOptions().timeZone) {
      localTimeZoneNumber = i;
    }
  }
})

// Makes alarm loop when finished
audio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

setInterval(function() {
  // Declares date variable
  var date = new Date();

  // Selects which date format to use
  if(dateFormat == "false") {
      var today = String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
  } else {
      var today = String(date.getMonth() + 1).padStart(2, '0') + "/" + String(date.getDate()).padStart(2, '0') + "/" + date.getFullYear();
  }

  // Creates time to compare to alarm time
  var checkTime = (date.getHours() < 10 ? "0" : "" ) + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "" ) + date.getMinutes();

  // FUTURE REFERENCE

  for (var i = 0; i < numOfAlarms; i++) {
    
    // Checks if current time matches alarm time
    if (checkTime == alarms[i].time && date.getSeconds() == "00") {
      // Prints alarm information
      $(".activeAlarmName").html(alarms[i].name);
      $(".activeAlarmTime").html(alarms[i].time);
      // Plays audio and activates alarm menu
      audio.play();
      $("#alarmActive").css("display","block");
    }

  }

  // Clears AM / PM incase of 24 hour format
  $(".ampm").html("");
  // Clears AM / PM incase of 24 hour format
  $(".date").html("");

  // Timzeone handler
  var timesInAllTimeZones = timeZones.map(timeZone => {
    var dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: (clockMode === "true")
    });

    // Get the current time in the local timezone
    const localTime = new Date();

    // If statement for 12/24 hour clock
    const timeString = dateTimeFormat.format(localTime);
    if (clockMode == "false") {
      // Extract the last two characters (AM/PM)
      var amPm = "";
      var timeZonetimeFull = timeString;
    } else {
      var amPm = timeString.slice(-2);
      var timeZonetimeFull = timeString.slice(0, -3);
    }

    return {
      timeZone: timeZone,
      time: timeZonetimeFull,
      amPm: amPm
    };
  });

  if (timeZoneNumber != 24 && timeZoneNumber != localTimeZoneNumber) {
    $(".display").html(timesInAllTimeZones[timeZoneNumber].time);
    $(".ampm").html(timesInAllTimeZones[timeZoneNumber].amPm);
    $("#timeZoneButton").html(Intl.DateTimeFormat('en', { timeZoneName: 'short', timeZone: timesInAllTimeZones[timeZoneNumber].timeZone }).formatToParts(date).find(x => x.type === 'timeZoneName').value)
    $(".date").html(Intl.DateTimeFormat('en', { timeZoneName: 'short', timeZone: timesInAllTimeZones[timeZoneNumber].timeZone }).formatToParts(date).find(x => x.type === 'timeZoneName').valueremove)
  } else {
    hours = (date.getHours() < 10 ? "0" : "" ) + date.getHours();

    // Accounts for 12 hour
    if (clockMode == "true") {
      
      // Selects between AM and PM
      var ampmT = (date.getHours() < 12) ? "AM" : "PM";
      // Prints AM / PM
      $(".ampm").html(ampmT);
      // Gets hour in 12 hour format
      hours = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
      hours = (date.getHours() < 1) ? date.getHours() + 12 : hours;
    }

    // Pads integers < 10
    minutes = (date.getMinutes() < 10 ? "0" : "" ) + date.getMinutes();
    seconds = (date.getSeconds() < 10 ? "0" : "" ) + date.getSeconds();

    // Prints time
    $(".display").html(hours + ":" + minutes + ":" + seconds);

    // Prints out date
    $(".date").html(today);
  }
}, 10);

// Opens the Settings pannel
function showSettings() {

  // Checks wether animation is on
  if (settingsAnimation == "true") {
    
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
  $("#settings").css("height","100%");
  $("#settings").css("width","100%");

  // Moves box into view
  $("#settings").css("left","0");

  // Removes curved edges
  $("#settings").removeClass("borderRadius");
}

// Closes the Settings pannel
function closeSettings() {

  if (settingsAnimation == "true") {
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
  $("#timerPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="pauseTimer" onclick="pauseTimer()"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path class="barOnSVG" d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/></svg>');

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
    if (timerSound == "true") {
      audio.play();
      setTimeout(function() {
        audio.pause();
        audio.remove();
        audio.currentTime = 0;
      }, 5000)
    }
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
  if (doubleDigits == "true") {
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
  $("#timerPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="startTimer" onclick="startTimer()"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/></svg>');
  
  // Changes from Input to Display
  $(".timerInput").css("display","block");
  $(".timerDisplay").css("display","none");

  clearInterval(intervalId)
}

// Controls focus mode stuff
function focusModeControl() {
  if (isFocus == false) {
    isFocus = true;
    $("header").hide();
    $(".digital").addClass("clear")
    $("#focusMode").html('<path id="focusPath" class="barOnSVG" d="M73.6607 42.8571H59.8214C58.3371 42.8571 57.1429 41.6629 57.1429 40.1786V26.3393C57.1429 25.6027 57.7455 25 58.4821 25H62.9464C63.683 25 64.2857 25.6027 64.2857 26.3393V35.7143H73.6607C74.3973 35.7143 75 36.317 75 37.0536V41.5179C75 42.2545 74.3973 42.8571 73.6607 42.8571ZM42.8571 40.1786V26.3393C42.8571 25.6027 42.2545 25 41.5179 25H37.0536C36.317 25 35.7143 25.6027 35.7143 26.3393V35.7143H26.3393C25.6027 35.7143 25 36.317 25 37.0536V41.5179C25 42.2545 25.6027 42.8571 26.3393 42.8571H40.1786C41.6629 42.8571 42.8571 41.6629 42.8571 40.1786ZM42.8571 73.6607V59.8214C42.8571 58.3371 41.6629 57.1429 40.1786 57.1429H26.3393C25.6027 57.1429 25 57.7455 25 58.4821V62.9464C25 63.683 25.6027 64.2857 26.3393 64.2857H35.7143V73.6607C35.7143 74.3973 36.317 75 37.0536 75H41.5179C42.2545 75 42.8571 74.3973 42.8571 73.6607ZM64.2857 73.6607V64.2857H73.6607C74.3973 64.2857 75 63.683 75 62.9464V58.4821C75 57.7455 74.3973 57.1429 73.6607 57.1429H59.8214C58.3371 57.1429 57.1429 58.3371 57.1429 59.8214V73.6607C57.1429 74.3973 57.7455 75 58.4821 75H62.9464C63.683 75 64.2857 74.3973 64.2857 73.6607Z" fill="#36454F"/>')
  } else {
    isFocus = false;
    $("header").show();
    $(".digital").removeClass("clear")
    $("#focusMode").html('<g clip-path="url(#clip0_0_1)"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M25 42.5781V30.4688C25 29.1699 26.1942 28.125 27.6786 28.125H41.5179C42.2545 28.125 42.8571 28.6523 42.8571 29.2969V33.2031C42.8571 33.8477 42.2545 34.375 41.5179 34.375H32.1429V42.5781C32.1429 43.2227 31.5402 43.75 30.8036 43.75H26.3393C25.6027 43.75 25 43.2227 25 42.5781ZM57.1429 29.2969V33.2031C57.1429 33.8477 57.7455 34.375 58.4821 34.375H67.8571V42.5781C67.8571 43.2227 68.4598 43.75 69.1964 43.75H73.6607C74.3973 43.75 75 43.2227 75 42.5781V30.4688C75 29.1699 73.8058 28.125 72.3214 28.125H58.4821C57.7455 28.125 57.1429 28.6523 57.1429 29.2969ZM73.6607 56.25H69.1964C68.4598 56.25 67.8571 56.7773 67.8571 57.4219V65.625H58.4821C57.7455 65.625 57.1429 66.1523 57.1429 66.7969V70.7031C57.1429 71.3477 57.7455 71.875 58.4821 71.875H72.3214C73.8058 71.875 75 70.8301 75 69.5312V57.4219C75 56.7773 74.3973 56.25 73.6607 56.25ZM42.8571 70.7031V66.7969C42.8571 66.1523 42.2545 65.625 41.5179 65.625H32.1429V57.4219C32.1429 56.7773 31.5402 56.25 30.8036 56.25H26.3393C25.6027 56.25 25 56.7773 25 57.4219V69.5312C25 70.8301 26.1942 71.875 27.6786 71.875H41.5179C42.2545 71.875 42.8571 71.3477 42.8571 70.7031Z" fill="#36454F"/></g><defs><clipPath id="clip0_0_1"><rect width="100" height="100" fill="white"/></clipPath></defs>');
  }
}

// Swaps 24 hour format on or off
function clockModeChanger() {
  if (clockMode == "true") {
    clockMode = "false";
    $("#clockModeButton").html("On");
    localStorage.setItem('clockMode', clockMode);
  } else {
    clockMode = "true";
    $("#clockModeButton").html("Off");
    localStorage.setItem('clockMode', clockMode);
  }
}

// Changes between the World and USA
function dateFormatChanger() {
  if (dateFormat == "false") {
    dateFormat = "true";
    $("#dateFormatButton").html("MM/DD");
    localStorage.setItem('dateFormat', dateFormat);
  } else {
    dateFormat = "false";
    $("#dateFormatButton").html("DD/MM");
    localStorage.setItem('dateFormat', dateFormat);
  }
}

// Swaps chunky numbers on / off (Timer Panel)
function doubleDigitsChanger() {
  if (doubleDigits == "false") {
    doubleDigits = "true";
    $("#doubleDigitsButton").html("On");
  } else {
    doubleDigits = "false";
    $("#doubleDigitsButton").html("Off");
  }
  localStorage.setItem('doubleDigits', doubleDigits);
}

// Turns settings opening animation on / off
function settingsAnimControl() {
  if (settingsAnimation == "true") {
    settingsAnimation = "false";
    $("#setAnimButton").html("Off");
  } else {
    settingsAnimation = "true";
    $("#setAnimButton").html("On");
  }
  localStorage.setItem('settingsAnim', settingsAnimation);
}

// Turns transition from Timer to Stopwatch on and off
function timerTransitionAni() {
  if (timerTransition == "true") {
    timerTransition = "false";
    $("#ttsTransButton").html("Off");
    $("#timerChange").css("transition","0s");
  } else {
    timerTransition = "true";
    $("#ttsTransButton").html("On");
    $("#timerChange").css("transition","0.25s");
  }
  localStorage.setItem('timerTrans', timerTransition);
}

function hideFocusModeCon() {
  if (hideFocusMode == "true") {
    hideFocusMode = "false";
    $("#focusMode").show();
    $("#hideFocusModeBttn").html("Off");
  } else {
    hideFocusMode = "true";
    $("#focusMode").hide();
    $("#hideFocusModeBttn").html("On");
  }
  localStorage.setItem('hideFocusMode', hideFocusMode);
}

function timerSoundChanger() {
  if (timerSound == "true") {
    timerSound = "false";
    $("#timerSoundButton").html("Off");
  } else {
    timerSound = "true";
    $("#timerSoundButton").html("On");
  }
  localStorage.setItem('timerSound', timerSound);
}

// Adds alarm to container
function addAlarm() {
  $(".alarms-container").prepend('<div class="alarm"><input type="text" class="alarmName" placeholder="Morning Alarm"><input type="time" class="alarmTime" placeholder="Morning Alarm"><div id="submit" onclick="submitAlarm(this)">Accept</div><div id="remove" onclick="removeAlarm(this)">Delete</div></div>');
}

// Removes alarm
function removeAlarm(x) {
  $(x).closest('.alarm').remove();
}

function submitAlarm(x) {
  if ($(".alarmName").val() == "" || $(".alarmTime").val() == "") {
    // Nothing
  } else {
    numOfAlarms +=1;
    const newAlarm = { alarmNum: numOfAlarms, name: $(".alarmName").val(), time: $(".alarmTime").val()};
    alarms.push(newAlarm);
    // Adds final alarm to container
    $(x).closest('.alarm').css("height","15vh");
    $(x).closest('.alarm').html('<div class="printAlarmName">' + alarms.find(alarm => alarm.alarmNum === numOfAlarms).name + '</div><div class="printAlarmTime">' + alarms.find(alarm => alarm.alarmNum === numOfAlarms).time + '</div>');
  }
}

// Stops alarm from playing
function cancelAlarm() {
  $("#alarmActive").css("display","none");
  audio.pause();
  audio.remove();
}

function snoozeAlarm() {
  cancelAlarm();
  setTimeout( function() {
    $("#alarmActive").css("display","block");
    audio.play();
  }, 300000)
}

// Changes alarm sound
function changeAlarmSound(x) {
  // Gets chosen alarm ready to play
  activeAlarmSound = x;
  audio = new Audio(alarmSounds[activeAlarmSound]);

  localStorage.setItem("activeAlarmSound", activeAlarmSound)

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

// Changes active font

function changeFont(x) {
  $("body").removeClass("defaultFont");
  $("body").removeClass("classicFont");
  $("body").removeClass("wetFont");
  $("body").removeClass("arialFont");
  $("body").removeClass("bubbleFont");
  $("body").removeClass("robotFont");

  if (x == "0") {
    $("body").addClass("defaultFont");
    currentFont = x;
  } else if (x == "1") {
    $("body").addClass("classicFont");
    currentFont = x;
  } else if (x == "2") {
    $("body").addClass("wetFont");
    currentFont = x;
  } else if (x == "3") {
    $("body").addClass("arialFont");
    currentFont = x;
  } else if (x == "4") {
    $("body").addClass("bubbleFont");
    currentFont = x;
  } else {
    $("body").addClass("robotFont");
    currentFont = x;
  }
  localStorage.setItem('currentFont', currentFont);
}

// Swaps between timer and stopwatch
function timerChanger() {
  if (isStopwatch == "false") {
    $("#timerChange").css("transform","rotate(180deg)");
    $(".timerMain").hide();
    $(".stopwatch").show();
    $("#timerResetContainer").hide();
    $("#stopwatchResetContainer").show();
    $("#timerPlayContainer").hide();
    $("#stopwatchPlayContainer").show();
    isStopwatch = "true";
    localStorage.setItem('isStopwatch', isStopwatch);
  } else {
    $("#timerChange").css("transform","rotate(360deg)");
    $(".timerMain").show();
    $(".stopwatch").hide();
    $("#timerResetContainer").show();
    $("#stopwatchResetContainer").hide();
    $("#timerPlayContainer").show();
    $("#stopwatchPlayContainer").hide();
    isStopwatch = "false";
    localStorage.setItem('isStopwatch', isStopwatch);
  }
}

// Changes between light and dark
function themeChanger() {
  if (isDark == "false") {
    isDark = "true";
    localStorage.setItem('darkMode', isDark);
    $("html").addClass("dark");
    $("#themeButton").html("Dark");
    $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
  } else if (isDark == "true") {
    isDark = "false";
    localStorage.setItem('darkMode', isDark);
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
  $("#stopwatchPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="pauseStopwatch" onclick="pauseStopwatch()"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path class="barOnSVG" d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/></svg>');

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
  if (doubleDigits === "true") {
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
    $("#pauseStopwatch").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/>')
  } else {
    sValue = 1;
    $("#pauseStopwatch").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
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
  $("#stopwatchPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="startStopwatch" onclick="startStopwatch()"> <circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/> <path class="barOnSVG" d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/> </svg>');
}
