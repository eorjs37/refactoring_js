R = require("ramda");

function add(numberOne, numberTwo) {
  return numberOne + numberTwo;
}

const curriedAdd = R.curry(add);

console.log(curriedAdd(1));
console.log(curriedAdd(1)(2));
console.log(curriedAdd(1, 2));

const increment = curriedAdd(1);
console.log(increment(3));

function test(addend) {
  return add(addend, 1);
}

console.log(test(3));

const squrare = (thing) => thing * thing;

console.log([2, 4, 5].map(squrare));

const mapSquares = R.map(squrare);
console.log(mapSquares([4, 5, 6]));
console.log(R.map(squrare, [7, 8, 9]));
