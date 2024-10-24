import "./style.css";
import { Player } from "./Player";
import { Render } from "./Render";
import { HelperFunctions } from "./HelperFunctions";

// init helper functions
const help = new HelperFunctions();

// init players
const P1 = new Player();
const COM = new Player(true);

// place ships
// P1.gameboard.place([0, 1], 2, 'e');
// P1.gameboard.place([5, 2], 2, 'n');
// P1.gameboard.place([9, 0], 3, 's');
// P1.gameboard.place([2, 5], 1, 'n');
// P1.gameboard.place([8, 4], 2, 'e');
// P1.gameboard.place([5, 6], 3, 'e');
// P1.gameboard.place([2, 7], 1, 'e');
// P1.gameboard.place([9, 7], 1, 'e');
// P1.gameboard.place([9, 9], 4, 'w');
// P1.gameboard.place([4, 4], 1, 'e');

// COM.gameboard.place([0, 1], 1, 'n');
// COM.gameboard.place([2, 1], 3, 'e');
// COM.gameboard.place([0, 3], 2, 'e');
// COM.gameboard.place([7, 3], 4, 'w');
// COM.gameboard.place([4, 5], 1, 'n');
// COM.gameboard.place([2, 6], 1, 'n');
// COM.gameboard.place([0, 7], 2, 's');
// COM.gameboard.place([8, 7], 1, 'n');
// COM.gameboard.place([2, 8], 3, 'e');
// COM.gameboard.place([6, 9], 2, 'e');

console.log(P1.gameboard.shipLocations);

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
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  ResetGame();
});

function ResetGame() {
  // reset game
  P1.resetBoard();
  COM.resetBoard();
  player1Board = new Render(P1.gameboard, COM.gameboard);
  computerBoard = new Render(COM.gameboard, P1.gameboard);
  console.log(P1.gameboard.shipLocations);

  // reset visuals
  const harbour = document.getElementById("harbour");
  const myBoard = document.getElementById("my-board");
  const comBoard = document.getElementById("enemy-board");
  harbour.innerHTML = "";
  myBoard.innerHTML = "";
  comBoard.innerHTML = "";

  player1Board.render();
  SetupGame();
}

function populateHarbour() {
  const harbour = document.getElementById("harbour");

  P1.gameboard.harbour.forEach((value, key) => {
    const ship = document.createElement("div");
    ship.setAttribute("id", key);
    ship.setAttribute("class", "ship");
    ship.setAttribute("data-size", value.length);
    ship.setAttribute("data-orientation", "vertical");
    ship.setAttribute("data-ship-id", value.id);
    ship.setAttribute("draggable", true);
    harbour.appendChild(ship);
  });
}

