import "./styles/Home.css";
// import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

import { getRecipes } from "../../firebase/config";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  useEffect(() => {
    setIsPending(true);
    const loadRecipes = async () => {
      try {
        const recipes = await getRecipes();
        setData(recipes);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setError(error);
        setIsPending(false);
      }
    };
    loadRecipes();
  }, []);

  return (
    <div className="Home">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
