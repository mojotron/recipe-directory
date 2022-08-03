import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import SearchBar from "./SearchBar";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { color } = useTheme();

  return (
    <nav className="Navbar" style={{ backgroundColor: color }}>
      <NavLink to="/">
        <h1 className="Navbar__heading">Recipes Directory</h1>
      </NavLink>
      <NavLink className="btn" to="create">
        Create Recipe
      </NavLink>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
