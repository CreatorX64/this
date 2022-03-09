import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { Query } from "./resolvers/query.js";
import { Product } from "./resolvers/product.js";
import { Category } from "./resolvers/category.js";
import { products, categories, reviews } from "./db.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product
  },
  context: {
    categories,
    products,
    reviews
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
