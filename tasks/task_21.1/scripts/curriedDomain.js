function curriedDomain(protocol) {
    return function (domain) {
        return function (com) {
            return `${protocol}://${domain}.${com}`;
        };
    }
}

console.log(curriedDomain('https')('example')('com'));