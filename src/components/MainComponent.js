import React from "react";
import { Switch, Route } from "react-router-dom";
import StartComponent from "./StartComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import CalendarComponent from "./CalendarComponent";
import NewCategoryComponent from "./NewCategoryComponent";
import NewTaskComponent from "./NewTaskComponent";
import ChangePasswordComponent from "./ChangePasswordComponent";

export default class MainComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartComponent}></Route>
        <Route exact path="/login" component={LoginComponent}></Route>
        <Route exact path="/register" component={RegisterComponent}></Route>
        <Route exact path="/calendar" component={CalendarComponent}></Route>
        <Route
          exact
          path="/newCategory"
          component={NewCategoryComponent}
        ></Route>
        <Route exact path="/newTask" component={NewTaskComponent}></Route>
        <Route
          exact
          path="/changePassword"
          component={ChangePasswordComponent}
        ></Route>
      </Switch>
    );
  }
}
