console.log("ClockPuzzle.js loading...");

const clockColor = ["red", "yellow", "blue", "green", "purple", "pink", "brown", "beige", "orange", "maroon"];
// let clockArray = [3, 3, 2, 4, 3, 1, 2, 3];
let clockArray = [];

let game = {
    "hourSpots":{},
    "hourCount": null,
    "leftHand": -1,
    "rightHand": -1,
    "clicks": 0
}

function newGame(size){

    for (let a = 0; a < size; a++) clockArray[a]=0;
    // console.log(clockArray);
    game.hourCount = size;
    game.clicks = 0;
    let newTest = Array.from(Array(size).keys());
    // console.log(newTest);

    let start = Math.floor(Math.random() * Math.floor(newTest.length));//INDEX

    // console.log(start);
    // console.log("-------------");

    let o;
    let x = 1;
    while(x !== size) {
        o = newTest[start];//VALUE

        let index = newTest.indexOf(o);
        if (index !== -1) {
            newTest.splice(index, 1);
        }
        // console.log(newTest);
        // console.log("A:" + o);

        let target = Math.floor(Math.random() * Math.floor(newTest.length));//INDEX
        // console.log("B:" + newTest[target]);

        let distanceA = distance(o, newTest[target], size);//VALUE
        // console.log(distanceA);

        clockArray[o] = distanceA;
        start = target;

        // console.log(clockArray);
        // console.log("---------");
        x++;
        if (x === size) o = newTest[target];
    }

    clockArray[o] = 1 + Math.floor(Math.random() * Math.floor(size/2));
    /*
    for (let x = 0; x < size; x++){
        let target = Math.floor(Math.random() * Math.floor(newTest.length));

        clockArray[x] = distance(x,target,size);
    }
    */
    // console.log(clockArray);

    gameSetUp();
}

let leftHandle = document.getElementById("left_hand");
let rightHandle = document.getElementById("right_hand");
// leftHandle.style.visibility = "hidden";
// rightHandle.style.visibility = "hidden";


