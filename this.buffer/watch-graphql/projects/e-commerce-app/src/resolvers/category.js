export const Category = {
  products: ({ id: categoryId }, { filter }, { products, reviews }) => {
    const categoryProducts = products.filter(
      (p) => p.categoryId === categoryId
    );
    let filteredCategoryProducts = categoryProducts;

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (p) => p.onSale
        );
      }

      // Average rating can only be 1-5, we ignore any other value.
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            const productReviews = reviews.filter(
              (r) => r.productId === product.id
            );
            const sumRating = productReviews
              .map((r) => r.rating)
              .reduce((r1, r2) => r1 + r2, 0);
            const avgProductRating = sumRating / productReviews.length;
            return avgProductRating >= avgRating;
          }
        );
      }
    }

    return filteredCategoryProducts;
  }
};
