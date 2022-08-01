import { useState, useRef, useEffect } from "react";
import "./styles/CreateRecipe.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: "",
    method: "",
  });
  const { postData, data, isPending, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      ...formData,
      ingredients,
      cookingTime: formData.cookingTime + " minutes",
    });
  };

  useEffect(() => {
    if (data === null) return;
    navigate("/");
  }, [data, navigate]);

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

        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
