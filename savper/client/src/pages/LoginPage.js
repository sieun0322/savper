import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setMe] = useContext(AuthContext);
  const navigate = useNavigate();

   const loginHandler = async (e) => {
     try {
       e.preventDefault();
       if(username.length<3 || password.length<6) throw new Error("입력하신 정보가 정확하지 않습니다.");
       const result = await axios.patch("/users/login", {
         username,
         password,
       });
       setMe({
         userId: result.data.userId,
         sessionId: result.data.sessionId,
         name: result.data.name,
       });
       
       console.log(result);
       toast.success("로그인 성공");
       navigate("/");
     } catch (err) {
       console.error(err.response);
       toast.error(err.response.data.message);
     }
   };    

  return (
    <div style={{ marginTop: 100, maxWidth: 350, margin: "auto" }}>
      <h3>로그인</h3>
      <form onSubmit={loginHandler}>
        <CustomInput label="회원ID" value={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          value={password}
          type="password"
          setValue={setPassword}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
export default LoginPage;
