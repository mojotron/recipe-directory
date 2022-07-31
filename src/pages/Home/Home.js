import "./styles/Home.css";
import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="Home">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
