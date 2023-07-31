import React, { useState } from "react";
import axios from "axios";
import Form from "./Form";
import { IRegister } from "../types";

const Register = ({ isRegister, setRegister }: IRegister) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Регистрация закончена. Теперь войдите.");
      setRegister(true);
    } catch (error) {
      console.error(error);
    }
  };

  return !isRegister ? (
    <Form
      handleSubmit={handleSubmit}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      title="Зарегистрироваться"
      isRegister={isRegister}
      setRegister={setRegister}
    />
  ) : (
    <></>
  );
};

export default Register;
