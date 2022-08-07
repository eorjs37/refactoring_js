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
  let copy = Object.assign(wordFactory(), {
    word: theWord,
    language: "English",
    lookUpUrl: "영어주소/",
  });

  return Object.setPrototypeOf(copy, wordFactory);
};

const japanseWordFactory = (theWord) => {
  let copy = Object.assign(wordFactory(), {
    word: theWord,
    language: "Japanese",
    lookUpUrl: "일본어주소/",
  });

  return Object.setPrototypeOf(copy, wordFactory);
};

const japeneseWord = japanseWordFactory("히라가나");
const englisWord = englishWordFactory("dog");

// //인터페이스 테스트
const wish = require("wish");

wish(japeneseWord.word === "히라가나");
wish(japeneseWord.lookUpUrl === "일본어주소/");
wish(japeneseWord.count() === 4);

wish(englisWord.word === "dog");
wish(englisWord.lookUpUrl === "영어주소/");
wish(englisWord.count() === 3);

wordFactory.reportLanguage = function () {
  return `The language is: ${this.language}`;
};

console.log(japeneseWord.reportLanguage());
console.log(englisWord.reportLanguage());
