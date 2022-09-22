R = require("ramda");
const square = (thing) => thing * thing;

const fourthPower = R.compose(square, square);
const mapFourthPower = R.map(fourthPower);
const printFourthPower = R.compose(console.log, square, square);
R.map(printFourthPower)([2, 4, 5]);
