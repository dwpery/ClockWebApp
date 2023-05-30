// Variable Bank

// Value for timer
var value = 1;
// Value for stopwatch
var sValue = 1;
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
// Snooze Length value
var snoozelengthValue = new Array(60000, 120000, 180000, 240000, 300000, 360000, 420000, 480000, 540000, 600000)

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
// Current Font
var currentFont = localStorage.getItem("currentFont") || "0";
// Holds amout of Alarms
var numOfAlarms = localStorage.getItem('numOfAlarms') || null;
// Holds custom theme colour
var themeColour = localStorage.getItem('themeColour') || '#FF0000';
$('#themeChangerCon').append('<input type="color" class="settingsButton" id="colourButton" value="' + themeColour + '">')
// Makees values right data type
if (numOfAlarms === null ) {
  // nothing
} else {
  if (numOfAlarms == "null") {
    numOfAlarms = null;
  } else {
    numOfAlarms = Number(numOfAlarms);
  }
}
// Hols alarms in array
const alarms = localStorage.getItem('alarms') ? JSON.parse(localStorage.getItem('alarms')) : [];
// Initiates alarm sound
var audio = new Audio(alarmSounds[parseInt(activeAlarmSound, 10)]);
// Snooze Alarm Number
var snoozeAlarmNumber = Number(localStorage.getItem('snoozeAlarmNumber') || 0);
// True = Analog, False = Digital
var isAnalog = localStorage.getItem('isAnalog') || "false";

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

if (isAnalog == "true") {
  $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 89C71.5391 89 89 71.5391 89 50C89 28.4609 71.5391 11 50 11C28.4609 11 11 28.4609 11 50C11 71.5391 28.4609 89 50 89ZM50 85.6571C69.6929 85.6571 85.6571 69.6929 85.6571 50C85.6571 30.3071 69.6929 14.3429 50 14.3429C30.3071 14.3429 14.3429 30.3071 14.3429 50C14.3429 69.6929 30.3071 85.6571 50 85.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 50C83 68.2254 68.2254 83 50 83C31.7746 83 17 68.2254 17 50C17 31.7746 31.7746 17 50 17C68.2254 17 83 31.7746 83 50ZM47.7241 25.5345C47.7241 23.9633 48.9978 22.6897 50.569 22.6897C52.1401 22.6897 53.4138 23.9633 53.4138 25.5345V49.431C53.4138 50.0573 53.2114 50.6362 52.8686 51.1062C52.7525 51.7397 52.4219 52.3375 51.8875 52.7811L38.7541 63.6835C37.5452 64.687 35.7516 64.5205 34.7481 63.3116C33.7446 62.1027 33.9111 60.3092 35.12 59.3056L47.7241 48.8426V25.5345Z" fill="black"/>');
  $(".digital").hide();
  $("#clockChanger").css("transform","rotate(180deg)");
}

// Main Code

