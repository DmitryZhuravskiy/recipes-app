import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { IRegister } from "../types";

const Login = ({ isRegister, setRegister }: IRegister) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return isRegister ? (
    <Form
      handleSubmit={handleSubmit}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      title="Авторизоваться"
      isRegister={isRegister}
      setRegister={setRegister}
    />
  ) : (
    <></>
  );
};

export default Login;
