"use strict";
(self["webpackChunkbattleships"] = self["webpackChunkbattleships"] || []).push([["main"],{

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");

class Gameboard {
  constructor() {
    this.shipLocations = new Map();
    this.activeShips = new Set();
    this.destroyedShips = new Set();
    this.missedShots = [];
    this.hitShots = [];
    this.shipBuilder = [['ship1', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4)], ['ship2', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3)], ['ship3', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3)], ['ship4', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2)], ['ship5', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2)], ['ship6', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2)], ['ship7', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1)], ['ship8', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1)], ['ship9', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1)], ['ship10', new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(1)]];
    this.harbour = new Map(this.shipBuilder);
  }

  // static #MAX_SHIP_LENGTH = 5;
  // static #MIN_SHIP_LENGTH = 2;
  // static #isValidPlacement(start, end) {
  //         // check that attempted placement is not diagonal
  //         if (start[0] !== end[0] && start[1] !== end[1]) {
  //             throw new Error('Cannot place ships diagonally');
  //         };

  //         // check that ship length is not too big or too small
  //         if (Math.abs(end[0] - start[0]) > Gameboard.#MAX_SHIP_LENGTH || Math.abs(end[1] - start[1]) > Gameboard.#MAX_SHIP_LENGTH) {
  //             throw new Error(`Ship is too long - maximum length is ${Gameboard.#MAX_SHIP_LENGTH}`);
  //         } else if (Math.abs(end[0] - start[0]) < Gameboard.#MIN_SHIP_LENGTH && Math.abs(end[1] - start[1]) < Gameboard.#MIN_SHIP_LENGTH) {
  //             throw new Error(`Ship is too short - minimum length is ${Gameboard.#MIN_SHIP_LENGTH}`);
  //         };

  //         return true;
  // };

  // static #populateShipLocations(start, end) {
  //     let arr = [];
  //     // add ship coords to shipLocations()
  //     if (start[0] === end[0]) {
  //         if (start[1] < end[1]) {
  //             for (let i = start[1]; i <= end[1]; i++) {
  //                 arr.push([start[0], i]);
  //             };
  //         } else if (start[1] > end[1]) {
  //             for (let i = start[1]; i >= end[1]; i--) {
  //                 arr.push([start[0], i]);
  //             };
  //         };

  //     } else if (start[1] === end[1]) {
  //         if (start[0] < end[0]) {
  //             for (let i = start[0]; i <= end[0]; i++) {
  //                 arr.push([i, start[1]]);
  //             };
  //         } else if (start[0] > end[0]) {
  //             for (let i = start[0]; i >= end[0]; i--) {
  //                 arr.push([i, start[1]]);
  //             };
  //         };
  //     };

  //     return arr;
  // };
  // places ships at start of game
  // place(start, end) {
  //     // check if placement is valid - if so, place ship, else handle error
  //     let validPlacement = Gameboard.#isValidPlacement(start, end);

  //     // update battleship positions
  //     if (validPlacement) {
  //         this.shipLocations.push(...Gameboard.#populateShipLocations(start, end));
  //     };
  // }

  // places ships at start of game
  place(shipElem, start) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'e';
    // console.log(this.harbour);
    let shipCoords = [];
    let shipOverlap = false;
    // let ship = new Ship(length);
    // get ship
    const ship = this.harbour.get(shipElem);
    let dist = ship.length - 1;
    switch (direction) {
      case "horizontal":
        for (let i = start[0]; i <= start[0] + dist; i++) {
          this.shipLocations.forEach((value, key) => {
            if (key !== ship.id && value.some(a => [i, start[1]].every((v, i) => v === a[i]))) shipOverlap = true;
          });
          if (shipOverlap) break;
          shipCoords.push([i, start[1]]);
        }
        break;
      case "n":
        for (let i = start[1]; i >= start[1] - dist; i--) {
          this.shipLocations.forEach((value, key) => {
            if (key !== ship.id && value.some(a => [start[0], i].every((v, i) => v === a[i]))) shipOverlap = true;
          });
          if (shipOverlap) break;
          shipCoords.push([start[0], i]);
        }
        break;
      case "w":
        for (let i = start[0]; i >= start[0] - dist; i--) {
          this.shipLocations.forEach((value, key) => {
            if (key !== ship.id && value.some(a => [i, start[1]].every((v, i) => v === a[i]))) shipOverlap = true;
          });
          if (shipOverlap) break;
          shipCoords.push([i, start[1]]);
        }
        break;
      case "vertical":
        for (let i = start[1]; i <= start[1] + dist; i++) {
          this.shipLocations.forEach((value, key) => {
            if (key !== ship.id && value.some(a => [start[0], i].every((v, i) => v === a[i]))) shipOverlap = true;
          });
          if (shipOverlap) break;
          shipCoords.push([start[0], i]);
        }
        break;
    }

    // check if ships overlap
    if (shipOverlap || shipCoords.flat().some(a => a > 9)) {
      // direction === 'e' ? this.place(shipElem, start, 's') : this.place(shipElem, start, 'e');
      return null;
    } else {
      // check if player is relocating ship that is already on the board
      if (this.shipLocations.has(ship.id)) this.shipLocations.delete(ship.id);
      this.activeShips.add(ship);
      return this.shipLocations.set(ship.id, shipCoords);
    }
  }

  // receives attack and checks if ship has been hit
  receiveAttack(coords) {
    let isHit = false;
    let hitShipId = null;
    // loop through shipLocations to see if ship has been hit
    this.shipLocations.forEach((value, key) => {
      value.forEach(subArr => {
        if (subArr.length === coords.length && subArr.every((elem, index) => elem === coords[index])) {
          isHit = true;
          hitShipId = key;
          this.hitShots.push(coords);
        }
        ;
      });
    });
    if (isHit) {
      this.activeShips.forEach(ship => {
        if (ship.id === hitShipId) {
          ship.hit();
          if (ship.isSunk()) {
            this.destroyedShips.add(ship);
            this.activeShips.delete(ship);
            if (this.allShipsSunk()) console.log('Game over');
          }
        }
        ;
      });
    } else {
      this.missedShots.push(coords);
    }
    ;
  }
  allShipsSunk() {
    return this.activeShips.size === 0;
  }
  getShipId(shipKey) {
    const ship = this.harbour.get(shipKey);
    if (this.shipLocations.has(ship.id)) {
      return ship.id;
    } else {
      return null;
    }
  }
}

