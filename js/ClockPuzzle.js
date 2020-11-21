console.log("ClockPuzzle.js loading...");


//todo
var game = {
    "hourSpots":{
        "ID00":{
            "locked":false,
            "clicked":false,
            "value":2
        },
        "ID01":{
            "locked":false,
            "clicked":false,
            "value":3
        }
    },
    "leftHand": -1,
    "rightHand": -1,
    "clicks": 0
}


const puzzleSize = 8;
var clockArray = [3, 2, 4, 3, 2, 1, 4, 3];
var clockLock = [];
var clockColor = ["red", "yellow", "blue", "green", "purple", "pink"];
var clockUsed = [];

for (let x = 0; x < puzzleSize; x++){
    clockUsed[x] = false;
    clockLock[x] = false;
}

console.log(puzzleSize);
console.log(clockArray);
console.log(clockUsed);
console.log(clockLock);
console.log(clockColor);


clockArray.forEach(function (item, index) {
    console.log(index, item);

    let hourSpot = document.createElement("div");
    hourSpot.className = "hourSpot " + clockColor[item - 1];
    hourSpot.id = "ID0" + index;
    let hourSpotText = document.createElement("a");

    hourSpotText.innerText = item.toString();
    hourSpot.appendChild(hourSpotText);

    document.getElementById("main_container").appendChild(hourSpot);
});


let items = document.getElementsByClassName("hourSpot");
for (let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function (x) {
        console.log(x.target);
    })
}