function greeter(name = "user", age) {
  console.log("Hello " + name);
}

function transaction(type, { label, stock = 0 } = {}) {
  console.log(type, label, stock);
}

greeter("Andrew");
greeter();

transaction("order");
