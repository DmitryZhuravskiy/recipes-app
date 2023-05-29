import React from "react";
import styles from "./Form.module.scss";

const Form = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword,
  title,
  isRegister,
  setRegister,
}) => {
  const tongleAuth = () => {
    if (isRegister) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.authCTitle}>{title}</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Имя:
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Пароль:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={styles.label} onClick={() => tongleAuth()}>
          {isRegister
            ? "Вы еще не зарегистрированы?"
            : "Вы уже зарегистрировались?"}{" "}
        </div>
        <button className={styles.button} type="submit">{title}</button>
      </form>
    </div>
  );
};

export default Form;
