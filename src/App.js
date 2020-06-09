import React from "react";
import "./App.css";
import MainComponent from "./components/MainComponent";

class App extends React.Component {
  render() {
    return (
      <div
        className="fullscreen"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
          position: "fixed",
        }}
      >
        <div
          className="App"
          style={{
            border: "3px solid black",
            width: "max-content",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#CEE7F5",
            height: "wrap-context",
            overflowY: "auto",
            maxHeight: "900px",
          }}
        >
          <main>
            <MainComponent />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
