function defUpperStr(str) {
  return (str || 'DEFAULT TEXT').toUpperCase();
}

console.log(defUpperStr('My text'));
console.log(defUpperStr());


function ageClassification(n) {
  return (n > 0) ? 
    (n <= 24) ? 'Дитинство' :
    (n <= 44) ? 'Молодість' :
    (n <= 65) ? 'Зрілість' :
    (n <= 75) ? 'Старість' :
    (n <= 90) ? 'Довголіття' :
    (n <= 122) ? 'Рекорд' : null
  : null;
}


console.log(ageClassification(91));


function mainFunc(a, b, cb) {
    if (typeof cb === 'function') {
        return cb(a, b);
    }
 }

function cbRandom(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

console.log(mainFunc(1, 7, cbRandom));

function cbPow(a, b) {
    return Math.pow(a, b);
}

console.log(mainFunc(2, 3, cbPow));

function cbAdd(a, b) {
    return a + b;
}

console.log(mainFunc(2, 3, cbAdd));