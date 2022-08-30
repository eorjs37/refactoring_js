class EnglishWord {
  constructor(word) {
    this.word = word;
  }

  count() {
    return this.word.length;
  }
}

class KoreaWord {
  constructor(word) {
    this.word = word;
  }

  count() {
    return this.word.length;
  }
}

const koreaWord = new KoreaWord("개");
const englishWord = new EnglishWord("dog");

console.log(koreaWord.count());
console.log(koreaWord.word);
console.log(englishWord.count());
console.log(englishWord.word);
