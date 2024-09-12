export class HelperFunctions {
    convertNumToCoords(num) {
        let arr = Array.from(String(num), Number)
        // pad if necessary
        if (arr.length < 2) {
          arr.unshift(0);
        }
        const revArr = arr.toReversed();
        return revArr;
    }
}