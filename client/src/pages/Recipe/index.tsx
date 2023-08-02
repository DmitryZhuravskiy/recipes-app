import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "../Home/Home.module.scss";
import recipeStyles from "./Recipe.module.scss";
import { IRecipe } from "../../types";
import {
  isLiked,
  isRecipeSaved,
  saveRecipe,
  fetchSavedRecipes,
} from "../../hooks/userHooks";

const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe>({
    _id: `1`,
    name: "1",
    ingredients: [],
    description: "1",
    imageUrl: "1",
    tags: [],
    likes: [],
    cookingTime: 0,
    instructions: "",
  });
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const { id } = useParams();
  const userID = useGetUserID();

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const likeRecipe = async (recipeID: string) => {
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
    fetchSavedRecipes(
      `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
      setSavedRecipes
    );
  }, [recipe]);

  return (
    <li className={recipeStyles.recipe} key={recipe?._id}>
      <h2 className={styles.subTitle}>{recipe?.name}</h2>
      <button
        className={createStyles.button}
        onClick={() =>
          saveRecipe(
            recipe?._id,
            userID,
            "http://localhost:3001/recipes",
            setSavedRecipes
          )
        }
        disabled={isRecipeSaved(recipe?._id, savedRecipes)}
      >
        {isRecipeSaved(recipe?._id, savedRecipes)
          ? "В избранных"
          : "Добавить в избранные"}
      </button>{" "}
      <img
        className={styles.recipeImage}
        src={recipe?.imageUrl}
        alt={recipe?.name}
      />
      <h3 className={createStyles.label}>Ингридиенты</h3>
      <ul className="instructions">
        {recipe?.ingredients.map((ingredient) => (
          <li className={recipeStyles.ingredient}>{ingredient}</li>
        ))}
      </ul>
      <p className={recipeStyles.instructions}>{recipe?.instructions}</p>
      <p className={recipeStyles.time}>
        Время приготовления: {recipe?.cookingTime} минут
      </p>
      <div className={styles.tagsGroup}>
        <ul className={styles.tags}>
          <li className={styles.tagTitle}>Теги:</li>
          {recipe?.tags.map((tag) => (
            <Link to={`/tag/${tag}`} className={styles.tag}>
              {tag}
            </Link>
          ))}
        </ul>
      </div>
      <p className={styles.likeWrapper} onClick={() => likeRecipe(recipe?._id)}>
        {recipe?.likes.length}
        {isLiked(recipe, userID) ? (
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
