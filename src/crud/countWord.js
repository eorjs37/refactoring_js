class Word {
  constructor(word, language) {
    this.word = word;
    this.language = language;
  }
  count() {
    return this.word.length;
  }
}

class EnglishWord extends Word {
  constructor(word) {
    super(word, "English");
  }

  lookUp() {
    return `일본어주소/${this.word}`;
  }
}

class JapaenseWord extends Word {
  constructor(word) {
    super(word, "Japanese");
  }

  lookUp() {
    return `영어주소/${this.word}`;
  }
}

const japanseWord = new JapaenseWord("히라가나");
const englishWord = new EnglishWord("ABC");
console.log(japanseWord.word);
console.log(japanseWord.count());
console.log(englishWord.word);
console.log(englishWord.count());
console.log(englishWord.lookUp());
console.log(japanseWord.lookUp());
