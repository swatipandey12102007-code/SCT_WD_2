/* =========================================
   STOPWATCH VARIABLES
========================================= */

let startTime = 0;
let elapsedTime = 0;

let timerInterval = null;

let isRunning = false;

let lapNumber = 0;
let previousLapTime = 0;


/* =========================================
   GET HTML ELEMENTS
========================================= */

const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const statusElement = document.getElementById("status");

const lapsContainer = document.getElementById("lapsContainer");
const emptyLaps = document.getElementById("emptyLaps");

const lapCount = document.getElementById("lapCount");


/* =========================================
   FORMAT TIME
========================================= */

function formatNumber(number, digits = 2) {

    return String(number).padStart(digits, "0");

}


/* =========================================
   UPDATE DISPLAY
========================================= */

function updateDisplay() {

    const totalMilliseconds = elapsedTime;

    const hours =
        Math.floor(totalMilliseconds / 3600000);

    const minutes =
        Math.floor(
            (totalMilliseconds % 3600000) / 60000
        );

    const seconds =
        Math.floor(
            (totalMilliseconds % 60000) / 1000
        );

    const milliseconds =
        Math.floor(
            (totalMilliseconds % 1000) / 10
        );


    hoursElement.textContent =
        formatNumber(hours);

    minutesElement.textContent =
        formatNumber(minutes);

    secondsElement.textContent =
        formatNumber(seconds);

    millisecondsElement.textContent =
        formatNumber(milliseconds);

}


/* =========================================
   START STOPWATCH
========================================= */

function startStopwatch() {

    if (isRunning) {
        return;
    }


    isRunning = true;

    startTime =
        Date.now() - elapsedTime;


    timerInterval = setInterval(() => {

    elapsedTime = Date.now() - startTime;

    updateDisplay();

}, 20);


    /* Buttons */

    startBtn.disabled = true;

    pauseBtn.disabled = false;

    lapBtn.disabled = false;


    /* Status */

    statusElement.classList.remove("paused");

    statusElement.classList.add("running");

    statusElement.innerHTML = `
        <span class="status-dot"></span>
        Running
    `;

}


/* =========================================
   PAUSE STOPWATCH
========================================= */

function pauseStopwatch() {

    if (!isRunning) {
        return;
    }


    isRunning = false;


    clearInterval(timerInterval);

    timerInterval = null;


    /* Buttons */

    startBtn.disabled = false;

    pauseBtn.disabled = true;


    /* Status */

    statusElement.classList.remove("running");

    statusElement.classList.add("paused");

    statusElement.innerHTML = `
        <span class="status-dot"></span>
        Paused
    `;

}


/* =========================================
   RESET STOPWATCH
========================================= */

function resetStopwatch() {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    startTime = 0;

    elapsedTime = 0;

    lapNumber = 0;

    previousLapTime = 0;


    updateDisplay();


    /* Buttons */

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    lapBtn.disabled = true;


    /* Status */

    statusElement.className = "status";

    statusElement.innerHTML = `
        <span class="status-dot"></span>
        Ready
    `;


    /* Clear laps */

    lapsContainer.innerHTML = "";

    lapsContainer.appendChild(emptyLaps);

    emptyLaps.style.display = "block";


    lapCount.textContent = "0 Laps";

}


/* =========================================
   RECORD LAP
========================================= */

function recordLap() {

    if (!isRunning) {
        return;
    }


    lapNumber++;


    const currentLapTime = elapsedTime;

    const splitTime =
        currentLapTime - previousLapTime;


    previousLapTime = currentLapTime;


    /* Remove empty message */

    if (lapNumber === 1) {

        emptyLaps.style.display = "none";

    }


    /* Create lap element */

    const lapItem =
        document.createElement("div");

    lapItem.className = "lap-item";


    lapItem.innerHTML = `

        <div class="lap-number">
            LAP ${lapNumber}
        </div>

        <div class="lap-time">
            ${formatLapTime(currentLapTime)}
        </div>

        <div class="lap-split">
            + ${formatLapTime(splitTime)}
        </div>

    `;


    /* Add newest lap at top */

    lapsContainer.prepend(lapItem);


    /* Update count */

    lapCount.textContent =
        `${lapNumber} ${lapNumber === 1 ? "Lap" : "Laps"}`;

}


/* =========================================
   FORMAT LAP TIME
========================================= */

function formatLapTime(time) {

    const hours =
        Math.floor(time / 3600000);

    const minutes =
        Math.floor(
            (time % 3600000) / 60000
        );

    const seconds =
        Math.floor(
            (time % 60000) / 1000
        );

    const milliseconds =
        Math.floor(
            (time % 1000) / 10
        );


    if (hours > 0) {

        return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(milliseconds)}`;

    }


    return `${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(milliseconds)}`;

}


/* =========================================
   BUTTON EVENTS
========================================= */

startBtn.addEventListener(
    "click",
    startStopwatch
);

pauseBtn.addEventListener(
    "click",
    pauseStopwatch
);

resetBtn.addEventListener(
    "click",
    resetStopwatch
);

lapBtn.addEventListener(
    "click",
    recordLap
);


/* =========================================
   INITIAL DISPLAY
========================================= */

updateDisplay();
