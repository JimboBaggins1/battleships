export class Render {
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
        let arr = Array.from(String(num), Number)
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
        };
    }

    renderEnemyBoard() {
        let enemyBoard = document.getElementById('enemy-board');
        for (let i = 0; i < Render.#BOARD_SIZE; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `enemy-${i}`);
            enemyBoard.appendChild(square);
        };
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