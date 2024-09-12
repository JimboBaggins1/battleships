import './style.css';
import { Player } from './Player';
import { Render } from './Render';
import { HelperFunctions } from './HelperFunctions';



// init helper functions
const help = new HelperFunctions();

// init players
const P1 = new Player();
const COM = new Player(true);

// place ships
P1.gameboard.place([0, 1], 2, 'e');
P1.gameboard.place([5, 2], 2, 'n');
P1.gameboard.place([9, 0], 3, 's');
P1.gameboard.place([2, 5], 1, 'n');
P1.gameboard.place([8, 4], 2, 'e');
P1.gameboard.place([5, 6], 3, 'e');
P1.gameboard.place([2, 7], 1, 'e');
P1.gameboard.place([9, 7], 1, 'e');
P1.gameboard.place([9, 9], 4, 'w');
P1.gameboard.place([4, 4], 1, 'e');

COM.gameboard.place([0, 1], 1, 'n');
COM.gameboard.place([2, 1], 3, 'e');
COM.gameboard.place([0, 3], 2, 'e');
COM.gameboard.place([7, 3], 4, 'w');
COM.gameboard.place([4, 5], 1, 'n');
COM.gameboard.place([2, 6], 1, 'n');
COM.gameboard.place([0, 7], 2, 's');
COM.gameboard.place([8, 7], 1, 'n');
COM.gameboard.place([2, 8], 3, 'e');
COM.gameboard.place([6, 9], 2, 'e');








console.log(P1.gameboard.shipLocations)

let player1Board = new Render(P1.gameboard, COM.gameboard);
let computerBoard = new Render(COM.gameboard, P1.gameboard);
player1Board.render();
// P1.gameboard.receiveAttack([5, 6]);
// P1.gameboard.receiveAttack([4, 6]);
// COM.gameboard.receiveAttack([2, 8]);
// COM.gameboard.receiveAttack([6, 8]);
// player1Board.render();


let gameOver = false;
// let playerTurn = true;

        // document.addEventListener('click', (event) => {
        //     // console.log(event);
        //     // extract numerical portion of id
        //     let id = event.target.id.split('-')[1];
        //     console.log(id)
        //     while (!gameOver) {
        //         if (id && playerTurn) {
        //             let arr = player1Board.convertNumToCoords(id);
        //             COM.gameboard.receiveAttack(arr);
        //             player1Board.render();
        //             playerTurn = false;
        //         } else {
        //             P1.gameboard.receiveAttack([1, 1]);
        //             player1Board.render();
        //             playerTurn = true;
        //         }
        //     }
        // })
        
        // function playerTurn() {
        //     let promise = new Promise((resolve) => {
        //         document.addEventListener("click", (event) => {
        //         let id = event.target.id.split("-")[1];
        //         console.log(id);
        //         let arr = player1Board.convertNumToCoords(id);
        //         resolve(arr);
        //         });
        //     });
        //     promise.then(arr => {
        //         COM.gameboard.receiveAttack(arr);
        //     });
        //     return curPlayer *= -1;
        // }

        // function comTurn() {
        //     P1.gameboard.receiveAttack([1, 1]);
        // }

        // let curPlayer = 1;
        // while (!P1.gameboard.allShipsSunk() && !COM.gameboard.allShipsSunk()) {
        //     if (curPlayer === 1) {
        //         playerTurn();
        //     } else {
        //         comTurn();
        //     }
        // }

        function PlayGame(comPrevShot = null) {
            if (P1.gameboard.allShipsSunk() || COM.gameboard.allShipsSunk()) {
                const winner = P1.gameboard.allShipsSunk() ? 'COM' : 'Player 1';
                alert(`Game Over, ${winner} wins!`);
                return;
            }

            let promise = new Promise(resolve => {
                document.querySelectorAll('#enemy-board > .square:not(.hit):not(.miss)').forEach(square => {
                    square.addEventListener('click', event => {
                        let id = event.target.id.split("-")[1];
                        let arr = player1Board.convertNumToCoords(id);
                        resolve(arr);
                    });
                });
            });
            promise.then(arr => {
                COM.gameboard.receiveAttack(arr);
                player1Board.render();
                let comTargets = [...document.querySelectorAll('#my-board > .square:not(.hit):not(.miss)')];
                console.log(comPrevShot);
                let prevAttack = comAttack(comTargets, comPrevShot);
                PlayGame(prevAttack);
            });
        }

        PlayGame();

        function comAttack(availTargets, advancedTargets) {
            if (advancedTargets && advancedTargets.classList.contains('active')) {
                console.log('target acquired');
                availTargets.forEach(target => {
                    if (parseInt(target.id) === advancedTargets.id - 1) {
                        let targetId = target.id;
                        let targetArr = computerBoard.convertNumToCoords(targetId);
                        P1.gameboard.receiveAttack(targetArr);
                        player1Board.render();
                        return target;
                    }
                    if (target.id === advancedTargets.id + 1) {
                        let targetId = target.id;
                        let targetArr = computerBoard.convertNumToCoords(targetId);
                        P1.gameboard.receiveAttack(targetArr);
                        player1Board.render();
                        return target;
                    }
                    if (target.id === advancedTargets.id - 10) {
                        let targetId = target.id;
                        let targetArr = computerBoard.convertNumToCoords(targetId);
                        P1.gameboard.receiveAttack(targetArr);
                        player1Board.render();
                        return target;
                    }
                    if (target.id === advancedTargets.id + 10) {
                        let targetId = target.id;
                        let targetArr = computerBoard.convertNumToCoords(targetId);
                        P1.gameboard.receiveAttack(targetArr);
                        player1Board.render();
                        return target;
                    }
                })
            }
            let target = availTargets[Math.floor(Math.random() * availTargets.length)];
            let targetId = target.id;
            let targetArr = computerBoard.convertNumToCoords(targetId);
            P1.gameboard.receiveAttack(targetArr);
            player1Board.render();
            return target;
        }


       
