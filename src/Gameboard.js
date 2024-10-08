import { Ship } from "./Ship";
export class Gameboard {
    constructor() {
        this.shipLocations = new Map();
        this.activeShips = new Set();
        this.destroyedShips = new Set();
        this.missedShots = [];
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
    place(start, length, direction = 'e') {
        let shipCoords = [];
        let ship = new Ship(length);
        this.activeShips.add(ship);
        let dist = ship.length - 1;
        switch (direction) {
            case 'e':
                for (let i = start[0]; i <= start[0] + dist; i++) {
                    shipCoords.push([i, start[1]]);
                };
                break;
            case 's':
                for (let i = start[1]; i >= start[1] - dist; i--) {
                    shipCoords.push([start[0], i]);
                };
                break;
            case 'w':
                for (let i = start[0]; i >= start[0] - dist; i--) {
                    shipCoords.push([i, start[1]]);
                };
                break;
            case 'n':
                for (let i = start[1]; i <= start[1] + dist; i++) {
                    shipCoords.push([start[0], i]);
                };
                break;
        };

        return this.shipLocations.set(ship.id, shipCoords);
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
                        if (this.allShipsSunk) console.log('Game over');
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
}