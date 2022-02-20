import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NoteManager } from "./Context/noteContext";

ReactDOM.render(
  <React.StrictMode>
    <NoteManager>
      <App />
    </NoteManager>
  </React.StrictMode>,
  document.getElementById("root")
);
