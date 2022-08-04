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
    return `영어주소/${this.word}`;
  }
}

class JapaenseWord extends Word {
  constructor(word) {
    super(word, "Japanese");
  }

  lookUp() {
    return `일본어주소/${this.word}`;
  }
}

const japanseWord = new JapaenseWord("히라가나");
const englishWord = new EnglishWord("ABC");

const wish = require("wish");
const deepEqual = require("deep-equal");

//인터페이스 테스트
wish(japanseWord.word === "히라가나");
wish(japanseWord.lookUp() === "일본어주소/히라가나");
wish(japanseWord.count() === 4);

wish(englishWord.word === "ABC");
wish(englishWord.lookUp() === "영어주소/ABC");
wish(englishWord.count() === 3);

//내부 테스트
wish(typeof japanseWord === "object");
wish(typeof JapaenseWord === "function");
wish(japanseWord instanceof JapaenseWord);
wish(japanseWord instanceof Word);
wish(!(JapaenseWord instanceof Word));

wish(japanseWord.constructor === JapaenseWord);
console.log(Object.getPrototypeOf(JapaenseWord));
wish(Object.getPrototypeOf(JapaenseWord) === Word);

//약간 개략적인 테스트
wish(deepEqual(Object.getPrototypeOf(japanseWord), {}));
