import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "../Home/Home.module.scss";
import recipeStyles from "./Recipe.module.scss";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const userID = useGetUserID();
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const isLiked = (recipe) => recipe.likes.includes(userID);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setRecipe(response.data);
      setLoading(false);
      console.log(recipe.name);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const likeRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes/addLike",
        {
          recipeID,
          userID,
        }
      );
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchSavedRecipes();
  }, []);

  if (isLoading) {
    return <p>Идет загрузка...</p>;
  }

  return (
    <li className={recipeStyles.recipe} key={recipe._id}>
      <h2 className={styles.subTitle}>{recipe.name}</h2>
      <button
        className={createStyles.button}
        onClick={() => saveRecipe(recipe._id)}
        disabled={isRecipeSaved(recipe._id)}
      >
        {isRecipeSaved(recipe._id) ? "В избранных" : "Добавить в избранные"}
      </button>{" "}
      <img
        className={styles.recipeImage}
        src={recipe.imageUrl}
        alt={recipe.name}
      />
      <h3 className={createStyles.label}>Ингридиенты</h3>
      <ul className="instructions">
        {recipe.ingredients.map((ingredient) => (
          <li className={recipeStyles.ingredient}>{ingredient}</li>
        ))}
      </ul>
      <p className={recipeStyles.instructions}>{recipe.instructions}</p>
      <p className={recipeStyles.time}>
        Время приготовления: {recipe.cookingTime} минут
      </p>
      <div className={styles.tagsGroup}>
        <ul className={styles.tags}>
          <li className={styles.tagTitle}>Теги:</li>
          {recipe.tags.map((tag) => (
            <li className={styles.tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <p className={styles.likeWrapper} onClick={() => likeRecipe(recipe._id)}>
        {recipe.likes.length}
        {isLiked(recipe) ? (
          <img
            className={styles.like}
            src="./images/heart--red.svg"
            width="20"
            height="15"
          />
        ) : (
          <img
            className={styles.like}
            src="./images/heart.svg"
            width={20}
            height={15}
          />
        )}
      </p>
    </li>
  );
};

export default Recipe;
