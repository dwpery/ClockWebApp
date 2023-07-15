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
// Holds custom theme colour
var themeColour = localStorage.getItem('themeColour') || '#FF0000';
$('#themeChangerCon').append('<input type="color" class="settingsButton" id="colourButton" value="' + themeColour + '">')
// Snooze Alarm Number
var snoozeAlarmNumber = Number(localStorage.getItem('snoozeAlarmNumber') || 0);
// True = Analog, False = Digital
var isAnalog = localStorage.getItem('isAnalog') || "false";
// True = Switcher hidden, False = Switcher showing
var isClockSwitcher = localStorage.getItem('isClockSwitcher') || "false";
// True = Switcher hidden, False = Switcher showing
var isTimerSwitcher = localStorage.getItem('isTimerSwitcher') || "false";
// Stores what time zone is active
var timeZoneNumber = Number(localStorage.getItem('timeZoneNumber')) || 24;

// Local Storage retrieval and setups

if (localStorage.getItem('darkMode') == "true") {
  $("html").addClass("dark");
  $("#themeButton").html("Dark");
  $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
}

if (localStorage.getItem('clockMode') == "false") {
  $("#clockModeButton").prop("checked", true);
  
}

if (localStorage.getItem('dateFormat') == "true") {
  $("#dateFormatButton").html("MM/DD");
}

if (localStorage.getItem('doubleDigits') == "true") {
  $("#doubleDigitsButton").prop("checked", true);
  $("#span4").html("00");
  $("#span5").html("00");
  $("#span6").html("00");
  $("#span7").html("00");
  $("#hours").attr("placeholder", "00");
  $("#minutes").attr("placeholder", "00");
  $("#seconds").attr("placeholder", "00");
}

if (localStorage.getItem('settingsAnim') == "false") {
  $("#setAnimButton").prop("checked", false);
}

