import React from "react";
import { Route, Link } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div className="StartComponent">
        <div className="homeTitleRow">
          <label htmlFor="title">
            <b>Home page</b>
          </label>
        </div>
        <div className="StartComponentLogin">
          <Link to="/login">
            <button variant="outlined">Login</button>
          </Link>
        </div>
        <div className="StartComponentRegister">
          <Link to="/register">
            <button variant="outlined">Register</button>
          </Link>
        </div>
      </div>
    );
  }
}
