export const getFilteredProducts = (filter, products, reviews) => {
  let filteredProducts = products;

  if (filter) {
    const { onSale, avgRating } = filter;

    // Check if onSale is NOT null or undefined using Abstract Equality Comparison
    if (onSale != null) {
      filteredProducts = filteredProducts.filter((p) => p.onSale === onSale);
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
};
