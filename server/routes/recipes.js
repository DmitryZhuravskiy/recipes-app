import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipeModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = new RecipeModel.findById(req.body.recipeID);
    const user = new UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes", async (req, res) => {
    try {
      const user = await UserModel.findById(req.body.userID);
      const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes },
      })
      res.json({ savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
  });

export { router as recipesRouter };
