const word = {
  count() {
    return this.word.length;
  },
  lookUp() {
    return this.lookUpUrl + this.word;
  },
};

const englisWord = Object.assign(Object.create(word), {
  word: "dog",
  language: "English",
  lookUpUrl: "영어주소/",
});

const japeneseWord = Object.assign(Object.create(word), {
  word: "히라가나",
  language: "Japanese",
  lookUpUrl: "일본어주소/",
});

//인터페이스 테스트
const wish = require("wish");

wish(japeneseWord.word === "히라가나");
wish(japeneseWord.lookUpUrl === "일본어주소/");
wish(japeneseWord.count() === 4);

wish(englisWord.word === "dog");
wish(englisWord.lookUpUrl === "영어주소/");
wish(englisWord.count() === 3);

//팩토리 함수
