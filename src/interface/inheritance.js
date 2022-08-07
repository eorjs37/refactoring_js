const barky = {
  bark() {
    console.log(`woof woof`);
  },
};

const bitey = {
  bark() {
    console.log(`grrr`);
  },
  bite() {
    console.log(`real bite`);
  },
};

const animal = {
  beFluffy() {
    console.log(`Fluffy`);
  },
  bite() {
    console.log(`normal bite`);
  },
};

const myPet = Object.assign(Object.create(animal), barky, bitey);
myPet.beFluffy();
myPet.bark();
myPet.bite();

const myPet2 = Object.assign({}, animal, barky, bitey);
console.log(myPet2);
