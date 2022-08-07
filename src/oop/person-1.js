class Person {
  constructor(typeOfPerson) {
    this.typeOfPerson = typeOfPerson;
  }

  whatIs(number) {
    return number;
  }
  whatIsBinary(number) {
    return Number("0b" + number);
  }
  log(number) {
    if (this.typeOfPerson === "binary knower") {
      console.log(this.whatIsBinary(10));
    } else {
      console.log(this.whatIs(10));
    }
  }
}

const personOne = new Person("binary knower");
const personTwo = new Person("binary oblivious");

[personOne, personTwo].forEach((perons) => {
  perons.log(10);
});
