import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AddBookForm } from "./components/AddBookForm";
import { BookList } from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

export const App = () => (
  <ApolloProvider client={client}>
    <div className="main">
      <h1>Ninja's Reading List</h1>
      <BookList />
      <AddBookForm />
    </div>
  </ApolloProvider>
);
