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
import ProtectedRoute from "./components/ProtectedRoute";
//
import { useTheme } from "./hooks/useTheme";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { mode } = useTheme();
  const { authIsReady, user } = useAuthContext();

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute condition={!user} goto="/login">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute condition={!!user} goto="/">
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute condition={!!user} goto="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/create" element={<Create />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
