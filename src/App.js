import React from "react";
import { RecoilRoot } from "recoil";

import { ApolloProvider } from '@apollo/client';

import { Main } from "./components";
import client from "./models";

const App = () => {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <div className="app">
          <div className="container">
            <Main />
          </div>
        </div>
      </ApolloProvider>
    </RecoilRoot>
  );
};

export default App;
