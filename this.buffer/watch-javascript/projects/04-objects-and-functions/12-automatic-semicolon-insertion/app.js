function getPerson() {
  // return  // JS engine inserts a semicolon here!
  // {
  //   name: "Tony"
  // }

  // At the end of below line, the syntax parser sees that we're starting an
  // object literal syntax so it doesn't automatically insert a semicolon
  return {
    name: "Tony"
  }
}

console.log(getPerson());