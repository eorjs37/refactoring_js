fs = require("fs");

var easy = "easy";
var medium = "medium";
var hard = "hard";

//노래 관련 코드들
imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
someWhereOverTheRainbow = ["c", "em", "f", "g", "am"];
tooManyCooks = ["c", "g", "f"];

iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
babyOneMoreTime = ["cm", "g", "bb", "eb", "eb", "fm", "ab"];
creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];

pagerBag = ["bm7", "e", "c", "g", "b7", "f", "em", "A", "cmaj7", "em7", "a7", "f7", "b"];
toxic = ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"];
bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

function train(chords, label) {
  songs.push([label, chords]);
  labels.push(label);

  for (var i = 0; i < chords.length; i++) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]);
    }
  }

  if (Object.keys(labelCounts).includes(label)) {
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
}

function getNumberOfSongs() {
  return songs.length;
}

function setLabelProbabilities() {
  Object.keys(labelCounts).forEach(function (label) {
    var numberOfSongs = getNumberOfSongs();
    labelProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
}

function setChordCountsInLabels() {
  songs.forEach(function (song) {
    if (chordCountsInLabels[song[0]] === undefined) {
      chordCountsInLabels[song[0]] = {};
    }

    song[1].forEach(function (chord) {
      if (chordCountsInLabels[song[0]][chord] > 0) {
        chordCountsInLabels[song[0]][chord] += 1;
      } else {
        chordCountsInLabels[song[0]][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;

  Object.keys(probabilityOfChordsInLabels).forEach(function (difficulty) {
    Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(function (chord) {
      probabilityOfChordsInLabels[difficulty][chord] /= songs.length;
    });
  });
}

train(imagine, easy);
train(someWhereOverTheRainbow, easy);
train(tooManyCooks, easy);

train(iWillFollowYouIntoTheDark, medium);
train(babyOneMoreTime, medium);
train(creep, medium);

train(pagerBag, hard);
train(toxic, hard);
train(bulletproof, hard);

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

function classify(chords) {
  var smoothing = 1.01;
  var classified = {};

  Object.keys(labelProbabilities).forEach(function (difficulty) {
    var first = labelProbabilities[difficulty] + smoothing;
    console.log(labelProbabilities);
    chords.forEach(function (chord) {
      var probabilityOfChordInLabel = probabilityOfChordsInLabels[difficulty][chord];

      if (probabilityOfChordInLabel) {
        first = first * (probabilityOfChordInLabel + smoothing);
      }
    });

    classified[difficulty] = first;
  });

  console.log(classified);
}

classify(["d", "g", "e", "em"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
