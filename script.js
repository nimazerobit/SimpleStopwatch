const display = document.getElementsByClassName("timer-display")[0]; // timer display
let timer = null; // timer object
var isRunning = false;
var startTime = 0;
var elapsedTime = 0;  // elapsed time in milliseconds
var startButton = document.getElementById("start"); // start button
var resetButton = document.getElementById("reset"); // reset button

startButton.addEventListener("click", function() {
    // if timer is not running, start it; otherwise, stop it
    if (!isRunning) {
        startTimer();
        update_button();
    }
    else {
        stopTimer();
        update_button();
    }
});

resetButton.addEventListener("click", function() {
    resetTimer();
    update_button();
});

window.addEventListener("load", function() {
    var startTimeValue = localStorage.getItem("startTime");
    var elapsedTimeValue = localStorage.getItem("elapsedTime");
    var isRunningValue = localStorage.getItem("isRunning");

    if (startTimeValue) {
        var data = JSON.parse(startTimeValue);
        startTime = data.startTime || 0;
        if (JSON.parse(isRunningValue).isRunning) {
            timer = setInterval(update_display, 10);
            isRunning = true;
            update_button();
        }
        else {
            var elapsedData = JSON.parse(elapsedTimeValue);
            elapsedTime = elapsedData.elapsedTime || 0;
            update_display(loadfromstorage = true);
        }
    }
});

// start function
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        localStorage.setItem("startTime", JSON.stringify({startTime: startTime}));
        localStorage.setItem("isRunning", JSON.stringify({isRunning: true}));
        timer = setInterval(update_display, 10);
    }
    isRunning = true;
}

// stop function
function stopTimer() {
    clearInterval(timer);
    timer = null;
    localStorage.setItem("elapsedTime", JSON.stringify({elapsedTime: elapsedTime}));
    localStorage.setItem("isRunning", JSON.stringify({isRunning: false}));
    isRunning = false;
}

// reset function
function resetTimer() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.innerHTML = "00:00:00";
    localStorage.removeItem("elapsedTime");
    localStorage.removeItem("startTime");
    localStorage.removeItem("isRunning");
}

// update display values
function update_display(loadfromstorage = false) {
    const currentTime = Date.now();

    elapsedTime = loadfromstorage ? JSON.parse(localStorage.getItem("elapsedTime")).elapsedTime : currentTime - startTime;

    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(2, "0");

    display.innerHTML = hours === "00" ? 
        `${minutes}:${seconds}:${milliseconds}` :
        `${hours}:${minutes}:${seconds}:${milliseconds}`; // if hours is 0, do not display it
}

// update button text and style
function update_button() {
    if (isRunning) {
        startButton.innerHTML = "توقف";
        startButton.style = "color: red; text-shadow: 0 0 10px red;";
    }
    else {
        startButton.innerHTML = "شروع";
        startButton.style = "color: #fff; text-shadow: 0";
    }
}

