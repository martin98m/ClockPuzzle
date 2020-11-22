console.log("ClockPuzzle.js loading...");

const clockColor = ["red", "yellow", "blue", "green", "purple", "pink"];
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
    let hourSpotCircle = document.createElement("div");
    hourSpotCircle.className = "hour_circle";
    hourSpotCircle.innerText = item.toString();
    hourSpotCircle.id = "ID0" + index;
    hourSpot.appendChild(hourSpotCircle);

    hourSpot.style.transform = `rotate(${index*(360 / game.hourCount)}deg)`;


    document.getElementsByClassName("clock_positions")[0].appendChild(hourSpot);
    game.hourSpots[hourSpotCircle.id.toString()] = {
        "order" : index,
        "locked" : false,
        "clicked" : false,
        "value" : item,
        "element" : hourSpotCircle
    };
});

let leftHandle = document.getElementById("left_hand");
let rightHandle = document.createElement("right_hand");
//leftHandle.style.visibility = "hidden";
//rightHandle.style.visibility = "hidden";
//CREATED ALL COMPONENTS THAT WERE NEEDED



let items = document.getElementsByClassName("hour_circle");
for (let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function (x) {
        console.log(x.target);
        let hourSpot = game.hourSpots[x.target.id.toString()];

        if (hourSpot.clicked || hourSpot.locked) {
            console.log("Already clicked or locked");
            return;
        }

        hourSpot.clicked = true;
        hourSpot.element.style.opacity = "40%";
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
        if (spotLeft.clicked === false) {
            spotLeft.locked = false;
            spotLeft.element.style.background = 'red';
        }
        if (spotRight.clicked === false){
            spotRight.locked = false;
            spotRight.element.style.background = 'blue';
        }
        if (spotLeft === spotRight)
            spotRight.element.style.background = 'green';
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
        game.hourSpots[x].element.style.background = 'white';
    }
}