import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Главная</Link>
      <Link to="/create-recipe">Занести рецепт</Link>
      <Link to="/saved-recipes">Сохраненные рецепты</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Вход/Регистрация</Link>
      ) : (
        <button onClick={logout}>Выйти</button>
      )}
    </div>
  );
};
