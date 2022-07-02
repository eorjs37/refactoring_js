var key = 12345;
var secrets = 'the average human lives around 1000 months';

function globalUnlock(keyAttempt){
    if(key === keyAttempt){
        console.log('unlocked');
        this.open = true;
    }
    else{
        console.log('no');
    }
}

module.exports  =  class Diary{
    constructor(){
        this.open = false;
    }

    tryLock(keyAttempt){
        globalUnlock.bind(this)(keyAttempt)
    };

    read(){
        if(this.open){
            console.log(secrets);
        }
        else{
            console.log('no');
        }
    }
}

// d = new Diary();
// d.tryLock(12345);
// d.read();
