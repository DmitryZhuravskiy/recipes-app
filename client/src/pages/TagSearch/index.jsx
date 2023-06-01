import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";
import createStyles from "../CreateRecipe/CreateRecipe.module.scss";
import styles from "../Home/Home.module.scss";
import { Link, useParams } from "react-router-dom";


const TagSearch = () => {
  const [tagRecipes, setTagRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const isLiked = (recipe) => recipe.likes.includes(userID);
  const { id } = useParams();

  const likeRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/savedRecipes/addLike/${userID}`,
        {
          recipeID,
          userID,
        }
      );
      setTagRecipes(response.data);
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


  const fetchTagRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/tag/${id}`);
      setTagRecipes(response.data);
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

  useEffect(() => {
    fetchTagRecipes();
    fetchSavedRecipes();
  }, []);


  return (
    <div className={createStyles.createRecipe}>
    <h1 className={styles.title}>Поиск по тегу #{id}</h1>
    <ul className={styles.recipes}>
      {tagRecipes.map((recipe) => (
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
          <p className={styles.description}>{recipe.description}</p>
          <div className={styles.tagsGroup}>
            <ul className={styles.tags}>
              <li className={styles.tagTitle}>Теги:</li>
              {recipe.tags.map((tag) => (
                <Link to={`/tag/${tag}`} className={styles.tag}>{tag}</Link>
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
  )
}

export default TagSearch