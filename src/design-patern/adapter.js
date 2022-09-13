class Target {
  hello() {
    console.log("hello");
  }
  goodbye() {
    console.log("goodbye");
  }
}

class Adaptee {
  hi() {
    console.log("hi");
  }
  bye() {
    console.log("bye");
  }
}

const formal = new Target();
formal.hello();
formal.goodbye();

const casula = new Adaptee();
casula.hi();
casula.bye();

class Adapter {
  constructor(adaptee) {
    this.hello = adaptee.hi;
    this.goodbye = adaptee.bye;
  }
}

const adaptedCasual = new Adapter(new Adaptee());
adaptedCasual.hello();
adaptedCasual.goodbye();
