/**
 * 전략패턴 : 부모객체에 전략을 붙여 하위클래스를 제거
 */

class Person {
  constructor(whatIs) {
    this.whatIs = whatIs;
  }
  log(number) {
    console.log(this.whatIs(number));
  }
}

const binary = {
  aware(number) {
    return Number("0b" + number);
  },
  oblivious(number) {
    return number;
  },
};

const personOne = new Person(binary.aware); //이진법을 이해하는 사람
const personTwo = new Person(binary.oblivious); //이진법을 이해못하는 사람

[personOne, personTwo].forEach((person) => {
  person.log(10);
});
