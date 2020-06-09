import React from "react";
import { Link } from "react-router-dom";
import { User } from "./dto.ts";

export default class LoginComponent extends React.Component {
  render() {
    return (
      <div className="loginComponent">
        <div className="loginComponentTitleRow">
          <label htmlFor="title">
            <b>Login</b>
          </label>
        </div>
        <div className="loginComponentUsernameRow">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            id="loginUsernameTextfield"
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          ></input>
        </div>
        <div className="loginComponentPasswordRow">
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            id="loginPasswordTextfield"
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          ></input>
        </div>
        <div className="loginComponentButtonsRow">
          <Link to="/">
            <button variant="outlined">Back</button>
          </Link>
          <button onClick={this.loginUser} type="submit">
            Login
          </button>
        </div>
      </div>
    );
  }

  loginUser = async () => {
    var user = new Object(User);
    user.username = document.getElementById("loginUsernameTextfield").value;
    user.password = document.getElementById("loginPasswordTextfield").value;
    var userBody = JSON.stringify(user);
    console.log("USER JSON BODY: " + userBody);
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "http://localhost:8080/login", true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        console.log("RESPONSE STATUS : " + httpRequest.status);
        if (httpRequest.status === 200) {
          alert("Nastąpiło poprawne zalogowanie");
          window.location =
            "/calendar?username=" +
            user.username +
            "&?token=" +
            httpRequest.getResponseHeader("Authorization");
        } else if (httpRequest.status === 401) {
          alert("Nieprawidłowe dane");
        } else if (httpRequest.status === 404) {
          alert("Nie znaleziono użytkownika o podanej nazwie");
        }
      }
    };

    httpRequest.send(userBody);
  };
}
