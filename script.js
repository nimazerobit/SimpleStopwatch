var timer_display = document.getElementsByClassName("timer-display")[0]; // timer display
var timer; // timer object
var timer_status = 0; // 0 = stopped, 1 = running
var elapsedMilliseconds = 0;  // elapsed time in milliseconds
var startButton = document.getElementById("start"); // start button
var resetButton = document.getElementById("reset"); // reset button

startButton.addEventListener("click", function() {
    // if timer is not running, start it; otherwise, stop it
    if (!timer_status) {
        startTimer();
        timer_status = 1;
        startButton.innerHTML = "توقف";
        startButton.style = "color: red; text-shadow: 0 0 10px red;";
    }
    else {
        stopTimer();
        timer_status = 0;
        startButton.innerHTML = "شروع";
        startButton.style = "color: #fff; text-shadow: 0";
    }
});

resetButton.addEventListener("click", function() {
    resetTimer();
    startButton.innerHTML = "شروع";
    startButton.style = "color: #fff; text-shadow: 0";
});

window.addEventListener("load", function() {
    var storedValue = localStorage.getItem("latestTimerValue");
    if (storedValue) {
        var data = JSON.parse(storedValue);
        elapsedMilliseconds = data.time || 0;
        displayTime();
    }
});

function startTimer() {
    if (timer) {
        return;
    }

    timer = setInterval(function() {
        elapsedMilliseconds += 10;
        displayTime();
        if (elapsedMilliseconds % 1000 === 0) {
            localStorage.setItem("latestTimerValue", JSON.stringify({ time: elapsedMilliseconds }));
        }
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    elapsedMilliseconds = 0;
    timer_status = 0;
    document.getElementsByClassName("stopwatch")[0].style = "top: 0px";
    timer_display.innerHTML = "00:00:00";
    localStorage.removeItem("latestTimerValue");
}

function displayTime() {
    var milliseconds = elapsedMilliseconds % 1000;
    var totalSeconds = Math.floor(elapsedMilliseconds / 1000);
    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);
    var minutes = totalMinutes % 60;
    var hours = Math.floor(totalMinutes / 60);

    var timeDisplay = 
        (hours > 0 ? (hours > 9 ? hours : "0" + hours) + ":" : "") +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + ":" +
        (milliseconds > 90 ? Math.floor(milliseconds/10) : "0" + Math.floor(milliseconds/10));

    timer_display.innerHTML = timeDisplay;
}

