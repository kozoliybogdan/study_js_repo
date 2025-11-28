function originalFunction(num) {
  return num * num;
}

function modifyFunction(originalFunc, multiplier) {
  return function (value) {
    return originalFunc(value) * multiplier;
  };
}

const modifiedFunc = modifyFunction(originalFunction, 3);

console.log(originalFunction(4));
console.log(modifiedFunc(4));