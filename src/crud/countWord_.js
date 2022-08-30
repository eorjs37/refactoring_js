class Word {
  constructor(word, language) {
    this.word = word;
    this.language = language;
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
    super(word, "Korea");
  }
}

class EnglishWord extends Word {
  constructor(word) {
    super(word, "English");
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
