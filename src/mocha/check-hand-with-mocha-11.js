var wish = require('wish');
var deepEqual = require('deep-equal');
function highestCount(values){
    var counts = {};
    values.forEach(function(value,index){
        counts[value] = 0;

        if(value == values[0]){
            counts[value] = counts[value]+1;
        }
        if(value == values[1]){
            counts[value] = counts[value]+1;
        }
        if(value == values[2]){
            counts[value] = counts[value]+1;
        }
        if(value == values[3]){
            counts[value] = counts[value]+1;
        }
        if(value == values[4]){
            counts[value] = counts[value]+1;
        }
    });

    var totalCounts = Object.keys(counts).map(function(key){
        return counts[key];
    });

    return totalCounts.sort(function(a,b){ return b-a})[0];
}
function valuesFromHand(hand){
    return hand.map(function(card){
        return card.split('-')[0];
    })
}


describe('valuesFromHand()',function(){
    it('returns just the values from a hand',function(){
        var result = valuesFromHand(['2-H','3-C','4-D','5-H','2-C']);
        wish(deepEqual(result,['2','3','4','5','2']))
    })
})

describe('highestCount()',function(){
    it('returns count of the most common card from array',function(){
        var result = highestCount(['2','4','4','4','2']);
        wish(result === 3)
    })
})