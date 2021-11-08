import React, { useState, useContext } from "react";
import UploadForm from "../components/UploadForm";
import DocList from "../components/DocList";
import { AuthContext } from "../context/AuthContext";

const MainPage = () => {
  const [me] = useContext(AuthContext);
  return <div><h2>Savper App</h2>
      {me && <UploadForm />}
      <DocList /></div>;
};
export default MainPage;
