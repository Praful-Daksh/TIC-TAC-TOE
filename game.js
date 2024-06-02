var turn = true;
var buttons = document.querySelectorAll('.box');
var resett = document.querySelector(".reset");
var newGamee = document.querySelector(".new");
let clckX = new Audio("click.mp3");
let clickO = new Audio("clickk.mp3");
let win = new Audio("winb.mp3");
let res = new Audio("ree.mp3");
var isPlaying;
var winList = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function disableBoxes(){
    for (let button of buttons) {
        button.disabled = true;
    }
}
const resetGame = () => {
    res.play();
    buttons.forEach(element => {
        element.innerText=" ";
        element.disabled=false;
    });
    turn = true;
  //  enableBoxes();
}
alert('Player Vs Player Mode-- First turn - X')

buttons.forEach(element => {
    element.addEventListener("click", () => {
        if (turn) {
            clckX.play();
            console.log('X');
            element.classList.remove('color-2');
            element.classList.add('box');
            element.innerHTML = "X";
            turn = false;
        }
        else {
            clickO.play();
            console.log('O');
            element.classList.remove('box');
            element.classList.add('color-2');
            element.innerHTML = "O";
            turn = true;
        }
        element.disabled = true;
        winner();
    })
});
function winner() {
    for (let pattern of winList) {
        let pos1 = buttons[pattern[0]].innerText;
        let pos2 = buttons[pattern[1]].innerText;
        let pos3 = buttons[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                win.play();
              disableBoxes();
                alert('Hurray !!, ' + pos1 + ' Won the game');  
                isPlaying = confirm('wanna play new?');
                if(isPlaying==true){
                    resetGame();
                }
                else{
                    window.location.href ="index.html";
                }
            }
        }
    }
}

resett.addEventListener("click",resetGame);
newGamee.addEventListener("click",resetGame);