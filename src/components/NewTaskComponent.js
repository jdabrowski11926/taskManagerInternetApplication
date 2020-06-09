import React from "react";
import { Task } from "./dto.ts";

export default class NewTaskComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: this.getUrlVars()["username"],
      token: this.getUrlVars()["token"],
      categoryNames: "",
    };
  }
  render() {
    return (
      <div className="newTaskComponent">
        <div className="newTaskComponentTitleRow">
          <label htmlFor="title">
            <b>New task</b>
          </label>
        </div>
        <div className="dropdown">
          <label htmlFor="uname">
            <b>Category</b>
          </label>
          <select
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="categoryDropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onLoad={this.onLoad()}
          ></select>
        </div>
        <div className="newTaskComponentNameRow">
          <label htmlFor="uname">
            <b>Task name</b>
          </label>
          <input
            id="newTaskNameTextfield"
            type="text"
            placeholder="Enter task name"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentDescriptionRow">
          <label htmlFor="uname">
            <b>Task description</b>
          </label>
          <input
            id="newTaskDescriptionTextfield"
            type="text"
            placeholder="Enter task description"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentStartDateRow">
          <label htmlFor="uname">
            <b>Task start date/time</b>
          </label>
          <input
            id="newTaskStartDateTextfield"
            type="date"
            placeholder="Enter task start date"
            name="uname"
            data-date-format="DD/MMMM/YYYY"
            required
          ></input>
          <input
            id="newTaskStartTimeTextfield"
            type="time"
            placeholder="Enter task start date"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentEndDateRow">
          <label htmlFor="uname">
            <b>Task end date/time</b>
          </label>
          <input
            id="newTaskEndDateTextfield"
            type="date"
            placeholder="Enter task end date"
            name="uname"
            required
          ></input>
          <input
            id="newTaskEndTimeTextfield"
            type="time"
            placeholder="Enter task end date"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentActiveRow">
          <label htmlFor="title">
            <b>Active</b>
          </label>
          <input
            id="newTaskActiveCheckbox"
            type="checkbox"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentNotificationRow">
          <label htmlFor="title">
            <b>Notification</b>
          </label>
          <input
            id="newTaskNotificationCheckbox"
            type="checkbox"
            name="uname"
            required
          ></input>
        </div>
        <div className="newTaskComponentButtonRow">
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

  onLoad() {
    var httpRequest = new XMLHttpRequest();
    var url = "http://localhost:8080/user/" + this.state.username + "/category";
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    httpRequest.setRequestHeader("Authorization", this.state.token);
    httpRequest.onreadystatechange = function () {
      console.log("Get Categories - Response status " + httpRequest.status);
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var body = JSON.parse(httpRequest.response);
          var categoryNameList = [];
          if (httpRequest.response !== undefined) {
            for (var i = 0; i < body.length; i++) {
              categoryNameList.push(body[i].name);
            }
          }
          var categoryDropdownMenu = document.getElementById(
            "categoryDropdownMenu"
          );
          var length = categoryDropdownMenu.options.length;
          for (i = length - 1; i >= 0; i--) {
            categoryDropdownMenu.options[i] = null;
          }
          for (i = 0; i < categoryNameList.length; i++) {
            var opt = categoryNameList[i];
            var element = document.createElement("option");
            element.textContent = opt;
            element.value = opt;
            categoryDropdownMenu.appendChild(element);
          }
        } else if (httpRequest.status === 401) {
          alert("Użytkownik nie jest uprawniony do wykonania tej czynności");
        }
      }
    };
    httpRequest.send();
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
    var task = new Object(Task);
    var categoryMenu = document.getElementById("categoryDropdownMenu");
    var categoryName;
    if (categoryMenu.options[categoryMenu.selectedIndex] !== undefined) {
      categoryName = categoryMenu.options[categoryMenu.selectedIndex].value;
    }

    task.name = document.getElementById("newTaskNameTextfield").value;
    task.description = document.getElementById(
      "newTaskDescriptionTextfield"
    ).value;

    var taskStartDate = document.getElementById("newTaskStartDateTextfield")
      .value;
    var taskStartYear = taskStartDate.substring(0, 4);
    var taskStartMonth = taskStartDate.substring(5, 7);
    var taskStartDay = taskStartDate.substring(8, 10);
    var taskStartDateFormated =
      "" + taskStartDay + "/" + taskStartMonth + "/" + taskStartYear;
    var taskStartTime = document.getElementById("newTaskStartTimeTextfield")
      .value;
    task.startDateTime = taskStartDateFormated + " " + taskStartTime;

    var taskEndDate = document.getElementById("newTaskEndDateTextfield").value;
    var taskEndYear = taskEndDate.substring(0, 4);
    var taskEndMonth = taskEndDate.substring(5, 7);
    var taskEndDay = taskEndDate.substring(8, 10);
    var taskEndDateFormated =
      "" + taskEndDay + "/" + taskEndMonth + "/" + taskEndYear;
    var taskEndTime = document.getElementById("newTaskEndTimeTextfield").value;
    task.endDateTime = taskEndDateFormated + " " + taskEndTime;

    task.active = document.getElementById("newTaskActiveCheckbox").checked;
    task.notification = document.getElementById(
      "newTaskNotificationCheckbox"
    ).checked;

    var taskBody = JSON.stringify(task);
    var httpRequest = new XMLHttpRequest();
    var url =
      "http://localhost:8080/user/" +
      this.state.username +
      "/category/" +
      categoryName +
      "/task";
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    httpRequest.setRequestHeader("Authorization", this.state.token);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        console.log("RESPONSE TEXT " + httpRequest.status);
        if (httpRequest.status === 201) {
          alert("Poprawnie utworzono zadanie");
        } else if (httpRequest.status === 401) {
          alert("Użytkownik nie jest uprawniony do wykonania tej czynności");
        } else if (httpRequest.status === 404) {
          alert("Użytkownik nie został znaleziony");
        } else if (httpRequest.status === 409) {
          alert("Kategoria o podanej nazwie już istnieje");
        }
      }
    };
    httpRequest.send(taskBody);
  };
}
