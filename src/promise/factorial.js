const lookupTable = {};

function memoizedFactorial(number) {
  if (number in lookupTable) {
    console.log("cached");
    return lookupTable[number];
  } else {
    console.log("calculationg");
    var reduceValue;

    if (number < 2) {
      reduceValue = 1;
    } else {
      reduceValue = number * memoizedFactorial(number - 1);
    }

    lookupTable[number] = reduceValue;
    return reduceValue;
  }
}

console.log(memoizedFactorial(10));
console.log(memoizedFactorial(10));
console.log(memoizedFactorial(11));
