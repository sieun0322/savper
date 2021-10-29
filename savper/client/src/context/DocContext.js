import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DocContext = createContext();
export const DocProvider= (prop)=>{
    const [docs, setDocs] = useState([]);
    useEffect(() => {
      axios
        .get("/docs")
        .then((result) => setDocs(result.data))
        .catch((err) => console.error(err));
    }, []);
  
    return (
      <DocContext.Provider value={[docs, setDocs]}>
        {prop.children}
      </DocContext.Provider>
    );
};