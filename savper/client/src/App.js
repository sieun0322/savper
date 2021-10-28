//import logo from './logo.svg';
//import './App.css';
import React from "react";
import UploadForm from "./components/UploadForm";
import DocList from "./components/DocList";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <ToastContainer />
      <h2>Savper App</h2>
      <UploadForm />
      <DocList />
    </div>
  );
};

export default App;
