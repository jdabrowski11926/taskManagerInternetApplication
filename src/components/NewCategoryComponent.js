import React from "react";
import { Category } from "./dto.ts";

export default class NewCategoryComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: this.getUrlVars()["username"],
      token: this.getUrlVars()["token"],
    };
  }
  render() {
    return (
      <div className="newCategoryComponent">
        <div className="newCategoryComponentTitleRow">
          <label htmlFor="title">
            <b>New category</b>
          </label>
        </div>
        <div className="newCategoryComponentNameRow">
          <label htmlFor="uname">
            <b>Category name</b>
          </label>
          <input
            id="newCategoryNameTextfield"
            type="text"
            placeholder="Enter category name"
            name="uname"
            required
          ></input>
        </div>
        <div className="newCategoryComponentDescriptionRow">
          <label htmlFor="uname">
            <b>Category description</b>
          </label>
          <input
            id="newCategoryDescriptionTextfield"
            type="text"
            placeholder="Enter description name"
            name="uname"
            required
          ></input>
        </div>
        <div className="newCategoryComponentButtonsRow">
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
    var category = new Object(Category);
    category.name = document.getElementById("newCategoryNameTextfield").value;
    category.description = document.getElementById(
      "newCategoryDescriptionTextfield"
    ).value;
    category.user = this.state.username;
    var categoryBody = JSON.stringify(category);
    var username = this.getUrlVars()["username"];
    var httpRequest = new XMLHttpRequest();
    var url = "http://localhost:8080/user/" + this.state.username + "/category";
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    httpRequest.setRequestHeader("Authorization", this.state.token);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4) {
        console.log("RESPONSE TEXT " + httpRequest.status);
        if (httpRequest.status == 201) {
          alert("Poprawnie utworzono kategorię");
        } else if (httpRequest.status == 401) {
          alert("Użytkownik nie jest uprawniony do wykonania tej czynności");
        } else if (httpRequest.status == 404) {
          alert("Użytkownik nie został znaleziony");
        } else if (httpRequest.status == 406) {
          alert("Nazwa kategorii nie została podana");
        } else if (httpRequest.status == 409) {
          alert("Kategoria o podanej nazwie już istnieje");
        }
      }
    };
    httpRequest.send(categoryBody);
  };
}
