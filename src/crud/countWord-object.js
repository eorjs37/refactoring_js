//리터럴 객체
const word = {
  count() {
    return this.word.length;
  },

  lookUp() {
    return this.lookUpUrl + this.word;
  },
};

//상속
const koreaWord = Object.assign(Object.create(word), {
  word: "개",
  language: "Korea",
  lookUpUrl: "http://korea/",
});

const englishWord = Object.assign(Object.create(word), {
  word: "dog",
  language: "English",
  lookUpUrl: "http://english/",
});

const wish = require("wish");

//인터페이스 테스트
wish(koreaWord.word === "개");
wish(koreaWord.lookUpUrl === "http://korea/");
wish(koreaWord.count() === 1);

wish(englishWord.word === "dog");
wish(englishWord.lookUpUrl === "http://english/");
wish(englishWord.count() === 3);

//내부테스트
wish(typeof koreaWord === "object");
