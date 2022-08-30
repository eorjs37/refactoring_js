class Word {
  constructor(word) {
    this.word = word;
  }

  count() {
    return this.word.length;
  }

  lookUp() {
    if (this.language === "Korea") {
      return `http://korea/${this.word}`;
    } else {
      return `http://english/${this.word}`;
    }
  }
}

class KoreaWord extends Word {
  constructor(word) {
    super(word);
    this.language = "Korea";
  }
}

class EnglishWord extends Word {
  constructor(word) {
    super(word);
    this.language = "English";
  }
}

const koreaWord = new KoreaWord("개");
const englishWord = new EnglishWord("dog");

console.log(koreaWord.count());
console.log(koreaWord.word);
console.log(koreaWord.lookUp());
console.log(englishWord.count());
console.log(englishWord.word);
console.log(englishWord.lookUp());
