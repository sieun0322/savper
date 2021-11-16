import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DocContext = createContext();
export const DocProvider= (prop)=>{
    const [docs, setDocs] = useState([]);
    const [myDocs, setMyDocs] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [docUrl,setDocUrl]=useState("/docs");
    const [me] =useContext(AuthContext);
    useEffect(() => {
      axios
        .get(docUrl)
        .then((result) => setDocs(prevData=>[...prevData,...result.data]))
        .catch((err) => console.error(err));
    }, [docUrl]);
    
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
    const loaderMoreDocs=()=>{
      if(docs.length ===0) return;
      const lastDocId = docs[docs.length - 1]._id;
      setDocUrl(`/docs?lastid=${lastDocId}`);
    }
    return (
      <DocContext.Provider
        value={{
          docs,
          setDocs,
          myDocs,
          setMyDocs,
          isPublic,
          setIsPublic,
          loaderMoreDocs,
        }}
      >
        {prop.children}
      </DocContext.Provider>
    );
};