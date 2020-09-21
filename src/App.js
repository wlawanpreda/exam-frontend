import React from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/images/logo.png"

import { Main } from "./components";
import client from "./models";

const App = () => {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <div className="app">
          <img className="logo" src={logo} /> 
          <div className="container"> 
            <Main />
          </div>
        </div>
      </ApolloProvider>
      <ToastContainer />
    </RecoilRoot>
  );
};

export default App;


