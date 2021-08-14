function greet(name)
{
  // The "||" operator doesn't just return "true" or "false". It returns the
  // first value that it can coerce into a boolean value of "true". Remember,
  // operators are functions, that return values.
  name = name || "<Your name here>";
  console.log("Hello " + name);
}

greet("Tony");
greet(0);  // Careful! This will still return the default value
greet();