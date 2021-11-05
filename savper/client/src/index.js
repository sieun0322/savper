import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {DocProvider} from "./context/DocContext";
import {BrowserRouter} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DocProvider>
        <App />
      </DocProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);