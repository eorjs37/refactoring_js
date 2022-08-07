class Person {
  log(number) {
    console.log(this.whatIs(number));
  }
}

const personOne = new Person();
personOne.whatIs = (number) => Number("0b" + number);
const personTwo = new Person();
personTwo.whatIs = (number) => number;

[personOne, personTwo].forEach((person) => {
  person.log(10);
});
