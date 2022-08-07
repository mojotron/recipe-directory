import "./styles/Home.css";
import RecipeList from "../../components/RecipeList";
import { useCollection } from "../../hooks/useCollection";

const Home = () => {
  const { documents: data, isPending, error } = useCollection("recipes");

  return (
    <div className="Home">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
