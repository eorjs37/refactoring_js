var suits = ['S','D','S','C'];
var values = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];



var randomSuit = function(){
    return suits[Math.floor(Math.random()*(suits.length))];
}

var randomValue = function(){
    return values[Math.floor(Math.random()*(values.length))];
}

var randomCard = function(){
    return randomValue() +'-' +randomSuit();
}

var randomHand = function(){
    var cards = [];
    var cardArray = buildCardArray();
    var result = spliceCard(cardArray);

    cards[0] = result[0];
    cardArray = result[1];
    result = spliceCard(cardArray);

    cards[1] = result[0];
    cardArray = result[1];
    result = spliceCard(cardArray);

    cards[2] = result[0];
    cardArray = result[1];
    result = spliceCard(cardArray);

    cards[3] = result[0];
    cardArray = result[1];
    result = spliceCard(cardArray);

    cards[4] = result[0];
    cardArray = result[1];


    return cards;
}

var buildCardArray = function(){
    var tempArray = [];
    for(let  i = 0; i< values.length ; i++){
        for(let j = 0; j < suits.length ; j++){
            tempArray.push(values[i]+'-'+suits[j]);
        }
    }
    return tempArray;
}

var spliceCard = function(cardArray){
    var takeAway = cardArray.splice(
        Math.floor(Math.random() * cardArray.length),1
    )[0];
    return [takeAway,cardArray];
}

// console.log(randomHand());

var wish = require('wish');
var deepEqual = require('deep-equal');

describe('spliceCard()', () => {
    it('returns two things', () => {
        wish(spliceCard(buildCardArray()).length === 2);
    });

    it('returns the selected card', () => {
        wish(spliceCard(buildCardArray())[0].match(/\w{1,2}-[HDSC]/));
    });

    it('returns an array with one card gone', () => {
        wish(spliceCard(buildCardArray())[1].length === buildCardArray().length -1);
    });
});

describe('randomHand()', () => {
    for(let i = 0 ; i < 100 ; i++){
        it('should not have the first two cards be the same', () => {
            var result = randomHand();
            wish(result[0] !== result[1]);
        });
    }

    it('return 5 randomCards', () => {
        wish(randomHand().length === 5);
    });
});


describe('randomCard()', () => {
    it('returns nothing', () => {
        wish(randomCard().match(/\w{1,2}-[HDSC]/));
    });
});

describe('randomValue()', () => {
    it('returns nothing', () => {
        wish(randomValue().match(/\w{1,2}/));
    });
});

describe('randomSuit()', () => {
    it('returns nothing', () => {
        wish(randomSuit().match(/\w{1,2}/));
    });
});

describe('buildCardArray()', () => {
    it('does something ?', () => {
        wish(buildCardArray())
    });
    
    it('gives a card array', () => {
        wish(deepEqual(buildCardArray(),[
            '1-S',  '1-D',  '1-S',  '1-C',  '2-S', '2-D',
            '2-S',  '2-C',  '3-S',  '3-D',  '3-S', '3-C',
            '4-S',  '4-D',  '4-S',  '4-C',  '5-S', '5-D',
            '5-S',  '5-C',  '6-S',  '6-D',  '6-S', '6-C',
            '7-S',  '7-D',  '7-S',  '7-C',  '8-S', '8-D',
            '8-S',  '8-C',  '9-S',  '9-D',  '9-S', '9-C',
            '10-S', '10-D', '10-S', '10-C', 'J-S', 'J-D',
            'J-S',  'J-C',  'Q-S',  'Q-D',  'Q-S', 'Q-C',
            'K-S',  'K-D',  'K-S',  'K-C'
          ]))
    });

    it('returns a full deck', () => {
        wish(buildCardArray().length === 52)
    });
});