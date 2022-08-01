// const classifier = {
//   songList: {
//     allChords: new Set(),
//     difficulties: ["easy", "medium", "hard"],
//     songs: [],
//     addSong(name, chords, difficulty) {
//       this.songs.push({
//         name,
//         chords,
//         difficulty: this.difficulties[difficulty],
//       });
//     },
//   },
//   labelCounts: new Map(),
//   labelProbabilities: new Map(),
//   chordCountsInLabels: new Map(),
//   something: 1.01,

//   setChrodCountsInLabels() {
//     classifier.songList.songs.forEach(function (song) {
//       if (this.chordCountsInLabels.get(song.difficulty) === undefined) {
//         this.chordCountsInLabels.set(song.difficulty, {});
//       }

//       song.chords.forEach(function (chord) {
//         if (this.chordCountsInLabels.get(song.difficulty)[chord] > 0) {
//           this.chordCountsInLabels.get(song.difficulty)[chord] += 1;
//         } else {
//           this.chordCountsInLabels.get(song.difficulty)[chord] = 1;
//         }
//       }, this);
//     }, this);
//   },

//   chordCountForDifficulty(difficulty, testChord) {
//     return classifier.songList.songs.reduce(function (counter, song) {
//       if (song.difficulty === difficulty) {
//         counter += song.chords.filter((chord) => chord === testChord).length;
//       }
//       return counter;
//     }, 0);
//   },

//   setProbabilityOfChordsInLabels() {
//     this.chordCountsInLabels.forEach(function (_chords, difficulty) {
//       Object.keys(this.chordCountsInLabels.get(difficulty)).forEach(function (chord) {
//         this.chordCountsInLabels.get(difficulty)[chord] /= this.songs.length;
//       }, this);
//     }, this);
//   },

//   likelihoodFromChord(difficulty, chord) {
//     return this.chordCountForDifficulty(difficulty, chord) / classifier.songList.songs.length;
//   },

//   valueForChorDifficulty(difficulty, chord) {
//     const value = this.likelihoodFromChord(difficulty, chord);

//     return value ? value + this.something : 1;
//   },
//   classify(chords) {
//     return new Map(
//       Array.from(this.labelProbabilities.entries()).map((labelWithProbability) => {
//         const difficulty = labelWithProbability[0];

//         return [
//           difficulty,
//           chords.reduce((total, chord) => {
//             return total * this.valueForChorDifficulty(difficulty, chord);
//           }, this.labelProbabilities.get(difficulty) + this.something),
//         ];
//       })
//     );
//   },
//   trainAll() {
//     this.songList.songs.forEach((song) => {
//       this.train(song.chords, song.difficulty);
//     }, this);

//     this.setLabelProbabilities();
//   },
//   train(chords, label) {
//     chords.forEach(
//       function (chord) {
//         this.songList.allChords.add(chord);
//       }.bind(this)
//     );

//     if (Array.from(this.labelCounts.keys()).includes(label)) {
//       this.labelCounts.set(label, this.labelCounts.get(label) + 1);
//     } else {
//       this.labelCounts.set(label, 1);
//     }
//   },
//   setLabelProbabilities() {
//     this.labelCounts.forEach(function (_count, label) {
//       this.labelProbabilities.set(label, this.labelCounts.get(label) / classifier.songList.songs.length);
//     }, this);
//   },
// };

const classifierTemplate = {
  songList: {
    allChords: new Set(),
    difficulties: ["easy", "medium", "hard"],
    songs: [],
    addSong(name, chords, difficulty) {
      this.songs.push({
        name,
        chords,
        difficulty: this.difficulties[difficulty],
      });
    },
  },
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  something: 1.01,

  setChrodCountsInLabels() {
    classifier.songList.songs.forEach(function (song) {
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

  chordCountForDifficulty(difficulty, testChord) {
    return this.songList.songs.reduce(function (counter, song) {
      if (song.difficulty === difficulty) {
        counter += song.chords.filter((chord) => chord === testChord).length;
      }
      return counter;
    }, 0);
  },

  setProbabilityOfChordsInLabels() {
    this.chordCountsInLabels.forEach(function (_chords, difficulty) {
      Object.keys(this.chordCountsInLabels.get(difficulty)).forEach(function (chord) {
        this.chordCountsInLabels.get(difficulty)[chord] /= this.songs.length;
      }, this);
    }, this);
  },

  likelihoodFromChord(difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) / this.songList.songs.length;
  },

  valueForChorDifficulty(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);

    return value ? value + this.something : 1;
  },
  classify(chords) {
    return new Map(
      Array.from(this.labelProbabilities.entries()).map((labelWithProbability) => {
        const difficulty = labelWithProbability[0];

        return [
          difficulty,
          chords.reduce((total, chord) => {
            return total * this.valueForChorDifficulty(difficulty, chord);
          }, this.labelProbabilities.get(difficulty) + this.something),
        ];
      })
    );
  },
  trainAll() {
    this.songList.songs.forEach((song) => {
      this.train(song.chords, song.difficulty);
    }, this);

    this.setLabelProbabilities();
  },
  train(chords, label) {
    chords.forEach(
      function (chord) {
        this.songList.allChords.add(chord);
      }.bind(this)
    );

    if (Array.from(this.labelCounts.keys()).includes(label)) {
      this.labelCounts.set(label, this.labelCounts.get(label) + 1);
    } else {
      this.labelCounts.set(label, 1);
    }
  },
  setLabelProbabilities() {
    this.labelCounts.forEach(function (_count, label) {
      this.labelProbabilities.set(label, this.labelCounts.get(label) / this.songList.songs.length);
    }, this);
  },
};

const wish = require("wish");

describe("the file", () => {
  var classifier = Object.create(classifierTemplate);

  classifier.songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  classifier.songList.addSong("someWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  classifier.songList.addSong("tooManyCooks", ["c", "g", "f"], 0);

  classifier.songList.addSong("iWillFollowYouIntoTheDark", ["f", "dm", "bb", "c", "a", "bbm"], 1);
  classifier.songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  classifier.songList.addSong("creep", ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"], 1);

  classifier.songList.addSong("paperBag", ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"], 2);
  classifier.songList.addSong("toxic", ["cm", "eb", "g", "cdim", "eb7", "d", "db7", "ab", "gmaj7", "g7"], 2);
  classifier.songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);

  classifier.trainAll();
  it("works", () => {
    wish(true);
  });

  it("classifies", () => {
    const classified = classifier.classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
    wish(classified.get("easy") === 1.3433333333333333);
    wish(classified.get("medium") === 1.5060259259259259);
    wish(classified.get("hard") === 1.8929091119661638);
  });

  it("label probabilities", () => {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
