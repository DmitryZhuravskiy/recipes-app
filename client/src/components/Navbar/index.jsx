import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className={styles.navbar}>
      <Link
        className={location.pathname === "/" ? styles.linkActive : styles.link}
        to="/"
      >
        Главная
      </Link>
      <Link
        className={
          location.pathname === "/create-recipe"
            ? styles.linkActive
            : styles.link
        }
        to="/create-recipe"
      >
        Добавить рецепт
      </Link>
      <Link
        className={
          location.pathname === "/saved-recipes"
            ? styles.linkActive
            : styles.link
        }
        to="/saved-recipes"
      >
        Избранные рецепты
      </Link>
      {!cookies.access_token ? (
        <Link
          className={
            location.pathname === "/auth" ? styles.linkActive : styles.link
          }
          to="/auth"
        >
          Вход/Регистрация
        </Link>
      ) : (
        <button className={styles.linkOut} onClick={logout}>
          Выйти
        </button>
      )}
    </div>
  );
};