/***/ }),

/***/ "./src/HelperFunctions.js":
/*!********************************!*\
  !*** ./src/HelperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelperFunctions: () => (/* binding */ HelperFunctions)
/* harmony export */ });
class HelperFunctions {
  convertNumToCoords(num) {
    let arr = Array.from(String(num), Number);
    // pad if necessary
    if (arr.length < 2) {
      arr.unshift(0);
    }
    const revArr = arr.toReversed();
    return revArr;
  }
}

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

class Player {
  constructor() {
    let isComputer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.isComputer = isComputer;
    this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  }
  resetBoard() {
    this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  }
}

/***/ }),

/***/ "./src/Render.js":
/*!***********************!*\
  !*** ./src/Render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Render: () => (/* binding */ Render)
/* harmony export */ });
class Render {
  constructor(board, enemyBoard) {
    this.shipPlacements = board.shipLocations;
    this.hitShots = board.hitShots;
    this.missedShots = board.missedShots;
    this.successfulAttacks = enemyBoard.hitShots;
    this.missedAttacks = enemyBoard.missedShots;
  }
  static #BOARD_SIZE = 100;

  // helper func to convert coords received from gameboard to a num 0 - 99 to be used in DOM
  convertCoordsToNum(arr) {
    const revArr = arr.toReversed();
    const str = revArr.join('');
    return parseInt(str);
  }
  convertNumToCoords(num) {
    let arr = Array.from(String(num), Number);
    // pad if necessary
    if (arr.length < 2) {
      arr.unshift(0);
    }
    const revArr = arr.toReversed();
    return revArr;
  }

