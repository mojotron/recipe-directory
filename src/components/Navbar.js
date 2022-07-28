import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <NavLink to="/">
        <h1 className="Navbar__heading">Recipes Directory</h1>
      </NavLink>
      <NavLink className="btn" to="create">
        Create Recipe
      </NavLink>
    </nav>
  );
};

export default Navbar;
