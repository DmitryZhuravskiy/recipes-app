import { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "../Home/Home.module.scss";
import { Link, useParams } from "react-router-dom";
import { IRecipe } from "../../types";
import {
  isLiked,
  isRecipeSaved,
  likeRecipe,
  saveRecipe,
  fetchSavedRecipes,
  fetchRecipes,
} from "../../hooks/userHooks";

const TagSearch = () => {
  const [tagRecipes, setTagRecipes] = useState<IRecipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const userID = useGetUserID();
  const { id } = useParams();

  useEffect(() => {
    fetchRecipes(`http://localhost:3001/recipes/tag/${id}`, setTagRecipes);
    fetchSavedRecipes(
      `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
      setSavedRecipes
    );
  }, [tagRecipes, savedRecipes]);

  return (
    <div className={createStyles.createRecipe}>
      <h1 className={styles.title}>Поиск по тегу #{id}</h1>
      <ul className={styles.recipes}>
        {tagRecipes.map((recipe: IRecipe) => (
          <li className={styles.recipe} key={recipe._id}>
            <h2 className={styles.subTitle}>{recipe.name}</h2>
            <button
              className={createStyles.button}
              onClick={() =>
                saveRecipe(
                  recipe._id,
                  userID,
                  "http://localhost:3001/recipes",
                  setSavedRecipes
                )
              }
              disabled={isRecipeSaved(recipe._id, savedRecipes)}
            >
              {isRecipeSaved(recipe._id, savedRecipes)
                ? "В избранных"
                : "Добавить в избранные"}
            </button>
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
                    setTagRecipes
                  )
                }
              >
                {recipe.likes.length}
                {isLiked(recipe, userID) ? (
                  <img
                    className={styles.like}
                    src="../images/heart--red.svg"
                    width="20"
                    height="15"
                    alt="heart"
                  />
                ) : (
                  <img
                    className={styles.like}
                    src="../images/heart.svg"
                    width={20}
                    height={15}
                    alt="heart"
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

export default TagSearch;