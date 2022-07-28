import "./styles/Home.css";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  console.log(data && data);
  return (
    <div>
      <h1>Home</h1>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
