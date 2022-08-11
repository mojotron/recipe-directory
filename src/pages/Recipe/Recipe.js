import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles/Recipe.css";
import { getSingleRecipe, deleteRecipe } from "../../firebase/config";
import { useState, useEffect } from "react";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";

const Recipe = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true);
    const loadRecipe = async () => {
      try {
        const recipe = await getSingleRecipe(id);
        setIsPending(false);
        setData(recipe);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error);
      }
    };

    loadRecipe();
  }, [id]);

  const handleDeleteClick = async () => {
    try {
      await deleteRecipe(id);
      navigate("/");
      setError(null);
    } catch (error) {
      setError("Could not delete recipe");
    }
  };

  return (
    <div className="Recipe">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <div className="Recipe__controls">
            <button
              type="button"
              className="btn--icon"
              onClick={handleDeleteClick}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
            <Link to="/create" state={{ id, ...data }}>
              <button type="button" className="btn--icon" onClick={() => {}}>
                <img src={editIcon} alt="edit" />
              </button>
            </Link>
          </div>
          <h2 className="Recipe__heading">
            {data.title} ({data.mealType})
          </h2>
          <p className="Recipe__time">Cooking time {data.cookingTime}</p>
          <h3 className="Recipe__subheading">Ingredients:</h3>
          <ul className="Recipe__ingredients">
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h3 className="Recipe__subheading">Method:</h3>
          <ol className="Recipe__methods">
            {data.methods.map((met, i) => (
              <li key={i}>{met}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Recipe;
