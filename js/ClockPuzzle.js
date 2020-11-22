console.log("ClockPuzzle.js loading...");

const clockColor = ["red", "yellow", "blue", "green", "purple", "pink"];
const puzzleSize = 8;

let clockArray = [3, 3, 2, 4, 3, 1, 2, 3];

//todo
let game = {
    "hourSpots":{
        "ID00":{
            "order":0,
            "locked":false,
            "clicked":false,
            "value":3,
            "element":null
        },
        "ID01":{
            "order":1,
            "locked":false,
            "clicked":false,
            "value":2
        }
    },
    "hourCount": 8,
    "leftHand": -1,
    "rightHand": -1,
    "clicks": 0
}

clockArray.forEach(function (item, index) {
    // console.log(index, item);

    let hourSpot = document.createElement("div");
    hourSpot.className = "hourSpot " + clockColor[item - 1];
    hourSpot.id = "ID0" + index;
    let hourSpotText = document.createElement("a");

    hourSpotText.innerText = item.toString();
    hourSpot.appendChild(hourSpotText);

    document.getElementById("main_container").appendChild(hourSpot);
    game.hourSpots[hourSpot.id] = {
        "order" : index,
        "locked" : false,
        "clicked" : false,
        "value" : item,
        "element" : hourSpot
    }
// .element = hourSpot;
});

// console.log(game.hourSpots);

let leftHandle = document.createElement("div");
let rightHandle = document.createElement("div");
leftHandle.style.visibility = "hidden";
rightHandle.style.visibility = "hidden";
document.getElementById("main_container").appendChild(leftHandle);
document.getElementById("main_container").appendChild(rightHandle);


let items = document.getElementsByClassName("hourSpot");
for (let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function (x) {
        console.log(x.target);
        let hourSpot = game.hourSpots[x.target.id];

        if (hourSpot.clicked || hourSpot.locked) {
            console.log("Already clicked or locked");
            return;
        }

        hourSpot.clicked = true;
        hourSpot.element.style.opacity = "70%";
        game.clicks = game.clicks + 1;
        if (game.clicks === game.hourCount) alert("Game WON!!!");


        lockHourSpots();

        let num = parseInt(hourSpot.order);

        leftHandle.style.visibility = "visible";
        rightHandle.style.visibility = "visible";
        let leftHandePosition = moveLeft(num, hourSpot.value, game.hourCount);
        let rightHandlePosition = moveRight(num, hourSpot.value, game.hourCount);

        let spotLeft = game.hourSpots["ID0" + leftHandePosition.toString()]
        let spotRight = game.hourSpots["ID0" + rightHandlePosition.toString()]
        if (spotLeft.clicked === false) spotLeft.locked = false;
        if (spotRight.clicked === false) spotRight.locked = false;

        leftHandle.className = "green " + "clock_hand_position_" + leftHandePosition;
        rightHandle.className = "green " + "clock_hand_position_" + rightHandlePosition;
    })
}

function moveLeft(start, value, maxSize){
    let result = start - value;
    result = result < 0 ? maxSize + result : result;
    return result;
}
function moveRight(start, value, maxSize){
    let result = start + value;
    return result < maxSize ? result : result % maxSize;
}

function lockHourSpots() {
    console.log(game.hourSpots);
    for ( const x in game.hourSpots){
        game.hourSpots[x].locked = true;
    }
}