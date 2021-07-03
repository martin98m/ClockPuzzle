console.log("index.js loading...")


function startNewGame(){
    console.log("NEW GAME STARTING");
    let val = document.getElementById("gameSizeId");
    console.log(val.value);

    let paras = document.getElementsByClassName("hourSpot");

    while(paras[0]) {paras[0].parentNode.removeChild(paras[0]);}

    newGame(parseInt(val.value));

    stopStopwatch();
    startStopwatch();
    dfsSetUp();
}

document.getElementById("clock_solver").addEventListener('click',function () {
    console.log("CLICK NA SOLVER");

    document.getElementById("clock_solver").className = "grid_custom_clock_over";
});
