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

var songList = {
  difficulties: ["easy", "medium", "hard"],
  songs: [],
  addSong: function (name, chords, difficulty) {
    this.songs.push({
      name: name,
      chrods: chords,
      difficulty: this.difficulties[difficulty],
    });
  },
};

function setSongs() {
  songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  songList.addSong("songWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  songList.addSong("tooManyCooks", ["c", "g", "f"], 0);

  songList.addSong(
    "iWillFoolowYouIntoTheDark",
    ["f", "dm", "bb", "c", "a", "bbm"],
    1
  );
  songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  songList.addSong(
    "creep",
    ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"],
    1
  );

  songList.addSong(
    "paperBag",
    [
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
    ],
    2
  );
  songList.addSong(
    "toxic",
    ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"],
    2
  );
  songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);
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
  songList.songs.forEach(function (song) {
    train(song.chrods, song.difficulty);
  });

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
  //setSongs();
  songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  songList.addSong("songWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  songList.addSong("tooManyCooks", ["c", "g", "f"], 0);

  songList.addSong(
    "iWillFoolowYouIntoTheDark",
    ["f", "dm", "bb", "c", "a", "bbm"],
    1
  );
  songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  songList.addSong(
    "creep",
    ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"],
    1
  );

  songList.addSong(
    "paperBag",
    [
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
    ],
    2
  );
  songList.addSong(
    "toxic",
    ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"],
    2
  );
  songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);

  trainAll();
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
});
