// Test
var neo = require("neopixel");
let pin = NodeMCU.D4;

const RED = new Uint8ClampedArray([0, 255, 0]);
const BLUE = new Uint8ClampedArray([0, 0, 255]);

const RC = 10; //LED_ROW_COUNT
const CC = 22; //LED_COL_COUNT
const LED_COUNT = RC * CC;
const GRB = 3; //LED COLOR COMPONENTS Count GRB

// Coe's P8
const pattern1 = [
    [0, 0, 49152, 49152, 6144, 3072, 4608, 608, 2656, 0], // This is messed up. first squre needs to move one block left
    [0, 0, 49152, 56320, 1024, 2560, 864, 1120, 0, 0],
    [0, 0, 50176, 50688, 2304, 384, 496, 368, 0, 0],
    [0, 0, 50688, 52736, 1408, 544, 528, 272, 32, 0],
    [0, 0, 54272, 53248, 4608, 3072, 1632, 96, 0, 0],
    //    [0, 0, 51712, 51200, 2304, 1536, 816, 304, 0, 0],
    [0, 0, 50176, 55296, 2560, 1024, 1840, 48, 0, 0],
    [0, 0, 118784, 126976, 12288, 4608, 3168, 1120, 0, 0],
    // [0, 0, 59392, 63488, 6656, 2304, 1584, 560, 0, 0],
    [0, 16384, 34816, 33792, 17408, 6656, 1840, 1584, 0, 0],
];

const pattern1Crap = [
    [0, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [0, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [0, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [0, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [120, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [99, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [499, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
    [0, 0, 0, 0, 2048, 7168, 7168, 0, 0, 0],
    [0, 0, 0, 7168, 0, 5120, 2048, 0, 0, 0],
    [0, 0, 2048, 2048, 5120, 2048, 2048, 0, 0, 0],
    [0, 0, 0, 7168, 5120, 7168, 0, 0, 0, 0],
];

function rand(max) {
    return Math.floor(Math.random() * max);
}

function convertToBitmap(rowPattern) {
    var shouldReverse = false;
    var expandedArr = [];

    // Rebuild the array back : This will run on the ESP.. ?? Input should be the transformed array.
    rowPattern.forEach((value) => {
        // Each Array needs be processes for number of bits
        if (value === 0) { // Empty Rows. return right away.
            // Tag the array as empty, so it can be skipped for other processing downstream.
            expandedArr.push([]);
            return 
        } 

        var tempArr = [];
        Array(CC)
            .fill()
            .map(Math.random)
            .forEach((_, idx) => {
                var mask = 1 << idx;
                if (value & mask) {
                    tempArr.push(1);
                } else {
                    tempArr.push(0);
                }
            });
        expandedArr.push(tempArr);
    });

    var finalArr = [];
    while (expandedArr.length > 0) {
        const arr = expandedArr.splice(-1)[0];
        let curr = [];
        if (arr.isEmpty) {
            curr= Array(CC).fill().map(0)
        } else {
            curr= shouldReverse ? arr.reverse() : arr;
        }

        finalArr.push(curr);
        shouldReverse = !shouldReverse;
    }

    let flatArr = [];
    finalArr.forEach((arr,idx) => {
        arr.reverse().forEach((elem) => {
            flatArr.push(elem);
        });
    });
    return flatArr;
}

// Here we processed all the array and stored them, but thats no use, you will run into the memory issue again.
//let printArr = pattern1.map((rowPattern) => convertToBitmap(rowPattern));

var curr = 0;
setInterval(() => {
    //var currArr = printArr[curr];
    var currArr = convertToBitmap(pattern1[curr]);
    let newArr = new Uint8ClampedArray(LED_COUNT * GRB);
    //let randColor = curr === 0 ? BLUE : RED;
    currArr.forEach((elem, idx) => {
        if (elem === 1) {
            newArr.set([rand(200),rand(200),rand(200)], idx * GRB);
        }
    });

    neo.write(pin, newArr);
    curr++;
    if (curr === pattern1.length) {
        curr = 0;
    }
}, 700); // Dont get too aggressive with the time. The code is not able to keep up. Optimize it man.
