import React,{ useState, useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar.js";
import { DocContext } from "../context/DocContext";


const UploadForm =() =>{
    const { docs, setDocs, myDocs, setMyDocs } = useContext(DocContext);
    const [files, setFiles] = useState(null);

    const[previews, setPreviews] = useState([]);
    const [percent, setPercent] = useState(0);
    const [isPublic, setIsPublic] = useState(true);


    const docSelectHandler = async (event) => {
                const documentFiles = event.target.files;
                setFiles(documentFiles);

                const docPreviews = await Promise.all(
                  [...documentFiles].map((documentFile) => {
                    return new Promise((resolve, reject) => {
                      try {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(documentFile);
                        fileReader.onload = (e) =>
                          resolve({
                            docSrc: e.target.result,
                            fileName: documentFile.name,
                          });
                      } catch (err) {
                        reject(err);
                      }
                    });
                  })
                );
                console.log(docPreviews);
setPreviews( docPreviews );
                
            };
    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        for(let file of files) formData.append("doc", file);
        formData.append("public", isPublic);
        try{
            const res = await axios.post("/docs",formData,{
                headers:{"Content-Type":"multipart/form-data"}
                ,onUploadProgress:(e) =>{
                  setPercent(Math.round((100*e.loaded)/e.total));
                }
              });
            if(isPublic){setDocs([...docs,...res.data]);}
            else {setMyDocs([...myDocs, ...res.data]);}
            toast.success("파일 업로드 성공");
            setTimeout(()=>{
              setPercent(0);
              setPreviews([]);
            },3000);
        }catch(err){
           // toast.error(err.response.data.message);
            setPercent(0);
            setPreviews([]);
            console.error(err);
        }
    };   
    const previewDocs = previews.map((preview, index) => (
      <img
        src={preview.docSrc}
        alt=""
        key={index}
        style={{
          width: 200,
          height: 200,
          objectFit: "cover",
        }}
        className={`doc-preview ${preview.docSrc && "doc-preview-show"}`}
      />
    ));   
    const fileName = previews.length ===0?"이미지 파일을 업로드 해주세요":previews.reduce((previous, current)=>previous+`${current.fileName}, `,"");

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {previewDocs}
          </div>
          <ProgressBar percent={percent} />
          <div className="file-dropper">
            {fileName}
            <input
              id="file"
              type="file"
              multiple
              accept="image/*, jpg"
              onChange={docSelectHandler}
            />
          </div>
          {!isPublic}
          <input
            type="checkbox"
            id="public-check"
            value={!isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <label htmlFor="public-check">비공개</label>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 40,
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            제출
          </button>
        </form>
      </div>
    );
};
export default UploadForm;