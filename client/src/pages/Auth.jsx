import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export const Auth = () => {
  const [isRegister, setRegister] = useState(true);

  return (
    <div className="auth">
      <Login isRegister={isRegister} setRegister={setRegister} />
      <Register isRegister={isRegister} setRegister={setRegister} />
    </div>
  );
};
