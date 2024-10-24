import { Ship } from "./Ship";
export class Gameboard {
    constructor() {
        this.shipLocations = new Map();
        this.activeShips = new Set();
        this.destroyedShips = new Set();
        this.missedShots = [];
        this.hitShots = [];
        this.shipBuilder = [['ship1', new Ship(4)], ['ship2', new Ship(3)], ['ship3', new Ship(3)], ['ship4', new Ship(2)], ['ship5', new Ship(2)], ['ship6', new Ship(2)], ['ship7', new Ship(1)], ['ship8', new Ship(1)], ['ship9', new Ship(1)], ['ship10', new Ship(1)]];
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
    place(shipElem, start, direction = 'e') {
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
              if (key !== ship.id && value.some((a) => [i, start[1]].every((v, i) => v === a[i])))
                shipOverlap = true;
            });
            if (shipOverlap) break;
            shipCoords.push([i, start[1]]);
          }
          break;
        case "n":
          for (let i = start[1]; i >= start[1] - dist; i--) {
            this.shipLocations.forEach((value, key) => {
              if (key !== ship.id && value.some((a) => [start[0], i].every((v, i) => v === a[i])))
                shipOverlap = true;
            });
            if (shipOverlap) break;
            shipCoords.push([start[0], i]);
          }
          break;
        case "w":
          for (let i = start[0]; i >= start[0] - dist; i--) {
            this.shipLocations.forEach((value, key) => {
              if (key !== ship.id && value.some((a) => [i, start[1]].every((v, i) => v === a[i])))
                shipOverlap = true;
            });
            if (shipOverlap) break;
            shipCoords.push([i, start[1]]);
          }
          break;
        case "vertical":
          for (let i = start[1]; i <= start[1] + dist; i++) {
            this.shipLocations.forEach((value, key) => {
              if (key !== ship.id && value.some((a) => [start[0], i].every((v, i) => v === a[i])))
                shipOverlap = true;
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
                };
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
                };
            });
        } else {
            this.missedShots.push(coords);
        };
    }

    allShipsSunk () {
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