  // returns all ship locations as num 0 - 99
  getAllShipLocations() {
    let locations = [];
    this.shipPlacements.forEach((value, key) => {
      value.forEach(coord => {
        let num = this.convertCoordsToNum(coord);
        locations.push(num);
      });
    });
    return locations;
  }
  getAllHitLocations() {
    let locations = [];
    this.hitShots.forEach(coord => {
      let num = this.convertCoordsToNum(coord);
      locations.push(num);
    });
    return locations;
  }
  getAllMissLocations() {
    let locations = [];
    this.missedShots.forEach(coord => {
      let num = this.convertCoordsToNum(coord);
      locations.push(num);
    });
    return locations;
  }
  getEnemyHitLocations() {
    let locations = [];
    this.successfulAttacks.forEach(coord => {
      let num = this.convertCoordsToNum(coord);
      locations.push(num);
    });
    return locations;
  }
  getEnemyMissLocations() {
    let locations = [];
    this.missedAttacks.forEach(coord => {
      let num = this.convertCoordsToNum(coord);
      locations.push(num);
    });
    return locations;
  }
  renderPlayerBoard() {
    // visual representation of gameboard
    let myBoard = document.getElementById('my-board');
    for (let i = 0; i < Render.#BOARD_SIZE; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.classList.add('player-square');
      square.setAttribute('id', i);
      myBoard.appendChild(square);
    }
    ;
  }
  renderEnemyBoard() {
    let enemyBoard = document.getElementById('enemy-board');
    for (let i = 0; i < Render.#BOARD_SIZE; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('id', `enemy-${i}`);
      enemyBoard.appendChild(square);
    }
    ;
  }

  // add active class to ship locations
  render() {
    document.getElementById('my-board').innerHTML = '';
    document.getElementById('enemy-board').innerHTML = '';
    this.renderPlayerBoard();
    this.renderEnemyBoard();
    this.getAllShipLocations().forEach(id => {
      let square = document.getElementById(id);
      square.classList.add('active');
    });
    if (this.hitShots.length > 0) {
      this.getAllHitLocations().forEach(hit => {
        let square = document.getElementById(hit);
        square.classList.add('hit');
      });
    }

    // render missed shots
    if (this.missedShots.length > 0) {
      this.getAllMissLocations().forEach(miss => {
        let square = document.getElementById(miss);
        square.classList.add('miss');
      });
    }
    if (this.successfulAttacks.length > 0) {
      this.getEnemyHitLocations().forEach(hit => {
        let square = document.getElementById(`enemy-${hit}`);
        square.classList.add('hit');
      });
    }
    if (this.missedAttacks.length > 0) {
      this.getEnemyMissLocations().forEach(miss => {
        let square = document.getElementById(`enemy-${miss}`);
        if (!square.classList.contains('miss')) {
          // console.log('This square doesn\'t have a \'miss\' class')
          square.classList.add('miss');
        }
      });
    }
  }
}

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.hits >= this.length;
  }
}
;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Render */ "./src/Render.js");
/* harmony import */ var _HelperFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HelperFunctions */ "./src/HelperFunctions.js");





// init helper functions
const help = new _HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.HelperFunctions();

