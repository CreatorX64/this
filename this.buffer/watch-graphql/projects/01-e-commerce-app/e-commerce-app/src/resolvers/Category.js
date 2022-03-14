import { getFilteredProducts } from "../helpers.js";

export const Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (p) => p.categoryId === categoryId
    );
    return getFilteredProducts(filter, categoryProducts, db.reviews);
  }
};
