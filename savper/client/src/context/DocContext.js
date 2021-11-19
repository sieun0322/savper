import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
    const pastDocUrlRef = useRef();

    useEffect(() => {
      if (pastDocUrlRef.current === docUrl) return;
      setDocLoading(true);
      axios
        .get(docUrl)
        .then((result) =>
          isPublic
            ? setDocs((prevData) => [...prevData, ...result.data])
            : setMyDocs((prevData) => [...prevData, ...result.data])
        )
        .catch((err) => {
          console.error(err);
          setDocError(err);
        })
        .finally(() => {
          setDocLoading(false);
          pastDocUrlRef.current = docUrl;
        });
    }, [docUrl, isPublic]);
    
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
        value={{
          docs: isPublic ? docs : myDocs,
          setDocs,
          setMyDocs,
          isPublic,
          setIsPublic,
          docLoading,
          docError,
          setDocUrl,
        }}
      >
        {prop.children}
      </DocContext.Provider>
    );
};