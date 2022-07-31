import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./styles/Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:3000/recipes/${id}`
  );

  return (
    <div className="Recipe">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <h2 className="Recipe__heading">{data.title}</h2>
          <p className="Recipe__time">Cooking time {data.cookingTime}</p>
          <h3 className="Recipe__subheading">Ingredients:</h3>
          <ul className="Recipe__ingredients">
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h3 className="Recipe__subheading">Method:</h3>
          <p>{data.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
