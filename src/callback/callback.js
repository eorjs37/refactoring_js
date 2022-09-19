const test = require("tape");
const testDouble = require("testdouble");
function addOne(addend, callback) {
  callback(addend + 1);
}

function two(callback) {
  callback(2);
}

function three(callback) {
  setTimeout(() => {
    callback(3, console.log);
  }, 500);
}

function addOneSync(addend) {
  return addend + 1;
}

three(addOne);

test("our addOne function", (assert) => {
  addOne(3, (result) => {
    assert.equal(result, 4);
    assert.end();
  });
});

test("out addOneSync function", (assert) => {
  assert.equal(addOneSync(3), 4);
  assert.end();
});

test("our three function", (assert) => {
  three((result, callback) => {
    assert.equal(result, 3);
    assert.equal(callback, console.log);
    assert.end();
  });
});

test("out end-to-end test", (assert) => {
  testDouble.replace(console, "log");
  three((result, callback) => {
    addOne(result, callback);
    testDouble.verify(console.log(4));
    testDouble.reset();
    assert.end();
  });
});
