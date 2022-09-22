R = require("ramda");
const square = (thing) => thing * thing;
const fourthPower = R.compose(square, square);
const mapFourthPower = R.map(fourthPower);
console.log(mapFourthPower([2, 4, 5]));
