//import logo from './logo.svg';
//import './App.css';
import React from "react";
import UploadForm from "./components/UploadForm";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <h2>Savper App</h2>
      <UploadForm />
    </div>
  );
};

export default App;
