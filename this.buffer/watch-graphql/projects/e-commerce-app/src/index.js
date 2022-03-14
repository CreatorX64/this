import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { Query } from "./resolvers/Query.js";
import { Product } from "./resolvers/Product.js";
import { Category } from "./resolvers/Category.js";
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
