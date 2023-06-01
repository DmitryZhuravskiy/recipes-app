import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Search from "../../components/Search";

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
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Рецепты</h1>
        <Search recipes={recipes} setRecipes={setRecipes} />
      </div>
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
            <p className={styles.description}>{recipe.description}</p>
            <img
              className={styles.recipeImage}
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            <div className={styles.tagsGroup}>
              <ul className={styles.tags}>
                <li className={styles.tagTitle}>Теги:</li>
                {recipe.tags.map((tag) => (
                  <Link to={`/tag/${tag}`} className={styles.tag}>
                    {tag}
                  </Link>
                ))}
              </ul>
            </div>
            <div className={styles.likeAndLink}>
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
              <Link className={styles.link} to={`/${recipe._id}`}>
                Подробнее...
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
