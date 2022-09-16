function addOne(addend) {
  console.log(addend + 1);
}

function two(callback) {
  callback(2);
}

two(addOne);
