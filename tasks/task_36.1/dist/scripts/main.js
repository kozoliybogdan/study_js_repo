import { sumArray, createUser, OrderStatus, getOrderStatus } from './homework.js';
console.log(sumArray([1, 2, 3, 4]));
console.log(sumArray([]));
const newUser = createUser('Анна', 25, true);
console.log(newUser);
console.log(getOrderStatus(OrderStatus.Pending));
console.log(getOrderStatus(OrderStatus.Shipped));
console.log(getOrderStatus(OrderStatus.Delivered));
console.log(getOrderStatus(OrderStatus.Cancelled));
