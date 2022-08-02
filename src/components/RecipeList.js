import { Link } from "react-router-dom";
import "./styles/RecipeList.css";

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) return <p>No recipes found!</p>;

  return (
    <div className="RecipeList">
      {recipes.map((recipe) => (
        <div className="RecipeList__item" key={recipe.id}>
          <h3 className="RecipeList__item__heading">{recipe.title}</h3>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
