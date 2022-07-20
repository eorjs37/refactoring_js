function fileName() {
  var theError = new Error("here i am");
  return /(\w+\.js)/.exec(theError.stack)[1];
}

function welcomeMessage() {
  return `Welcome to ${fileName()}`;
}

var classifier = {
  songs: [],
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  probabilityOfChordsInLabels: new Map(),
};

function setDifficulites() {
  easy = "easy";
  medium = "medium";
  hard = "hard";
}

function setSongs() {
  imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
  someWhereOverTheRainbow = ["c", "em", "f", "g", "am"];
  tooManyCooks = ["c", "g", "f"];
  iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
  babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];
  creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
  army = ["ab", "ebm7", "dbadd9", "fm7", "bbm", "abmaj7", "ebm"];
  paperBag = ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"];

  toxic = ["cm", "eb", "g", "cdim", "eb7", "d", "db7", "ab", "gmaj7", "g7"];
  bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];
  blankSong = [];
}

function train(chords, label) {
  var labels = [];
  classifier.songs.push({ label, chords });
  labels.push(label);

  chords.forEach((chord) => classifier.allChords.add(chord));

  if (Array.from(classifier.labelCounts.keys()).includes(label)) {
    classifier.labelCounts.set(label, classifier.labelCounts.get(label) + 1);
  } else {
    classifier.labelCounts.set(label, 1);
  }
}

function setLabelProbabilities() {
  classifier.labelCounts.forEach(function (_count, label) {
    classifier.labelProbabilities.set(label, classifier.labelCounts.get(label) / classifier.songs.length);
  });
}
function setChrodCountsInLabels() {
  classifier.songs.forEach(function (song) {
    if (classifier.chordCountsInLabels.get(song.label) === undefined) {
      classifier.chordCountsInLabels.set(song.label, {});
    }

    song.chords.forEach(function (chord) {
      if (classifier.chordCountsInLabels.get(song.label)[chord] > 0) {
        classifier.chordCountsInLabels.get(song.label)[chord] += 1;
      } else {
        classifier.chordCountsInLabels.get(song.label)[chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  classifier.probabilityOfChordsInLabels = classifier.chordCountsInLabels;

  classifier.probabilityOfChordsInLabels.forEach(function (_chords, difficulty) {
    Object.keys(classifier.probabilityOfChordsInLabels.get(difficulty)).forEach(function (chord) {
      classifier.probabilityOfChordsInLabels.get(difficulty)[chord] /= classifier.songs.length;
    });
  });
}

function trainAll() {
  setDifficulites();
  setSongs();

  train(imagine, easy);
  train(someWhereOverTheRainbow, easy);
  train(tooManyCooks, easy);

  train(iWillFollowYouIntoTheDark, medium);
  train(babyOneMoreTime, medium);
  train(creep, medium);

  train(paperBag, hard);
  train(toxic, hard);
  train(bulletproof, hard);

  setLabelsAndProbabilities();
}

function setLabelsAndProbabilities() {
  setLabelProbabilities();
  setChrodCountsInLabels();
  setProbabilityOfChordsInLabels();
}

function classify(chords) {
  var something = 1.01;
  var classififed = new Map();

  classifier.labelProbabilities.forEach(function (_probabilities, difficulty) {
    var first = classifier.labelProbabilities.get(difficulty) + something;
    chords.forEach(function (chord) {
      var probabilityOfChordInLabel = classifier.probabilityOfChordsInLabels.get(difficulty)[chord];
      if (probabilityOfChordInLabel !== undefined) {
        first *= probabilityOfChordInLabel + something;
      }
    });
    classififed.set(difficulty, first);
  });

  return classififed;
}

var wish = require("wish");

describe("the file", () => {
  trainAll();
  it("works", () => {
    wish(true);
  });

  it("classifies", () => {
    var classified = classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
    wish(classified.get("easy") === 1.3433333333333333);
    wish(classified.get("medium") === 1.5060259259259259);
    wish(classified.get("hard") === 1.8929091119661638);
  });

  it("sets welcome message", () => {
    wish(welcomeMessage() === "Welcome to review.js");
  });

  it("label probabilities", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
