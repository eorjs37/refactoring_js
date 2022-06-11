var s = ['S','D','S','C'];
var v = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];

var c = [];

var rS = function(){
    return s[Math.floor(Math.random()*(s.length))];
}

var rV = function(){
    return v[Math.floor(Math.random()*(v.length))];
}

var rC = function(){
    return rV() +'-' +rS();
}

var doIt = function(){
    c.push(rC());
    c.push(rC());
    c.push(rC());
    c.push(rC());
    c.push(rC());

    return c
}


console.log(c);

const wish = require('wish');

describe('doIt()', () => {
    it('does something', () => {
        wish(doIt().length === 5);
    });
});

describe('rC()', () => {
    it('returns match for card', () => {
        wish(rC().match(/\w{1,2}-[HDSC]/));
    });
});

describe('rV()', () => {
    it('returns match for card value', () => {
        wish(rV().match(/\w{1,2}/));
    });
});

describe('rS()', () => {
    it('returns match for suit', () => {
        wish(rS().match(/\w{1,2}/));
    });
});