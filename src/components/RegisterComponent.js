import React from "react";
import { Link } from "react-router-dom";
import { User } from "./dto.ts";

export default class RegisterComponent extends React.Component {
  render() {
    return (
      <div className="registerComponent">
        <div className="registerComponentTitleRow">
          <label htmlFor="title">
            <b>Register new user</b>
          </label>
        </div>
        <div className="registerComponentUsernameRow">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            id="registerUsernameTextfield"
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          ></input>
        </div>
        <div className="registerComponentPasswordRow">
          <label htlmfor="psw">
            <b>Password</b>
          </label>
          <input
            id="registerPasswordTextfield"
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          ></input>
        </div>
        <div className="registerComponentButtonsRow">
          <Link to="/">
            <button variant="outlined">Back</button>
          </Link>
          <button onClick={this.registerUser} type="submit">
            Register
          </button>
        </div>
      </div>
    );
  }

  registerUser = async () => {
    var user = new Object(User);
    user.username = document.getElementById("registerUsernameTextfield").value;
    user.password = document.getElementById("registerPasswordTextfield").value;

    var userBody = JSON.stringify(user);
    console.log("USER JSON BODY: " + userBody);

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "http://localhost:8080/sign-up", true);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    httpRequest.setRequestHeader(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        console.log("RESPONSE TEXT " + httpRequest.status);
        if (httpRequest.status === 201) {
          alert("Poprawnie utworzono użytkownika");
          window.location = "/";
        } else if (httpRequest.status === 406) {
          alert("Podano złe dane (brak nazwy lub hasła)");
        } else if (httpRequest.status === 409) {
          alert("Użytkownik o podanej nazwie już istnieje");
        }
      }
    };
    httpRequest.send(userBody);
  };
}
