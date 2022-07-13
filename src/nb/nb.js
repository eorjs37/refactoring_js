function fileName() {
  var theError = new Error("i am");
  return /(\w+\.js)/.exec(theError.stack)[1];
}
var classifier = {
  songs: [],
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  probabilityOfChordsInLabels: new Map(),
};

function setDifficulties() {
  easy = "easy";
  medium = "medium";
  hard = "hard";
}

function setSongs() {
  imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
  songWhereOverTheRainbow = ["c", "em", "f", "g", "am"];
  tooManyCooks = ["c", "g", "f"];
  iWillFoolowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
  babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];
  creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
  paperBag = [
    "bm7",
    "e",
    "c",
    "g",
    "b7",
    "f",
    "em",
    "a",
    "cmaj7",
    "em7",
    "a7",
    "f7",
    "b",
  ];
  toxic = ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"];
  bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];
}

function setUp() {
  songs = [];
  allChords = new Set();
  labelCounts = new Map();
  labelProbabilities = new Map();
  chordCountsInLabels = new Map();
  probabilityOfChordsInLabels = new Map();
}

function train(chrods, label) {
  classifier.songs.push({ label: label, chrods: chrods });

  chrods.forEach((chrod) => classifier.allChords.add(chrod)); //

  if (Array.from(classifier.labelCounts.keys()).includes(label)) {
    classifier.labelCounts.set(label, classifier.labelCounts.get(label) + 1);
  } else {
    classifier.labelCounts.set(label, 1);
  }
}

function setLabelProbabilities() {
  classifier.labelCounts.forEach(function (_count, label) {
    classifier.labelProbabilities.set(
      label,
      classifier.labelCounts.get(label) / classifier.songs.length
    );
  });
}

function setChrodCountInLables() {
  classifier.songs.forEach(function (song) {
    if (classifier.chordCountsInLabels.get(song.label) === undefined) {
      classifier.chordCountsInLabels.set(song.label, {});
    }

    song.chrods.forEach(function (chrod) {
      if (classifier.chordCountsInLabels.get(song.label)[chrod] > 0) {
        classifier.chordCountsInLabels.get(song.label)[chrod] += 1;
      } else {
        classifier.chordCountsInLabels.get(song.label)[chrod] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  classifier.probabilityOfChordsInLabels = classifier.chordCountsInLabels;

  classifier.probabilityOfChordsInLabels.forEach(function (
    _chords,
    difficulty
  ) {
    Object.keys(classifier.probabilityOfChordsInLabels.get(difficulty)).forEach(
      function (chrod) {
        classifier.probabilityOfChordsInLabels.get(difficulty)[chrod] /=
          classifier.songs.length;
      }
    );
  });
}

function trainAll() {
  setDifficulties();
  setSongs();
  train(imagine, easy);
  train(songWhereOverTheRainbow, easy);
  train(tooManyCooks, easy);

  train(iWillFoolowYouIntoTheDark, medium);
  train(babyOneMoreTime, medium);
  train(creep, medium);

  train(paperBag, hard);
  train(toxic, hard);
  train(bulletproof, hard);

  setLabelAndProbabilities();
}

trainAll();

function setLabelAndProbabilities() {
  setLabelProbabilities();
  setChrodCountInLables();
  setProbabilityOfChordsInLabels();
}

function classify(chrods) {
  var smoothing = 1.01;
  var classified = new Map();
  classifier.labelProbabilities.forEach(function (_probabilities, difficulty) {
    var first = classifier.labelProbabilities.get(difficulty) + smoothing;
    chrods.forEach(function (chord) {
      var probabilityOfChordInLabel =
        classifier.probabilityOfChordsInLabels.get(difficulty)[chord];

      if (probabilityOfChordInLabel) {
        first = first * (probabilityOfChordInLabel + smoothing);
      }
    });
    classified.set(difficulty, first);
  });

  return classified;
}

function welcomeMessage() {
  return `Welcome to ${fileName()}`;
}

classify(["d", "g", "e", "dm"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);

var wish = require("wish");
describe("the file", () => {
  it("works", () => {
    wish(true);
  });

  it("cloassifies", () => {
    var classified = classify([
      "f#m7",
      "a",
      "dadd9",
      "dmaj7",
      "bm",
      "bm7",
      "d",
      "f#m",
    ]);
    wish(classified.get("easy") === 1.3433333333333333);
    wish(classified.get("medium") === 1.5060259259259259);
    wish(classified.get("hard") === 1.6884223991769547);
  });

  it("sets welcome message", () => {
    wish(welcomeMessage() === "Welcome to nb.js");
  });

  it("label probabilitites", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });

  it("the file", () => {
    trainAll();
  });
});
