import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import createStyles from "./CreateRecipe/CreateRecipe.module.scss";
import styles from "./Home/Home.module.scss";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { IRecipe } from "../types";
import { isLiked, likeRecipe } from "../hooks/userHooks";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<IRecipe[]>([]);
  const userID = useGetUserID();

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
  }, [userID, savedRecipes]);
  return (
    <div className={createStyles.createRecipe}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Избранные рецепты</h1>
        <Search recipes={savedRecipes} setRecipes={setSavedRecipes} />
      </div>
      <ul className={styles.recipes}>
        {savedRecipes.map((recipe: IRecipe) => (
          <li className={styles.recipe} key={recipe._id}>
            <h2 className={styles.subTitle}>{recipe.name}</h2>
            <img
              className={styles.recipeImage}
              src={recipe.imageUrl}
              alt={recipe.name}
            />
            <p className={styles.description}>{recipe.description}</p>
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
                onClick={() =>
                  likeRecipe(
                    recipe._id,
                    userID,
                    `http://localhost:3001/recipes/savedRecipes/addLike/${userID}`,
                    setSavedRecipes,
                    true
                  )
                }
              >
                {recipe.likes.length}
                {isLiked(recipe, userID) ? (
                  <img
                    className={styles.like}
                    src="./images/heart--red.svg"
                    width="20"
                    height="15"
                    alt="likes"
                  />
                ) : (
                  <img
                    className={styles.like}
                    src="./images/heart.svg"
                    width={20}
                    height={15}
                    alt="likes"
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
