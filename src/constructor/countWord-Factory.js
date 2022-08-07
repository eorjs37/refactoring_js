const word = {
  count() {
    return this.word.length;
  },
  lookUp() {
    return this.lookUpUrl + this.word;
  },
};

const wordFactory = function () {
  return {
    count() {
      return this.word.length;
    },
    lookUp() {
      return this.lookUpUrl + this.word;
    },
  };
};

const englishWordFactory = (theWord) => {
  return Object.assign(Object.create(word), {
    word: theWord,
    language: "English",
    lookUpUrl: "영어주소/",
  });
};

const japanseWordFactory = (theWord) => {
  return Object.assign(Object.create(word), {
    word: theWord,
    language: "Japanese",
    lookUpUrl: "일본어주소/",
  });
};

const japeneseWord = japanseWordFactory("히라가나");
const englisWord = englishWordFactory("dog");

//인터페이스 테스트
const wish = require("wish");

wish(japeneseWord.word === "히라가나");
wish(japeneseWord.lookUpUrl === "일본어주소/");
wish(japeneseWord.count() === 4);

wish(englisWord.word === "dog");
wish(englisWord.lookUpUrl === "영어주소/");
wish(englisWord.count() === 3);
