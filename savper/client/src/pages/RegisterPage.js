import React,{useState, useContext} from "react";
import CustomInput from "../components/CustomInput";
import {toast} from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [, setMe] = useContext(AuthContext);
  const navigate = useNavigate();

    const submitHandler = async(e)=>{
        try{
        e.preventDefault();
        if(username.length<3) throw new Error("회원ID는 3자 이상 가능합니다.");
        if(password.length < 6) throw new Error("비밀번호는 6자 이상 가능합니다.");
        if(password!=passwordCheck) throw new Error("비밀번호가 다릅니다.");
        const result = await axios.post("/users/register", {
          name,
          username,
          password,
        });
        setMe({
          userId: result.data.userId,
          sessionId: result.data.sessionId,
          name: result.data.name,
        });
        console.log(result);
        toast.success("회원가입 성공");
        navigate("/");
        console.log();
        }catch(err){
            console.error(err);
            toast.error(err.message);
        }
    }    
  return (
    <div style={{ marginTop: 100, maxWidth: 350, margin: "auto" }}>
      <h3>회원가입</h3>
      <form onSubmit={submitHandler}>
        <CustomInput label="이름" value={name} setValue={setName} />
        <CustomInput label="회원ID" value={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          value={password}
          type="password"
          setValue={setPassword}
        />
        <CustomInput
          label="비밀번호 확인"
          value={passwordCheck}
          type="password"
          setValue={setPasswordCheck}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};
export default RegisterPage;
