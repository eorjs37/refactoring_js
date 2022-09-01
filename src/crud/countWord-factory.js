const word = {
  count() {
    return this.word.length;
  },
  lookUp() {
    return this.lookUpUrl + this.word;
  },
};

const englishWordFactory = (theword) => {
  return Object.assign(Object.create(word), {
    word: theword,
    langulage: "English",
    lookUpUrl: "http://english/",
  });
};

const koreaWordFactory = (theword) => {
  return Object.assign(Object.create(word), {
    word: theword,
    langulage: "Korea",
    lookUpUrl: "http://korea/",
  });
};

const englishWord = englishWordFactory("dog");
const koreaWord = koreaWordFactory("개");

const wish = require("wish");
const deepEqual = require("deep-equal");

//인터페이스 테스트
wish(koreaWord.word === "개");
wish(koreaWord.lookUpUrl === "http://korea/");
wish(koreaWord.count() === 1);

wish(englishWord.word === "dog");
wish(englishWord.lookUpUrl === "http://english/");
wish(englishWord.count() === 3);

console.log(Object.getPrototypeOf(koreaWord));
