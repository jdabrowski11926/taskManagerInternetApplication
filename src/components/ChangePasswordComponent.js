import React from "react";
import { UserEditPassword } from "./dto.ts";

export default class ChangePasswordComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: this.getUrlVars()["username"],
      token: this.getUrlVars()["token"],
    };
  }
  render() {
    return (
      <div className="changePasswordComponent">
        <div className="changePasswordComponentTitleRow">
          <label htmlFor="title">
            <b>Change Password</b>
          </label>
        </div>
        <div className="changePasswordComponentOldPasswordRow">
          <label htmlFor="psw">
            <b>Old Password</b>
          </label>
          <input
            id="changePasswordOldPasswordTextfield"
            type="password"
            placeholder="Enter old Password"
            name="uname"
            required
          ></input>
        </div>
        <div className="changePasswordComponentNewPasswordRow">
          <label htmlFor="psw">
            <b>New Password</b>
          </label>
          <input
            id="changePasswordNewPasswordTextfield"
            type="password"
            placeholder="Enter new Password"
            name="uname"
            required
          ></input>
        </div>
        <div className="changePasswordComponentConfirmPasswordRow">
          <label htmlFor="psw">
            <b>Confirm new password</b>
          </label>
          <input
            id="changePasswordConfirmPasswordTextfield"
            type="password"
            placeholder="Confirm Password"
            name="uname"
            required
          ></input>
        </div>

        <div className="changePasswordComponentButtonsRow">
          <button onClick={this.backButtonHandler} type="submit">
            Back
          </button>
          <button onClick={this.applyButtonHandler} type="submit">
            Apply
          </button>
        </div>
      </div>
    );
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

  backButtonHandler = (async) => {
    window.location =
      "/calendar?username=" +
      this.state.username +
      "&?token=" +
      this.state.token;
  };

  applyButtonHandler = async () => {
    var oldPassword = document.getElementById(
      "changePasswordOldPasswordTextfield"
    ).value;
    var newPassword = document.getElementById(
      "changePasswordNewPasswordTextfield"
    ).value;
    var confirmPassword = document.getElementById(
      "changePasswordConfirmPasswordTextfield"
    ).value;
    if (newPassword === confirmPassword) {
      var editPassword = new Object(UserEditPassword);
      editPassword.oldPassword = oldPassword;
      editPassword.newPassword = newPassword;
      var passwordBody = JSON.stringify(editPassword);
      var httpRequest = new XMLHttpRequest();
      var url =
        "http://localhost:8080/user/" + this.state.username + "/edit_account";
      httpRequest.open("POST", url, true);
      httpRequest.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      httpRequest.setRequestHeader("Authorization", this.state.token);
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          console.log("RESPONSE TEXT " + httpRequest.status);
          if (httpRequest.status === 200) {
            alert("Hasło zostało poprawnie zmienione");
            window.location = "/";
          } else if (httpRequest.status === 401) {
            alert("Podano złe stare hasło");
          } else if (httpRequest.status === 404) {
            alert("Użytkownik nie został znaleziony");
          }
        }
      };
      httpRequest.send(passwordBody);
    } else {
      alert("Nowe hasło i jego potwierdzenie nie są identyczne");
    }
  };
}
