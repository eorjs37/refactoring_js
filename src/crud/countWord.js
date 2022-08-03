class EnglishWord {
  constructor(word) {
    this.word = word;
  }

  count() {
    return this.word.length;
  }
}

class JapaenseWord {
  constructor(word) {
    this.word = word;
  }

  count() {
    return this.word.length;
  }
}

const japanseWord = new JapaenseWord("히라가나");
const englishWord = new EnglishWord("ABC");
console.log(japanseWord.word);
console.log(japanseWord.count());
console.log(englishWord.word);
console.log(englishWord.count());
