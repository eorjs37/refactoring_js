//노래 관련 코드들
imagine = ['c','cmaj7','f','am','dm','g','e7'];
songWhereOverTheRainbow = ['c','em','f','g','am'];
tooManyCooks = ['c','g','f'];
iWillFoolowYouIntoTheDark = ['f','dm','bb','c','a','bbm'];
babyOneMoreTime = ['cm','g','bb','eb','fm','ab'];
creep = ['g','gsus4','b','bsus4','c','cmsus4','cm6'];
paperBag = ['bm7','e','c','g','b7','f','em','a','cmaj7','em7','a7','f7','b'];
toxic = ['cm','eb','g','cdim','eb7','d7','db7','ab','gmaj7','g7'];
bulletproof = ['d#m','g#','b','f#','g#m','c#'];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

function train(chrods, label){
    songs.push([label,chrods]);

    labels.push(label);

    for(var  index = 0 ; index < chrods.length ; index++){
        if(!allChords.includes(chrods[index])){
            allChords.push(chrods[index]);
        }
    }

    if(Object.keys(labelCounts).includes(label)){
        labelCounts[label] = labelCounts[label] + 1;
    }
    else{
        labelCounts[label] = 1;
    }
}


function getNumberOfSongs(){
    return songs.length;
}

function setLabelProbabilities(){
    Object.keys(labelCounts).forEach(function(label){
        var numberOfSongs = getNumberOfSongs();
        labelProbabilities[label] = labelCounts[label] / numberOfSongs;
    })
}

function setChrodCountInLables(){
    songs.forEach(function(song){
        if(chordCountsInLabels[song[0]] === undefined){
            chordCountsInLabels[song[0]] = {};
        }

        song[1].forEach(function(chrod){
            if(chordCountsInLabels[song[0]][chrod] > 0){
                chordCountsInLabels[song[0]][chrod] = chordCountsInLabels[song[0]][chrod] +1;
            }
            else{
                chordCountsInLabels[song[0]][chrod] = 1;
            }
        })
    })
}

function setProbabilityOfChordsInLabels(){
    probabilityOfChordsInLabels = chordCountsInLabels;
    Object.keys(probabilityOfChordsInLabels).forEach(function(difficulty){
        Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(function(chrod){
            probabilityOfChordsInLabels[difficulty][chrod] = probabilityOfChordsInLabels[difficulty][chrod] * 1.0 / songs.length;
        })
    })
}

train(imagine,'easy');
train(songWhereOverTheRainbow,'easy');
train(tooManyCooks,'easy');

train(iWillFoolowYouIntoTheDark,'medium');
train(babyOneMoreTime,'medium');
train(creep,'medium');

train(paperBag,'hard');
train(toxic,'hard');
train(bulletproof,'hard');

setLabelProbabilities();
setChrodCountInLables();
setProbabilityOfChordsInLabels();

function classify(chrods){
    var total = labelProbabilities;
    console.log(total);
    var classified = {};
    Object.keys(total).forEach(function(difficulty){
        var first = labelProbabilities[difficulty] + 1.01;
        chrods.forEach(function(chord){
            var probabilityOfChordInLabel =
            probabilityOfChordsInLabels[difficulty][chord];

            if(probabilityOfChordInLabel === undefined){
                first + 1.01;
            }
            else{
                first = first * (probabilityOfChordInLabel + 1.01);
            }
        });
        classified[difficulty] = first;
    });

    console.log(classified);
};

classify(['d','g','e','dm']);
classify(['f#m7','a','dadd9','dmaj7','bm','bm7','d','f#m'])