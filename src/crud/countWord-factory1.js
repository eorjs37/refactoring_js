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
    lookUpUrl: "http://english/",
  });
  return Object.setPrototypeOf(copy, wordFactory);
};

const koreaWordFactory = (theWord) => {
  let copy = Object.assign(wordFactory(), {
    word: theWord,
    language: "Korea",
    lookUpUrl: "http://korea/",
  });
  return Object.setPrototypeOf(copy, wordFactory);
};

const englishWord = englishWordFactory("dog");
const koreaWord = englishWordFactory("개");

wordFactory.reportLanguage = function () {
  return `The Language is :${this.language}`;
};

console.log(wordFactory);
