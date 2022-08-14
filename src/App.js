import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
// pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/CreateRecipe";
import Recipe from "./pages/Recipe/Recipe";
import Search from "./pages/Search/Search";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
// components
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
