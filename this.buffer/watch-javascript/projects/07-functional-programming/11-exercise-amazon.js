const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: []
};

const amazonHistory = [];

const result = purchaseItem(
  emptyCart,
  buyItem,
  applyTaxToItems,
  addItemToCart
)(user, { name: "Laptop", price: 200 });
console.log(result);
console.log(amazonHistory);

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function compose(f, g) {
  return function (...args) {
    return f(g(...args));
  };
}

function addItemToCart(user, item) {
  amazonHistory.push(user);
  const updatedCart = [...user.cart, item];
  return { ...user, cart: updatedCart };
}

function applyTaxToItems(user) {
  amazonHistory.push(user);
  const { cart } = user;
  const taxRate = 1.3;
  const updatedCart = cart.map((item) => {
    return { ...item, price: item.price * taxRate };
  });
  return { ...user, cart: updatedCart };
}

function buyItem(user) {
  amazonHistory.push(user);
  return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
  amazonHistory.push(user);
  return Object.assign({}, user, { cart: [] });
}
