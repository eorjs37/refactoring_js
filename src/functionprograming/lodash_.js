_ = require("lodash");
const square = (thing) => thing * thing;
const mapSquares = (data) => _.map(data, square);
console.log(mapSquares([2, 4, 5]));
