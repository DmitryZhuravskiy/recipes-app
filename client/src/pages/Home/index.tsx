import { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import { IRecipe } from "../../types";
import {
  isLiked,
  isRecipeSaved,
  likeRecipe,
  saveRecipe,
  fetchSavedRecipes,
  fetchRecipes,
} from "../../hooks/userHooks";

export const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const userID: string | null = useGetUserID();

  useEffect(() => {
    fetchRecipes(`http://localhost:3001/recipes`, setRecipes);
    fetchSavedRecipes(
      `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
      setSavedRecipes
    );
  }, [savedRecipes, recipes]);

  return (
    <div className={createStyles.createRecipe}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Рецепты</h1>
        <Search recipes={recipes} setRecipes={setRecipes} />
      </div>
      <ul className={styles.recipes}>
        {recipes.map((recipe: IRecipe) => (
          <li className={styles.recipe} key={recipe._id}>
            <h2 className={styles.subTitle}>{recipe.name}</h2>
            <button
              className={createStyles.button}
              onClick={() =>
                saveRecipe(
                  recipe._id,
                  userID,
                  `http://localhost:3001/recipes`,
                  setSavedRecipes
                )
              }
              disabled={isRecipeSaved(recipe._id, savedRecipes)}
            >
              {isRecipeSaved(recipe._id, savedRecipes)
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
                {recipe.tags?.map((tag) => (
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
                    `http://localhost:3001/recipes/addLike`,
                    setRecipes
                  )
                }
              >
                {recipe.likes?.length}
                {isLiked(recipe, userID) ? (
                  <img
                    className={styles.like}
                    src="./images/heart--red.svg"
                    width="20"
                    height="15"
                    alt="like"
                  />
                ) : (
                  <img
                    className={styles.like}
                    src="./images/heart.svg"
                    width={20}
                    height={15}
                    alt="like"
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
