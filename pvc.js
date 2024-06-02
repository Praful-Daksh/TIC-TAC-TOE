var Pturn = true;
var Cturn = false;
var buttons = document.querySelectorAll('.box');
var resett = document.querySelector(".reset");
var newGamee = document.querySelector(".new");
var isPlaying;
let CompTurn;
let clckX = new Audio("click.mp3");
let clickO = new Audio("clickk.mp3");
let win = new Audio("winb.mp3");
let res = new Audio("ree.mp3");
let availableSpots = [];

var winList = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

//start-------------------------------------------------------------------

alert('Player Vs Computer Mode-- First turn - Player')

buttons.forEach(element => {
  element.addEventListener("click", () => {
    if (Pturn) {
      element.innerHTML = "X";
      clckX.play();
      element.classList.remove('color-2');
      element.classList.add('box');
      Pturn = false;
      Cturn = true;
      element.disabled = true;
      winner();
      if (Cturn) {
        makeMove();
      }
    }
  });
});

// functions -------------------------------

function disableBoxes() {
  for (let button of buttons) {
    button.disabled = true;
  }
}

const resetGame = () => {
  res.play();
  buttons.forEach(element => {
    element.innerText = "";
    element.disabled = false;
  });
  Pturn = true;
  availableSpots = [];
}

const spot = () => {
  availableSpots = [];
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText == "") {
      availableSpots.push(i);
    }
  }
}

function indexRandom() {
  spot();
  if (availableSpots.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableSpots.length);
    return availableSpots[randomIndex];
  }
  return null;
}

function makeMove() {
  CompTurn = indexRandom();
  if (CompTurn !== null) {
    buttons[CompTurn].innerHTML = "O";
    buttons[CompTurn].disabled = true;
    clickO.play();
    Cturn = false;
    Pturn = true;
    winner();
  }
}

function winner() {
  for (let pattern of winList) {
    let pos1 = buttons[pattern[0]].innerText;
    let pos2 = buttons[pattern[1]].innerText;
    let pos3 = buttons[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        win.play();
        disableBoxes();
        if (pos1 == "X") {
          alert('Hurray !!, You Won the game');
        } else {
          alert('Sadly :( , Computer Won the game');
        }
        isPlaying = confirm('Wanna play new?');
        if (isPlaying !== true) {
          window.location.href = "index.html";
        } else {
          resetGame();
        }
        return; // Exit after finding a winner
      }
    }
  }
}

resett.addEventListener("click", resetGame);
newGamee.addEventListener("click", resetGame);
