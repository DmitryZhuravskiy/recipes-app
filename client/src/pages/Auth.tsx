import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export const Auth: React.FC = () => {
  const [isRegister, setRegister] = useState<boolean>(true);

  return (
    <div className="auth">
      <Login isRegister={isRegister} setRegister={setRegister} />
      <Register isRegister={isRegister} setRegister={setRegister} />
    </div>
  );
};
