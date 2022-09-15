const http = require("http");

const testDouble = require("testdouble");

const getBody = {
  bodyArray: [],
  saveBody: function (chunk) {
    this.bodyArray.push(chunk);
  },
  printBody: function () {
    console.log(this.bodyArray.join(""));
    this.allDone();
  },
  getResults: function (result) {
    result.on("data", this.saveBody.bind(this));
    result.on("end", this.printBody.bind(this));
  },
  allDone: function () {},
};

function setup() {
  return Object.create(getBody);
}

function teardown() {
  getBody.allDone = function () {};
}

const test = require("tape");

test("out async routine", function (assert) {
  const newBody = setup();
  newBody.allDone = testDouble.function();

  testDouble.when(newBody.allDone()).thenDo(function () {
    assert.notEqual(newBody.bodyArray.length, 0);
    assert.end();
  });

  http.get("http://www.navercloudcorp.com/", getBody.getResults.bind(newBody));
});

test("our async routine two", function (assert) {
  setup();
  getBody.bodyArray = [];
  getBody.allDone = function () {};
  http.get("http://www.navercloudcorp.com/", getBody.getResults.bind(getBody));
  assert.equal(getBody.bodyArray.length, 0);
  teardown();
  assert.end();
});
