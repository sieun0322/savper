import React,{ useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar.js";
const UploadForm =() =>{
    const defaultFileName = "이미지 파일을 업로드 해주세요";
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);
    const imageSelectHandler = (event) => {
                const docfile = event.target.files[0];
                setFile(docfile);
                setFileName(docfile.name);
            };
    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("doc",file)
        try{
            const res = await axios.post("/upload",formData,{
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
            },3000);
        }catch(err){
            toast.error(err.message);
            setPercent(0);
            setFileName(defaultFileName);
            console.error(err);
        }
    };      
    return (
      <div>
        <form onSubmit={onSubmit}>
          <ProgressBar percent ={percent}/>
          <div className="file-dropper">
            {fileName}
            <input id="file" type="file" onChange={imageSelectHandler} />
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