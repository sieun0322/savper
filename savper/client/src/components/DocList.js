import React,{useEffect, useState} from 'react';
import axios from "axios";
const DocList = () => {
  const [docs, setDocs] = useState([]);
  useEffect(()=>{
    axios
      .get("/docs")
      .then((result) => setDocs(result.data))
      .catch((err) => console.error(err));
  },[]);
  const docList = docs.map((doc) =>
  <img style ={{width:"100%"}} src={`http://localhost:5000/uploads/${doc.key}`}/>)
  return (
    <div>
      <h3>DocList</h3>
      {docList}
    </div>
  );
};
export default DocList;