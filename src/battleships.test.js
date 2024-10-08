import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

// SHIP TESTS
test('Ship class - length test', () => {
    const testShip = new Ship(3);
    expect(testShip.length).toBe(3);
});

test('Ship class - length test 2', () => {
    const testShip = new Ship(5);
    expect(testShip.length).toBe(5);
});

test('Ship class - starting hits', () => {
    const testShip = new Ship(2);
    expect(testShip.hits).toBe(0);
});

test('Ship class - ship has been hit', () => {
    const testShip = new Ship(3);
    testShip.hit();
    expect(testShip.hits).toBe(1);
});

test('Ship class - ship has been sunk', () => {
    const testShip = new Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});


// GAMEBOARD TESTS
test('Gameboard class - place ship', () => {
    const board = new Gameboard();
    board.place([1, 1], 3, 'n');
    board.place([3, 0], 4, 'w');
    board.place([4, 4], 2, 's');
    board.place([3, 7], 5, 'e');
    console.log(board.shipLocations);
    const idRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    board.shipLocations.forEach((value, key) => {
        expect(value).not.toBeNull();
        expect(key).toMatch(idRegex);
    });
});

// test('Gameboard class - reject diagonal', () => {
//     const board = new Gameboard();
//     expect(() => board.place([0, 0], [2, 2])).toThrow(Error);
// });

// test('Gameboard class - reject too short or too long', () => {
//     const board = new Gameboard();
//     expect(() => board.place([0, 0], [0, 6])).toThrow(Error);
//     expect(() => board.place([0, 0], [1, 0])).toThrow(Error);
// });
test('Ship class - each ship has unique id', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    console.log(ship1.id);
    console.log(ship2.id);
    expect(ship1.id).not.toBeNull();
    expect(ship2.id).not.toBeNull();
    expect(ship2.id).not.toEqual(ship1.id);
});

test('Gameboard class - receive attack', () => {
    const board = new Gameboard();
    board.place([0, 0], 3, 'n');
    let ship = board.activeShips.keys().next().value;
    board.receiveAttack([0, 1]);
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
});

test('Gameboard class - sink ship', () => {
    const board = new Gameboard();
    board.place([0, 0], 2, 'n');
    let ship = board.activeShips.keys().next().value;
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 0]);
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(true);
});

test('Gameboard class - missed shots', () => {
    const board = new Gameboard();
    board.place([0, 0], 2, 'n');
    board.receiveAttack([1, 1]);
    board.receiveAttack([1, 0]);
    expect(board.missedShots).toEqual([[1, 1], [1, 0]]);
});

test('Gameboard class - all ships sunk', () => {
    const board = new Gameboard();
    board.place([0, 0], 2, 'n');
    board.place([6, 5], 3, 's');
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([6, 5]);
    board.receiveAttack([6, 4]);
    board.receiveAttack([6, 3]);
    board.destroyedShips.forEach(ship => {
        expect(ship.isSunk()).toBe(true);
    });
    expect(board.activeShips.length).toBeUndefined();
});