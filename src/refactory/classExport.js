const Diary = require('./class.js');
let d = new Diary();
d.tryLock(12345);
d.read();