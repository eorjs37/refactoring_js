var secretTemplate = (function () {
  var obj = {};

  obj.normalInfo = "this is noraml";

  const secret = "sekrit";
  const secretFunction = function () {
    return secret;
  };

  (obj.notSecret = function () {
    return secret;
  }),
    (totallyNotSecret = "I'm defined in the global scope");

  return obj;
})();

const s = Object.create(secretTemplate);

console.log(s.normalInfo);
