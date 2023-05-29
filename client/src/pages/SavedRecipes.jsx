import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

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
    <div>
      <h1>Избранные рецепты</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <div>
              <h3>Ингридиенты</h3>
              <ul className="instructions">
                {recipe.ingredients.map((ingredient) => (
                  <li>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Теги</h3>
              <ul className="instructions">
                {recipe.tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Время приготовления:  {recipe.cookingTime} минут</p>
            <p className="likeWrapper" onClick={() => likeRecipe(recipe._id)}>
              {recipe.likes.length}
              {isLiked(recipe) ? (
                <img
                  className="like"
                  src="./images/heart--red.svg"
                  width="20"
                  height="15"
                />
              ) : (
                <img
                  className="like"
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
