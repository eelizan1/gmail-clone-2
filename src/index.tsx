import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

const target = document.getElementById("root");

render(
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>,
  target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
