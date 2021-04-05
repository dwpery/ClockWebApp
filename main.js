// Variable bank
var hour = 0;
var minute = 0;
var printMinute;
var second = 49;
var printSecond;
var value = 1; // Amount seconds increases
var clockMode = false; //false = 12, true = 24
var realTime = true; // true = Real Time, false = False Time
var dateFormat = false; // false = dd/mm true = mm/dd
var year = true; // true = yyyy, false = yy
var isClock = true; // true = Clock Pannel is on, false = Clock Pannel is off
var isTimer = false; // true = Timer Pannel is on, false = Timer Pannel is off
var isAlarm = false; // true = Alarm Pannel is on, false = Alarm Pannel is off
var isAlertClosed = true; // true = Yes, false = No
var timerState = true; // true = Playing, false = Paused
var ctx; // Used for drawring analog clock
var date; // Used to get info for the analog clock
var size = 95; // Represents size of analog clock
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
        second = -1;
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
// Analog clock code
function start() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    showTime();
    //call the function every second
    setInterval(showTime, 1000);
}
function showTime()  {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //get the date
    date = new Date();
    //draw the clock
    drawClock();
    //show the time
    showSeconds();
    showMinutes();
    showHours();
}
function drawClock() {
    //draw the frame
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, size + 7, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = '#3b3b3b';
    ctx.lineWidth = 10;
    ctx.stroke();
    //draw the hour marks
    for (var i = 0; i < 12; i++) {
        var angle = (i - 3) * (Math.PI * 2) / 12;      
        ctx.lineWidth = 2;            
        ctx.beginPath();
        var x1 = (canvas.width / 2) + Math.cos(angle) * (size);
        var y1 = (canvas.height / 2) + Math.sin(angle) * (size);
        var x2 = (canvas.width / 2) + Math.cos(angle) * (size - (size / 7));
        var y2 = (canvas.height / 2) + Math.sin(angle) * (size - (size / 7));
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }
    //draw the second marks
    for (i = 0; i < 60; i++) {
        angle = (i - 3) * (Math.PI * 2) / 60;      
        ctx.lineWidth = 1;           
        ctx.beginPath();
        x1 = (canvas.width / 2) + Math.cos(angle) * (size);
        y1 = (canvas.height / 2) + Math.sin(angle) * (size);
        x2 = (canvas.width / 2) + Math.cos(angle) * (size - (size / 30));
        y2 = (canvas.height / 2) + Math.sin(angle) * (size - (size / 30));
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }
}
function showSeconds() {
    var sec = date.getSeconds();
    var angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
    ctx.lineWidth = 2;             
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);   
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * size), canvas.height / 2 + Math.sin(angle) * size);
    ctx.moveTo(canvas.width / 2, canvas.height / 2);   
    ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20), canvas.height / 2 - Math.sin(angle) * 20);
    ctx.strokeStyle = '#e10600';       
    ctx.stroke();
}
function showMinutes() {
    var min = date.getMinutes();
    var angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
    ctx.lineWidth = 4;             
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);  
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * size / 1.1),      
    canvas.height / 2 + Math.sin(angle) * size / 1.1);
    ctx.strokeStyle = '#000'; 
    ctx.stroke();
}
function showHours() {
    var hour = date.getHours();
    var min = date.getMinutes();
    var angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
    ctx.lineWidth = 6;           
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);     
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * size / 1.5),      
    canvas.height / 2 + Math.sin(angle) * size / 1.5);
    ctx.strokeStyle = '#000'; 
    ctx.stroke();
}
// Sorts Countdown
function startCountdown() {
    // Gets Values
    swS = $("#second").val();
    swM = $("#minute").val();
    swH = $("#hour").val();
    // Makes values 0 if not set
    if(swH == "") {
        swH = 0;
    }
    if(swS == "") {
        swS = 5;
    }
    if(swM == "") {
        swM = 0;
    }
    // Makes all values positive
    if(swH < 0) {
        swH = 0;
    }
    if(swS < 0) {
        swS = 0;
    }
    if(swM < 0) {
        swM = 0;
    }
    // Makes all values max if over the top
    if(swH > 59) {
        swH = 59;
    }
    if(swS > 59) {
        swS = 59;
    }
    if(swM > 59) {
        swM = 59;
    }
    $("#startButtonContainer").html('<div id="start">s<br>t<br>a<br>r<br>t</div>')
    intervalId = setInterval(countdown, 1000)
}
// Countdown function
function countdown() {
    swS-=value;
    if(swS < 0) {
        swS = 59;
        swM -= 1;
    } 
    if(swM < 0) {
        swS = 59;
        swM = 59;
        swH -= 1;
    }
    if(swH < 0) {
        swS = 59;
        swM = 59;
    }
    countSecond = swS;
    countMinute = swM;
    countSecond = swS;
    if(swS < 10) {
        var countSecond = "0" + swS;
    }
    if(swM < 10) {
        var countMinute = "0" + swM;
    }
    if(swH < 10) {
        var countHour = "0" + swH;
    }
    $(".countdown").html(countHour+":"+countMinute+":"+countSecond);
    if(swS == 0 && swM == 0 && swH == 0) {
        $(".countdown").html("finished");
        $("#startButtonContainer").html('<div id="start" onclick="startCountdown()">s<br>t<br>a<br>r<br>t</div>')
        clearInterval(intervalId)
    }
}
// Resets countdown
function resetCount() {
    $(".countdown").html("00:00:00");
    $("#startButtonContainer").html('<div id="start" onclick="startCountdown()">s<br>t<br>a<br>r<br>t</div>');
    clearInterval(intervalId)
}
// Starts Timer 
function startTimer() {
    ts = 0;
    tm = 0;
    th = 0;
    $("#start-container").html('<div id="startTimer" onclick="stopTimer()"><div id="startLabel">stop</div></div>')
    timerLoop = setInterval(timer, 1000);
}
// Timer function
function timer() {
    if(timerState === true) {
        ts+=value;
    } 
    if(ts >= 60) {
        ts = 0;
        tm += 1;
    }
    if(tm >= 60) {
        ts = 0;
        tm = 0;
        th += 1;
    }
    timerSecond = ts;
    timerMinute = tm;
    timerHour = th;
    if(ts < 10) {
        timerSecond = "0" + ts;
    }
    if(tm < 10) {
        timerMinute = "0" + tm;
    }
    if(th < 10) {
        timerHour = "0" + th;
    }
    $(".timer").html(timerHour+":"+timerMinute+":"+timerSecond)
}
// Play / Pause timer
function pauseTimer() {
    if(timerState === true) {
        timerState = false;
        $("#pauseLabel").html("play");
    } else if(timerState === false) {
        timerState = true;
        $("#pauseLabel").html("pause");
    }
}
// Resets timer
function stopTimer() {
    if(timerState == false) {
        clearInterval(timerLoop)
        $(".timer").html("00:00:00")
        ts = 0;
        tm = 0;
        th = 0;
        $("#start-container").html('<div id="startTimer" onclick="startTimer()"><div id="startLabel">start</div></div>');
        timerState = true;
        $("#pauseLabel").html("pause");
    } else if(timerState == true) {
        alertBox("timer must be paused to reset");
    }
}
//Sorts out Alerts
function alertBox(x) {
    $("#alertBox").hide();
    // Sets text to string inputed
    $("#message").html(x);
    $("#alertBox").slideToggle(500);
    isAlertClosed = false;
    // Closes Alert automatically after 5 seconds
    setTimeout(function() {
        if(isAlertClosed == false) {
            $("#alertBox").slideToggle(500);
        }
    },5000)
}
// Hides the UI elements when the site loads
$(document).ready(function() {
    $("#container").hide(); // Hides Menu on load
    $("#alertBox").hide(); // Hides Alert on load
    $("#timerPannel").hide();
    $("#alarmPannel").hide();
    $("#analog").hide();
    $("#container2").hide();
    $("#creationMenu").hide();
    // Gets users timezone
    var tza = () => { 
        var { 1: tz } = new Date().toString().match(/\((.+)\)/); 
        if (tz.includes(" ")) { 
            return tz .split(" ") .map(([first]) => first) .join("");
        } else { 
            return tz; 
        } 
    }
    $(".tzbutton").html(tza);
});
// Activates the sliding for menu UI
function slide() {
    $("#container").slideToggle(500);
}
// Creates Alarms
function createAlarm() {
    alertBox("please do not use this as your main alarm");
    $("#creationMenu").slideToggle(500) 
}
// Closes alarm creation menu
function closeAlarmList() {
    $("#creationMenu").slideToggle(500);
}
// Opens Countdown sub-menu
function showCountdown() {
    $("#container2").show();
    $("#container3").hide();
    $(".countdown").show();
}
// Opens Timer sub-menu
function showTimer() {
    $("#container2").hide();
    $("#container3").show();
    $(".countdown").hide();
}
// Opens Digital clock
function showDigital() {
    $(".dClock").show();
    $("#analog").hide();
}
// Opens Analog clock
function showAnalog() {
    $(".dClock").hide();
    $("#analog").show();
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
  $("#alertBox").slideToggle(500);
  isAlertClosed = true;
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
// Changes current language
function chngLang() {
    alertBox("different languages coming in next update");
    $("#container").slideToggle(500); 
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
    $(".timer").html("00:00:00");
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
