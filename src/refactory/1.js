var anObject = {
    number:5
};

var anotherObject = {
    getNumber:function(){return this.number}
}

console.log(anotherObject.getNumber.call(anObject));
console.log(anotherObject.getNumber.apply(anObject));