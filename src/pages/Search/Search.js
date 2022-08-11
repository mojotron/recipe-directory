import { useLocation } from "react-router-dom";
import "./styles/Search.css";
import RecipeList from "../../components/RecipeList";
import { searchRecipes } from "../../firebase/config";
import { useEffect, useState } from "react";

const Search = () => {
  const queryString = useLocation().search;
  const searchParams = new URLSearchParams(queryString);
  const target = searchParams.get("q").toLowerCase();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsPending(true);
      try {
        const results = await searchRecipes(target);
        setIsPending(false);
        setData(results);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    loadData();
  }, [target]);

  return (
    <div className="Search">
      <h2 className="Search__heading">Search results for "{target}"</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Search;
