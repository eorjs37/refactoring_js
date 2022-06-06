var wish = require('wish');
function multiplesIn(hand){

}

describe('multiplesIn()',function(){
    it('finds a duplicate',function(){
        var result = multiplesIn(['2-H','3-C','4-D','5-H','2-C']);
        wish(result === 2);
    })
})