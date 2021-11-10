import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DocContext = createContext();
export const DocProvider= (prop)=>{
    const [docs, setDocs] = useState([]);
    const [myDocs, setMyDocs] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [me] =useContext(AuthContext);

    useEffect(() => {
      axios
        .get("/docs")
        .then((result) => setDocs(result.data))
        .catch((err) => console.error(err));
    }, []);
    useEffect(() => {
      if(me){
        setTimeout(()=>{
          axios
          .get("/users/me/docs")
          .then((result) => setMyDocs(result.data))
          .catch((err) => console.error(err));
        },0);
      }else{
        setMyDocs([]);
        setIsPublic(true);
      }
    }, [me]);//me가 바뀔때마다 실행
    return (
      <DocContext.Provider
        value={{ docs, setDocs, myDocs, setMyDocs, isPublic, setIsPublic }}
      >
        {prop.children}
      </DocContext.Provider>
    );
};