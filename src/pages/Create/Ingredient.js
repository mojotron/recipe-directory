import "./styles/Ingredient.css";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import doneIcon from "../../assets/done.svg";
import { useState } from "react";

const Ingredient = ({ value, handleDeleteIng, handleUpdateIng }) => {
  const [changeValue, setChangeValue] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleUpdate = () => {
    handleUpdateIng(value, newValue);
    setChangeValue(false);
  };

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleEditClick = () => {
    setChangeValue(true);
  };

  return (
    <li className="Ingredient">
      {changeValue ? (
        <div>
          <input type="text" value={newValue} onChange={handleChange} />
        </div>
      ) : (
        <p>{value}</p>
      )}

      <div className="Ingredient__control">
        <button className="btn--icon" onClick={() => handleDeleteIng(value)}>
          <img src={deleteIcon} alt="delete" />
        </button>
        {!changeValue ? (
          <button className="btn--icon" onClick={handleEditClick}>
            <img src={editIcon} alt="edit" />
          </button>
        ) : (
          <button className="btn--icon" onClick={handleUpdate}>
            <img src={doneIcon} alt="edit" />
          </button>
        )}
      </div>
    </li>
  );
};

export default Ingredient;
