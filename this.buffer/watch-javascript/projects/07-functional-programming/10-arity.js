// Arity: This term simply means the number of arguments a function takes. We
// have this term because the number of arguments is important in functional
// programming: The lesser the better. Because the fewer arguments there are
// in a function, the easier it is to use it and compose/pipe it with other
// functions.

// This function has an arity of two:
function sup(a, b) {
  return a ** b;
}

// This function has an arity of three:
function add(a, b, c) {
  return a + b + c;
}
