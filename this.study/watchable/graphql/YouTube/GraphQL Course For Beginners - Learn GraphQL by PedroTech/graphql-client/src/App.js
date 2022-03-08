import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { DisplayData } from "./DisplayData";
import "./App.css";

export const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
};
