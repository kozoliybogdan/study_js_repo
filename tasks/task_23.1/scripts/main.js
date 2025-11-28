console.log('#1. Calorie Calculator')

class CalorieCalculator {
    constructor() {
        this.products = new Map()
    }

    addProduct(productName, calories) {
        this.products.set(productName, calories)
    }

    getProductCalories(productName) {
        return this.products.has(productName)
            ? this.products.get(productName)
            : 'Product not found'
    }

    removeProduct(productName) {
        this.products.delete(productName)
    }
}


const calorieCalculator = new CalorieCalculator()
calorieCalculator.addProduct('Apple', 52)
calorieCalculator.addProduct('Banana', 89)

console.log(calorieCalculator.getProductCalories('Apple')) // 52
console.log(calorieCalculator.getProductCalories('Banana')) // 89

calorieCalculator.removeProduct('Apple')
console.log(calorieCalculator.getProductCalories('Apple')) // Product not found/




console.log('#2. Unique Usernames')
class UniqueUsernames {
    constructor() {
        this.users = new Set()
    }

    addUser(username) {
        this.users.add(username)
    }

    exists(username) {
        return this.users.has(username)
    }

    count() {
        return this.users.size
    }
}



const uniqueUsernames = new UniqueUsernames()
uniqueUsernames.addUser('john_doe')
uniqueUsernames.addUser('jane_doe')
uniqueUsernames.addUser('john_doe') // Ця дія не змінить набір, оскільки 'john_doe' вже існує

console.log(`Існує 'john_doe': ${uniqueUsernames.exists('john_doe')}`) // true
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`) // 2