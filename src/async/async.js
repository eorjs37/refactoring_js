const http = require("http");

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

//http.get("http://www.navercloudcorp.com/", getBody.getResults.bind(getBody));

const test = require("tape");

test("out async routine", function (assert) {
  getBody.allDone = function () {
    assert.notEqual(getBody.bodyArray.length, 0);
    assert.end();
  };

  http.get("http://www.navercloudcorp.com/", getBody.getResults.bind(getBody));
});

test("our async routine two", function (assert) {
  getBody.bodyArray = [];
  getBody.allDone = function () {};
  http.get("http://www.navercloudcorp.com/", getBody.getResults.bind(getBody));
  assert.equal(getBody.bodyArray.length, 0);
  assert.end();
});
