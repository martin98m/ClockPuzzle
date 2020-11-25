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