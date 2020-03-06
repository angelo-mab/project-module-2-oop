// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of \`"app"\`
const gameEngine = new Engine(document.getElementById("app"));


gameStartMenu = document.getElementById("gameStartScreen");
centerMenuPositon(gameStartMenu);

startButton = document.getElementById("startBtn");
startButton.addEventListener("click", gameStart);

gameOverMenu = document.getElementById("gameOverScreen");
centerMenuPositon(gameOverMenu);

restartButton = document.getElementById("restartBtn");
restartButton.addEventListener("click", gameRestart);
// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = event => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
    startFx.play();
  }
  // If \`event.code\` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
    startFx.play();
  }
};

function gameStart() {
  hideMenu(gameStartMenu);
  setState("PLAY");
  score = 0;
  highscore = 0;
  if(localStorage.getItem("highscore")){
    highscore = localStorage.getItem("highscore");
  }
  gameEngine.play();
}

function gameRestart() {
  document.addEventListener("keydown", keydownHandler);
  hideMenu(gameOverMenu);
  setState("PLAY");
  gameEngine.play();
}
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);
// setState("PLAY");

// We call the gameLoop method to start the game
// gameEngine.gameLoop();
gameEngine.play();

/*
game state handling
*/
setState = state => {
  gameState = state;
  showMenu(state);
};

//menu function

displayMenu = menu => {
  menu.style.visibility = "visible";
};
hideMenu = menu => {
  menu.style.visibility = "hidden";
};
showMenu = state => {
  if (state == "GAME OVER") {
    displayMenu(gameOverMenu);
  }
};


function centerMenuPositon(menu) {
  menu.style.top = GAME_HEIGHT / 2 - menu.offsetHeight / 2 + "px";
  menu.style.left = GAME_WIDTH / 2 - menu.offsetWidth / 2 + "px";
}
