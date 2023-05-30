import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "./Home.module.scss";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const isLiked = (recipe) => recipe.likes.includes(userID);
  const userID = useGetUserID();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
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
      setRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  return (
    <div className={createStyles.createRecipe}>
      <h1 className={styles.title}>Рецепты</h1>
      <ul className={styles.recipes}>
        {recipes.map((recipe) => (
          <li className={styles.recipe} key={recipe._id}>
            <h2 className={styles.subTitle}>{recipe.name}</h2>
            <button
              className={createStyles.button}
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
            >
              {isRecipeSaved(recipe._id)
                ? "В избранных"
                : "Добавить в избранные"}
            </button>

            <img
              className={styles.recipeImage}
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            {/*
                          <div>
              <h3 className={createStyles.label}>Ингридиенты</h3>
              <ul className="instructions">
                {recipe.ingredients.map((ingredient) => (
                  <li>{ingredient}</li>
                ))}
              </ul>
            </div>

                        <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
               <p>Время приготовления: {recipe.cookingTime} минут</p>
              */}

            <div className={styles.tagsGroup}>
              <ul className={styles.tags}>
                <li className={styles.tagTitle}>Теги:</li>
                {recipe.tags.map((tag) => (
                  <li className={styles.tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <p
              className={styles.likeWrapper}
              onClick={() => likeRecipe(recipe._id)}
            >
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
        ))}
      </ul>
    </div>
  );
};
