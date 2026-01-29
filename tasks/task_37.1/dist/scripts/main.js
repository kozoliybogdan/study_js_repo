import { createPerson, Calculator, UserProfile } from './homework.js';
const newPerson = createPerson('Олександр', 31, false);
console.log(newPerson);
const calculator = new Calculator();
// "Calling "add" with arguments: 2, 3"
console.log(calculator.add(2, 3)); // 5
// "Calling "multiply" with arguments: 3, 4"
console.log(calculator.multiply(3, 4)); // 12
const profile = UserProfile.createProfile('John Doe', 'john@example.com');
console.log(profile);
