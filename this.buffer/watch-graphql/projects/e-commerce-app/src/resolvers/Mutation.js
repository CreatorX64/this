import { v4 as uuid } from "uuid";

export const Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, image, quantity, price, onSale, categoryId } =
      input;

    // In a real-world application, you might want to check here if the
    // categoryId references an actual cateogry in the database before
    // moving forward. Alternatively, you can let your database handle
    // that check for you (PostgreSQL does this).

    const newProduct = {
      id: uuid(),
      name,
      description,
      image,
      quantity,
      price,
      onSale,
      categoryId
    };

    db.products.push(newProduct);

    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);

    // When we delete a category, we also need to think about what happens to
    // products that had this category. Same goes for when we delete a product
    // which has reviews. Usually, your database can handle this either by
    // cascading the delete action or by setting foreigh IDs of reference tables
    // to null. Here, we'll do it manually.

    // ON DELETE SET NULL (product.categoryId)
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null
        };
      }
      return product;
    });

    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id !== id);

    // ON DELETE CASCADE (product reviews)
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);

    if (index === -1) {
      return null;
    }

    db.categories[index] = {
      ...db.categories[index],
      ...input
    };

    return db.categories[index];
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);

    if (index === -1) {
      return null;
    }

    db.products[index] = {
      ...db.products[index],
      ...input
    };

    return db.products[index];
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);

    if (index === -1) {
      return null;
    }

    db.reviews[index] = {
      ...db.reviews[index],
      ...input
    };

    return db.reviews[index];
  }
};
