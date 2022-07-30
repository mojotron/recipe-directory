import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
// pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/CreateRecipe";
import Recipe from "./pages/Recipe/Recipe";
import Search from "./pages/Search/Search";
// components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
