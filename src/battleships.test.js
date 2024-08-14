import { Ship } from "./Ship";
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
