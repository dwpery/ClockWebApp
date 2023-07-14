// Starts stopwatch
function startStopwatch() {
    // Values
    stopwatchMs = 0;
    stopwatchS = 0;
    stopwatchM = 0;
    stopwatchH = 0;
  
    // Prints values
    if (doubleDigits == "true") {
        $("#span4").html((stopwatchH < 10 ? "0" : "" ) + stopwatchH);
        $("#span5").html((stopwatchM < 10 ? "0" : "" ) + stopwatchM);
        $("#span6").html((stopwatchS < 10 ? "0" : "" ) + stopwatchS);
        $("#span7").html((stopwatchMs < 10 ? "0" : "" ) + stopwatchMs);
    } else {
        $("#span1").html(stopwatchH);
        $("#span2").html(stopwatchM);
        $("#span3").html(stopwatchS);
        $("#span7").html(stopwatchMs);
    }
  
    // Changes Icon
    $("#stopwatchPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="pauseStopwatch" onclick="pauseStopwatch()"><circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/><path class="barOnSVG" d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path class="barOnSVG" d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/></svg>');
  
    stopwatchCycle = setInterval(stopwatch, 1);
}
  
  // Main code for stopwatch
function stopwatch() {
    // increments stopwatch
    stopwatchMs += sValue;
  
    // sorts out number changing
    if (stopwatchMs > 99) {
        stopwatchMs = 0;
        stopwatchS += 1;
        if (stopwatchS > 59) {
            stopwatchS = 0;
            stopwatchM += 1;
            if (stopwatchM > 59) {
                stopwatchM = 0;
                stopwatchH += 1;
            }
        }
    }
  
    // Print variables
    pSMS = stopwatchMs;
    pSS = stopwatchS;
    pSM = stopwatchM;
    pSH = stopwatchH;
  
    // Pads integers
    if (doubleDigits === "true") {
        pSMS = (pSMS < 10 ? "0" : "" ) + pSMS;
        pSS = (pSS < 10 ? "0" : "" ) + pSS;
        pSM = (pSM < 10 ? "0" : "" ) + pSM;
        pSH = (pSH < 10 ? "0" : "" ) + pSH;
    }
  
    // Prints values
    $("#span4").html(pSH);
    $("#span5").html(pSM);
    $("#span6").html(pSS);
    $("#span7").html(pSMS);
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
    if (doubleDigits == "true") {
        $("#span4").html("00");
        $("#span5").html("00");
        $("#span6").html("00");
        $("#span7").html("00");
    } else {
        $("#span4").html("0");
        $("#span5").html("0");
        $("#span6").html("0");
        $("#span7").html("0");
    }
  
    sValue = 1;
    $("#pauseStopwatch").html('<circle cx="50" cy="50" r="50" fill="#C4C4C4"/><path d="M33 30.5C33 27.4624 35.4624 25 38.5 25V25C41.5376 25 44 27.4624 44 30.5V70.5C44 73.5376 41.5376 76 38.5 76V76C35.4624 76 33 73.5376 33 70.5V30.5Z" fill="#36454F"/><path d="M56 30.5C56 27.4624 58.4624 25 61.5 25V25C64.5376 25 67 27.4624 67 30.5V70.5C67 73.5376 64.5376 76 61.5 76V76C58.4624 76 56 73.5376 56 70.5V30.5Z" fill="#36454F"/>');
    // Changes Icon
    $("#stopwatchPlayContainer").html('<svg class="buttonSVG" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="startStopwatch" onclick="startStopwatch()"> <circle class="circleOnSVG" cx="50" cy="50" r="50" fill="#C4C4C4"/> <path class="barOnSVG" d="M75.3168 54.726C78.4205 52.7634 78.4205 48.2366 75.3168 46.274L42.4222 25.4736C39.093 23.3684 34.75 25.7606 34.75 29.6996L34.75 71.3004C34.75 75.2394 39.093 77.6316 42.4222 75.5264L75.3168 54.726Z" fill="#36454F"/> </svg>');
}
  
