import { useState, useRef } from "react";
import "./styles/CreateRecipe.css";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: "",
    method: "",
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
    console.log({ ...formData, ingredients });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const handleIngChange = (e) => {
    setCurrentIngredient(e.target.value.trim());
  };

  const handleAddIng = (e) => {
    if (currentIngredient === "") return;
    if (ingredients.includes(currentIngredient)) return;
    setIngredients((oldIngs) => [...oldIngs, currentIngredient]);
    setCurrentIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <form aria-label="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="cooking-time">Cooking time (minutes)</label>
        <input
          id="cooking-time"
          type="number"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          required
        />

        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id="ingredients"
            type="text"
            value={currentIngredient}
            onChange={handleIngChange}
            ref={ingredientInput}
          />
          <button type="button" onClick={handleAddIng}>
            Add Ingredient
          </button>
          <ul>
            {ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>

        <label htmlFor="cooking-method">Describe cooking method</label>
        <textarea
          id="cooking-method"
          name="method"
          value={formData.method}
          onChange={handleChange}
          required
          spellCheck
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
