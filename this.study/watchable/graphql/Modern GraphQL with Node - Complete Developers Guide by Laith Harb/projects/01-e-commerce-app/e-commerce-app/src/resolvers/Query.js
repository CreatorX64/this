import { getFilteredProducts } from "../helpers.js";

export const Query = {
  hello: (parent, args, context) => {
    return "world!";
  },
  products: (parent, { filter }, { db }) => {
    return getFilteredProducts(filter, db.products, db.reviews);
  },
  product: (parent, { id }, { db }) => {
    return db.products.find((p) => p.id === id);
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, { id }, { db }) => {
    return db.categories.find((c) => c.id === id);
  }
};
