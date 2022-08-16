import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./styles/Login.css";

const Login = () => {
  const [formDate, setFormData] = useState({ email: "", password: "" });
  const { login, error, isPending } = useLogin();

  const handleChange = (e) =>
    setFormData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formDate.email, formDate.password);
  };

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formDate.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formDate.password}
        onChange={handleChange}
      />

      {isPending ? (
        <button className="btn" disabled>
          Loading
        </button>
      ) : (
        <button type="submit" className="btn">
          Login
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
