/*
 템플릿 메서드 : 최소한의 변형으로 같은 목적을 수행하는 두 알고리즘이 있을때 유용
 공통메서드 부분을 상위 클래스로 옮기는것.
*/
class Person {
  log(number) {
    console.log(this.whatIs(number));
  }
}

class BinaryKnower extends Person {
  whatIs(number) {
    return Number("0b" + number);
  }
}

class BinaryOblivious extends Person {
  whatIs(number) {
    return number;
  }
}

const personOne = new BinaryKnower(); //이진법을 이해하는 사람
const personTwo = new BinaryOblivious(); //이진법을 이해못하는 사람

[personOne, personTwo].forEach((person) => {
  person.log(10);
});
