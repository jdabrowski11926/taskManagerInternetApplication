import React from "react";

export default class CalendarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: this.getUrlVars()["username"],
      token: this.getUrlVars()["token"],
    };
  }
  render() {
    return (
      <div className="calendarComponent">
        <div className="calendarComponentTitleRow">
          <label htmlFor="title">
            <b>Calendar site</b>
          </label>
        </div>
        <div className="StartComponent">
          <div className="StartComponentLogin">
            <button onClick={this.newCategoryButtonHandler} type="submit">
              New Category
            </button>
            <button onClick={this.newTaskButtonHandler} type="submit">
              New Task
            </button>
            <button onClick={this.changePasswordButtonHandler} type="submit">
              Change password
            </button>
          </div>
        </div>
        <div
          className="calendarListComponent"
          id="calendarListComponent"
          onLoad={this.loadCategories()}
        ></div>
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

  loadCategories() {
    var httpRequest = new XMLHttpRequest();
    var url = "http://localhost:8080/user/" + this.state.username + "/category";
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );

    httpRequest.setRequestHeader("Authorization", this.state.token);
    var username = this.state["username"];
    var token = this.state["token"];
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        console.log("Get Categories - Response status " + httpRequest.status);
        if (httpRequest.status === 200) {
          var body = JSON.parse(httpRequest.response);
          if (httpRequest.response !== undefined) {
            var categoryNameList = [];
            for (var i = 0; i < body.length; i++) {
              categoryNameList.push(body[i].name);
            }
            for (i = 0; i < categoryNameList.length; i++) {
              loadTasks(categoryNameList[i], username, token);
            }
          }
        } else if (httpRequest.status === 401) {
          alert("Użytkownik nie jest uprawniony do wykonania tej czynności");
        }
      }
    };
    httpRequest.send();

    function loadTasks(categoryName, username, token) {
      var httpRequest = new XMLHttpRequest();
      var url =
        "http://localhost:8080/user/" +
        username +
        "/category/" +
        categoryName +
        "/task";
      httpRequest.open("GET", url, true);
      httpRequest.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      httpRequest.setRequestHeader("Authorization", token);
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            //alert("Poprawnie pobrano listę zadań");
            var body = JSON.parse(httpRequest.response);
            var calendarListComponent = document.getElementById(
              "calendarListComponent"
            );
            if (httpRequest.response !== undefined) {
              for (var i = 0; i < body.length; i++) {
                var element = createTaskPanel(body[i]);
                calendarListComponent.appendChild(element);
              }
            }
          } else if (httpRequest.status === 401) {
            alert("Użytkownik nie jest uprawniony do wykonania tej czynności");
          }
        }
      };
      httpRequest.send();
    }

    function createTaskPanel(task) {
      var divMain = document.createElement("div");
      var divTask = document.createElement("div");

      var divCol1 = document.createElement("div");
      divCol1.style.float = "left";
      divCol1.style.borderTop = "1px solid black";
      divCol1.style.borderBottom = "1px solid black";
      divCol1.style.borderLeft = "1px solid black";
      divCol1.style.height = "165px";

      var divCol2 = document.createElement("div");
      divCol2.style.float = "right";
      divCol2.style.height = "165px";
      divCol2.style.borderTop = "1px solid black";
      divCol2.style.borderBottom = "1px solid black";
      divCol2.style.borderRight = "1px solid black";

      var divTaskName = document.createElement("div");
      var divTaskDescription = document.createElement("div");
      var divTaskCategory = document.createElement("div");
      var divTaskStartDateTime = document.createElement("div");
      var divTaskEndDateTime = document.createElement("div");
      var divTaskCheckbox = document.createElement("div");

      var labelTaskName = document.createElement("label");
      labelTaskName.innerHTML = "Task Name";
      labelSetStyle(labelTaskName);

      var labelTaskDescription = document.createElement("label");
      labelTaskDescription.innerHTML = "Task description";
      labelSetStyle(labelTaskDescription);

      var labelTaskCategoryName = document.createElement("label");
      labelTaskCategoryName.innerHTML = "Task category";
      labelSetStyle(labelTaskCategoryName);

      var textfieldTaskName = document.createElement("input");
      textfieldTaskName.value = task.name;
      textfieldSetStyle(textfieldTaskName);

      var textfieldTaskDescription = document.createElement("input");
      textfieldTaskDescription.value = task.description;
      textfieldSetStyle(textfieldTaskDescription);

      var textfieldTaskCategoryName = document.createElement("input");
      textfieldTaskCategoryName.value = "Task category";
      textfieldSetStyle(textfieldTaskCategoryName);

      var labelTaskStartDate = document.createElement("label");
      labelTaskStartDate.innerHTML = "Start date/time";
      labelSetStyle(labelTaskStartDate);

      var labelTaskEndDate = document.createElement("label");
      labelTaskEndDate.innerHTML = "End date/time";
      labelSetStyle(labelTaskEndDate);

      var textfieldTaskStartDate = document.createElement("input");
      textfieldTaskStartDate.value = task.startDateTime;
      textfieldSetStyle(textfieldTaskStartDate);

      var textfieldTaskEndDate = document.createElement("input");
      textfieldTaskEndDate.value = task.endDateTime;
      textfieldSetStyle(textfieldTaskEndDate);

      var labelTaskCategoryActive = document.createElement("label");
      labelTaskCategoryActive.innerHTML = "Active";
      labelSetStyle(labelTaskCategoryActive);

      var labelTaskCategoryNotification = document.createElement("label");
      labelTaskCategoryNotification.innerHTML = "Notification";
      labelSetStyle(labelTaskCategoryNotification);

      var textfieldTaskCategoryActive = document.createElement("input");
      textfieldTaskCategoryActive.setAttribute("type", "checkbox");
      textfieldTaskCategoryActive.checked = task.active;
      textfieldSetStyle(textfieldTaskCategoryActive);

      var textfieldTaskCategoryNotification = document.createElement("input");
      textfieldTaskCategoryNotification.setAttribute("type", "checkbox");
      textfieldTaskCategoryNotification.checked = task.notification;
      textfieldSetStyle(textfieldTaskCategoryNotification);

      divTaskName.appendChild(labelTaskName);
      divTaskName.appendChild(textfieldTaskName);

      divTaskDescription.appendChild(labelTaskDescription);
      divTaskDescription.appendChild(textfieldTaskDescription);

      divTaskCategory.appendChild(labelTaskCategoryName);
      divTaskCategory.appendChild(textfieldTaskCategoryName);

      divTaskStartDateTime.appendChild(labelTaskStartDate);
      divTaskStartDateTime.appendChild(textfieldTaskStartDate);

      divTaskEndDateTime.appendChild(labelTaskEndDate);
      divTaskEndDateTime.appendChild(textfieldTaskEndDate);

      divTaskCheckbox.appendChild(labelTaskCategoryActive);
      divTaskCheckbox.appendChild(textfieldTaskCategoryActive);
      divTaskCheckbox.appendChild(labelTaskCategoryNotification);
      divTaskCheckbox.appendChild(textfieldTaskCategoryNotification);

      divCol1.appendChild(divTaskName);
      divCol1.appendChild(divTaskDescription);
      divCol1.appendChild(divTaskCategory);

      divCol2.appendChild(divTaskStartDateTime);
      divCol2.appendChild(divTaskEndDateTime);
      divCol2.appendChild(divTaskCheckbox);

      divTask.appendChild(divCol1);
      divTask.appendChild(divCol2);

      divMain.appendChild(divTask);

      return divTask;
    }

    function labelSetStyle(element) {
      element.style.fontSize = "14px";
      element.style.fontWeight = "bold";
    }

    function textfieldSetStyle(element) {
      element.setAttribute("disabled", "disabled");
      element.style.fontSize = "14px";
      element.style.fontWeight = "bold";
      element.style.border = "3px solid #555";
      element.style.borderRadius = "10px";
    }
  }

  newCategoryButtonHandler = () => {
    window.location =
      "/newCategory?username=" +
      this.state.username +
      "&?token=" +
      this.state.token;
  };

  newTaskButtonHandler = () => {
    window.location =
      "/newTask?username=" +
      this.state.username +
      "&?token=" +
      this.state.token;
  };

  changePasswordButtonHandler = () => {
    window.location =
      "/changePassword?username=" +
      this.state.username +
      "&?token=" +
      this.state.token;
  };
}
