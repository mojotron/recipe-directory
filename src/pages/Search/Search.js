import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./styles/Search.css";
import RecipeList from "../../components/RecipeList";

const Search = () => {
  const queryString = useLocation().search;
  const searchParams = new URLSearchParams(queryString);
  const target = searchParams.get("q");

  const { data, isPending, error } = useFetch(
    `http://localhost:3000/recipes?q=${target}`
  );

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
