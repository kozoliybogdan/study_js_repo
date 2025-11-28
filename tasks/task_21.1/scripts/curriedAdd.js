function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}


console.log(curriedAdd(1)(2)(3))