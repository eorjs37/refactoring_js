//생성자 함수
const Secret = function () {
  this.normalInfo = "this is normal";
  const secret = "sekrit";

  const secretFunction = function () {
    return secret;
  };

  this.notSecret = function () {
    return secret;
  };

  totallyNotSecret = "I'm defined in the global scope";
};

const s = new Secret();
// console.log(s.normalInfo);
// console.log(s.secret);
// console.log(s.secretFunction());
// console.log(s.notSecret());
// console.log(s.totallyNotSecret);
// console.log(totallyNotSecret);

//팩토리 함수
var secretTemplate = (function () {
  var obj = {};
  obj.normalInfo = "this is normal";
  const secret = "sekrit";
  const secretFunction = function () {
    return secret;
  };

  obj.notSecret = function () {
    return secret;
  };

  totallyNotSecret = "I'm defined in the global scope";

  return obj;
})();

// const s1 = Object.create(secretTemplate);
// console.log(s1.normalInfo);

//모듈 패턴
var secretTemplate = (function () {
  const secret = "sekrit";
  const secretFunction = function () {
    return secret;
  };

  totallyNotSecret = "I'm defined in the global scope";

  const normalInfo = "this is normal";
  const notSecret = function () {
    return secret;
  };

  return { normalInfo, notSecret };
})();

const s3 = Object.create(secretTemplate);
console.log(s3.normalInfo);
