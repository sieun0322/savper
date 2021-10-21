import React,{ useState} from "react";
import axios from "axios";
import "./UploadForm.css";
const UploadForm =() =>{
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요");
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
            });
            console.log({res});
            alert("success!!");
        }catch(err){
            alert("fail!!");
            console.error(err);
        }
    };      
    return (
      <div>
        <form onSubmit={onSubmit}>
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