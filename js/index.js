console.log("index.js loading...")


function startNewGame(){

    document.getElementById("left_hand").style.visibility = "hidden";
    document.getElementById("right_hand").style.visibility = "hidden";

    document.getElementById("dfs_solver").value = null;

    console.log("NEW GAME STARTING");
    let val = document.getElementById("gameSizeId");
    console.log(val.value);
    if (val.value > 24 || val.value < 3){
        console.log("Wrong size");
        return;
    }

    let paras = document.getElementsByClassName("hourSpot");

    while(paras[0]) {paras[0].parentNode.removeChild(paras[0]);}

    newGame(parseInt(val.value));

    stopStopwatch();
    startStopwatch();
}

function restartGame(){
    document.getElementById("left_hand").style.visibility = "hidden";
    document.getElementById("right_hand").style.visibility = "hidden";

    document.getElementById("dfs_solver").value = null;

    console.log("GAME RESTARTING");

    //DELETES all old hour spots which will be added back in gameSetUp()
    let oldHours = document.getElementsByClassName("hourSpot");
    while (oldHours[0]){
        oldHours[0].parentNode.removeChild(oldHours[0]);
    }

    gameSetUp()

    stopStopwatch();
    startStopwatch();
}

/*
document.getElementById("clock_solver").addEventListener('click',function () {
    console.log("CLICK NA SOLVER");

    document.getElementById("clock_solver").className = "grid_custom_clock_over";
});*/
