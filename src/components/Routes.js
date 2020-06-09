import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import LoginComponent from "./LoginComponent";
import { Link } from "react-router";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/login" component={LoginComponent} />
  </Route>
);
