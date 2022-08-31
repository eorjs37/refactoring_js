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
  this.lookUpUrl = "http://english/";
}

function KoreaWord(word) {
  Word.call(this);
  this.word = word;
  this.language = "Korea";
  this.lookUpUrl = "http://korea/";
}

//상속역할
KoreaWord.prototype = Object.create(Word.prototype);
//메인 객체는 KoreaWord
KoreaWord.prototype.constructor = KoreaWord;

//상속역할
EnglishWord.prototype = Object.create(Word.prototype);
//메인 객체는 KoreaWord
EnglishWord.prototype.constructor = EnglishWord;