function SetupGame() {
  populateHarbour();
  // setup COM gameboard - hardcoded for now
  COM.gameboard.place("ship1", [7, 3], "w");
  COM.gameboard.place("ship2", [2, 8], "horizontal");
  COM.gameboard.place("ship3", [2, 1], "horizontal");
  COM.gameboard.place("ship4", [0, 3], "horizontal");
  COM.gameboard.place("ship5", [0, 7], "vertical");
  COM.gameboard.place("ship6", [6, 9], "horizontal");
  COM.gameboard.place("ship7", [4, 5], "n");
  COM.gameboard.place("ship8", [2, 6], "n");
  COM.gameboard.place("ship9", [8, 7], "n");
  COM.gameboard.place("ship10", [0, 1], "n");

  // setup player gameboard
  // drag & drop
  const draggables = document.querySelectorAll(".ship");
  const containers = document.querySelectorAll(".player-square");
  const harbour = document.getElementById("harbour");
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
      const selectedSquare = e.target.parentElement.getAttribute("id");
      draggable.classList.remove("dragging");
      // draggable.style.gridRow = 'span 4'
      console.log(draggable);
      const coords = help.convertNumToCoords(selectedSquare);
      const orientation = draggable.getAttribute("data-orientation");
      console.log(e.target.matches("#my-board *"));
      // only allow placement if position is legal
      if (
        // e.target.matches("#my-board *") &&
        !isOverflown(size, selectedSquare, orientation)
      ) {
        P1.gameboard.place(draggable.id, coords, orientation);
        draggable.style.backgroundColor = "green";
        console.log(
          document.elementFromPoint(e.clientX, e.clientY).parentElement
        );
      }
      console.log(P1.gameboard.shipLocations);
      console.log(P1.gameboard.activeShips.size);
      // enable start button if all ships have been placed
      if (P1.gameboard.activeShips.size === 10) {
        startBtn.disabled = false;
      } else {
        startBtn.disabled = true;
      }
    });

    draggable.addEventListener("click", () => {
      if (draggable.parentElement.classList.contains("square")) {
        const coords = help.convertNumToCoords(
          draggable.parentElement.getAttribute("id")
        );
        if (draggable.getAttribute("data-orientation") === "vertical") {
          draggable.setAttribute("data-orientation", "horizontal");
          // call changeOrientation()
        } else {
          draggable.setAttribute("data-orientation", "vertical");
          // call changeOrientation()
        }
        console.log(P1.gameboard.shipLocations);
        changeOrientation(
          draggable,
          coords,
          draggable.getAttribute("data-orientation")
        );
        console.log(P1.gameboard.shipLocations);
      }
    });
  });

  function changeOrientation(ship, coords, orientation) {
    console.log(`Changing orientation to ${orientation}...`);
    if (orientation === "vertical") {
      if (P1.gameboard.place(ship.id, coords, "vertical")) {
        const size = ship.getAttribute("data-size");
        // width is constant across ships (1 cell width)
        const cellSize = document.getElementById("0");
        // console.log(cellSize.getBoundingClientRect().height);
        const width = cellSize.getBoundingClientRect().width;
        const length = cellSize.getBoundingClientRect().height;
        ship.style.width = `${width - 2}px`;
        ship.style.height = `${size * length - 2}px`;
      } else {
        ship.setAttribute("data-orientation", "horizontal");
      }
    } else {
      if (P1.gameboard.place(ship.id, coords, "horizontal")) {
        const size = ship.getAttribute("data-size");
        // width is constant across ships (1 cell width)
        const cellSize = document.getElementById("0");
        // console.log(cellSize.getBoundingClientRect().height);
        const width = cellSize.getBoundingClientRect().width;
        const length = cellSize.getBoundingClientRect().height;
        ship.style.width = `${size * width - 2}px`;
        ship.style.height = `${length - 2}px`;
      } else {
        ship.setAttribute("data-orientation", "vertical");
      }
    }
  }

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      // console.log(container);
      // get the ship that is being dragged
      const draggable = document.querySelector(".dragging");
      // get the length of the ship
      const size = draggable.getAttribute("data-size");
      // width is constant across ships (1 cell width)
      const cellSize = document.getElementById("0");
      // console.log(cellSize.getBoundingClientRect().height);
      const width = cellSize.getBoundingClientRect().width;
      const length = cellSize.getBoundingClientRect().height;
      const square = container.getAttribute("id");
      const shipId = draggable.getAttribute("data-ship-id");
      const orientation = draggable.getAttribute("data-orientation");
      // draggable.style.width = `${width - 2}px`;
      // draggable.style.height = `${size * length - 2}px`;
      // draggable.style.zIndex = 1;
      draggable.style.position = "absolute";
      console.log(e);
      // draggable.style.left = `${e.target.offsetLeft}px`;
      // draggable.style.top = `${e.target.offsetTop}px`;
      // only place ship if is legal
      if (
        !isOverflown(size, square, orientation) &&
        !document
          .elementFromPoint(e.clientX, e.clientY)
          .classList.contains("ship")
      ) {
        draggable.style.backgroundColor = "green";
        container.appendChild(draggable);
      }
    });
  });

  harbour.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log(e);
    // get the ship that is being dragged
    const draggable = document.querySelector(".dragging");
    // get the length of the ship
    const size = draggable.getAttribute("data-size");
    // width is constant across ships (1 cell width)
    const cellSize = document.getElementById("0");
    // console.log(cellSize.getBoundingClientRect().height);
    const width = cellSize.getBoundingClientRect().width;
    const length = cellSize.getBoundingClientRect().height;
    draggable.style.width = `${width - 2}px`;
    draggable.style.height = `${size * length - 2}px`;
    // draggable.style.zIndex = 1;
    draggable.style.backgroundColor = "transparent";
    draggable.style.position = "static";
    // draggable.style.left = `${e.target.offsetLeft}px`;
    // draggable.style.top = `${e.target.offsetTop}px`;

    // remove ship from ship locations if it placed back in the harbour
    const ship = P1.gameboard.harbour.get(draggable.getAttribute("id"));

    if (P1.gameboard.shipLocations.has(ship.id)) {
      P1.gameboard.shipLocations.delete(ship.id);
      P1.gameboard.activeShips.delete(ship);
    }
    console.log(P1.gameboard.shipLocations);
    console.log(P1.gameboard.activeShips);
    harbour.appendChild(draggable);
  });

  // start game
  startBtn.addEventListener("click", () => {
    console.log(player1Board);
    player1Board.render();
    PlayGame();
    startBtn.disabled = true;
  });
}

