import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setAccessToken, setUserSession, setDrafts } from "../../utils/localStorage";
import { LoadingContext } from "../../props/loading-spinner.prop";


// /**
//  * Delay artificially by set ms
//  * @param {*} ms 
//  * @returns 
//  */
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


const Login = ({ setIsLoggedIn }) => {
  const baseURL = process.env.REACT_APP_BASEURL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  //Loading spinner props
  const {
    loading,
    setLoading
  } = useContext(LoadingContext);

  const loginUrl = baseURL + "auth/login";

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log("Login Handler");

    //Enable fullpage loading spinner
    setLoading(true);

    //await delay(3000);

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
          //TODO REMOVE LOCALSTORAGE USE
          localStorage.setItem("accessToken", response.data.accessToken);
          if (response.data.user.organizationName) {
            user = {
              type: response.data.user.userType,
              email: response.data.user.email,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              fullName: response.data.user.fullName,
              id: response.data.user.id,
              bio: response.data.user.bio,
              password: response.data.user.password,
              phoneNumber: response.data.user.phoneNumber,
              organizationName: response.data.user.organizationName,
              imgUrl: response.data.user.imgUrl
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

          // set user
          setUserSession(user);
          console.log(response.data.accessToken);
          setAccessToken(response.data.accessToken);
          setIsLoggedIn(true);
          // initialise draft function
          setDrafts([]);

          //Disable fullpage loading spinner
          setLoading(false);
          // navigate to profile or dashboard
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
        <div className="mobile-login-logo">
          <img
            src="./gigney_logo_white_square_no_bg_web.png"
            alt="live concert"
            className="login-logo-img"
          />
        </div>
      </div>
      <div className="right">
        <div className="login-logo">
          <img
            src="../gigney_logo_black_square_no_bg_web.png"
            alt="gigney logo"
          />
          <h1>Sign in</h1>
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
            >
              Login
            </Button>
            <Link to="../reset-password" className="forgot-btn">
              Forgot your password?
            </Link>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
