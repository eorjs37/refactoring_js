fs = require("fs");

const classifier = {
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  smoothing: 1.01,
  classify: function (chords) {
    return new Map(
      Array.from(this.labelProbabilities.entries()).map((labelWithProbability) => {
        const difficulty = labelWithProbability[0];

        return [
          difficulty,
          chords.reduce((total, chord) => {
            return total * this.valueForChordDifficulty(difficulty, chord);
          }, this.labelProbabilities.get(difficulty) + this.smoothing),
        ];
      })
    );
  },

  likelihoodFromChord: function (difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) / songList.songs.length;
  },
  valueForChordDifficulty(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);

    return value ? value + this.smoothing : 1;
  },

  setChordCountsInLabels: function () {
    songList.songs.forEach(function (song) {
      if (classifier.chordCountsInLabels.get(song.difficulty) === undefined) {
        classifier.chordCountsInLabels.set(song.difficulty, {});
      }

      song.chords.forEach(function (chord) {
        if (classifier.chordCountsInLabels.get(song.difficulty)[chord] > 0) {
          classifier.chordCountsInLabels.get(song.difficulty)[chord] += 1;
        } else {
          classifier.chordCountsInLabels.get(song.difficulty)[chord] = 1;
        }
      }, this);
    }, this);
  },

  chordCountForDifficulty: function (difficulty, testChord) {
    return songList.songs.reduce(function (counter, song) {
      if (song.difficulty === difficulty) {
        counter += song.chords.filter((chord) => chord === testChord).length;
      }

      return counter;
    }, 0);
  },

  trainAll: function () {
    songList.songs.forEach(function (song) {
      this.train(song.chords, song.difficulty);
    }, this);

    this.setLabelProbabilities();
  },

  train: function (chords, label) {
    chords.forEach((chord) => {
      songList.allChords.add(chord);
    });

    if (Array.from(classifier.labelCounts.keys()).includes(label)) {
      this.labelCounts.set(label, this.labelCounts.get(label) + 1);
    } else {
      this.labelCounts.set(label, 1);
    }
  },

  setLabelProbabilities: function () {
    this.labelCounts.forEach(function (_count, label) {
      this.labelProbabilities.set(label, this.labelCounts.get(label) / songList.songs.length);
    }, this);
  },
};

const songList = {
  allChords: new Set(),
  difficulties: ["easy", "medium", "hard"],
  songs: [],
  addSong: function (name, chords, difficulty) {
    this.songs.push({
      name,
      chords,
      difficulty: this.difficulties[difficulty],
    });
  },
};

function setSongs() {
  songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  songList.addSong("someWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  songList.addSong("tooManyCooks", ["c", "g", "f"], 0);

  songList.addSong("iWillFollowYouIntoTheDark", ["f", "dm", "bb", "c", "a", "bbm"], 1);
  songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "eb", "fm", "ab"], 1);
  songList.addSong("creep", ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"], 1);

  songList.addSong("paperBag", ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"], 2);
  songList.addSong("toxic", ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"], 2);
  songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);
}

const wish = require("wish");

describe("the file", () => {
  setSongs();
  classifier.trainAll();
  it("classifies", () => {
    const classifed = classifier.classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
    wish(classifed.get("easy") === 1.3433333333333333);
    wish(classifed.get("medium") === 1.5060259259259259);
    wish(classifed.get("hard") === 1.6884223991769547);
  });

  it("clssifies again", () => {
    const classifed = classifier.classify(["d", "g", "e", "em"]);
    wish(classifed.get("easy") === 2.023094827160494);
    wish(classifed.get("medium") === 1.6552851851851849);
    wish(classifed.get("hard") === 2.080511600763603);
  });

  it("label probabilites", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
