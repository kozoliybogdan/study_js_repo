console.log('#11. JavaScript homework example file')

/*
 * #1
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє, чи є цей рядок валідною електронною адресою за допомогою регулярного виразу.
 * Функція повертає true, якщо електронна адреса валідна, і false в іншому випадку.
 *
 */
function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email.trim());
}

console.log('example@example.com');
console.log(isValidEmail('example@example.com')) // true
console.log('invalid-email');
console.log(isValidEmail('invalid-email'))       // false


/*
 * #2
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє, чи є цей рядок валідним URL веб-сайту за допомогою регулярного виразу.
 * Функція повертає true, якщо URL валідний, і false в іншому випадку.
 *
 */
function isValidUrl(url) {
    if (typeof url !== 'string') return false;
    const re = /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}(:\d{2,5})?(\/[^\s]*)?$/i;
    return re.test(url.trim());
}

console.log('https://www.example.com');
console.log(isValidUrl('https://www.example.com')) // true
console.log('invalid-url');
console.log(isValidUrl('invalid-url'))             // false