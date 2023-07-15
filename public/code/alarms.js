// Hols alarms in array
var alarms = localStorage.getItem('alarms') ? JSON.parse(localStorage.getItem('alarms')) : [];
// Holds amout of Alarms
var numOfAlarms = localStorage.getItem('numOfAlarms') || null;
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
        const newAlarm = { name: $(x).siblings(".alarmName").val(), time: $(x).siblings(".alarmTime").val(), active: true};
        alarms.push(newAlarm);
        // Adds final alarm to container
        $(x).closest('.alarm').css("height","15vh");
        if (numOfAlarms === null) {
            numOfAlarms = 0;
        } else {
            numOfAlarms += 1;
        }
        $(x).closest('.alarm').html('<div class="printAlarmName" inert>' + alarms[numOfAlarms].name + '</div><div class="printAlarmTime" inert>' + alarms[numOfAlarms].time + '</div><label class="switch switch2"><input checked type="checkbox" onclick="clockActiveChanger(this)"><span class="slider"></span></label><svg onclick="removeFinalAlarm(this)" class="removeFinalAlarm" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="25" width="50" height="7" rx="3.5" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.5 32C53.6421 32 57 28.6421 57 24.5C57 20.3579 53.6421 17 49.5 17C45.3579 17 42 20.3579 42 24.5C42 28.6421 45.3579 32 49.5 32ZM49.5 29C51.9853 29 54 26.9853 54 24.5C54 22.0147 51.9853 20 49.5 20C47.0147 20 45 22.0147 45 24.5C45 26.9853 47.0147 29 49.5 29Z" fill="#FF0000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M28.5181 34C26.6722 34 25.2642 35.6512 25.5558 37.474L32.5958 81.474C32.8287 82.9293 34.0843 84 35.5581 84H64.4418C65.9157 84 67.1713 82.9293 67.4042 81.474L74.4442 37.474C74.7358 35.6512 73.3278 34 71.4818 34H28.5181ZM50 37C48.3431 37 47 38.3431 47 40V76C47 77.6569 48.3431 79 50 79C51.6568 79 53 77.6569 53 76V40C53 38.3431 51.6568 37 50 37ZM30.5209 40.9963C30.2332 39.3646 31.3227 37.8087 32.9544 37.5209C34.5861 37.2332 36.1421 38.3227 36.4298 39.9544L42.6811 75.4075C42.9688 77.0392 41.8793 78.5952 40.2476 78.8829C38.616 79.1706 37.06 78.0811 36.7723 76.4494L30.5209 40.9963ZM67.2476 37.5209C65.616 37.2332 64.06 38.3227 63.7723 39.9544L57.5209 75.4075C57.2332 77.0392 58.3227 78.5952 59.9544 78.8829C61.5861 79.1706 63.1421 78.0811 63.4298 76.4494L69.6811 40.9963C69.9688 39.3646 68.8793 37.8087 67.2476 37.5209Z" fill="#FF0000"/></svg>');
        localStorage.setItem('numOfAlarms', numOfAlarms);
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }
}

function clockActiveChanger(x) {
    const deactivatedAlarmName = $(x).closest('.alarm').find('.printAlarmName');
  
    // Find the index of alarm to be deactivated
    const alarmIndex = alarms.findIndex(alarm => alarm.name == deactivatedAlarmName.text());
  
    if (alarmIndex !== -1) {
        // Set the "active" value of the alarm to false
         alarms[alarmIndex].active = !alarms[alarmIndex].active;
    }
  
    localStorage.setItem('alarms', JSON.stringify(alarms));
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

function snoozeAlarm() {
    cancelAlarm();
    setTimeout( function() {
        $("#alarmActive").css("display","block");
        audio.play();
    }, snoozelengthValue[snoozeAlarmNumber])
}

function resetAlarmsContainer() {
    numOfAlarms = null;
    alarms = [];
    $('#resetAlarmsConfirm').toggle(500);

    $(".alarms-container").html("");

    localStorage.setItem('numOfAlarms', numOfAlarms);
    localStorage.setItem('alarms', JSON.stringify(alarms));
}