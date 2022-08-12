import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { isPending, error, signup } = useSignup();

  const handleChange = (e) => {
    setFormData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.email, formData.password, formData.username);
  };

  return (
    <form className="Signup" onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      {isPending ? (
        <button className="btn" disabled>
          Loading
        </button>
      ) : (
        <button className="btn" type="submit">
          Signup
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
