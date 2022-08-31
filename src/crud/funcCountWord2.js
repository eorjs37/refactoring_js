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

Word.prototype.reportLanguage = function () {
  return `The Language is : ${this.language}`;
};

KoreaWord.prototype = Object.create(Word.prototype);
const koreaWord = new KoreaWord("개");
console.log(koreaWord.reportLanguage());
