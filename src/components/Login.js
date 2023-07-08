import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUser }) => {
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
      name: "Test User",
    };
    setUser(currentUser);
    setIsLoggedIn(true);
    navigate("../profile");

    // if wrong email or password, set message - logic to be added with backend
    setMessage("Invalid email or password. Try again.");
  };

  return (
    <div className="login-page">
      <div className="left"></div>
      <div className="right">
        <div className="login-logo">
          <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
          <h1>Login</h1>
        </div>
        <form onSubmit={loginHandler}>
          <FormControl className="login-form">
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="email"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMailIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {/* if the message is defined, show it */}
            {message && <p className="error-message">{message}</p>}
            <Button variant="contained" id="login-btn" className="input-btn" type="submit" startIcon={<LoginIcon />}>Login</Button>
            <Link to="../reset-password">Forgot password?</Link>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
