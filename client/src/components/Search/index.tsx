import React, { useRef, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { IRecipe, ISerch } from "../../types";

const Search = ({ recipes, setRecipes }: ISerch) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      let sortRecipes = recipes.filter((recipe: IRecipe) =>
        recipe.name.toLowerCase().includes(str.toLowerCase())
      );
      setRecipes(sortRecipes);
      console.log(value, recipes);
    }, 1000),
    []
  );

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    updateSearchValue(e.currentTarget.value);
    //раньше тут было e.target.value
  };

  const cleanSearchValue = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    updateSearchValue("");
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
      <div
        className={styles.christ}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          cleanSearchValue(e)
        }
      >
        <div className={styles.leftStrike}></div>
        <div className={styles.rightStrike}></div>
      </div>
    </div>
  );
};

export default Search;
