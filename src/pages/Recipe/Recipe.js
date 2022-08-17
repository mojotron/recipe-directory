import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// style
import "./styles/Recipe.css";
// hooks
import { useFirestore } from "../../hooks/useFirestore";
// icon images
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";

// TODO only author can delete update recipe 
const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDocument, deleteDocument, response } = useFirestore("recipes");

  console.log("response", response)

  useEffect(() => {
    getDocument(id);
  }, []);

  const handleDeleteClick = async () => {
    await deleteDocument(id);
    navigate("/");
  };

  return (
    <div className="Recipe">
      {response.isPending && <p>Loading...</p>}
      {response.error && <p>{response.error}</p>}
      {response.document && (
        <>
          <div className="Recipe__controls">
            <button
              type="button"
              className="btn--icon"
              onClick={handleDeleteClick}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
            <Link to="/create" state={{ id, ...response.document }}>
              <button type="button" className="btn--icon">
                <img src={editIcon} alt="edit" />
              </button>
            </Link>
          </div>
          <h2 className="Recipe__heading">
            {response.document.title} ({response.document.mealType})
          </h2>
          <p className="Recipe__time">Cooking time {response.document.cookingTime}</p>
          <h3 className="Recipe__subheading">Ingredients:</h3>
          <ul className="Recipe__ingredients">
            {response.document.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h3 className="Recipe__subheading">Method:</h3>
          <ol className="Recipe__methods">
            {response.document.methods.map((met, i) => (
              <li key={i}>{met}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Recipe;
