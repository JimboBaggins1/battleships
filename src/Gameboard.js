export class Gameboard {
    constructor() {
        this.shipLocations = [];
    }

    static #MAX_SHIP_LENGTH = 5;
    static #MIN_SHIP_LENGTH = 2;

    // places ships at start of game
    place(start, end) {
        // check that attempted placement is not diagonal
        if (start[0] !== end[0] && start[1] !== end[1]) {
           throw new Error('Cannot place ships diagonally');
        };

        // check that ship length is not too big or too small
        if (Math.abs(end[0] - start[0]) > Gameboard.#MAX_SHIP_LENGTH || Math.abs(end[1] - start[1]) > Gameboard.#MAX_SHIP_LENGTH) {
            throw new Error(`Ship is too long - maximum length is ${Gameboard.#MAX_SHIP_LENGTH}`);
        } else if (Math.abs(end[0] - start[0]) < Gameboard.#MIN_SHIP_LENGTH && Math.abs(end[1] - start[1]) < Gameboard.#MIN_SHIP_LENGTH) {
            throw new Error(`Ship is too short - minimum length is ${Gameboard.#MIN_SHIP_LENGTH}`);
        };

        // add ship coords to shipLocations()
        if (start[0] === end[0]) {
            if (start[1] < end[1]) {
                for (let i = start[1]; i <= end[1]; i++) {
                    this.shipLocations.push([start[0], i]);
                };
            } else if (start[1] > end[1]) {
                for (let i = start[1]; i >= end[1]; i--) {
                    this.shipLocations.push([start[0], i]);
                };
            };

        } else if (start[1] === end[1]) {
            if (start[0] < end[0]) {
                for (let i = start[0]; i <= end[0]; i++) {
                    this.shipLocations.push([i, start[1]]);
                };
            } else if (start[0] > end[0]) {
                for (let i = start[0]; i >= end[0]; i--) {
                    this.shipLocations.push([i, start[1]]);
                };
            };
        };
    }
}