// Function executes when page loads
$(document).ready(function() {
  showClock();
  // Sets Font
  changeFont(currentFont);
  // Loads timezones
  $("#timezoneList").append("<div class=\"switcherOption\" onclick=\"timeZoneNumber = " + 24 + "\">Default</div>");
  for (let i = 0; i < timeZones.length; i++) {
    $("#timezoneList").append("<div class=\"switcherOption\" onclick=\"timeZoneNumber = " + [i] + "\">" + timeZones[i] + "</div>");
    if (timeZones[i] == Intl.DateTimeFormat().resolvedOptions().timeZone) {
      localTimeZoneNumber = i;
    }
  }
  if (numOfAlarms > 0 || numOfAlarms === 0) {
    for (var i = 0; i <= numOfAlarms; i++) {
      $('.alarms-container').prepend('<div class="alarm printedAlarm"><div class="printAlarmName">' + alarms[i].name + '</div><div class="printAlarmTime">' + alarms[i].time + '</div><div onclick="removeFinalAlarm(this)" class="removeFinalAlarm">Delete</div></div>');
    }
  }
  setTimeout(function() {
    $('.loader').toggle(500);
    $('.loader').css('border-radius','5vh')
  }, 1000)
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

  // Code that makes alarms ring

  if (numOfAlarms > 0 || numOfAlarms === 0) {
    for (var i = 0; i <= numOfAlarms; i++) {
    
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

setTimeout (function() {
  setInterval (function() {
    document.documentElement.style.setProperty('--themeColour', themeColour);
    themeColour = $("#colourButton").val();
    localStorage.setItem('themeColour', themeColour);  
  },10)
},10)

// Opens the Settings pannel
function showSettings() {

  // Checks wether animation is on
  if (settingsAnimation == "true") {
    
    $("#settings").css("transition","1.5s");

    // Reveals settings list
    setTimeout(function() {
      $("#settings-container").css("display","block");
      $(".settingsHeader").css("display","block");
    },1750)

  } else {
    
    $("#settings").css("transition","0s");
    
    // Reveals settings list
    $("#settings-container").css("display","block");
    $(".settingsHeader").css("display","block");

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
    $(".settingsHeader").css("display","none");
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
  $(".settingsHeader").css("display","none");
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
  $(".timerInput").removeClass("responsiveDisplay");
  $(".timerDisplay").addClass("responsiveDisplay");

  // Prints values
  $("#span1").html(timerHours);
  $("#span2").html(timerMinutes);
  $("#span3").html(timerSeconds);

  intervalId = setInterval(countdown, 1000)
}

function countdown() {
  
  // Resets if empty
  if (timerSeconds == 0 && timerMinutes == 0 && timerHours == 0) {
    $("#timerActive").css("display", "block");
    audio.play();
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
  $(".timerInput").addClass("responsiveDisplay");
  $(".timerDisplay").removeClass("responsiveDisplay");

  clearInterval(intervalId)
}

// Controls focus mode stuff
function focusModeControl() {
  if (isFocus == false) {
    isFocus = true;
    $("header").hide();
    $(".digital").addClass("clear");
    $(".clockControls").addClass("clockMove");
    $("#clockChanger").html('<path id="focusPath" class="barOnSVG" d="M46.8492 79.7695C42.944 83.6748 36.6123 83.6748 32.7071 79.7695L31.2929 78.3553C27.3876 74.4501 27.3876 68.1184 31.2929 64.2132L53.2132 42.2929C57.1184 38.3876 63.4501 38.3876 67.3553 42.2929L68.7695 43.7071C72.6748 47.6123 72.6748 53.944 68.7695 57.8492L46.8492 79.7695Z" fill="#36454F"/><path id="focusPath" class="barOnSVG" d="M31.0711 36.6274C27.1658 32.7222 27.1658 26.3905 31.0711 22.4853L32.4853 21.0711C36.3905 17.1658 42.7222 17.1658 46.6274 21.0711L68.5477 42.9914C72.453 46.8966 72.453 53.2283 68.5477 57.1335L67.1335 58.5477C63.2283 62.453 56.8966 62.453 52.9914 58.5477L31.0711 36.6274Z" fill="#36454F"/>');
    $("#focusMode").html('<path id="focusPath" class="barOnSVG" d="M73.6607 42.8571H59.8214C58.3371 42.8571 57.1429 41.6629 57.1429 40.1786V26.3393C57.1429 25.6027 57.7455 25 58.4821 25H62.9464C63.683 25 64.2857 25.6027 64.2857 26.3393V35.7143H73.6607C74.3973 35.7143 75 36.317 75 37.0536V41.5179C75 42.2545 74.3973 42.8571 73.6607 42.8571ZM42.8571 40.1786V26.3393C42.8571 25.6027 42.2545 25 41.5179 25H37.0536C36.317 25 35.7143 25.6027 35.7143 26.3393V35.7143H26.3393C25.6027 35.7143 25 36.317 25 37.0536V41.5179C25 42.2545 25.6027 42.8571 26.3393 42.8571H40.1786C41.6629 42.8571 42.8571 41.6629 42.8571 40.1786ZM42.8571 73.6607V59.8214C42.8571 58.3371 41.6629 57.1429 40.1786 57.1429H26.3393C25.6027 57.1429 25 57.7455 25 58.4821V62.9464C25 63.683 25.6027 64.2857 26.3393 64.2857H35.7143V73.6607C35.7143 74.3973 36.317 75 37.0536 75H41.5179C42.2545 75 42.8571 74.3973 42.8571 73.6607ZM64.2857 73.6607V64.2857H73.6607C74.3973 64.2857 75 63.683 75 62.9464V58.4821C75 57.7455 74.3973 57.1429 73.6607 57.1429H59.8214C58.3371 57.1429 57.1429 58.3371 57.1429 59.8214V73.6607C57.1429 74.3973 57.7455 75 58.4821 75H62.9464C63.683 75 64.2857 74.3973 64.2857 73.6607Z" fill="#36454F"/>')
  } else {
    isFocus = false;
    $("header").show();
    $(".digital").removeClass("clear");
    $(".clockControls").removeClass("clockMove");
    $("#clockChanger").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M46.8492 79.7695C42.944 83.6748 36.6123 83.6748 32.7071 79.7695L31.2929 78.3553C27.3876 74.4501 27.3876 68.1184 31.2929 64.2132L53.2132 42.2929C57.1184 38.3876 63.4501 38.3876 67.3553 42.2929L68.7695 43.7071C72.6748 47.6123 72.6748 53.944 68.7695 57.8492L46.8492 79.7695Z" fill="#36454F"/><path class="barOnSVG" d="M31.0711 36.6274C27.1658 32.7222 27.1658 26.3905 31.0711 22.4853L32.4853 21.0711C36.3905 17.1658 42.7222 17.1658 46.6274 21.0711L68.5477 42.9914C72.453 46.8966 72.453 53.2283 68.5477 57.1335L67.1335 58.5477C63.2283 62.453 56.8966 62.453 52.9914 58.5477L31.0711 36.6274Z" fill="#36454F"/>');
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

// Adds alarm to container
function addAlarm() {
  $(".alarms-container").prepend('<div class="alarm"><input type="text" class="alarmName" placeholder="Morning Alarm"><input type="time" class="alarmTime"><div id="submit" onclick="submitAlarm(this)">Accept</div><div id="remove" onclick="removeAlarm(this)">Delete</div></div>');
}

// Removes alarm
function removeAlarm(x) {
  $(x).closest('.alarm').remove();
}

function submitAlarm(x) {
  if ($(x).siblings(".alarmName").val() == "" || $(x).siblings(".alarmTime").val() == "") {
    // Nothing
  } else {
    const newAlarm = { name: $(x).siblings(".alarmName").val(), time: $(x).siblings(".alarmTime").val()};
    alarms.push(newAlarm);
    // Adds final alarm to container
    $(x).closest('.alarm').css("height","15vh");
    if (numOfAlarms === null) {
      numOfAlarms = 0;
    } else {
      numOfAlarms += 1;
    }
    $(x).closest('.alarm').html('<div class="printAlarmName">' + alarms[numOfAlarms].name + '</div><div class="printAlarmTime">' + alarms[numOfAlarms].time + '</div><div onclick="removeFinalAlarm(this)" class="removeFinalAlarm">Delete</div>');
    localStorage.setItem('numOfAlarms', numOfAlarms);
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }
}

function removeFinalAlarm(x) {
  const deletedAlarmName = $(x).siblings('.printAlarmName').html();
  $(x).closest('.alarm').remove();

  // Find the index of alarm to be deleted
  const alarmIndex = alarms.findIndex(alarm => alarm.name == deletedAlarmName);

  if (alarmIndex !== -1) {
    // Remove the alarm from the alarms array
    const removedAlarm = alarms.splice(alarmIndex, 1)[0];
    if (numOfAlarms === 0) {
      numOfAlarms = null;
    } else {
      numOfAlarms -= 1;
    }
    localStorage.setItem('numOfAlarms', numOfAlarms);
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }
}

// Stops alarm from playing
function cancelAlarm() {
  $("#alarmActive").css("display","none");
  audio.pause();
  audio.remove();
}

function cancelTimer() {
  $("#timerActive").css("display","none");
  audio.pause();
  audio.remove();
  audio.currentTime = 0;
}

function snoozeAlarm() {
  cancelAlarm();
  setTimeout( function() {
    $("#alarmActive").css("display","block");
    audio.play();
  }, snoozelengthValue[snoozeAlarmNumber])
}

function changeSnoozeLenght(x) {
  $('#snoozeLength').toggle(500);
  snoozeAlarmNumber = x;
  localStorage.setItem('snoozeAlarmNumber', snoozeAlarmNumber)
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
  }, 4000)

  $('#alarm').toggle(500);
  closeSettings();
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

function clockChanger() {
  if (isAnalog == "false") {
    $("#clockChanger").css("transform","rotate(180deg)");
    $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 89C71.5391 89 89 71.5391 89 50C89 28.4609 71.5391 11 50 11C28.4609 11 11 28.4609 11 50C11 71.5391 28.4609 89 50 89ZM50 85.6571C69.6929 85.6571 85.6571 69.6929 85.6571 50C85.6571 30.3071 69.6929 14.3429 50 14.3429C30.3071 14.3429 14.3429 30.3071 14.3429 50C14.3429 69.6929 30.3071 85.6571 50 85.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 50C83 68.2254 68.2254 83 50 83C31.7746 83 17 68.2254 17 50C17 31.7746 31.7746 17 50 17C68.2254 17 83 31.7746 83 50ZM47.7241 25.5345C47.7241 23.9633 48.9978 22.6897 50.569 22.6897C52.1401 22.6897 53.4138 23.9633 53.4138 25.5345V49.431C53.4138 50.0573 53.2114 50.6362 52.8686 51.1062C52.7525 51.7397 52.4219 52.3375 51.8875 52.7811L38.7541 63.6835C37.5452 64.687 35.7516 64.5205 34.7481 63.3116C33.7446 62.1027 33.9111 60.3092 35.12 59.3056L47.7241 48.8426V25.5345Z" fill="black"/>');
    $(".digital").hide();
    $(".analog").show();
    isAnalog = "true";
    localStorage.setItem('isAnalog', isAnalog);
  } else {
    $("#clockChanger").css("transform","rotate(360deg)");
    $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M21 18C13.268 18 7 24.268 7 32V69C7 76.732 13.268 83 21 83H80C87.732 83 94 76.732 94 69V32C94 24.268 87.732 18 80 18H21ZM18.064 60.04C19.024 60.8933 20.3573 61.32 22.064 61.32C23.7707 61.32 25.0933 60.8933 26.032 60.04C26.992 59.1867 27.664 57.9067 28.048 56.2C28.4533 54.4933 28.656 52.36 28.656 49.8C28.656 47.24 28.4533 45.1067 28.048 43.4C27.664 41.672 26.992 40.3813 26.032 39.528C25.0933 38.6747 23.7707 38.248 22.064 38.248C20.3573 38.248 19.024 38.6747 18.064 39.528C17.104 40.3813 16.4213 41.672 16.016 43.4C15.632 45.1067 15.44 47.24 15.44 49.8C15.44 52.36 15.632 54.4933 16.016 56.2C16.4213 57.9067 17.104 59.1867 18.064 60.04ZM23.92 57.32C23.472 57.8107 22.8533 58.056 22.064 58.056C21.2747 58.056 20.6453 57.8107 20.176 57.32C19.7067 56.808 19.3653 55.9547 19.152 54.76C18.96 53.5653 18.864 51.912 18.864 49.8C18.864 47.6667 18.96 46.0027 19.152 44.808C19.3653 43.6133 19.7067 42.7707 20.176 42.28C20.6453 41.768 21.2747 41.512 22.064 41.512C22.8533 41.512 23.472 41.768 23.92 42.28C24.3893 42.7707 24.7307 43.6133 24.944 44.808C25.1573 46.0027 25.264 47.6667 25.264 49.8C25.264 51.912 25.1573 53.5653 24.944 54.76C24.7307 55.9547 24.3893 56.808 23.92 57.32ZM34.1265 60.04C35.0865 60.8933 36.4198 61.32 38.1265 61.32C39.8332 61.32 41.1558 60.8933 42.0945 60.04C43.0545 59.1867 43.7265 57.9067 44.1105 56.2C44.5158 54.4933 44.7185 52.36 44.7185 49.8C44.7185 47.24 44.5158 45.1067 44.1105 43.4C43.7265 41.672 43.0545 40.3813 42.0945 39.528C41.1558 38.6747 39.8332 38.248 38.1265 38.248C36.4198 38.248 35.0865 38.6747 34.1265 39.528C33.1665 40.3813 32.4838 41.672 32.0785 43.4C31.6945 45.1067 31.5025 47.24 31.5025 49.8C31.5025 52.36 31.6945 54.4933 32.0785 56.2C32.4838 57.9067 33.1665 59.1867 34.1265 60.04ZM39.9825 57.32C39.5345 57.8107 38.9158 58.056 38.1265 58.056C37.3372 58.056 36.7078 57.8107 36.2385 57.32C35.7692 56.808 35.4278 55.9547 35.2145 54.76C35.0225 53.5653 34.9265 51.912 34.9265 49.8C34.9265 47.6667 35.0225 46.0027 35.2145 44.808C35.4278 43.6133 35.7692 42.7707 36.2385 42.28C36.7078 41.768 37.3372 41.512 38.1265 41.512C38.9158 41.512 39.5345 41.768 39.9825 42.28C40.4518 42.7707 40.7932 43.6133 41.0065 44.808C41.2198 46.0027 41.3265 47.6667 41.3265 49.8C41.3265 51.912 41.2198 53.5653 41.0065 54.76C40.7932 55.9547 40.4518 56.808 39.9825 57.32ZM48.525 60.648C49.0157 61.1173 49.5917 61.352 50.253 61.352C50.9143 61.352 51.4797 61.1173 51.949 60.648C52.4397 60.1787 52.685 59.6133 52.685 58.952C52.685 58.2693 52.4397 57.6933 51.949 57.224C51.4797 56.7547 50.9143 56.52 50.253 56.52C49.5917 56.52 49.0157 56.7547 48.525 57.224C48.0557 57.6933 47.821 58.2693 47.821 58.952C47.821 59.6133 48.0557 60.1787 48.525 60.648ZM48.525 49.32C49.0157 49.7893 49.5917 50.024 50.253 50.024C50.9143 50.024 51.4797 49.7893 51.949 49.32C52.4397 48.8507 52.685 48.2853 52.685 47.624C52.685 46.9413 52.4397 46.376 51.949 45.928C51.4797 45.4587 50.9143 45.224 50.253 45.224C49.5917 45.224 49.0157 45.4587 48.525 45.928C48.0557 46.376 47.821 46.9413 47.821 47.624C47.821 48.2853 48.0557 48.8507 48.525 49.32ZM58.439 60.04C59.399 60.8933 60.7323 61.32 62.439 61.32C64.1457 61.32 65.4683 60.8933 66.407 60.04C67.367 59.1867 68.039 57.9067 68.423 56.2C68.8283 54.4933 69.031 52.36 69.031 49.8C69.031 47.24 68.8283 45.1067 68.423 43.4C68.039 41.672 67.367 40.3813 66.407 39.528C65.4683 38.6747 64.1457 38.248 62.439 38.248C60.7323 38.248 59.399 38.6747 58.439 39.528C57.479 40.3813 56.7963 41.672 56.391 43.4C56.007 45.1067 55.815 47.24 55.815 49.8C55.815 52.36 56.007 54.4933 56.391 56.2C56.7963 57.9067 57.479 59.1867 58.439 60.04ZM64.295 57.32C63.847 57.8107 63.2283 58.056 62.439 58.056C61.6497 58.056 61.0203 57.8107 60.551 57.32C60.0817 56.808 59.7403 55.9547 59.527 54.76C59.335 53.5653 59.239 51.912 59.239 49.8C59.239 47.6667 59.335 46.0027 59.527 44.808C59.7403 43.6133 60.0817 42.7707 60.551 42.28C61.0203 41.768 61.6497 41.512 62.439 41.512C63.2283 41.512 63.847 41.768 64.295 42.28C64.7643 42.7707 65.1057 43.6133 65.319 44.808C65.5323 46.0027 65.639 47.6667 65.639 49.8C65.639 51.912 65.5323 53.5653 65.319 54.76C65.1057 55.9547 64.7643 56.808 64.295 57.32ZM74.5015 60.04C75.4615 60.8933 76.7948 61.32 78.5015 61.32C80.2082 61.32 81.5308 60.8933 82.4695 60.04C83.4295 59.1867 84.1015 57.9067 84.4855 56.2C84.8908 54.4933 85.0935 52.36 85.0935 49.8C85.0935 47.24 84.8908 45.1067 84.4855 43.4C84.1015 41.672 83.4295 40.3813 82.4695 39.528C81.5308 38.6747 80.2082 38.248 78.5015 38.248C76.7948 38.248 75.4615 38.6747 74.5015 39.528C73.5415 40.3813 72.8588 41.672 72.4535 43.4C72.0695 45.1067 71.8775 47.24 71.8775 49.8C71.8775 52.36 72.0695 54.4933 72.4535 56.2C72.8588 57.9067 73.5415 59.1867 74.5015 60.04ZM80.3575 57.32C79.9095 57.8107 79.2908 58.056 78.5015 58.056C77.7122 58.056 77.0828 57.8107 76.6135 57.32C76.1442 56.808 75.8028 55.9547 75.5895 54.76C75.3975 53.5653 75.3015 51.912 75.3015 49.8C75.3015 47.6667 75.3975 46.0027 75.5895 44.808C75.8028 43.6133 76.1442 42.7707 76.6135 42.28C77.0828 41.768 77.7122 41.512 78.5015 41.512C79.2908 41.512 79.9095 41.768 80.3575 42.28C80.8268 42.7707 81.1682 43.6133 81.3815 44.808C81.5948 46.0027 81.7015 47.6667 81.7015 49.8C81.7015 51.912 81.5948 53.5653 81.3815 54.76C81.1682 55.9547 80.8268 56.808 80.3575 57.32Z" fill="black"/>');
    $(".digital").show();
    $(".analog").hide();
    isAnalog = "false";
    localStorage.setItem('isAnalog', isAnalog);
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

// Resets theme colour
function resetThemeColour() {
  $('#colourButton').remove();
  themeColour = "#FF0000";
  $('#themeChangerCon').append('<input type="color" class="settingsButton" id="colourButton" value="' + themeColour + '">')
}

// Clears app data and reloads page
function resetApp() {
  localStorage.clear();
  resetThemeColour();
  location.reload();
}