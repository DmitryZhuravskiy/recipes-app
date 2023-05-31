import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import createStyles from "./CreateRecipe/CreateRecipe.module.scss";
import styles from "./Home/Home.module.scss";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const isLiked = (recipe) => recipe.likes.includes(userID);

  const likeRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/savedRecipes/addLike/${userID}`,
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className={createStyles.createRecipe}>
      <h1 className={styles.title}>Избранные рецепты</h1>
      <ul className={styles.recipes}>
        {savedRecipes.map((recipe) => (
          <li className={styles.recipe} key={recipe._id}>
            <h2 className={styles.subTitle}>{recipe.name}</h2>
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
