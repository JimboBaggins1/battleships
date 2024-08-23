import './style.css';
const BOARD_SIZE = 100;


// visual representation of gameboard
let myBoard = document.getElementById('my-board');
for (let i = 0; i < BOARD_SIZE; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id', i);
    myBoard.appendChild(square);
};

let enemyBoard = document.getElementById('enemy-board');
for (let i = 0; i < BOARD_SIZE; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id', i);
    enemyBoard.appendChild(square);
};