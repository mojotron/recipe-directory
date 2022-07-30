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
          <h2>{data.title}</h2>
          <p>Cooking time {data.cookingTime}</p>
          <h3>Ingredients:</h3>
          <ul>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h3>Method:</h3>
          <p>{data.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
