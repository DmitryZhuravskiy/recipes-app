import React, { useState } from "react";
import axios from "axios";
import Form from "./Form";

const Register = ({ isRegister, setRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
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
