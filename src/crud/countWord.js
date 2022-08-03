class Word {
  constructor(word) {
    this.word = word;
  }
  count() {
    return this.word.length;
  }

  lookUp() {
    if (this instanceof JapaenseWord) {
      return `일본어주소/${this.word}`;
    } else {
      return `영어주소/${this.word}`;
    }
  }
}

class EnglishWord extends Word {}

class JapaenseWord extends Word {}

const japanseWord = new JapaenseWord("히라가나");
const englishWord = new EnglishWord("ABC");
console.log(japanseWord.word);
console.log(japanseWord.count());
console.log(englishWord.word);
console.log(englishWord.count());
