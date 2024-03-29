const { create, env } = require("sanctuary");
const S = create({ checkTypes: false, env: env });
const R = require("ramda");
class Person {
  constructor(name) {
    this.name = S.maybeToEither("", S.toMaybe(name));
  }
}

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
const tigerify = (string) => `${string}, the tiger`;

const capitalTiger = S.compose(capitalize, tigerify);

const test = require("tape");

test("Diaplaying a person", (assert) => {
  const personOne = new Person("tony");
  assert.equal(S.either(R.identity, capitalTiger, personOne.name), "Tony, the tiger");
  assert.equal(S.either(R.identity, capitalTiger, personOne.name), "");
  assert.end();
});

test("Diaplaying an anonymous person", (assert) => {
  const personTwo = new Person(null);
  assert.equal(S.maybe("", capitalTiger, personTwo.name), "");
  assert.end();
});
