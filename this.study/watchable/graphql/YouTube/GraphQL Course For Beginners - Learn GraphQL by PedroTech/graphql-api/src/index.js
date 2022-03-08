import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: () => ({ name: "Pedro" })
  context: ({ req }) => ({ name: "Pedro", req })
});

server.listen().then(({ url }) => {
  console.log(`GraphQL API server is running at: ${url}`);
});
