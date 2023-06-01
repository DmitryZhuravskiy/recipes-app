import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

// Получить все рецепты
router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Получить рецепт по тегу
router.get("/tag/:tagId", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    const answer = result.filter(recipe => (recipe.tags.includes(req.params.tagId)));
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Создать новый рецепт
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    ingredients: req.body.ingredients,
    tags: req.body.tags,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
    likes: req.body.likes,
  });

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        description: result.description,
        image: result.image,
        ingredients: result.ingredients,
        tags: result.tags,
        instructions: result.instructions,
        cookingTime: result.cookingTime,
        userOwner: recipe.userOwner,
        likes: [],
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Получить рецепт по ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Сохранить рецепт
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Получить id сохраненного рецепта
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Получить сохраненные рецепты
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(201).json({ savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Добавление/удаление лайка по клику
router.put("/addLike", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    if (recipe.likes.includes(req.body.userID)) {
      let newRecipeLikes = [...recipe.likes];
      newRecipeLikes.splice(recipe.likes.indexOf(req.body.userID), 1);
      await RecipesModel.updateOne(
        {
          _id: req.body.recipeID,
        },
        {
          likes: newRecipeLikes,
        }
      );
    } else {
      await RecipesModel.updateOne(
        {
          _id: req.body.recipeID,
        },
        {
          likes: [...recipe.likes, req.body.userID],
        }
      );
    }
    const recipes = await RecipesModel.find({});
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось лайкнуть рецепт",
    });
  }
});

// Добавление/удаление лайка по клику на странице сохраненных рецептов
router.put("/savedRecipes/addLike/:userId", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    if (recipe.likes.includes(req.body.userID)) {
      let newRecipeLikes = [...recipe.likes];
      newRecipeLikes.splice(recipe.likes.indexOf(req.body.userID), 1);
      await RecipesModel.updateOne(
        {
          _id: req.body.recipeID,
        },
        {
          likes: newRecipeLikes,
        }
      );
    } else {
      await RecipesModel.updateOne(
        {
          _id: req.body.recipeID,
        },
        {
          likes: [...recipe.likes, req.body.userID],
        }
      );
    }
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось лайкнуть рецепт",
    });
  }
});

export { router as recipesRouter };
