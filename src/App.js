import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Recipe from "./pages/Recipe/Recipe";
import Search from "./pages/Search/Search";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Hello World</h1>
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
