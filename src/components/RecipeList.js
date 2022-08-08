import { Link } from "react-router-dom";
import "./styles/RecipeList.css";
import trashBin from "../assets/delete.svg";
import { deleteRecipe } from "../firebase/config";

const RecipeList = ({ recipes }) => {
  const handleClick = async (id) => {
    console.log(id);
    try {
      deleteRecipe(id);
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };

  if (recipes.length === 0) return <p>No recipes found!</p>;

  return (
    <div className="RecipeList">
      {recipes.map((recipe) => (
        <div className="RecipeList__item" key={recipe.id}>
          <button className="btn--icon" onClick={() => handleClick(recipe.id)}>
            <img src={trashBin} alt="trash bin" />
          </button>
          <h3 className="RecipeList__item__heading">{recipe.title}</h3>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
