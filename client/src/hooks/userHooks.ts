import axios from "axios";
import { IRecipe } from "../types";

export const isLiked = (recipe: IRecipe, userID: string | null) => {
  if (userID) {
    return recipe.likes?.includes(userID);
  }
};

export const isRecipeSaved = (id: string, savedRecipes: string[]) =>
  savedRecipes.includes(id);

export const likeRecipe = async (
  recipeID: string,
  userID: string | null,
  url: string,
  changeBase: (value: React.SetStateAction<IRecipe[]>) => void,
  isSavedRecipe?: boolean
) => {
  try {
    const response = await axios.put(url, {
      recipeID,
      userID,
    });
    if (isSavedRecipe) {
      changeBase(response.data.savedRecipes);
    } else {
      changeBase(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveRecipe = async (
  recipeID: string,
  userID: string | null,
  url: string,
  setSavedRecipes: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await axios.put(url, {
      recipeID,
      userID,
    });
    setSavedRecipes(response.data.savedRecipes);
  } catch (err) {
    console.log(err);
  }
};

export const fetchSavedRecipes = async (
  url: string,
  setSavedRecipes: (value: React.SetStateAction<string[]>) => void
) => {
  try {
    const response = await axios.get(url);
    setSavedRecipes(response.data.savedRecipes);
  } catch (err) {
    console.log(err);
  }
};

export const fetchRecipes = async (url: string, setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>) => {
  try {
    const response = await axios.get(url);
    setRecipes(response.data);
  } catch (err) {
    console.log(err);
  }
};
