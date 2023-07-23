import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // URL FOR DEPLOYED VERSION
  // const loginUrl = "https://gigney.ryanriddiford.com/auth/login";

  // URL FOR LOCALHOST
  const loginUrl = "http://localhost:3000/auth/login";

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log("Login Handler");

    let loginBody = {
      email: email,
      password: password,
    };

    let destinationPage = "";
    let user;

    if (email === "" || password === "") {
      setMessage("Both email and password required. Try again.");
    } else {
      axios
        .post(loginUrl, loginBody)
        .then((response) => {
          setMessage("Login Succesful");

          if (response.data.user.organizationName) {
            user = {
              type: response.data.user.userType,
              email: response.data.user.email,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              fullName: response.data.user.fullName,
              id: response.data.user.id,
              password: response.data.user.password,
              phoneNumber: response.data.user.phoneNumber,
              organizationName: response.data.user.organizationName,
            };

            destinationPage = "../dashboard";
          } else {
            user = {
              type: response.data.user.userType,
              email: response.data.user.email,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              fullName: response.data.user.fullName,
              id: response.data.user.id,
              password: response.data.user.password,
              phoneNumber: response.data.user.phoneNumber,
              bio: response.data.user.bio,
              dob: response.data.user.dob,
            };

            destinationPage = "../profile";
          }

          console.log(user);
          setUser(user);
          setIsLoggedIn(true);
          navigate(destinationPage);
        })
        .catch((error) => {
          setMessage("Invalid email or password. Try again.");
          console.log(error);
        });
    }
  };

  return (
    <div className="login-page">
      <div className="left">
        {" "}
        <img
          src="Gigney_login.png"
          alt="Band playing music"
          className="left-img"
        ></img>
      </div>
      <div className="right">
        <div className="login-logo">
          <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
          <h1>Login</h1>
        </div>
        <form onSubmit={loginHandler}>
          <FormControl className="login-form">
            <p>Email:</p>
            <TextField
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="email"
              placeholder="Enter your email address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <p>Password:</p>
            <TextField
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            {/* if the message is defined, show it */}
            {message && <p className="error-message">{message}</p>}
            <Button
              variant="contained"
              id="login-btn"
              className="input-btn"
              type="submit"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Link to="../reset-password" className="forgot-btn">
              Forgot password?
            </Link>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
