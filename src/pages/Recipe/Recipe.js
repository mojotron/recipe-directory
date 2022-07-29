import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./styles/Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:3000/recipes/${id}`
  );

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <h3>{data.title}</h3>
          <p>Cooking time {data.cookingTime}</p>
          <p>Ingredients</p>
          <ul>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>Method:</p>
          <p>{data.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
