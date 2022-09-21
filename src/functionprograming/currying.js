function add(numberone, numbertwo) {
  return numberone + numbertwo;
}

function addcurrying(numberone, numbertwo) {
  return function (numbertwo) {
    return numberone + numbertwo;
  };
}

const incrementer = addcurrying(1);

console.log(incrementer(2));