// init players
const P1 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player();
const COM = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(true);

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
let player1Board = new _Render__WEBPACK_IMPORTED_MODULE_2__.Render(P1.gameboard, COM.gameboard);
let computerBoard = new _Render__WEBPACK_IMPORTED_MODULE_2__.Render(COM.gameboard, P1.gameboard);
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
  player1Board = new _Render__WEBPACK_IMPORTED_MODULE_2__.Render(P1.gameboard, COM.gameboard);
  computerBoard = new _Render__WEBPACK_IMPORTED_MODULE_2__.Render(COM.gameboard, P1.gameboard);
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
  draggables.forEach(draggable => {
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
    draggable.addEventListener("dragend", e => {
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
      !isOverflown(size, selectedSquare, orientation)) {
        P1.gameboard.place(draggable.id, coords, orientation);
        draggable.style.backgroundColor = "green";
        console.log(document.elementFromPoint(e.clientX, e.clientY).parentElement);
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
        const coords = help.convertNumToCoords(draggable.parentElement.getAttribute("id"));
        if (draggable.getAttribute("data-orientation") === "vertical") {
          draggable.setAttribute("data-orientation", "horizontal");
          // call changeOrientation()
        } else {
          draggable.setAttribute("data-orientation", "vertical");
          // call changeOrientation()
        }
        console.log(P1.gameboard.shipLocations);
        changeOrientation(draggable, coords, draggable.getAttribute("data-orientation"));
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
  containers.forEach(container => {
    container.addEventListener("dragover", e => {
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
      if (!isOverflown(size, square, orientation) && !document.elementFromPoint(e.clientX, e.clientY).classList.contains("ship")) {
        draggable.style.backgroundColor = "green";
        container.appendChild(draggable);
      }
    });
  });
  harbour.addEventListener("dragover", e => {
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
function PlayGame() {
  let comPrevShot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (P1.gameboard.allShipsSunk() || COM.gameboard.allShipsSunk()) {
    const winner = P1.gameboard.allShipsSunk() ? "COM" : "Player 1";
    alert(`Game Over, ${winner} wins!`);
    return;
  }
  let promise = new Promise(resolve => {
    document.querySelectorAll("#enemy-board > .square:not(.hit):not(.miss)").forEach(square => {
      square.addEventListener("click", event => {
        let id = event.target.id.split("-")[1];
        let arr = player1Board.convertNumToCoords(id);
        resolve(arr);
      });
    });
  });
  promise.then(arr => {
    COM.gameboard.receiveAttack(arr);
    player1Board.render();
    let comTargets = [...document.querySelectorAll("#my-board > .square:not(.hit):not(.miss)")];
    console.log(comPrevShot);
    let comAttackPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve(comAttack(comTargets, comPrevShot));
      }, 500);
    });
    comAttackPromise.then(result => {
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
    availTargets.some(target => {
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
    return selectedSquareNum + elementSizeNum > 9 //||
    // selectedSquareNum - elementSizeNum < 0
    ;
  } else {
    let row = selectedSquare.slice(0, 1);
    let maxRow = parseInt(`${row}9`);
    let minRow = parseInt(row * 10);
    return selectedSquareNum + elementSizeNum > maxRow //||
    // selectedSquareNum - elementSizeNum < minRow
    ;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    box-sizing: border-box;
}
.container {
    display: grid;
    grid-template-columns: 2fr 3fr 3fr;
    grid-template-rows: 4fr 1fr
}

.cursorDisabled {
    cursor: not-allowed;
}
.buttons {
    grid-column: 3 / 4;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
#start-btn, #reset-btn {
    height: 50px;
    width: 200px;
    margin: 20px;
}

#start-btn { grid-column: 1 / 2; }
#reset-btn { grid-column: 2 / 3; }

#my-board, #enemy-board {
    display: inline-grid;
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
    height: 70vh;
    width: 35vw;
    padding: 20px;
}
#harbour { 
    /* display: none; */
    height: 70vh;
    width: 25vw;
    padding: 20px;
}
.square {
    border: 1px solid black;
    background-color: #e5e7eb;
    position: relative;
}

.active {
    background-color: green;
}

.hit {
    background-color: red !important;
}

.miss {
    background-color: blue;
}

.ship {
    border: 2px solid black;
    display: inline-block;
    /* position: absolute; */
}

#ship1 {
    height: calc(65px * 4);
    width: 25px;
    /* grid-area: 4 / 1 / 8 / 2; */
}

#ship2 {
    height: calc(65px * 3);
    width: 25px;
    /* grid-area: 2 / 3 / 5 / 4; */
}

#ship3 {
    height: calc(65px * 3);
    width: 25px;

    /* grid-area: 4 / 5 / 7 / 6; */
}

#ship4 {
    height: calc(65px * 2);
    width: 25px;

    /* grid-area: 3 / 7 / 4 / 8; */
}

#ship5 {
    height: calc(65px * 2);
    width: 25px;

    /* grid-area: 5 / 9 / 6 / 10; */
}

#ship6 {
    height: calc(65px * 2);
    width: 25px;

    /* grid-area: 6 / 3 / 8 / 4; */
}

#ship7 {
    height: calc(65px * 1);
    width: 25px;

    /* grid-area: 6 / 7 / 8 / 8; */
}

#ship8 {
    height: calc(65px * 1);
    width: 25px;

    /* grid-area: 8 / 5 / 10 / 6; */
}

#ship9 {
    height: calc(65px * 1);
    width: 25px;

    /* grid-area: 7 / 9 / 8 / 10; */
}

