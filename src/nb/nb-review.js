function fileName() {
  const theError = new Error("here i am");
  return /(\w+\.js)/.exec(theError.stack)[1];
}

function welcomeMessage() {
  return `Welcome to ${fileName()}`;
}

const classifier = {
  songs: [],
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  something: 1.01,

  setProbabilityOfChordsInLabels: function () {
    this.chordCountsInLabels = this.chordCountsInLabels;
    this.chordCountsInLabels.forEach(function (_chords, difficulty) {
      Object.keys(this.chordCountsInLabels.get(difficulty)).forEach(function (chord) {
        this.chordCountsInLabels.get(difficulty)[chord] /= this.songs.length;
      }, this);
    }, this);
  },

  chordCountForDifficulty: function (difficulty, testChord) {
    let counter = 0;
    songList.songs.forEach(function (song) {
      if (song.difficulty === difficulty) {
        song.chords.forEach(function (chord) {
          if (chord === testChord) {
            counter = counter + 1;
          }
        });
      }
    });
    return counter;
  },

  likelihoodFromChord: function (difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) / songList.songs.length;
  },

  valueForChorDifficulty(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);

    return value ? value + this.something : 1;
  },
  classify: function (chords) {
    return new Map(
      Array.from(this.labelProbabilities.entries()).map((labelWithProbability) => {
        const difficulty = labelWithProbability[0];

        return [
          difficulty,
          chords.reduce((total, chord) => {
            if (this.chordCountsInLabels.get(difficulty)[chord]) {
              return total * this.valueForChorDifficulty(difficulty, chord);
            } else {
              return total;
            }
          }, this.labelProbabilities.get(difficulty) + this.something),
        ];
      })
    );
  },

  setChrodCountsInLabels: function () {
    songList.songs.forEach(function (song) {
      if (this.chordCountsInLabels.get(song.difficulty) === undefined) {
        this.chordCountsInLabels.set(song.difficulty, {});
      }

      song.chords.forEach(function (chord) {
        if (this.chordCountsInLabels.get(song.difficulty)[chord] > 0) {
          this.chordCountsInLabels.get(song.difficulty)[chord] += 1;
        } else {
          this.chordCountsInLabels.get(song.difficulty)[chord] = 1;
        }
      }, this);
    }, this);
  },
};

const songList = {
  difficulties: ["easy", "medium", "hard"],
  songs: [],
  addSong: function (name, chords, difficulty) {
    this.songs.push({
      name: name,
      chords: chords,
      difficulty: this.difficulties[difficulty],
    });
  },
};

function train(chords, label) {
  chords.forEach((chord) => classifier.allChords.add(chord));

  if (Array.from(classifier.labelCounts.keys()).includes(label)) {
    classifier.labelCounts.set(label, classifier.labelCounts.get(label) + 1);
  } else {
    classifier.labelCounts.set(label, 1);
  }
}

function setLabelProbabilities() {
  classifier.labelCounts.forEach(function (_count, label) {
    classifier.labelProbabilities.set(label, classifier.labelCounts.get(label) / songList.songs.length);
  });
}

function trainAll() {
  songList.songs.forEach(function (song) {
    train(song.chords, song.difficulty);
  });

  setLabelsAndProbabilities();
}

function setLabelsAndProbabilities() {
  setLabelProbabilities();
  //classifier.setChrodCountsInLabels();
}

const wish = require("wish");

describe("the file", () => {
  songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  songList.addSong("someWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  songList.addSong("tooManyCooks", ["c", "g", "f"], 0);

  songList.addSong("iWillFollowYouIntoTheDark", ["f", "dm", "bb", "c", "a", "bbm"], 1);
  songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  songList.addSong("creep", ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"], 1);

  songList.addSong("paperBag", ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"], 2);
  songList.addSong("toxic", ["cm", "eb", "g", "cdim", "eb7", "d", "db7", "ab", "gmaj7", "g7"], 2);
  songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);

  trainAll();
  it("works", () => {
    wish(true);
  });

  it("classifies", () => {
    const classified = classifier.classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
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
