function fileName(){
    var theError = new Error('i am');
    return /(\w+\.js)/.exec(theError.stack)[1];
}

console.log(`Welcome to ${fileName()}`);