import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import SearchBar from "./SearchBar";
import { useTheme } from "../hooks/useTheme";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { color } = useTheme();
  const { isPending, logout } = useLogout();
  return (
    <nav className="Navbar" style={{ backgroundColor: color }}>
      <NavLink to="/">
        <h1 className="Navbar__heading">Recipes Directory</h1>
      </NavLink>
      <NavLink className="btn" to="create">
        Create Recipe
      </NavLink>
      <SearchBar />
      <NavLink className="btn" to="signup">
        Signup
      </NavLink>

      {isPending ? (
        <button className="btn" disabled>
          Loading
        </button>
      ) : (
        <button className="btn" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
