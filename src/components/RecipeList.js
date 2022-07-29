import { Link } from "react-router-dom";
import "./styles/RecipeList.css";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
