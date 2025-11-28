// #1. Counter
const counter = (function () {
    let count = 0;

    return function (n) {
        if (n !== undefined) {
            count = n;
            return count;
        }
        return count++;
    };
})();

console.log("#1. Counter")
console.log(counter())
console.log(counter())
console.log(counter(100))
console.log(counter())
console.log(counter())
console.log(counter(500))
console.log(counter())
console.log(counter())
console.log(counter(0))
console.log(counter())
console.log(counter())


// #2. Counter Factory
const counterFactory = (function () {
    let count = 0;

    return {
        value(n) {
            if (n !== undefined) {
                count = n;
                return count;
            }
            return count;
        },

        increment() {
            count++;
        },

        decrement() {
            count--;
        }
    };
})();


console.log("#2. Counter Factory")
console.log(counterFactory.value())

counterFactory.increment()
counterFactory.increment()
counterFactory.increment()

console.log(counterFactory.value())

counterFactory.decrement()
counterFactory.decrement()

console.log(counterFactory.value())

console.log(counterFactory.value(100))

counterFactory.decrement()

console.log(counterFactory.value())

console.log(counterFactory.value(200))

counterFactory.increment()

console.log(counterFactory.value())


//3. Power Function with Callback
const myPrint = (a, b, res) => `${a}^${b}=${res}`;

const myPow = (a, b, callback) => {
    const powRec = (x, n) => {
        if (n === 0) return 1;
        if (n > 0) return x * powRec(x, n - 1);
        return 1 / powRec(x, -n);
    };
    const result = powRec(a, b);
    return callback(a, b, result);
};


console.log("#3. Power Function with Callback")
console.log(myPow(3, 4, myPrint)) // 3^4=81
console.log(myPow(2, 3, myPrint)) // 2^3=8
console.log(myPow(2, 0, myPrint)) // 2^0=1
console.log(myPow(2, -2, myPrint)) // 2^-2=0.25


// #4. Find Max in Array
const list = [12, 23, 100, 34, 56, 9, 233]
const myMax = (arr) => Math.max.apply(null, arr);

console.log("#4. Find Max in Array")
console.log(myMax(list));



// #5. Bind Function
const myMul = (a, b) => a * b;
console.log("#5. Bind Function")


const myDouble = myMul.bind(null, 2);

console.log("Double")
console.log(myDouble(3)) // = myMul(2, 3) = 6
console.log(myDouble(4)) // = myMul(2, 4) = 8
console.log(myDouble(5)) // = myMul(2, 5) = 10


const myTriple = myMul.bind(null, 3);

console.log("Triple")
console.log(myTriple(3)) // = myMul(3, 3) = 9
console.log(myTriple(4)) // = myMul(3, 4) = 12
console.log(myTriple(5)) // = myMul(3, 5) = 15