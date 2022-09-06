/*
 템플릿 메서드 : 최소한의 변형으로 같은 목적을 수행하는 두 알고리즘이 있을때 유용
*/
class Person {
  constructor(binaryKnower) {
    this.binaryKnower = binaryKnower;
  }
  whatIs(number) {
    return number;
  }
  whatIsBinary(number) {
    return Number("0b" + number);
  }
}

const personOne = new Person(true); //이진법을 이해하는 사람
const personTwo = new Person(false); //이진법을 이해못하는 사람

[personOne, personTwo].forEach((person) => {
  if (person.binaryKnower) {
    console.log(person.whatIsBinary(10));
  } else {
    console.log(person.whatIs(10));
  }
});