if (localStorage.getItem('timerTrans') == "false") {
  $("#ttsTransButton").prop("checked", false);
  $("#clockChanger").css("transition","0s");
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
  $("#timerLabel").html("Stopwatch");
  $("#timerSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 92C71.5391 92 89 74.5391 89 53C89 31.4609 71.5391 14 50 14C28.4609 14 11 31.4609 11 53C11 74.5391 28.4609 92 50 92ZM50 88.6571C69.6929 88.6571 85.6571 72.6929 85.6571 53C85.6571 33.3071 69.6929 17.3429 50 17.3429C30.3071 17.3429 14.3429 33.3071 14.3429 53C14.3429 72.6929 30.3071 88.6571 50 88.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 53C83 71.2254 68.2254 86 50 86C31.7746 86 17 71.2254 17 53C17 34.7746 31.7746 20 50 20C68.2254 20 83 34.7746 83 53ZM47.7241 28.5345C47.7241 26.9633 48.9978 25.6897 50.569 25.6897C52.1401 25.6897 53.4138 26.9633 53.4138 28.5345V45.679L61.0812 38.0116C62.1922 36.9006 63.9934 36.9006 65.1044 38.0116C66.2153 39.1226 66.2153 40.9238 65.1044 42.0348L53.0348 54.1044C52.8657 54.2735 52.6806 54.4168 52.4844 54.5345C51.9789 54.995 51.3067 55.2759 50.569 55.2759C48.9978 55.2759 47.7241 54.0022 47.7241 52.431V28.5345Z" fill="black"/><rect x="47" y="4" width="6" height="12" rx="2" fill="black"/><rect x="43" y="9" width="5" height="14" rx="2" transform="rotate(-90 43 9)" fill="black"/>');
}

if (localStorage.getItem("hideFocusMode") == "true") {
  $("#hideFocusModeBttn").prop("checked", true);
  $("#focusMode").hide();
}

if (isAnalog == "true") {
  $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 89C71.5391 89 89 71.5391 89 50C89 28.4609 71.5391 11 50 11C28.4609 11 11 28.4609 11 50C11 71.5391 28.4609 89 50 89ZM50 85.6571C69.6929 85.6571 85.6571 69.6929 85.6571 50C85.6571 30.3071 69.6929 14.3429 50 14.3429C30.3071 14.3429 14.3429 30.3071 14.3429 50C14.3429 69.6929 30.3071 85.6571 50 85.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 50C83 68.2254 68.2254 83 50 83C31.7746 83 17 68.2254 17 50C17 31.7746 31.7746 17 50 17C68.2254 17 83 31.7746 83 50ZM47.7241 25.5345C47.7241 23.9633 48.9978 22.6897 50.569 22.6897C52.1401 22.6897 53.4138 23.9633 53.4138 25.5345V49.431C53.4138 50.0573 53.2114 50.6362 52.8686 51.1062C52.7525 51.7397 52.4219 52.3375 51.8875 52.7811L38.7541 63.6835C37.5452 64.687 35.7516 64.5205 34.7481 63.3116C33.7446 62.1027 33.9111 60.3092 35.12 59.3056L47.7241 48.8426V25.5345Z" fill="black"/>');
  $(".digital").hide();
  $(".analog").show();
  $("#clockChanger").css("transform","rotate(180deg)");
}

if (isClockSwitcher == "true") {
  $("#hideClockSwitcher").prop("checked", true);
  $("#clockChanger").hide();
}

if (isTimerSwitcher == "true") {
  $("#hideTimerSwitcher").prop("checked", true);
  $("#timerChangerContainer").hide();
}


// Settings Functions


// Swaps 24 hour format on or off
function clockModeChanger() {
    if (clockMode == "true") {
      clockMode = "false";
      $("#clockModeButton").prop("checked", true);
      localStorage.setItem('clockMode', clockMode);
    } else {
      clockMode = "true";
      $("#clockModeButton").prop("checked", false);
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
      $("#span4").html("00");
      $("#span5").html("00");
      $("#span6").html("00");
      $("#span7").html("00");
      $("#hours").attr("placeholder", "00");
      $("#minutes").attr("placeholder", "00");
      $("#seconds").attr("placeholder", "00");
      $("#doubleDigitsButton").prop("checked", true);
    } else {
      doubleDigits = "false";
      $("#span4").html("0");
      $("#span5").html("0");
      $("#span6").html("0");
      $("#span7").html("0");
      $("#hours").attr("placeholder", "0");
      $("#minutes").attr("placeholder", "0");
      $("#seconds").attr("placeholder", "0");
      $("#doubleDigitsButton").prop("checked", false);
    }
    localStorage.setItem('doubleDigits', doubleDigits);
}
  
// Turns settings opening animation on / off
function settingsAnimControl() {
    if (settingsAnimation == "true") {
      settingsAnimation = "false";
      $("#setAnimButton").prop("checked", false);
    } else {
      settingsAnimation = "true";
      $("#setAnimButton").prop("checked", true);
    }
    localStorage.setItem('settingsAnim', settingsAnimation);
}

// Turns transition from Timer to Stopwatch on and off
function timerTransitionAni() {
    if (timerTransition == "true") {
      timerTransition = "false";
      $("#ttsTransButton").prop("checked", false);
      $("#timerChange").css("transition","0s");
      $("#clockChanger").css("transition","0s");
    } else {
      timerTransition = "true";
      $("#ttsTransButton").html("On");
      $("#ttsTransButton").prop("checked", true);
      $("#timerChange").css("transition","0.25s");
      $("#clockChanger").css("transition","0.25s");
    }
    localStorage.setItem('timerTrans', timerTransition);
}
  
function hideFocusModeCon() {
    if (hideFocusMode == "true") {
      hideFocusMode = "false";
      $("#focusMode").show();
      $("#hideFocusModeBttn").prop("checked", false);;
    } else {
      hideFocusMode = "true";
      $("#focusMode").hide();
      $("#hideFocusModeBttn").prop("checked", true);;
    }
    localStorage.setItem('hideFocusMode', hideFocusMode);
}
  
function hideClockSwitcher() {
    if (isClockSwitcher == "false") {
      isClockSwitcher = "true";
      $("#hideClockSwitcher").prop("checked", true);
      $("#clockChanger").hide();
    } else {
      isClockSwitcher = "false";
      $("#hideClockSwitcher").prop("checked", false);
      $("#clockChanger").show();
    }
    localStorage.setItem('isClockSwitcher', isClockSwitcher);
}
  
function hideTimerSwitcher() {
    if (isTimerSwitcher == "false") {
      isTimerSwitcher = "true";
      $("#hideTimerSwitcher").prop("checked", true);
      $("#timerChangerContainer").hide();
    } else {
      isTimerSwitcher = "false";
      $("#hideTimerSwitcher").prop("checked", false);
      $("#timerChangerContainer").show();
    }
    localStorage.setItem('isTimerSwitcher', isTimerSwitcher);
}

function changeSnoozeLenght(x) {
    $('#snoozeLength').toggle(500);
    if (x == 0) {
      $("#alarmSnoozeButton").html("1 minute");
    } else {
      $("#alarmSnoozeButton").html(x + 1 + " minutes");
    }
    snoozeAlarmNumber = x;
    localStorage.setItem('snoozeAlarmNumber', snoozeAlarmNumber)
  }
  
// Changes alarm sound
function changeAlarmSound(x) {
    // Gets chosen alarm ready to play
    activeAlarmSound = x;
    $("#alarmSoundButton").html(alarmNames[x]);
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
    $("body").removeClass("defaultFont classicFont wetFont arialFont bubbleFont robotFont");
  
    if (x == "0") {
      $("body").addClass("defaultFont");
      $("#fontButton").html("Default");
      currentFont = x;
    } else if (x == "1") {
      $("body").addClass("classicFont");
      $("#fontButton").html("Classic");
      currentFont = x;
    } else if (x == "2") {
      $("body").addClass("wetFont");
      $("#fontButton").html("Wet Paint");
      currentFont = x;
    } else if (x == "3") {
      $("body").addClass("arialFont");
      $("#fontButton").html("Arial");
      currentFont = x;
    } else if (x == "4") {
      $("body").addClass("bubbleFont");
      $("#fontButton").html("Bubble");
      currentFont = x;
    } else {
      $("body").addClass("robotFont");
      $("#fontButton").html("Roboto");
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
      $("#timerSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 92C71.5391 92 89 74.5391 89 53C89 31.4609 71.5391 14 50 14C28.4609 14 11 31.4609 11 53C11 74.5391 28.4609 92 50 92ZM50 88.6571C69.6929 88.6571 85.6571 72.6929 85.6571 53C85.6571 33.3071 69.6929 17.3429 50 17.3429C30.3071 17.3429 14.3429 33.3071 14.3429 53C14.3429 72.6929 30.3071 88.6571 50 88.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 53C83 71.2254 68.2254 86 50 86C31.7746 86 17 71.2254 17 53C17 34.7746 31.7746 20 50 20C68.2254 20 83 34.7746 83 53ZM47.7241 28.5345C47.7241 26.9633 48.9978 25.6897 50.569 25.6897C52.1401 25.6897 53.4138 26.9633 53.4138 28.5345V45.679L61.0812 38.0116C62.1922 36.9006 63.9934 36.9006 65.1044 38.0116C66.2153 39.1226 66.2153 40.9238 65.1044 42.0348L53.0348 54.1044C52.8657 54.2735 52.6806 54.4168 52.4844 54.5345C51.9789 54.995 51.3067 55.2759 50.569 55.2759C48.9978 55.2759 47.7241 54.0022 47.7241 52.431V28.5345Z" fill="black"/><rect x="47" y="4" width="6" height="12" rx="2" fill="black"/><rect x="43" y="9" width="5" height="14" rx="2" transform="rotate(-90 43 9)" fill="black"/>');
      $("#timerLabel").html("Stopwatch");
      isStopwatch = "true";
    } else {
      $("#timerChange").css("transform","rotate(360deg)");
      $(".timerMain").show();
      $(".stopwatch").hide();
      $("#timerResetContainer").show();
      $("#stopwatchResetContainer").hide();
      $("#timerPlayContainer").show();
      $("#stopwatchPlayContainer").hide();
      $("#timerSVG").html('<mask id="path-1-inside-1_0_1" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M56.2964 50.5L74.3157 86.25H26.6843L44.7036 50.5L26.6843 14.75H74.3157L56.2964 50.5Z"/></mask><path d="M56.2964 50.5L54.5104 49.5998L54.0567 50.5L54.5104 51.4002L56.2964 50.5ZM74.3157 86.25V88.25H77.5635L76.1017 85.3498L74.3157 86.25ZM26.6843 86.25L24.8983 85.3498L23.4365 88.25H26.6843V86.25ZM44.7036 50.5L46.4895 51.4002L46.9433 50.5L46.4895 49.5998L44.7036 50.5ZM26.6843 14.75V12.75H23.4365L24.8983 15.6502L26.6843 14.75ZM74.3157 14.75L76.1017 15.6502L77.5635 12.75H74.3157V14.75ZM54.5104 51.4002L72.5297 87.1502L76.1017 85.3498L58.0824 49.5998L54.5104 51.4002ZM74.3157 84.25H26.6843V88.25H74.3157V84.25ZM28.4703 87.1502L46.4895 51.4002L42.9176 49.5998L24.8983 85.3498L28.4703 87.1502ZM46.4895 49.5998L28.4703 13.8498L24.8983 15.6502L42.9176 51.4002L46.4895 49.5998ZM26.6843 16.75H74.3157V12.75H26.6843V16.75ZM72.5297 13.8498L54.5104 49.5998L58.0824 51.4002L76.1017 15.6502L72.5297 13.8498Z" fill="black" mask="url(#path-1-inside-1_0_1)"/><rect x="23" y="10" width="54" height="7" rx="3.5" fill="black"/><rect x="23" y="84" width="54" height="7" rx="3.5" fill="black"/><path d="M50.5 51L39.6747 30.75L61.3253 30.75L50.5 51Z" fill="black"/><path d="M50.5 59L67.3875 80.75H33.6125L50.5 59Z" fill="black"/>');
      $("#timerLabel").html("Timer");
      isStopwatch = "false";
    }
    localStorage.setItem('isStopwatch', isStopwatch);
}

function clockChanger() {
    if (isAnalog == "false") {
      $("#clockChanger").css("transform","rotate(180deg)");
      $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M50 89C71.5391 89 89 71.5391 89 50C89 28.4609 71.5391 11 50 11C28.4609 11 11 28.4609 11 50C11 71.5391 28.4609 89 50 89ZM50 85.6571C69.6929 85.6571 85.6571 69.6929 85.6571 50C85.6571 30.3071 69.6929 14.3429 50 14.3429C30.3071 14.3429 14.3429 30.3071 14.3429 50C14.3429 69.6929 30.3071 85.6571 50 85.6571Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M83 50C83 68.2254 68.2254 83 50 83C31.7746 83 17 68.2254 17 50C17 31.7746 31.7746 17 50 17C68.2254 17 83 31.7746 83 50ZM47.7241 25.5345C47.7241 23.9633 48.9978 22.6897 50.569 22.6897C52.1401 22.6897 53.4138 23.9633 53.4138 25.5345V49.431C53.4138 50.0573 53.2114 50.6362 52.8686 51.1062C52.7525 51.7397 52.4219 52.3375 51.8875 52.7811L38.7541 63.6835C37.5452 64.687 35.7516 64.5205 34.7481 63.3116C33.7446 62.1027 33.9111 60.3092 35.12 59.3056L47.7241 48.8426V25.5345Z" fill="black"/>');
      $(".digital").hide();
      $(".analog").show();
      isAnalog = "true";
    } else {
      $("#clockChanger").css("transform","rotate(360deg)");
      $("#clockSVG").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M21 18C13.268 18 7 24.268 7 32V69C7 76.732 13.268 83 21 83H80C87.732 83 94 76.732 94 69V32C94 24.268 87.732 18 80 18H21ZM18.064 60.04C19.024 60.8933 20.3573 61.32 22.064 61.32C23.7707 61.32 25.0933 60.8933 26.032 60.04C26.992 59.1867 27.664 57.9067 28.048 56.2C28.4533 54.4933 28.656 52.36 28.656 49.8C28.656 47.24 28.4533 45.1067 28.048 43.4C27.664 41.672 26.992 40.3813 26.032 39.528C25.0933 38.6747 23.7707 38.248 22.064 38.248C20.3573 38.248 19.024 38.6747 18.064 39.528C17.104 40.3813 16.4213 41.672 16.016 43.4C15.632 45.1067 15.44 47.24 15.44 49.8C15.44 52.36 15.632 54.4933 16.016 56.2C16.4213 57.9067 17.104 59.1867 18.064 60.04ZM23.92 57.32C23.472 57.8107 22.8533 58.056 22.064 58.056C21.2747 58.056 20.6453 57.8107 20.176 57.32C19.7067 56.808 19.3653 55.9547 19.152 54.76C18.96 53.5653 18.864 51.912 18.864 49.8C18.864 47.6667 18.96 46.0027 19.152 44.808C19.3653 43.6133 19.7067 42.7707 20.176 42.28C20.6453 41.768 21.2747 41.512 22.064 41.512C22.8533 41.512 23.472 41.768 23.92 42.28C24.3893 42.7707 24.7307 43.6133 24.944 44.808C25.1573 46.0027 25.264 47.6667 25.264 49.8C25.264 51.912 25.1573 53.5653 24.944 54.76C24.7307 55.9547 24.3893 56.808 23.92 57.32ZM34.1265 60.04C35.0865 60.8933 36.4198 61.32 38.1265 61.32C39.8332 61.32 41.1558 60.8933 42.0945 60.04C43.0545 59.1867 43.7265 57.9067 44.1105 56.2C44.5158 54.4933 44.7185 52.36 44.7185 49.8C44.7185 47.24 44.5158 45.1067 44.1105 43.4C43.7265 41.672 43.0545 40.3813 42.0945 39.528C41.1558 38.6747 39.8332 38.248 38.1265 38.248C36.4198 38.248 35.0865 38.6747 34.1265 39.528C33.1665 40.3813 32.4838 41.672 32.0785 43.4C31.6945 45.1067 31.5025 47.24 31.5025 49.8C31.5025 52.36 31.6945 54.4933 32.0785 56.2C32.4838 57.9067 33.1665 59.1867 34.1265 60.04ZM39.9825 57.32C39.5345 57.8107 38.9158 58.056 38.1265 58.056C37.3372 58.056 36.7078 57.8107 36.2385 57.32C35.7692 56.808 35.4278 55.9547 35.2145 54.76C35.0225 53.5653 34.9265 51.912 34.9265 49.8C34.9265 47.6667 35.0225 46.0027 35.2145 44.808C35.4278 43.6133 35.7692 42.7707 36.2385 42.28C36.7078 41.768 37.3372 41.512 38.1265 41.512C38.9158 41.512 39.5345 41.768 39.9825 42.28C40.4518 42.7707 40.7932 43.6133 41.0065 44.808C41.2198 46.0027 41.3265 47.6667 41.3265 49.8C41.3265 51.912 41.2198 53.5653 41.0065 54.76C40.7932 55.9547 40.4518 56.808 39.9825 57.32ZM48.525 60.648C49.0157 61.1173 49.5917 61.352 50.253 61.352C50.9143 61.352 51.4797 61.1173 51.949 60.648C52.4397 60.1787 52.685 59.6133 52.685 58.952C52.685 58.2693 52.4397 57.6933 51.949 57.224C51.4797 56.7547 50.9143 56.52 50.253 56.52C49.5917 56.52 49.0157 56.7547 48.525 57.224C48.0557 57.6933 47.821 58.2693 47.821 58.952C47.821 59.6133 48.0557 60.1787 48.525 60.648ZM48.525 49.32C49.0157 49.7893 49.5917 50.024 50.253 50.024C50.9143 50.024 51.4797 49.7893 51.949 49.32C52.4397 48.8507 52.685 48.2853 52.685 47.624C52.685 46.9413 52.4397 46.376 51.949 45.928C51.4797 45.4587 50.9143 45.224 50.253 45.224C49.5917 45.224 49.0157 45.4587 48.525 45.928C48.0557 46.376 47.821 46.9413 47.821 47.624C47.821 48.2853 48.0557 48.8507 48.525 49.32ZM58.439 60.04C59.399 60.8933 60.7323 61.32 62.439 61.32C64.1457 61.32 65.4683 60.8933 66.407 60.04C67.367 59.1867 68.039 57.9067 68.423 56.2C68.8283 54.4933 69.031 52.36 69.031 49.8C69.031 47.24 68.8283 45.1067 68.423 43.4C68.039 41.672 67.367 40.3813 66.407 39.528C65.4683 38.6747 64.1457 38.248 62.439 38.248C60.7323 38.248 59.399 38.6747 58.439 39.528C57.479 40.3813 56.7963 41.672 56.391 43.4C56.007 45.1067 55.815 47.24 55.815 49.8C55.815 52.36 56.007 54.4933 56.391 56.2C56.7963 57.9067 57.479 59.1867 58.439 60.04ZM64.295 57.32C63.847 57.8107 63.2283 58.056 62.439 58.056C61.6497 58.056 61.0203 57.8107 60.551 57.32C60.0817 56.808 59.7403 55.9547 59.527 54.76C59.335 53.5653 59.239 51.912 59.239 49.8C59.239 47.6667 59.335 46.0027 59.527 44.808C59.7403 43.6133 60.0817 42.7707 60.551 42.28C61.0203 41.768 61.6497 41.512 62.439 41.512C63.2283 41.512 63.847 41.768 64.295 42.28C64.7643 42.7707 65.1057 43.6133 65.319 44.808C65.5323 46.0027 65.639 47.6667 65.639 49.8C65.639 51.912 65.5323 53.5653 65.319 54.76C65.1057 55.9547 64.7643 56.808 64.295 57.32ZM74.5015 60.04C75.4615 60.8933 76.7948 61.32 78.5015 61.32C80.2082 61.32 81.5308 60.8933 82.4695 60.04C83.4295 59.1867 84.1015 57.9067 84.4855 56.2C84.8908 54.4933 85.0935 52.36 85.0935 49.8C85.0935 47.24 84.8908 45.1067 84.4855 43.4C84.1015 41.672 83.4295 40.3813 82.4695 39.528C81.5308 38.6747 80.2082 38.248 78.5015 38.248C76.7948 38.248 75.4615 38.6747 74.5015 39.528C73.5415 40.3813 72.8588 41.672 72.4535 43.4C72.0695 45.1067 71.8775 47.24 71.8775 49.8C71.8775 52.36 72.0695 54.4933 72.4535 56.2C72.8588 57.9067 73.5415 59.1867 74.5015 60.04ZM80.3575 57.32C79.9095 57.8107 79.2908 58.056 78.5015 58.056C77.7122 58.056 77.0828 57.8107 76.6135 57.32C76.1442 56.808 75.8028 55.9547 75.5895 54.76C75.3975 53.5653 75.3015 51.912 75.3015 49.8C75.3015 47.6667 75.3975 46.0027 75.5895 44.808C75.8028 43.6133 76.1442 42.7707 76.6135 42.28C77.0828 41.768 77.7122 41.512 78.5015 41.512C79.2908 41.512 79.9095 41.768 80.3575 42.28C80.8268 42.7707 81.1682 43.6133 81.3815 44.808C81.5948 46.0027 81.7015 47.6667 81.7015 49.8C81.7015 51.912 81.5948 53.5653 81.3815 54.76C81.1682 55.9547 80.8268 56.808 80.3575 57.32Z" fill="black"/>');
      $(".digital").show();
      $(".analog").hide();
      isAnalog = "false";
    }
    localStorage.setItem('isAnalog', isAnalog);
}

// Changes between light and dark
function themeChanger() {
    if (isDark == "false") {
      isDark = "true";
      $("html").addClass("dark");
      $("#themeButton").html("Dark");
      $("meta[name='theme-color']").attr("content", "rgb(76, 82, 85)");
    } else if (isDark == "true") {
      isDark = "false";
      $("html").removeClass("dark");
      $("#themeButton").html("Light");
      $("meta[name='theme-color']").attr("content", "#D3D3D3");
    }
    localStorage.setItem('darkMode', isDark);
}

// Resets theme colour
function resetThemeColour() {
    $('#resetColourConfirm').toggle(500);
    $('#colourButton').remove();
    themeColour = "#FF0000";
    $('#themeChangerCon').append('<input type="color" class="settingsButton" id="colourButton" value="' + themeColour + '">')
}

// Clears app data and reloads page
function resetApp() {
    localStorage.clear();
    resetThemeColour();
    clearInterval(interval)
    localStorage.setItem("timeZoneNumber", 24)
    location.reload();
}