// computerBoard.render();

// drag & drop
const draggables = document.querySelectorAll('.ship');
const containers = document.querySelectorAll('.player-square');
const harbour = document.getElementById('harbour');
draggables.forEach((draggable) => {
  const size = draggable.getAttribute("data-size");
  // width is constant across ships (1 cell width)
  const cellSize = document.getElementById("0");
  // console.log(cellSize.getBoundingClientRect().height);
  const width = cellSize.getBoundingClientRect().width;
  const length = cellSize.getBoundingClientRect().height;
  draggable.style.width = `${width - 2}px`;
  draggable.style.height = `${size * length - 2}px`;
  draggable.style.zIndex = 1;
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    const selectedSquare = e.target.parentElement.getAttribute('id');
    draggable.classList.remove("dragging");
    // draggable.style.gridRow = 'span 4'
    console.log(size);
    const coords = help.convertNumToCoords(selectedSquare);
    P1.gameboard.place(coords, size, 's');
    console.log(P1.gameboard.shipLocations)

  });
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        // console.log(container);
        // get the ship that is being dragged
        const draggable = document.querySelector('.dragging');
        // get the length of the ship
        const size = draggable.getAttribute('data-size');
        // width is constant across ships (1 cell width)
        const cellSize = document.getElementById('0');
        // console.log(cellSize.getBoundingClientRect().height);
        const width = cellSize.getBoundingClientRect().width;
        const length = cellSize.getBoundingClientRect().height;
        draggable.style.width = `${width - 2}px`;
        draggable.style.height = `${size * length - 2}px`;
        // draggable.style.zIndex = 1;
        draggable.style.backgroundColor = 'green';
        draggable.style.position = 'absolute';
        // draggable.style.left = `${e.target.offsetLeft}px`;
        // draggable.style.top = `${e.target.offsetTop}px`;
        if (!isOverflown(container)) {
            container.appendChild(draggable);
        }
    })
})

harbour.addEventListener('dragover', e => {
    e.preventDefault();
    // console.log(e);
    // get the ship that is being dragged
    const draggable = document.querySelector('.dragging');
    // get the length of the ship
    const size = draggable.getAttribute('data-size');
    // width is constant across ships (1 cell width)
    const cellSize = document.getElementById('0');
    // console.log(cellSize.getBoundingClientRect().height);
    const width = cellSize.getBoundingClientRect().width;
    const length = cellSize.getBoundingClientRect().height;
    draggable.style.width = `${width - 2}px`;
    draggable.style.height = `${size * length - 2}px`;
    // draggable.style.zIndex = 1;
    draggable.style.backgroundColor = 'transparent';
    draggable.style.position = 'static';
    // draggable.style.left = `${e.target.offsetLeft}px`;
    // draggable.style.top = `${e.target.offsetTop}px`;
    harbour.appendChild(draggable);
})
// const container = document.getElementById('my-board');
// container.addEventListener('dragover', e => {
//     e.preventDefault();
//     console.log(e);
//     // get the ship that is being dragged
//     const draggable = document.querySelector('.dragging');
//     // get the length of the ship
//     const size = draggable.getAttribute('data-size');
//     // width is constant across ships (1 cell width)
//     const cellSize = document.getElementById('0');
//     // console.log(cellSize.getBoundingClientRect().height);
//     const width = cellSize.getBoundingClientRect().width;
//     const length = cellSize.getBoundingClientRect().height;
//     draggable.style.width = `${width}px`;
//     draggable.style.height = `${size * length}px`;
//     draggable.style.left = `${e.target.offsetLeft}px`;
//     draggable.style.top = `${e.target.offsetTop}px`;
//     container.appendChild(draggable);
// })

function isOverflown(element) {
    // console.log(`scroll height ${element.scrollHeight}`);
    // console.log(`client height ${element.clientHeight}`);
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }