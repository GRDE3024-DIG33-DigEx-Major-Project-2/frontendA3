import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn, setUser}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log("Login Handler");

    // if the email and password are validated, get user object and navigate to homepage
    const currentUser = {
      id: "123456789",
      name: "Test User"
    }
    setUser(currentUser);
    setIsLoggedIn(true);
    navigate("../user");

    // if wrong email or password, set message - logic to be added with backend
    setMessage("Invalid email or password. Try again.")


  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={loginHandler}>
      <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* if the message is defined, show it */}
        {message && <p className="error-message">{message}</p>}
        <input
          id="register-btn"
          className="input-btn"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
