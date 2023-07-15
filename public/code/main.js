// Variable Bank

// Value for timer
var value = 1;
// Value for stopwatch
var sValue = 1;
// Alarm Sounds                         0                                1                             2                             3                               4                                 5                             6                               7                              8                               9
var alarmSounds = new Array("media/alarms/default.mp3","media/alarms/heavy-metal.mp3","media/alarms/harp-strumming.mp3","media/alarms/rooster.mp3","media/alarms/military-trumpet.mp3","media/alarms/cuckoo-clock.mp3","media/alarms/alien-ship.mp3","media/alarms/buzzer-alarm.wav","media/alarms/digital-alarm.wav","media/alarms/vintage-alarm.wav");
// List of alarm names
var alarmNames = new Array("Default","Rock","Harp","Rooster","Trumpet","Cuckoo","Alien","Buzzer","Rapid","Retro") 
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
// Stores local timezone number
var localTimeZoneNumber = 0;
// Snooze Length value
var snoozelengthValue = new Array(60000, 120000, 180000, 240000, 300000, 360000, 420000, 480000, 540000, 600000)

// Sets dark theme if system is dark on first load

var darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
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

// Initiates alarm sound
var audio = new Audio(alarmSounds[parseInt(activeAlarmSound, 10)]);

// Main Code

// Function executes when page loads
$(document).ready(function() {
  showClock();
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
      const checkedIndicator = alarms[i].active ? 'checked' : '';

      $('.alarms-container').prepend('<div class="alarm printedAlarm"><div class="printAlarmName" inert>' + alarms[numOfAlarms].name + '</div><div class="printAlarmTime" inert>' + alarms[numOfAlarms].time + '</div><label class="switch switch2"><input ' + checkedIndicator + ' type="checkbox" onclick="clockActiveChanger(this)"><span class="slider"></span></label><svg onclick="removeFinalAlarm(this)" class="removeFinalAlarm" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="25" width="50" height="7" rx="3.5" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.5 32C53.6421 32 57 28.6421 57 24.5C57 20.3579 53.6421 17 49.5 17C45.3579 17 42 20.3579 42 24.5C42 28.6421 45.3579 32 49.5 32ZM49.5 29C51.9853 29 54 26.9853 54 24.5C54 22.0147 51.9853 20 49.5 20C47.0147 20 45 22.0147 45 24.5C45 26.9853 47.0147 29 49.5 29Z" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M28.5181 34C26.6722 34 25.2642 35.6512 25.5558 37.474L32.5958 81.474C32.8287 82.9293 34.0843 84 35.5581 84H64.4418C65.9157 84 67.1713 82.9293 67.4042 81.474L74.4442 37.474C74.7358 35.6512 73.3278 34 71.4818 34H28.5181ZM50 37C48.3431 37 47 38.3431 47 40V76C47 77.6569 48.3431 79 50 79C51.6568 79 53 77.6569 53 76V40C53 38.3431 51.6568 37 50 37ZM30.5209 40.9963C30.2332 39.3646 31.3227 37.8087 32.9544 37.5209C34.5861 37.2332 36.1421 38.3227 36.4298 39.9544L42.6811 75.4075C42.9688 77.0392 41.8793 78.5952 40.2476 78.8829C38.616 79.1706 37.06 78.0811 36.7723 76.4494L30.5209 40.9963ZM67.2476 37.5209C65.616 37.2332 64.06 38.3227 63.7723 39.9544L57.5209 75.4075C57.2332 77.0392 58.3227 78.5952 59.9544 78.8829C61.5861 79.1706 63.1421 78.0811 63.4298 76.4494L69.6811 40.9963C69.9688 39.3646 68.8793 37.8087 67.2476 37.5209Z" fill="#FF0000"/></svg></div>');
    }
  }
  if (snoozeAlarmNumber == 0) {
    $("#alarmSnoozeButton").html("1 minute");
  } else {
    $("#alarmSnoozeButton").html(snoozeAlarmNumber + 1 + " minutes");
  }
})

