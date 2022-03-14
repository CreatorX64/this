import { getFilteredProducts } from "../helpers.js";

export const Category = {
  products: ({ id: categoryId }, { filter }, { products, reviews }) => {
    const categoryProducts = products.filter(
      (p) => p.categoryId === categoryId
    );
    return getFilteredProducts(filter, categoryProducts, reviews);
  }
};
