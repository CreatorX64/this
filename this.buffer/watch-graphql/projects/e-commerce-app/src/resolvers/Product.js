export const Product = {
  category: ({ categoryId }, args, { categories }) => {
    return categories.find((c) => c.id === categoryId);
  },
  reviews: ({ id }, args, { reviews }) => {
    return reviews.filter((r) => r.productId === id);
  }
};
