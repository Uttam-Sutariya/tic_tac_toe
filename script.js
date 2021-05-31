const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElement = document.querySelectorAll('[deta-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.querySelector('#winningMessage');
const restartButton = document.querySelector('#restart');
let circleTurn;

startgame();
restartButton.addEventListener('click' , startgame);

function startgame(){
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click' , handleClick);
        cell.addEventListener('click' , handleClick , {once: true});
    });
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    //placeMark
    //check win
    //check draw
    //switch turn
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell , currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurn();
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })
}