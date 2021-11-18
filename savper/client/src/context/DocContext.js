import React, { createContext, useState, useEffect, useContext,useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DocContext = createContext();
export const DocProvider= (prop)=>{
    const [docs, setDocs] = useState([]);
    const [myDocs, setMyDocs] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [docLoading, setDocLoading] = useState(false);
    const [docError, setDocError] = useState(false);
    const [docUrl,setDocUrl]=useState("/docs");
    const [me] =useContext(AuthContext);
    useEffect(() => {
      setDocLoading(true);
      axios
        .get(docUrl)
        .then((result) => setDocs((prevData) => [...prevData, ...result.data]))
        .catch((err) => {console.error(err); setDocError(err);})
        .finally(() => setDocLoading(false));
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
    
    const lastDocId = docs.length>0?docs[docs.length - 1]._id:null;
    const loaderMoreDocs = useCallback(() => {
      if (docLoading || !lastDocId) return;
      setDocUrl(`/docs?lastid=${lastDocId}`);
    }, [lastDocId, docLoading]);

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
          docLoading,
          docError,
        }}
      >
        {prop.children}
      </DocContext.Provider>
    );
};