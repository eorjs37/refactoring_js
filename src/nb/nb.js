fs = require("fs");
//노래 관련 코드들
imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
somewhere_over_the_rainbow = ["c", "em", "f", "g", "am"];
tooManyCooks = ["c", "g", "f"];
iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
babyOneMoreTime = ["cm", "g", "bb", "eb", "eb", "fm", "ab"];
creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
army = ["ab", "ebm7", "dbadd9", "fm7", "bbm", "abmaj7", "ebm"];
pagerBag = ["bm7", "e", "c", "g", "b7", "f", "em", "A", "cmaj7", "em7", "a7", "f7", "b"];
toxic = ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"];
bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];
song_11 = [];

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

  for (var i = 0; i < chords.lenght; i++) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]);
    }
  }

  if (!!Object.keys(labelCounts).includes(label)) {
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
  songs.forEach(function (i) {
    if (chordCountsInLabels[i[0]] === undefined) {
      chordCountsInLabels[i[0]] = {};
    }

    i[1].forEach(function (j) {});
  });
}
