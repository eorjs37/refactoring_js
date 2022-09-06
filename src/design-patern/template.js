/*
 템플릿 메서드 : 최소한의 변형으로 같은 목적을 수행하는 두 알고리즘이 있을때 유용
*/
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

const personOne = new Person("binary knower"); //이진법을 이해하는 사람
const personTwo = new Person("binary oblivious"); //이진법을 이해못하는 사람

[personOne, personTwo].forEach((person) => {
  person.log(10);
});