function gameSetUp() {
    clockArray.forEach(function (item, index) {
        // console.log(item, index);
        let hourSpot = document.createElement("div");

        hourSpot.className = "hourSpot";
        let hourSpotCircle = document.createElement("div");

        hourSpotCircle.className = "hour_circle " + clockColor[item];
        hourSpotCircle.innerText = item.toString();
        hourSpotCircle.id = "ID0" + index;
        hourSpotCircle.style.transform = `rotate(-${index * (360 / game.hourCount)}deg)`;
        hourSpot.appendChild(hourSpotCircle);

        hourSpot.style.transform = `rotate(${index * (360 / game.hourCount)}deg)`;


        document.getElementById("main_container").appendChild(hourSpot);
        game.hourSpots[hourSpotCircle.id.toString()] = {
            "order": index,
            "locked": false,
            "clicked": false,
            "value": item,
            "element": hourSpot
        };
    });

    let items = document.getElementsByClassName("hour_circle");
    for (let i = 0; i < items.length; i++){
        items[i].addEventListener("click", function (x) {
            console.log("Click");
            let hourSpot = game.hourSpots[x.target.id.toString()];

            if (hourSpot.clicked || hourSpot.locked) {
                console.log("Already clicked or locked");
                return;
            }

            hourSpot.clicked = true;
            hourSpot.element.style.opacity = "40%";
            game.clicks = game.clicks + 1;
            //GAME WON
            if (game.clicks === game.hourCount) {
                alert("Game WON!!!");
                pauseStopwatch();
                leftHandle.style.visibility = "hidden";
                rightHandle.style.visibility = "hidden";
                return;
            }


            lockHourSpots();

            let num = parseInt(hourSpot.order);

            leftHandle.style.transform = hourSpot.element.style.transform;
            rightHandle.style.transform = hourSpot.element.style.transform;

            leftHandle.style.visibility = "visible";
            rightHandle.style.visibility = "visible";

            let leftHandlePosition = moveLeft(num, hourSpot.value, game.hourCount);
            let rightHandlePosition = moveRight(num, hourSpot.value, game.hourCount);

            // console.log("NUM",num, " |newLeft:", leftHandlePosition," |newRight:", rightHandlePosition);
            let resultLeft;

            if (num > leftHandlePosition){
                //5 > 3 --> go counter clockwise
                resultLeft = `rotate(${leftHandlePosition*(360 / game.hourCount)}deg)`;
            }else {
                //1 < 7  ---> go counterclockwise
                resultLeft = `rotate(${-360 + leftHandlePosition*(360 / game.hourCount)}deg)`;
            }

            // console.log(leftHandle.style.transform);
            // console.log(resultLeft);

            leftHandle.animate([
                { transform: leftHandle.style.transform },
                { transform: resultLeft }
            ], {
                // timing options
                duration: 1000
            });
            leftHandle.style.transform = resultLeft;

            let resultRight;
            if (num < rightHandlePosition){
                resultRight = `rotate(${rightHandlePosition*(360 / game.hourCount)}deg)`;
            }else {
                resultRight = `rotate(${360 + rightHandlePosition*(360 / game.hourCount)}deg)`;
            }

            // console.log(rightHandle.style.transform);
            // console.log(resultRight);

            rightHandle.animate([
                { transform: rightHandle.style.transform },
                { transform: resultRight }
            ], {
                // timing options
                duration: 1000
            });
            rightHandle.style.transform = resultRight;


            let spotLeft = game.hourSpots["ID0" + leftHandlePosition.toString()]
            let spotRight = game.hourSpots["ID0" + rightHandlePosition.toString()]
            if (spotLeft.clicked === false) {
                spotLeft.locked = false;
                // spotLeft.element.style.background = 'red';
            }
            if (spotRight.clicked === false){
                spotRight.locked = false;
                // spotRight.element.style.background = 'blue';
                rightHandle.style.transform = `rotate(${rightHandlePosition*(360 / game.hourCount)}deg)`
            }
        })
    }
}

//CREATED ALL COMPONENTS THAT WERE NEEDED





function moveLeft(start, value, maxSize){
    let result = start - value;
    result = result < 0 ? maxSize + result : result;
    return result;
}
function moveRight(start, value, maxSize){
    let result = start + value;
    return result < maxSize ? result : result % maxSize;
}
function distance(start, finish, maxSize) {

    let oneWay = start > finish ? start - finish : finish - start;
    let otherWay = maxSize - oneWay;

    return oneWay <= otherWay ? oneWay : otherWay;
}

function lockHourSpots() {
    // console.log(game.hourSpots);
    for ( const x in game.hourSpots){
        game.hourSpots[x].locked = true;
        // game.hourSpots[x].element.style.background = 'white';
    }
}

//DFS PUZZLE SOLVER

let graph = {};

function dfsSetUp() {

    clockArray.forEach(function (item, index) {
        console.log( item, index);
        let left = moveLeft(index, item, game.hourCount);
        let right = moveRight(index, item, game.hourCount);
        if (left === right) {
            graph[index] = [left];
        } else {
            graph[index] = [left, right];
        }
    });


}

function dfs(graph, start, visit){

    let visited = [...visit];
    visited.push(start);

    // console.log(visited);
    if(visited.length === game.hourCount ){
        console.log("STOP");
        console.log(visited);
    }

    let nexG = [...graph[start]];

    visited.forEach(x => {
        let index = nexG.indexOf(x);
        if (index !== -1)
            nexG.splice(index, 1);
    })

    nexG.forEach(x => {
        dfs(graph, x, visited);
    });
}

function goDFS() {
    dfsSetUp();
    clockArray.forEach(function (item, index) {
        console.log(item,index);
      dfs(graph,index,[])
    });
}
