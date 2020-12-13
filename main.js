// Starting Values

var hour = 0;
var minute = 0;
var printMinute;
var second = 0;
var printSecond;
var value = 1; // Amount seconds increases
var clockMode = false; //false = 12, true = 24
var realTime = true; // true = Real Time, false = False Time
var dateFormat = false; // false = dd/mm, true = mm/dd

// Formats the Output and keeps the clock ticking

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

    if (second < 10) {
      printSecond = "0" + second;
    } else {
      printSecond = second;
    } // Formats seconds

    if (minute < 10) {
      printMinute = "0" + minute;
    } else {
      printMinute = minute;
    } // Formats minutes

    $("#display").html(hour + ":" + printMinute + ":" + printSecond);

    // Changes minute when seconds reaches 60

    if (second >= 60) {
        second = 0;
        minute += 1;
    }

    // Changes hour when minute reaches 60

    if (minute >= 60) {
        second = 0;
        minute = 0;
        hour += 1;
    }

      if(realTime === true) {

      var currentTime = new Date ( );
      var currentHours = currentTime.getHours ( );
      var currentMinutes = currentTime.getMinutes ( );
      var currentSeconds = currentTime.getSeconds ( );

      // Pad the minutes and seconds with leading zeros, if required
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
      }

      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;

      $("#display").html(currentTimeString);

      }

},1000);

// Hides the UI elements when the site loads

$(document).ready(function() {
    $("#container").hide(); // Hides Menu when page loads
    $("#alertBox").hide(); // Hides Alert box when page loads
});

// Activates the sliding for menu UI

function slide() {
    $("#container").slideToggle(500);
}

// Changes clock mode between 24 hour  and 12 hour

function changeClockMode() {
  if (realTime === false) {
    clockMode = false;
    $("#clockModeChanger").html("24 Hour Clock : Off");
    $("#message").html("WARNING: 24 hour clock is currently only supported in real time");
    $("#alertBox").toggle(500);
    $("#container").slideToggle(500);
  } else if (clockMode === false) {
    clockMode = true;
    $("#clockModeChanger").html("24 Hour Clock : On");
    $("#message").html("24 hour clock is now on");
    $("#alertBox").toggle(500);
    $("#container").slideToggle(500);
  } else if (clockMode === true) {
    clockMode = false;
    $("#clockModeChanger").html("24 Hour Clock : Off");
    $("#message").html("24 hour clock is now off");
    $("#alertBox").toggle(500);
    $("#container").slideToggle(500);
  }
}

// Closes Alert box when X is pressed

function closeMessage() {
  $("#alertBox").slideToggle(500); // Closes alert message
}

// Changes clock mode between real and false

function realTimeMode() {
  if (realTime === false) {
    realTime = true; // Turns Real Time on
    $("#realTimeChanger").html("Real Time : On"); // Changes text on button
    $("#message").html("Real Clock is now on"); // Alert message
    $("#alertBox").toggle(500); // Opens alert message
    $("#container").slideToggle(500); // Closes alert messages
  } else if (realTime === true) {
    realTime = false; // Turns Real Time off
    $("#realTimeChanger").html("Real Time : Off"); // Changes text on button
    $("#message").html("Real Clock is now off"); // Alert message
    $("#alertBox").toggle(500); // Opens alert message
    $("#container").slideToggle(500);  // Closes alert messages
  }
}

// When the MENU button is pressed the version number is alerted

function version() {
  $("#message").html("Version 1.5.0"); // Alert message
  $("#alertBox").toggle(500); // Opens alert message
  $("#container").slideToggle(500);  // Closes alert messages
}

function dateFormatChanger() {
    if (dateFormat === false) {
    dateFormat = true; // Changes format
    $("#dateButton").html("Date Format: mm/dd/yyyy"); // Changes text on button
    $("#message").html("Date format has changed"); // Alert message
    $("#alertBox").toggle(500); // Opens alert message
    $("#container").slideToggle(500); // Closes alert messages
  } else if (realTime === true) {
    dateFormat = false; // Changes format
    $("#dateButton").html("Date Format: dd/mm/yyyy"); // Changes text on button
    $("#message").html("Date format has changed"); // Alert message
    $("#alertBox").toggle(500); // Opens alert message
    $("#container").slideToggle(500); // Closes alert messages
  }
}
