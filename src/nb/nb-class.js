class Classifier {
  constructor() {
    this._songList = {
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
    };
    this._labelCounts = new Map();
    this._labelProbabilities = new Map();
    this._something = 1.01;
  }

  addSong(...songParams) {
    this._songList.addSong(...songParams);
  }

  _chordCountForDifficulty(difficulty, testChord) {
    return this._songList.songs.reduce(function (counter, song) {
      if (song.difficulty === difficulty) {
        counter += song.chords.filter((chord) => chord === testChord).length;
      }
      return counter;
    }, 0);
  }

  setChrodCountsInLabels() {
    this._songList.songs.forEach(function (song) {
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
  }

  setProbabilityOfChordsInLabels() {
    this.chordCountsInLabels.forEach(function (_chords, difficulty) {
      Object.keys(this.chordCountsInLabels.get(difficulty)).forEach(function (chord) {
        this.chordCountsInLabels.get(difficulty)[chord] /= this.songs.length;
      }, this);
    }, this);
  }

  _likelihoodFromChord(difficulty, chord) {
    return this._chordCountForDifficulty(difficulty, chord) / this._songList.songs.length;
  }

  _valueForChorDifficulty(difficulty, chord) {
    const value = this._likelihoodFromChord(difficulty, chord);

    return value ? value + this._something : 1;
  }

  classify(chords) {
    return new Map(
      Array.from(this._labelProbabilities.entries()).map((labelWithProbability) => {
        const difficulty = labelWithProbability[0];

        return [
          difficulty,
          chords.reduce((total, chord) => {
            return total * this._valueForChorDifficulty(difficulty, chord);
          }, this._labelProbabilities.get(difficulty) + this._something),
        ];
      })
    );
  }

  _trainAll() {
    this._songList.songs.forEach((song) => {
      this._train(song.chords, song.difficulty);
    }, this);

    this._setLabelProbabilities();
  }

  _train(chords, label) {
    chords.forEach(
      function (chord) {
        this._songList.allChords.add(chord);
      }.bind(this)
    );

    if (Array.from(this._labelCounts.keys()).includes(label)) {
      this._labelCounts.set(label, this._labelCounts.get(label) + 1);
    } else {
      this._labelCounts.set(label, 1);
    }
  }

  _setLabelProbabilities() {
    this._labelCounts.forEach(function (_count, label) {
      this._labelProbabilities.set(label, this._labelCounts.get(label) / this._songList.songs.length);
    }, this);
  }
}

const wish = require("wish");

describe("the file", () => {
  var classifier = new Classifier();

  classifier.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  classifier.addSong("someWhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  classifier.addSong("tooManyCooks", ["c", "g", "f"], 0);

  classifier.addSong("iWillFollowYouIntoTheDark", ["f", "dm", "bb", "c", "a", "bbm"], 1);
  classifier.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  classifier.addSong("creep", ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"], 1);

  classifier.addSong("paperBag", ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"], 2);
  classifier.addSong("toxic", ["cm", "eb", "g", "cdim", "eb7", "d", "db7", "ab", "gmaj7", "g7"], 2);
  classifier.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);

  classifier._trainAll();
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
    wish(classifier._labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier._labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier._labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
