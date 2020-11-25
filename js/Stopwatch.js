console.log("Loading stopwatch ...");

let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval = 100;
let timerIntervalObject = null;

let stopwatchTimeElement = document.getElementById("stopwatch_time");

function timeToString(time) {
    let hours = time / 3600000;
    let hh = Math.floor(hours);

    let minutes = (hours - hh) * 60;
    let mm = Math.floor(minutes);

    let seconds = (minutes - mm) * 60;
    let ss = Math.floor(seconds);

    let milis = (seconds - ss) * 1000;
    let ml = Math.floor(milis);


    let formatedMM = mm.toString().padStart(2, "0");
    let formatedSS = ss.toString().padStart(2, "0");
    let formatedMS = ml.toString().padStart(3, "0");

    // console.log(mm,ss,ml);
    // console.log(formatedMM,formatedSS,formatedMS);

    return `${formatedMM}:${formatedSS}:${formatedMS}`;
}

function startStopwatch() {

    if (timerIntervalObject) return;
    startTime = new Date() - elapsedTime;

    timerIntervalObject = setInterval(function printTime() {
        elapsedTime = new Date() - startTime;
        // console.log(elapsedTime);

        stopwatchTimeElement.innerText = timeToString(elapsedTime);
    },stopwatchInterval);

}

function stopStopwatch() {
    clearInterval(timerIntervalObject);
    elapsedTime = 0;
    stopwatchTimeElement.innerText = "00:00:000";
    console.log("STOPPED");
}

function pauseStopwatch() {
    clearInterval(timerIntervalObject);
    console.log("PAUSED");
}