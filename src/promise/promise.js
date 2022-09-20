four().then(addOne).then(console.log);

function addOne(addend) {
  return Promise.resolve(addend + 1);
}

function four() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 4000);
  });
}

const test = require("tape");
const testdouble = require("testdouble");

test("out addOne function", (assert) => {
  addOne(3).then((result) => {
    assert.equal(result, 4);
    assert.end();
  });
});

test("our four function", (assert) => {
  four().then((result) => {
    assert.equal(result, 4);
    assert.end();
  });
});

// 연쇄적으로 테스트 필요할때
test("our end-to-end test", (assert) => {
  testdouble.replace(console, "log");
  four()
    .then(addOne)
    .then(console.log)
    .then(() => {
      testdouble.verify(console.log(5));
      assert.pass();
      testdouble.reset();
      assert.end();
    })
    .catch((e) => {
      testdouble.reset();
      console.log(e);
    });
});
