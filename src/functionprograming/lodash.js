_ = require("lodash");
const square = (thing) => thing * thing;
const mapSquares = (data) => _.map(data, square);
console.log(mapSquares([2, 3, 4]));
console.log(_.map(square, [6, 7, 8]));
