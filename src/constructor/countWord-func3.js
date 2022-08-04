//생성자 함수
function Word(word, language, lookUpUrl) {
  this.word = word;
  this.language = language;
  this.lookUpUrl = lookUpUrl;

  this.count = function () {
    return this.word.length;
  };

  this.lookUp = function () {
    return this.lookUpUrl + this.word;
  };
}

function EnglishWord(word) {
  Word.call(this, word, "English", "영어주소/");
}

function JapaenseWord(word) {
  Word.call(this, word, "Japanese", "일본어주소/");
}

JapaenseWord.prototype = Object.create(Word.prototype);
JapaenseWord.prototype.constructor = JapaenseWord;

const japeneseWord = new JapaenseWord("히라가나");

const englishWord = new EnglishWord("dog");

const wish = require("wish");
const deepEqual = require("deep-equal");

//인터페이스 테스트
wish(japeneseWord.word === "히라가나");
wish(japeneseWord.lookUp() === "일본어주소/히라가나");
wish(japeneseWord.count() === 4);

wish(englishWord.word === "dog");
wish(englishWord.lookUp() === "영어주소/dog");
wish(englishWord.count() === 3);

// wish(japeneseWord instanceof Word);
// wish(Object.getPrototypeOf(JapaenseWord) === Word);
