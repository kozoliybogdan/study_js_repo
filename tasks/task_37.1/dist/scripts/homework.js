var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
console.log('#20. TypeScript homework example file');
function createPerson(name, age, isActive) {
    return { name, age, isActive };
}
/*
 * #2
 */
function LogMethodCalls(target, propertyName, propertyDescriptor) {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args) {
        console.log(`Calling "${propertyName}" with arguments: ${args.join(', ')}`);
        return originalMethod.apply(this, args);
    };
    return propertyDescriptor;
}
class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
}
__decorate([
    LogMethodCalls
], Calculator.prototype, "add", null);
__decorate([
    LogMethodCalls
], Calculator.prototype, "multiply", null);
/*
 * #3
 */
var UserProfile;
(function (UserProfile) {
    function generateId() {
        return Math.random().toString(36).slice(2, 12);
    }
    function createProfile(name, email) {
        return {
            id: generateId(),
            name,
            email,
        };
    }
    UserProfile.createProfile = createProfile;
})(UserProfile || (UserProfile = {}));
export { createPerson, Calculator, UserProfile };
