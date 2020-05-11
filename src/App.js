import React from "react";
import Tetris from "./components/Tetris";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Tetris />
    </div>
  </ApolloProvider>
);

export default App;
