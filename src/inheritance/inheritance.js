const barky = {
  bark() {
    console.log("woof woof");
  },
};

const bitey = {
  bark() {
    console.log("grr");
  },
  bite() {
    console.log("real bite");
  },
};

const animal = {
  beFlutty() {
    console.log("flutty");
  },
  bite() {
    console.log("normal bite");
  },
};

const myPet = Object.assign(Object.create(animal), barky, bitey);

animal.beFlutty = function () {
  console.log("not fluffy");
};
animal.hasBankAccount = false;
myPet.beFlutty();
console.log(myPet.hasBankAccount);

bitey.bite = function () {
  console.log("don`t bite");
};

myPet.bark();
myPet.bite();
