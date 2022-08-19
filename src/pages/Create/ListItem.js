import "./styles/ListItem.css";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import doneIcon from "../../assets/done.svg";
import { useState } from "react";

const ListItem = ({ value, handleDelete, handleUpdate, index, type }) => {
  const [changeValue, setChangeValue] = useState(false);
  const [newValue, setNewValue] = useState(value);

  // need to check document uid and current user uid

  return (
    <li className="ListItem">
      {changeValue ? (
        <div className="ListItem__form">
          <input
            data-testid="list-item-input"
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </div>
      ) : (
        <p className="ListItem__paragraph">
          {index ? `${index}. ` : ""}
          {value}
        </p>
      )}

      <div className="ListItem__controls">
        <button type="button" className="btn--icon" onClick={() => handleDelete(type, value)}>
          <img src={deleteIcon} alt="delete" />
        </button>
        {!changeValue ? (
          <button type="button" className="btn--icon" onClick={() => setChangeValue(true)}>
            <img src={editIcon} alt="edit" />
          </button>
        ) : (
          <button
            type="button"
            className="btn--icon"
            onClick={() => {
              handleUpdate(type, value, newValue);
              setChangeValue(false);
            }}
          >
            <img src={doneIcon} alt="update" />
          </button>
        )}
      </div>
    </li>
  );
};

export default ListItem;
