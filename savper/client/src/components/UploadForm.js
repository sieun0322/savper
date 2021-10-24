import React,{ useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar.js";
const UploadForm =() =>{
    const defaultFileName = "이미지 파일을 업로드 해주세요";
    const [file, setFile] = useState(null);
    const [docSrc, setDocSrc] = useState(null);
    
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);
    const imageSelectHandler = (event) => {
                const documentFile = event.target.files[0];
                setFile(documentFile);
                setFileName(documentFile.name);
                const fileReader = new FileReader();
                fileReader.readAsDataURL(documentFile);
                fileReader.onload = e => setDocSrc(e.target.result);
            };
    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("doc",file)
        try{
            const res = await axios.post("/docs",formData,{
                headers:{"Content-Type":"multipart/form-data"}
                ,onUploadProgress:(e) =>{
                  setPercent(Math.round((100*e.loaded)/e.total));
                }
              });
            console.log({res});
            toast.success("파일 업로드 성공");
            setTimeout(()=>{
              setPercent(0);
              setFileName(defaultFileName);
              setDocSrc(null);
            },3000);
        }catch(err){
            toast.error(err.message);
            setPercent(0);
            setFileName(defaultFileName);
            setDocSrc(null);
            console.error(err);
        }
    };      
    return (
      <div>
        <form onSubmit={onSubmit}>
          <img src={docSrc} className ={`image-preview ${docSrc && "image-preview-show"}`}/>
          <ProgressBar percent ={percent}/>
          <div className="file-dropper">
            {fileName}
            <input id="file" type="file" accept="image/*, jpg" onChange={imageSelectHandler} />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 40,
              borderRadius: 3,
              cursor: "pointer"
            }}
          >
            제출
          </button>
        </form>
      </div>
    );
};
export default UploadForm;