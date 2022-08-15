import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import SearchBar from "./SearchBar";
import { useTheme } from "../hooks/useTheme";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { color } = useTheme();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="Navbar" style={{ backgroundColor: color }}>
      <NavLink to="/">
        <h1 className="Navbar__heading">Recipes Directory</h1>
      </NavLink>
      <NavLink className="btn" to="create">
        Create Recipe
      </NavLink>
      <SearchBar />
      {!user && (
        <>
          <NavLink className="btn" to="login">
            Login
          </NavLink>
          <NavLink className="btn" to="signup">
            Signup
          </NavLink>
        </>
      )}

      {user && (
        <>
          <span>hello, {user.displayName}</span>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
