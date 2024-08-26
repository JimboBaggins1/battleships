export class Render {
    constructor(shipPlacements) {
        this.shipPlacements = shipPlacements;
    }

    // helper func to convert coords received from gameboard to a num 0 - 99 to be used in DOM
    convertCoordsToNum(arr) {
        const revArr = arr.reverse();
        const str = revArr.join('');
        return parseInt(str);
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

    // add active class to ship locations
    makeActive() {
        this.getAllShipLocations().forEach(id => {
            let square = document.getElementById(id);
            square.classList.add('active');
        });
    }
}