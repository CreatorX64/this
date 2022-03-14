import { getFilteredProducts } from "../helpers.js";

export const Query = {
  hello: (parent, args, context) => {
    return "world!";
  },
  products: (parent, { filter }, { products, reviews }) => {
    return getFilteredProducts(filter, products, reviews);
  },
  product: (parent, { id }, { products }) => {
    return products.find((p) => p.id === id);
  },
  categories: (parent, args, { categories }) => {
    return categories;
  },
  category: (parent, { id }, { categories }) => {
    return categories.find((c) => c.id === id);
  }
};
