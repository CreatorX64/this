// Global
//   Local
//     Local
//   Local

// let name = "Andrew";

if (true)
{
  // let name = "Mike";  // Variable shadowing.

  if (true)
  {
    // If this variable isn't defined in a parent scope, it will get created
    // at the global scope by the runtime. This is called "leaked global". To
    // avoid leaked globals, always declare your variables in the current scope
    // or in a parent scope using the keyword "let".
    // name = "Jen";
    let name = "Jen";

    console.log(name);
  }
}

if (true)
{
  console.log(name);
}