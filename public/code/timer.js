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
    if (doubleDigits == "true") {
        $("#span1").html((timerHours < 10 ? "0" : "" ) + timerHours);
        $("#span2").html((timerMinutes < 10 ? "0" : "" ) +timerMinutes);
        $("#span3").html((timerSeconds < 10 ? "0" : "" ) +timerSeconds);
    } else {
        $("#span1").html(timerHours);
        $("#span2").html(timerMinutes);
        $("#span3").html(timerSeconds);
    }
  
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

    if (timerSeconds < 0) {
        timerSeconds = 59;
        timerMinutes -= 1;
    }

    if (timerMinutes < 0) {
        timerSeconds = 59;
        timerMinutes = 59;
        timerHours -= 1;
    }

    if (timerHours < 0) {
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

function cancelTimer() {
    $("#timerActive").css("display","none");
    audio.pause();
    audio.remove();
    audio.currentTime = 0;
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