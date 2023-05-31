import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { CreateRecipe } from "./pages/CreateRecipe";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Navbar } from "./components/Navbar";
import Recipe from "./pages/Recipe";
import TagSearch from "./pages/TagSearch";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/:id" element={<Recipe />} />
          <Route path="/tag/:id" element={<TagSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
