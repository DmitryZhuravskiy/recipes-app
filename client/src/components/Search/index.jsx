import React, { useRef, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

const Search = ({ recipes, setRecipes }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const updateSearchValue = useCallback(
    debounce((str) => {
      let sortRecipes = [...recipes].filter((recipe) =>
        recipe.name.toLowerCase().includes(str.toLowerCase())
      );
      setRecipes(sortRecipes);
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const cleanSearchValue = (e) => {
    updateSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };
  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Поиск рецепта"
        value={value}
        onChange={(e) => onChangeInput(e)}
      />
      <div className={styles.christ} onClick={(e) => cleanSearchValue(e)}>
        <div className={styles.leftStrike}></div>
        <div className={styles.rightStrike}></div>
      </div>
    </div>
  );
};

export default Search;
