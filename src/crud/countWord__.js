class Word {
  constructor(word, language, lookUpUrl) {
    this.word = word;
    this.language = language;
    this.lookUpUrl = lookUpUrl;
  }

  count() {
    return this.word.length;
  }

  lookUp() {
    return this.lookUpUrl + this.word;
  }
}

class KoreaWord extends Word {
  constructor(word) {
    super(word, "Korea", "http://korea/");
  }
}

class EnglishWord extends Word {
  constructor(word) {
    super(word, "English", "http://english/");
  }
}

const koreaWord = new KoreaWord("개");
const englishWord = new EnglishWord("dog");

// console.log(koreaWord.count());
// console.log(koreaWord.word);
// console.log(koreaWord.lookUp());
// console.log(englishWord.count());
// console.log(englishWord.word);
// console.log(englishWord.lookUp());

const wish = require("wish");
const deepEqual = require("deep-equal");

//인터페이스 테스트
wish(koreaWord.word === "개");
wish(koreaWord.lookUp() === "http://korea/개");
wish(koreaWord.count() === 1);

wish(englishWord.word === "dog");
wish(englishWord.lookUp() === "http://english/dog");
wish(englishWord.count() === 3);

//내부 테스트
wish(typeof koreaWord === "object");
wish(typeof KoreaWord === "function");

wish(koreaWord instanceof KoreaWord);
wish(koreaWord instanceof Word);
wish(!(KoreaWord instanceof Word));

wish(koreaWord.constructor === KoreaWord);
wish(Object.getPrototypeOf(KoreaWord) === Word);

//약간 개략적인 테스트
wish(deepEqual(Object.getPrototypeOf(koreaWord), {}));
console.log(Object.getPrototypeOf(koreaWord));
