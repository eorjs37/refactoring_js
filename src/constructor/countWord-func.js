//생성자 함수
function Word() {
  this.count = function () {
    return this.word.length;
  };

  this.lookUp = function () {
    return this.lookUpUrl + this.word;
  };
}

function EnglishWord(word) {
  Word.call(this);
  this.word = word;
  this.language = "English";
  this.lookUpUrl = "영어주소/";
}

function JapaenseWord(word) {
  Word.call(this);
  this.word = word;
  this.language = "Japanese";
  this.lookUpUrl = "일본어주소/";
}

Word.prototype.reportLanguage = function () {
  return `The language is : ${this.language}`;
};
JapaenseWord.prototype = Object.create(Word.prototype);
const japaneseWord = new JapaenseWord("히라가나");
console.log(japaneseWord.reportLanguage());

// JapaenseWord.prototype = Object.create(Word.prototype);
// JapaenseWord.prototype.constructor = JapaenseWord;
// EnglishWord.prototype = Object.create(Word.prototype);
// EnglishWord.prototype.constructor = EnglishWord;

// const japanseWord = new JapaenseWord("히라가나");
// const englishWord = new EnglishWord("ABC");

// const wish = require("wish");
// const deepEqual = require("deep-equal");

// // //인터페이스 테스트
// wish(japanseWord.word === "히라가나");
// wish(japanseWord.lookUp() === "일본어주소/히라가나");
// wish(japanseWord.count() === 4);

// wish(englishWord.word === "ABC");
// wish(englishWord.lookUp() === "영어주소/ABC");
// wish(englishWord.count() === 3);

// // //내부 테스트
// wish(typeof japanseWord === "object");
// wish(typeof JapaenseWord === "function");
// wish(japanseWord instanceof JapaenseWord);
// wish(japanseWord instanceof Word);
// wish(!(JapaenseWord instanceof Word));

// wish(japanseWord.constructor === JapaenseWord);
// wish(Object.getPrototypeOf(JapaenseWord) === Word);

// //약간 개략적인 테스트
// wish(deepEqual(Object.getPrototypeOf(japanseWord), {}));
