import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className={styles.navbar}>
      <Link className={styles.link}  to="/">Главная</Link>
      <Link className={styles.link}  to="/create-recipe">Добавить рецепт</Link>
      <Link className={styles.link}  to="/saved-recipes">Избранные рецепты</Link>
      {!cookies.access_token ? (
        <Link className={styles.link} to="/auth">Вход/Регистрация</Link>
      ) : (
        <button className={styles.linkOut} onClick={logout}>Выйти</button>
      )}
    </div>
  );
};
