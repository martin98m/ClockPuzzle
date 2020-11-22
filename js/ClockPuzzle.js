console.log("ClockPuzzle.js loading...");

const clockColor = ["red", "yellow", "blue", "green", "purple", "pink"];
const puzzleSize = 8;

let clockArray = [3, 3, 2, 4, 3, 1, 2, 3];

let game = {
    "hourSpots":{},
    "hourCount": 8,
    "leftHand": -1,
    "rightHand": -1,
    "clicks": 0
}

clockArray.forEach(function (item, index) {
    let hourSpot = document.createElement("div");

    // el.setAttribute('class', `number number${i}`);
    hourSpot.className = "hourSpot";
    //hourSpot.id = "ID0" + index;
    let hourSpotItems = document.createElement("div");
    hourSpotItems.className = "hour_circle";
    hourSpotItems.innerText = item.toString();
    hourSpot.appendChild(hourSpotItems);

    hourSpot.style.transform = `rotate(${index*(360 / game.hourCount)}deg)`;


    document.getElementsByClassName("clock_positions")[0].appendChild(hourSpot);
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

let leftHandle = document.getElementById("left_hand");
let rightHandle = document.createElement("right_hand");
leftHandle.style.visibility = "hidden";
rightHandle.style.visibility = "hidden";

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
/*
let drawTicks = function() {

    for (let i = 1; i < 13; i++) {

        let el = document.createElement('div');
        el.setAttribute('class', `number number${i}`);
        el.style.transform = `rotate(${i*30}deg)`;

        document.querySelector('.clock_positions').appendChild(el);

    }

}; drawTicks()*/