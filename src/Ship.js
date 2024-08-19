import { v4 as uuidv4 } from 'uuid';
export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.id = uuidv4();
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
};