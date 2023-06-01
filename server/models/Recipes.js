import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  likes: [
    {
      type: String,
    },
  ],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const RecipesModel = mongoose.model("Recipes", recipeSchema);