#ship10 {
    height: calc(65px * 1);
    width: 25px;

    /* grid-area: 9 / 9 / 10 / 10; */
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;AAC1B;AACA;IACI,aAAa;IACb,kCAAkC;IAClC;AACJ;;AAEA;IACI,mBAAmB;AACvB;AACA;IACI,kBAAkB;IAClB,aAAa;IACb,8BAA8B;AAClC;AACA;IACI,YAAY;IACZ,YAAY;IACZ,YAAY;AAChB;;AAEA,aAAa,kBAAkB,EAAE;AACjC,aAAa,kBAAkB,EAAE;;AAEjC;IACI,oBAAoB;IACpB,mCAAmC;IACnC,sCAAsC;IACtC,YAAY;IACZ,WAAW;IACX,aAAa;AACjB;AACA;IACI,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,aAAa;AACjB;AACA;IACI,uBAAuB;IACvB,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,qBAAqB;IACrB,wBAAwB;AAC5B;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,+BAA+B;AACnC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,+BAA+B;AACnC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,+BAA+B;AACnC;;AAEA;IACI,sBAAsB;IACtB,WAAW;;IAEX,gCAAgC;AACpC","sourcesContent":["* {\r\n    box-sizing: border-box;\r\n}\r\n.container {\r\n    display: grid;\r\n    grid-template-columns: 2fr 3fr 3fr;\r\n    grid-template-rows: 4fr 1fr\r\n}\r\n\r\n.cursorDisabled {\r\n    cursor: not-allowed;\r\n}\r\n.buttons {\r\n    grid-column: 3 / 4;\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n}\r\n#start-btn, #reset-btn {\r\n    height: 50px;\r\n    width: 200px;\r\n    margin: 20px;\r\n}\r\n\r\n#start-btn { grid-column: 1 / 2; }\r\n#reset-btn { grid-column: 2 / 3; }\r\n\r\n#my-board, #enemy-board {\r\n    display: inline-grid;\r\n    grid-template-rows: repeat(10, 1fr);\r\n    grid-template-columns: repeat(10, 1fr);\r\n    height: 70vh;\r\n    width: 35vw;\r\n    padding: 20px;\r\n}\r\n#harbour { \r\n    /* display: none; */\r\n    height: 70vh;\r\n    width: 25vw;\r\n    padding: 20px;\r\n}\r\n.square {\r\n    border: 1px solid black;\r\n    background-color: #e5e7eb;\r\n    position: relative;\r\n}\r\n\r\n.active {\r\n    background-color: green;\r\n}\r\n\r\n.hit {\r\n    background-color: red !important;\r\n}\r\n\r\n.miss {\r\n    background-color: blue;\r\n}\r\n\r\n.ship {\r\n    border: 2px solid black;\r\n    display: inline-block;\r\n    /* position: absolute; */\r\n}\r\n\r\n#ship1 {\r\n    height: calc(65px * 4);\r\n    width: 25px;\r\n    /* grid-area: 4 / 1 / 8 / 2; */\r\n}\r\n\r\n#ship2 {\r\n    height: calc(65px * 3);\r\n    width: 25px;\r\n    /* grid-area: 2 / 3 / 5 / 4; */\r\n}\r\n\r\n#ship3 {\r\n    height: calc(65px * 3);\r\n    width: 25px;\r\n\r\n    /* grid-area: 4 / 5 / 7 / 6; */\r\n}\r\n\r\n#ship4 {\r\n    height: calc(65px * 2);\r\n    width: 25px;\r\n\r\n    /* grid-area: 3 / 7 / 4 / 8; */\r\n}\r\n\r\n#ship5 {\r\n    height: calc(65px * 2);\r\n    width: 25px;\r\n\r\n    /* grid-area: 5 / 9 / 6 / 10; */\r\n}\r\n\r\n#ship6 {\r\n    height: calc(65px * 2);\r\n    width: 25px;\r\n\r\n    /* grid-area: 6 / 3 / 8 / 4; */\r\n}\r\n\r\n#ship7 {\r\n    height: calc(65px * 1);\r\n    width: 25px;\r\n\r\n    /* grid-area: 6 / 7 / 8 / 8; */\r\n}\r\n\r\n#ship8 {\r\n    height: calc(65px * 1);\r\n    width: 25px;\r\n\r\n    /* grid-area: 8 / 5 / 10 / 6; */\r\n}\r\n\r\n#ship9 {\r\n    height: calc(65px * 1);\r\n    width: 25px;\r\n\r\n    /* grid-area: 7 / 9 / 8 / 10; */\r\n}\r\n\r\n#ship10 {\r\n    height: calc(65px * 1);\r\n    width: 25px;\r\n\r\n    /* grid-area: 9 / 9 / 10 / 10; */\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  var uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");

function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=main.bundle.js.map