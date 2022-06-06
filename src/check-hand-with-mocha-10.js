var wish = require('wish');
var deepEqual = require('deep-equal');
function highestCount(values){

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