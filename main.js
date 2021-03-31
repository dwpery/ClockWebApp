// Variable bank
var hour = 0;
var minute = 0;
var printMinute;
var second = 0;
var printSecond;
var value = 1; // Amount seconds increases
var versionNum = "1.1.0" // Stores Version
var clockMode = false; //false = 12, true = 24
var realTime = true; // true = Real Time, false = False Time
var dateFormat = false; // false = dd/mm true = mm/dd
var isClock = true; // true = Clock Pannel is on, false = Clock Pannel is off
var isTimer = false; // true = Timer Pannel is on, false = Timer Pannel is off
var isAlarm = false; // true = Alarm Pannel is on, false = Alarm Pannel is off
// Controls clock logic
setInterval(function() {
     var today = new Date(); 
     var dd = String(today.getDate()).padStart(2, '0'); 
     var mm = String(today.getMonth() + 1).padStart(2, '0');
     var yyyy = today.getFullYear();
     if(dateFormat === false) {
         var today = dd + "/" + mm + "/" + yyyy;
     }else if(dateFormat === true) {
         var today = mm + "/" + dd + "/" + yyyy;
     }
    // Outputs date
    $("#date").html("");
    $("#ampm").html(today);
    second += value; // Increases second value
    // Formats second
    if (second < 10) {
      printSecond = "0" + second;
    } else {
      printSecond = second;
    };
    // Formats minutes
    if (minute < 10) {
      printMinute = "0" + minute;
    } else {
      printMinute = minute;
    }
    // Prints time
    $("#display").html(hour + ":" + printMinute + ":" + printSecond);
    // Changes minute when seconds reaches 60
    if (second >= 59) {
        second = 0;
        minute += 1;
    }
    // Changes hour when minute reaches 60
    if (minute >= 59) {
        second = 0;
        minute = 0;
        hour += 1;
    }
    if(realTime === true) {
              var currentTime = new Date ( );
              var currentHours = currentTime.getHours ( );
                var currentMinutes = currentTime.getMinutes ( );
              var currentSeconds = currentTime.getSeconds ( );
      // Pads the minutes and seconds with leading zeros
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
      currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
      if(clockMode === true) {
          currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
      }
      if(clockMode === false) {
        // Choose either "AM" or "PM" as appropriate
        var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";
        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        $("#date").html(today);
        $("#ampm").html(timeOfDay);
        if(currentHours == 0) {
            currentHours = 12;
        }
      }
      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
      $("#display").html(currentTimeString);
      }
},1000);
//Sorts out Alerts
function alertBox(x) {
    $("#alertBox").hide();
    $("#message").html(x); // Sets text to string inputed in function
    $("#alertBox").slideToggle(500);
}
// Hides the UI elements when the site loads
$(document).ready(function() {
    $("#container").hide(); // Hides Menu on load
    $("#alertBox").hide(); // Hides Alert on load
    // Hides closed pannels
    $("#timerPannel").hide();
    $("#alarmPannel").hide();
});
// Activates the sliding for menu UI
function slide() {
    $("#container").slideToggle(500);
}
// Changes clock mode between 24 hour  and 12 hour
function hrCntrl() {
  if (realTime === false) {
    clockMode = false;
    $(".24button").html("off");
    alertBox("unavailable in system clock");
    $("#container").slideToggle(500);
  } else if (clockMode === false) {
    clockMode = true;
    $(".24button").html("on");
    alertBox("24 hour clock is on");
    $("#container").slideToggle(500);
  } else if (clockMode === true) {
    clockMode = false;
    $(".24button").html("off");
    alertBox("24 hour clock is now off");
    $("#container").slideToggle(500);
  }
}
// Closes Alert box when X is pressed
function closeMessage() {
  $("#alertBox").slideToggle(500); // Closes alert message
}
// Changes clock mode between real and false
function systemClock() {
  if (realTime === false) {
    realTime = true; // Turns Real Time on
    $(".scbutton").html("off"); // Changes text on button
    alertBox("system clock is off");
    $("#container").slideToggle(500); // Closes settings menu
  } else if (realTime === true) {
    realTime = false;
    $(".scbutton").html("on");
    alertBox("system clock is now on");
    $("#container").slideToggle(500);
  }
}
// Changes date format
function dfCntrl() {
    if (dateFormat === false) {
    dateFormat = true; // Changes format
    $(".dfbutton").html("m/d"); // Changes text on button
    alertBox("date format has changed")
    $("#container").slideToggle(500); // Closes alert messages
  } else if (dateFormat === true) {
    dateFormat = false; // Changes format
    $(".dfbutton").html("d/m"); // Changes text on button
    alertBox("date format has changed");
    $("#container").slideToggle(500); // Closes alert messages
  }
}
// Checks / changes which pannel is active
function clockPannel() {
  if(isClock === true) { } else {
    $("#clockPannel").show();
    $("#timerPannel").hide();
    $("#alarmPannel").hide();
    alertBox("clock pannel");
    isClock = true;
    isTimer = false;
    isAlarm = false;
  }
}
function timerPannel() {
  if(isTimer === true) { } else {
    $("#clockPannel").hide();
    $("#timerPannel").show();
    $("#alarmPannel").hide();
    alertBox("timer pannel");
    isTimer = true;
    isClock = false;
    isAlarm = false;
  }
}
function alarmPannel() {
  if(isAlarm === true) { } else {
    $("#clockPannel").hide();
    $("#timerPannel").hide();
    $("#alarmPannel").show();
    alertBox("alarm pannel");
    isTimer = false;
    isClock = false;
    isAlarm = true;
  }
}
