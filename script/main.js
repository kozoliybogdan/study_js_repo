console.log('JS #1. Домашнє завдання. Основи JavaScript: Працюємо зі змінними, типами даних');

/*
 * #1
 *
 * Створіть змінні зі значеннями.
 */

const myNum = 10; // ім'я змінної: myNum, значення: 10
console.log(myNum);
const myStr = 'some string'; // ім'я змінної: myStr, значення: 'some string'
console.log(myStr);
const myBool = true; // ім'я змінної: myBool, значення: true
console.log(myBool);

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * Результат збережіть у змінній decimal2.
 */

let myNumber = 35;
let decimal2 = myNumber.toFixed(2);
console.log(decimal2);

/*
 * #3
 *
 * Створіть змінну myBigInt і запишіть в неї число 123n (BigInt).
 * Потім збільште його на 1 та запищіть в цю ж саму змінну.
 */

let myBigInt = 2354235n;
myBigInt = myBigInt + 1n;
console.log(myBigInt);