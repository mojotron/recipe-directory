import { useState, useRef } from "react";
import "./styles/CreateRecipe.css";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../../firebase/config";
import ListItem from "./ListItem";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: "",
    mealType: "breakfast",
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [currentMethod, setCurrentMethod] = useState("");
  const [methods, setMethods] = useState([]);

  const ingredientInput = useRef(null);
  const methodInput = useRef(null);

  const navigate = useNavigate();
  // submit finished recipe to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      ingredients,
      methods,
      cookingTime: formData.cookingTime + " minutes",
    };
    try {
      await addRecipe(recipeData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // control form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };
  // control ingredients
  const handleIngChange = (e) => {
    setCurrentIngredient(e.target.value);
  };

  const handleAddIng = (e) => {
    if (currentIngredient === "") return;
    if (ingredients.includes(currentIngredient)) return;
    setIngredients((oldIngs) => [...oldIngs, currentIngredient.trim()]);
    setCurrentIngredient("");
    ingredientInput.current.focus();
  };

  const handleDelete = (type, value) => {
    if (type === "ingredient") {
      setIngredients((oldIngs) => oldIngs.filter((ing) => ing !== value));
    } else if (type === "method") {
      setMethods((oldMet) => oldMet.filter((met) => met !== value));
    } else {
      throw new Error("unknown list item type");
    }
  };

  const handleUpdate = (type, value, newValue) => {
    if (type === "ingredient") {
      setIngredients((oldIngs) =>
        oldIngs.map((ing) => (ing === value ? newValue : ing))
      );
    } else if (type === "method") {
      setMethods((oldMets) =>
        oldMets.map((met) => (met === value ? newValue : met))
      );
    } else {
      throw new Error("unknown list item type");
    }
  };
  // control method
  const handleMethodChange = (e) => {
    setCurrentMethod(e.target.value);
  };

  const handleAddMethod = () => {
    if (currentMethod === "") return;
    if (methods.includes(currentIngredient)) return;
    setMethods((oldMet) => [...oldMet, currentMethod.trim()]);
    setCurrentMethod("");
    methodInput.current.focus();
  };

  return (
    <div className="CreateRecipe">
      <h2 className="CreateRecipe__heading">Create New Recipe</h2>
      <form
        className="CreateRecipe__form"
        aria-label="form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="meal-type">Meal Type</label>
        <select
          id="meal-type"
          value={formData.mealType}
          onChange={handleChange}
          name="mealType"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="Snack">Snack</option>
        </select>

        <label htmlFor="cooking-time">Cooking time (minutes)</label>
        <input
          id="cooking-time"
          type="number"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          required
        />

        <div className="CreateRecipe__form__ingredients">
          <div className="Form__add__ingredients">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              id="ingredients"
              type="text"
              value={currentIngredient}
              onChange={handleIngChange}
              ref={ingredientInput}
            />
            <button className="btn" type="button" onClick={handleAddIng}>
              Add
            </button>
          </div>
          <ul className="Form__list__ingredients">
            {ingredients.map((ing, i) => (
              <ListItem
                key={i}
                value={ing}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                index={null}
                type="ingredient"
              />
            ))}
          </ul>
        </div>

        <div className="CreateRecipe__form__method">
          <div className="Form__add__method">
            <label htmlFor="cooking-method">Describe cooking method</label>
            <textarea
              id="cooking-method"
              name="method"
              value={currentMethod}
              onChange={handleMethodChange}
              spellCheck
              ref={methodInput}
            />
            <button className="btn" type="button" onClick={handleAddMethod}>
              Add
            </button>
          </div>
          <ul>
            {methods.map((method, i) => (
              <ListItem
                key={i}
                value={method}
                index={i + 1}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                type="method"
              />
            ))}
          </ul>
        </div>

        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
