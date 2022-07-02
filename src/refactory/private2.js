var dirary = (function(){
    var key = 12345;
    var secrets = 'rosebud';

    function privateUnlock(keyAttempt){
        console.log('privateUnlock this : ' ,this);
        if(key === keyAttempt){
            console.log('unlocked');
            dirary.open = true;
        }
        else{
            console.log('no');
        }
    }

    function privateTryLock(keyAttempt){
        console.log('privateTryLock this : ' , this);
        privateUnlock(keyAttempt)
    }
    
    function privateRead(){
        if(this.open){
            console.log(secrets);
        }
        else{
            console.log('no');
        }
    }

    return{
        open: false,
        read: privateRead,
        tryLock: privateTryLock
    }
})();

dirary.tryLock(12345),
dirary.read();