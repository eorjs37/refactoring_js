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

function JapeneseWord(word) {
  Word.call(this, word, "Japanese", "일본어주소/");
}

JapeneseWord.prototype = Object.create(Word.prototype);
JapeneseWord.prototype.constructor = JapeneseWord;
EnglishWord.prototype = Object.create(Word.prototype);
EnglishWord.prototype.constructor = EnglishWord;