function PlayGame(comPrevShot = null) {
  if (P1.gameboard.allShipsSunk() || COM.gameboard.allShipsSunk()) {
    const winner = P1.gameboard.allShipsSunk() ? "COM" : "Player 1";
    alert(`Game Over, ${winner} wins!`);
    return;
  }

  let promise = new Promise((resolve) => {
    document
      .querySelectorAll("#enemy-board > .square:not(.hit):not(.miss)")
      .forEach((square) => {
        square.addEventListener("click", (event) => {
          let id = event.target.id.split("-")[1];
          let arr = player1Board.convertNumToCoords(id);
          resolve(arr);
        });
      });
  });
  promise.then((arr) => {
    COM.gameboard.receiveAttack(arr);
    player1Board.render();
    let comTargets = [
      ...document.querySelectorAll("#my-board > .square:not(.hit):not(.miss)"),
    ];
    console.log(comPrevShot);
    let comAttackPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(comAttack(comTargets, comPrevShot));
      }, 500);
    });
    comAttackPromise.then((result) => {
      PlayGame(result);
    });
    // let prevAttack = comAttack(comTargets, comPrevShot);
    // PlayGame(prevAttack);
  });
}
SetupGame();
// PlayGame();

function comAttack(availTargets, advancedTargets) {
  let targetHit = false;
  if (advancedTargets && advancedTargets.classList.contains("active")) {
    console.log("target acquired");
    availTargets.some((target) => {
      if (parseInt(target.id) === parseInt(advancedTargets.id) - 1) {
        let targetId = target.id;
        let targetArr = computerBoard.convertNumToCoords(targetId);
        P1.gameboard.receiveAttack(targetArr);
        player1Board.render();
        targetHit = target;
        return true;
      } else if (parseInt(target.id) === parseInt(advancedTargets.id) + 1) {
        let targetId = target.id;
        let targetArr = computerBoard.convertNumToCoords(targetId);
        P1.gameboard.receiveAttack(targetArr);
        player1Board.render();
        targetHit = target;
        return true;
      } else if (parseInt(target.id) === parseInt(advancedTargets.id) - 10) {
        let targetId = target.id;
        let targetArr = computerBoard.convertNumToCoords(targetId);
        P1.gameboard.receiveAttack(targetArr);
        player1Board.render();
        targetHit = target;
        return true;
      } else if (parseInt(target.id) === parseInt(advancedTargets.id) + 10) {
        let targetId = target.id;
        let targetArr = computerBoard.convertNumToCoords(targetId);
        P1.gameboard.receiveAttack(targetArr);
        player1Board.render();
        targetHit = target;
        return true;
      }
    });
  }

  if (!targetHit) {
    targetHit = availTargets[Math.floor(Math.random() * availTargets.length)];
    let targetId = targetHit.id;
    let targetArr = computerBoard.convertNumToCoords(targetId);
    P1.gameboard.receiveAttack(targetArr);
    player1Board.render();
  }
  return targetHit;
}

// computerBoard.render();

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

function isOverflown(elementSize, selectedSquare, orientation) {
  let elementSizeNum = parseInt(elementSize) - 1;
  let selectedSquareNum = parseInt(selectedSquare);
  if (orientation === "vertical") {
    console.log(parseInt(selectedSquareNum + elementSizeNum * 10));
    return selectedSquareNum + elementSizeNum * 10 > 99;
  } else if (selectedSquareNum < 10) {
    return (
      selectedSquareNum + elementSizeNum > 9 //||
      // selectedSquareNum - elementSizeNum < 0
    );
  } else {
    let row = selectedSquare.slice(0, 1);
    let maxRow = parseInt(`${row}9`);
    let minRow = parseInt(row * 10);
    return (
      selectedSquareNum + elementSizeNum > maxRow //||
      // selectedSquareNum - elementSizeNum < minRow
    );
  }
}
