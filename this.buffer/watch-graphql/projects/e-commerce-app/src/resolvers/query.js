export const Query = {
  hello: (parent, args, context) => {
    return "world!";
  },
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale) {
        filteredProducts = filteredProducts.filter((p) => p.onSale);
      }

      // Average rating can only be 1-5, we ignore any other value.
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          const productReviews = reviews.filter(
            (r) => r.productId === product.id
          );
          const sumRating = productReviews
            .map((r) => r.rating)
            .reduce((r1, r2) => r1 + r2, 0);
          const avgProductRating = sumRating / productReviews.length;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
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
