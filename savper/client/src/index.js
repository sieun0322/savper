import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {DocProvider} from "./context/DocContext";
ReactDOM.render(
  <React.StrictMode>
    <DocProvider>
      <App />
    </DocProvider>
  </React.StrictMode>,
  document.getElementById("root")
);