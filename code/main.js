// Variable Bank

// False = dd/mm, True = mm/dd
var dateFormat = false;
// True = 24, False = 12
var clockMode = false;
// False = N, True = Y
var isAlertClosed = false;
// True = Digital, False = Analog
var isDigital = true;
// Value for timer
var value = 1;

// Main Code

// Function executes when page loads
$(document).ready(function() {
  showClock();
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

  // Sends alert message
  alertBox("Timer Pannel");
}

// Shows the Clock pannel, closes others
function showClock() {
  // Closes / Opens necessary pannels
  $("#timerPannel").hide();
  $("#clockPannel").show();
  $("#alarmPannel").hide();

  // Sends alert message
  alertBox("Clock Pannel");
}

// Shows the Alarm pannel, closes others
function showAlarm() {
  // Closes / Opens necessary pannels
  $("#timerPannel").hide();
  $("#clockPannel").hide();
  $("#alarmPannel").show();

  // Sends alert message
  alertBox("Alarm Pannel");
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

  // Prints Values
  $("#span1").html(ph);
  $("#span2").html(pm);
  $("#span3").html(ps);
}
