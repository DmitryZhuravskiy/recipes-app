import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./CreateRecipe.module.scss";
import formStyles from "../../components/Form/Form.module.scss";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    tags: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
    likes: [],
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleTagChange = (event, index) => {
    const { value } = event.target;
    const tags = [...recipe.tags];
    tags[index] = value;
    setRecipe({ ...recipe, tags });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddTag = () => {
    const tags = [...recipe.tags, ""];
    setRecipe({ ...recipe, tags });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Рецепт записан");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.createRecipe}>
      <h2 className={formStyles.authCTitle}>Добавить рецепт</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Название:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Описание:
          </label>
          <textarea
            className={styles.input}
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ingredients">
            Ингридиенты:
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              className={styles.button}
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button
            className={styles.button}
            type="button"
            onClick={handleAddIngredient}
          >
            Добавить ингридиент
          </button>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tags">
            Теги:
          </label>
          {recipe.tags.map((tag, index) => (
            <input
              className={styles.button}
              key={index}
              type="text"
              name="tags"
              value={tag}
              onChange={(event) => handleTagChange(event, index)}
            />
          ))}
          <button
            className={styles.button}
            type="button"
            onClick={handleAddTag}
          >
            Добавить тег
          </button>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="instructions">
            Руководство:
          </label>
          <textarea
            className={styles.input}
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">
            Ссылка на изображение:
          </label>
          <input
            className={styles.input}
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="cookingTime">
            Время приготовления (минуты):
          </label>
          <input
            className={styles.input}
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </div>
        <button className={styles.submitButton}  type="submit">Сохранить рецепт</button>
      </form>
    </div>
  );
};