$(window).on('load', function() {
  $('.loader').toggle(500);
  $('.loader').css('border-radius','5vh');
  $('.digital').css('transition', '0.75s');
});

// Makes alarm loop when finished
audio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

interval = setInterval(mainFunction, 10);

function mainFunction() {
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
      if (checkTime == alarms[i].time && date.getSeconds() == "00" && alarms[i].active == true) {
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

  localStorage.setItem("timeZoneNumber", timeZoneNumber)
  if (timeZoneNumber != 24 && timeZoneNumber != localTimeZoneNumber) {
    $(".display").html(timesInAllTimeZones[timeZoneNumber].time);
    $(".ampm").html(timesInAllTimeZones[timeZoneNumber].amPm);
    $("#timeZoneButton").html(Intl.DateTimeFormat('en', { timeZoneName: 'short', timeZone: timesInAllTimeZones[timeZoneNumber].timeZone }).formatToParts(date).find(x => x.type === 'timeZoneName').value)
    $(".date").html(Intl.DateTimeFormat('en', { timeZoneName: 'short', timeZone: timesInAllTimeZones[timeZoneNumber].timeZone }).formatToParts(date).find(x => x.type === 'timeZoneName').value)
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

    var now = new Date();
		var hour = now.getHours() % 12;
		var minute = now.getMinutes();
		var second = now.getSeconds();
		var hourRotation = (hour * 30) + (minute * 0.5);
		var minuteRotation = (minute * 6) + (second * 0.1);
		var secondRotation = second * 6;
    document.querySelector('.hour-hand').style.transform = 'rotate(' + hourRotation + 'deg)';
		document.querySelector('.minute-hand').style.transform = 'rotate(' + minuteRotation + 'deg)';
		document.querySelector('.second-hand').style.transform = 'rotate(' + secondRotation + 'deg)';

    // Prints out date
    $(".date").html(today);
  }
};

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

// Controls focus mode stuff
function focusModeControl() {
  if (isFocus == false) {
    isFocus = true;
    $("header").hide();
    $(".digital").addClass("clear");
    $(".analog").addClass("clear2");
    $(".clockControls").addClass("clockMove");
    $("#clockChanger").html('<path id="focusPath" class="barOnSVG" d="M46.8492 79.7695C42.944 83.6748 36.6123 83.6748 32.7071 79.7695L31.2929 78.3553C27.3876 74.4501 27.3876 68.1184 31.2929 64.2132L53.2132 42.2929C57.1184 38.3876 63.4501 38.3876 67.3553 42.2929L68.7695 43.7071C72.6748 47.6123 72.6748 53.944 68.7695 57.8492L46.8492 79.7695Z" fill="#36454F"/><path id="focusPath" class="barOnSVG" d="M31.0711 36.6274C27.1658 32.7222 27.1658 26.3905 31.0711 22.4853L32.4853 21.0711C36.3905 17.1658 42.7222 17.1658 46.6274 21.0711L68.5477 42.9914C72.453 46.8966 72.453 53.2283 68.5477 57.1335L67.1335 58.5477C63.2283 62.453 56.8966 62.453 52.9914 58.5477L31.0711 36.6274Z" fill="#36454F"/>');
    $("#focusMode").html('<path id="focusPath" class="barOnSVG" d="M73.6607 42.8571H59.8214C58.3371 42.8571 57.1429 41.6629 57.1429 40.1786V26.3393C57.1429 25.6027 57.7455 25 58.4821 25H62.9464C63.683 25 64.2857 25.6027 64.2857 26.3393V35.7143H73.6607C74.3973 35.7143 75 36.317 75 37.0536V41.5179C75 42.2545 74.3973 42.8571 73.6607 42.8571ZM42.8571 40.1786V26.3393C42.8571 25.6027 42.2545 25 41.5179 25H37.0536C36.317 25 35.7143 25.6027 35.7143 26.3393V35.7143H26.3393C25.6027 35.7143 25 36.317 25 37.0536V41.5179C25 42.2545 25.6027 42.8571 26.3393 42.8571H40.1786C41.6629 42.8571 42.8571 41.6629 42.8571 40.1786ZM42.8571 73.6607V59.8214C42.8571 58.3371 41.6629 57.1429 40.1786 57.1429H26.3393C25.6027 57.1429 25 57.7455 25 58.4821V62.9464C25 63.683 25.6027 64.2857 26.3393 64.2857H35.7143V73.6607C35.7143 74.3973 36.317 75 37.0536 75H41.5179C42.2545 75 42.8571 74.3973 42.8571 73.6607ZM64.2857 73.6607V64.2857H73.6607C74.3973 64.2857 75 63.683 75 62.9464V58.4821C75 57.7455 74.3973 57.1429 73.6607 57.1429H59.8214C58.3371 57.1429 57.1429 58.3371 57.1429 59.8214V73.6607C57.1429 74.3973 57.7455 75 58.4821 75H62.9464C63.683 75 64.2857 74.3973 64.2857 73.6607Z" fill="#36454F"/>')
  } else {
    isFocus = false;
    $("header").show();
    $(".digital").removeClass("clear");
    $(".analog").removeClass("clear2");
    $(".clockControls").removeClass("clockMove");
    $("#clockChanger").html('<circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M46.8492 79.7695C42.944 83.6748 36.6123 83.6748 32.7071 79.7695L31.2929 78.3553C27.3876 74.4501 27.3876 68.1184 31.2929 64.2132L53.2132 42.2929C57.1184 38.3876 63.4501 38.3876 67.3553 42.2929L68.7695 43.7071C72.6748 47.6123 72.6748 53.944 68.7695 57.8492L46.8492 79.7695Z" fill="#36454F"/><path class="barOnSVG" d="M31.0711 36.6274C27.1658 32.7222 27.1658 26.3905 31.0711 22.4853L32.4853 21.0711C36.3905 17.1658 42.7222 17.1658 46.6274 21.0711L68.5477 42.9914C72.453 46.8966 72.453 53.2283 68.5477 57.1335L67.1335 58.5477C63.2283 62.453 56.8966 62.453 52.9914 58.5477L31.0711 36.6274Z" fill="#36454F"/>');
    $("#focusMode").html('<g clip-path="url(#clip0_0_1)"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M25 42.5781V30.4688C25 29.1699 26.1942 28.125 27.6786 28.125H41.5179C42.2545 28.125 42.8571 28.6523 42.8571 29.2969V33.2031C42.8571 33.8477 42.2545 34.375 41.5179 34.375H32.1429V42.5781C32.1429 43.2227 31.5402 43.75 30.8036 43.75H26.3393C25.6027 43.75 25 43.2227 25 42.5781ZM57.1429 29.2969V33.2031C57.1429 33.8477 57.7455 34.375 58.4821 34.375H67.8571V42.5781C67.8571 43.2227 68.4598 43.75 69.1964 43.75H73.6607C74.3973 43.75 75 43.2227 75 42.5781V30.4688C75 29.1699 73.8058 28.125 72.3214 28.125H58.4821C57.7455 28.125 57.1429 28.6523 57.1429 29.2969ZM73.6607 56.25H69.1964C68.4598 56.25 67.8571 56.7773 67.8571 57.4219V65.625H58.4821C57.7455 65.625 57.1429 66.1523 57.1429 66.7969V70.7031C57.1429 71.3477 57.7455 71.875 58.4821 71.875H72.3214C73.8058 71.875 75 70.8301 75 69.5312V57.4219C75 56.7773 74.3973 56.25 73.6607 56.25ZM42.8571 70.7031V66.7969C42.8571 66.1523 42.2545 65.625 41.5179 65.625H32.1429V57.4219C32.1429 56.7773 31.5402 56.25 30.8036 56.25H26.3393C25.6027 56.25 25 56.7773 25 57.4219V69.5312C25 70.8301 26.1942 71.875 27.6786 71.875H41.5179C42.2545 71.875 42.8571 71.3477 42.8571 70.7031Z" fill="#36454F"/></g><defs><clipPath id="clip0_0_1"><rect width="100" height="100" fill="white"/></clipPath></defs>');
  }
}
