class Person {
  constructor(readKnowledge, andKnowledge, xorKnowledge) {
    this.read = readKnowledge;
    this.and = andKnowledge;
    this.xor = xorKnowledge;
  }
}

const binaryAwareness = {
  read(number) {
    return Number("0b" + number);
  },
  and(numberOne, numberTwo) {
    return numberOne & numberTwo;
  },
  xor(numberOne, numberTwo) {
    return numberOne ^ numberTwo;
  },
};

const binaryObliviousness = {
  read(number) {
    return number;
  },
  and(numberOne, numberTwo) {
    return "unknown";
  },
  xor(number) {
    return "unknown";
  },
};

const personOne = new Person(binaryAwareness);
const personTwo = new Person(binaryObliviousness);

[personOne, personTwo].forEach((person) => {
  console.log(person.binaryAwareness.read(10));
  console.log(person.binaryAwareness.and(2, 3));
  console.log(person.binaryAwareness.xor(2, 3));
});
