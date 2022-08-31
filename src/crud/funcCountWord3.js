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
  Word.call(this, word, "English", "http://english/");
}

function KoreaWord(word) {
  Word.call(this, word, "Korea", "http://korea/");
}

const koreaWord = new KoreaWord("개");

const englishWord = new EnglishWord("dog");

const wish = require("wish");
const deepEqual = require("deep-equal");

//interfaces tests
wish(koreaWord.word === "개");
wish(koreaWord.lookUp() === "http://korea/개");
wish(koreaWord.count() === 1);

wish(englishWord.word === "dog");
wish(englishWord.lookUp() === "http://english/dog");
wish(englishWord.count() === 3);
