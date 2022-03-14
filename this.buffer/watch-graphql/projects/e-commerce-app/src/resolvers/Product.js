export const Product = {
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((c) => c.id === categoryId);
  },
  reviews: ({ id }, args, { db }) => {
    return db.reviews.filter((r) => r.productId === id);
  }
};
