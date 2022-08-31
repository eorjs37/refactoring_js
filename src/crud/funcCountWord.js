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
  Word.call(this, word, "English", "http://english/");
}

function KoreaWord(word) {
  Word.call(this, word, "Korea", "http://korea/");
}

//상속역할
KoreaWord.prototype = Object.create(Word.prototype);
//메인 객체는 KoreaWord
KoreaWord.prototype.constructor = KoreaWord;

//상속역할
EnglishWord.prototype = Object.create(Word.prototype);
//메인 객체는 KoreaWord
EnglishWord.prototype.constructor = EnglishWord;
