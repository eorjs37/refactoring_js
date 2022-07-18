function fileName() {
  var theError = new Error("here i am");
  return theError.stack.match(/\/(\w+\.js)\:/)[1];
}

console.log(`Welcome to ${fileName()}`);

//노래 관련코드들
imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
someWhereOverTheRainbow = ["c", "em", "f", "g", "am"];
tooManyCooks = ["c", "g", "f"];
iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];
creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
army = ["ab", "ebm7", "dbadd9", "fm7", "bbm", "abmaj7", "ebm"];
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

toxic = ["cm", "eb", "g", "cdim", "eb7", "d", "db7", "ab", "gmaj7", "g7"];
bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];
blankSong = [];

var songs = [];

var allChords = new Set();
var labelCounts = new Map();
var labelProbabilities = new Map();
var chordCountsInLabels = new Map();
var probabilityOfChordsInLabels = new Map();

var easy = "easy";
var medium = "medium";
var hard = "hard";

function train(chords, label) {
  var labels = [];
  songs.push({ label, chords });
  labels.push(label);

  chords.forEach((chord) => allChords.add(chord));

  if (Array.from(labelCounts.keys()).includes(label)) {
    labelCounts.set(label, labelCounts.get(label) + 1);
  } else {
    labelCounts.set(label, 1);
  }
}

function setLabelProbabilities() {
  labelCounts.forEach(function (_count, label) {
    labelProbabilities.set(label, labelCounts.get(label) / songs.length);
  });
}
function setChrodCountsInLabels() {
  songs.forEach(function (song) {
    if (chordCountsInLabels.get(song.label) === undefined) {
      chordCountsInLabels.set(song.label, {});
    }

    song.chords.forEach(function (chord) {
      if (chordCountsInLabels.get(song.label)[chord] > 0) {
        chordCountsInLabels.get(song.label)[chord] += 1;
      } else {
        chordCountsInLabels.get(song.label)[chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;

  probabilityOfChordsInLabels.forEach(function (_chords, difficulty) {
    Object.keys(probabilityOfChordsInLabels.get(difficulty)).forEach(function (
      chord
    ) {
      probabilityOfChordsInLabels.get(difficulty)[chord] /= songs.length;
    });
  });
}

train(imagine, easy);
train(someWhereOverTheRainbow, easy);
train(tooManyCooks, easy);

train(iWillFollowYouIntoTheDark, medium);
train(babyOneMoreTime, medium);
train(creep, medium);

train(paperBag, hard);
train(toxic, hard);
train(bulletproof, hard);

setLabelProbabilities();
setChrodCountsInLabels();
setProbabilityOfChordsInLabels();

function classify(chords) {
  var something = 1.01;
  var classififed = new Map();

  labelProbabilities.forEach(function (_probabilities, difficulty) {
    var first = labelProbabilities.get(difficulty) + something;
    chords.forEach(function (chord) {
      var probabilityOfChordInLabel =
        probabilityOfChordsInLabels.get(difficulty)[chord];
      if (probabilityOfChordInLabel !== undefined) {
        first *= probabilityOfChordInLabel + something;
      }
    });
    classififed.set(difficulty, first);
  });

  console.log(classififed);
}

classify(["d", "g", "e", "dm"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
