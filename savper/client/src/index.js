import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {DocProvider} from "./context/DocContext";
import { AuthProvider } from "./context/AuthContext";
import {BrowserRouter} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DocProvider>
          <App />
        </DocProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);