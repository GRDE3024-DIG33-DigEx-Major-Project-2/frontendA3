import * as React from "react";
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import axios from "axios";

function SignUpOrganiser() {
  const baseURL = process.env.REACT_APP_BASEURL;
  
  const [organizationName, setOrganizationName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");
  const pplabel = (
    <span>
      I accept Gigney's&nbsp;
      <Link to="../privacy-policy">Privacy Policy</Link>
    </span>
  );

  const tclabel = (
    <span>
      I agree to Gigney's&nbsp;
      <Link to="../terms-of-use">Terms of Use</Link>
    </span>
  );

  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords must match");
    } else {
      const registerUrl = baseURL + "user/register";

      const requestBody = {
        userType: "organizer",
        email: email,
        password: password,
        organizationName: organizationName,
        phoneNumber: phoneNumber,
      };

      console.log(requestBody);

      axios
        .post(registerUrl, requestBody)
        .then((response) => {
          alert("Registration Succesful");
          navigate("/login");
        })
        .catch((error) => {
          alert("Sorry, the backend server is down! Please try again later.");
        });
    }
  };

  return (
    <>
      <div className="signup-second-page">
        <div className="signup-second-page-logo">
          <img
            src="../gigney_logo_black_square_no_bg_web.png"
            alt="gigney logo"
          />
          <h1>Create an account</h1>
        </div>
        <form className="signup-second-page-form" onSubmit={signupHandler}>
          <FormControl fullWidth>
            <Grid container columnSpacing={{ xs: 5, sm: 2 }}>
              <Grid container item xs={12} sm={6} direction="column">
                <p>Organisation name:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={organizationName}
                  required
                  onChange={(event) => setOrganizationName(event.target.value)}
                  id="input-with-icon-textfield"
                  placeholder="Enter your organisation's name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <p>Email:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={email}
                  required
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
                  variant="outlined"
                />
                <p>Phone number:</p>
                <TextField
                  value={phoneNumber}
                  required
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  id="phone-number"
                  placeholder="Enter your contact number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactMailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <span className="link-organizer l-o-1">
                  Already signed up?
                  <Link to="../login">Login</Link>
                  instead
                </span>
              </Grid>{" "}
              <Grid container item xs={12} sm={6} direction="column">
                <p>Password:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  placeholder="Enter a new password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <p>Confirm Password:</p>
                <TextField
                  sx={{ marginBottom: "2vh" }}
                  value={confirmPassword}
                  required
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  id="confirm-password"
                  placeholder="Enter your password again"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label={tclabel}
                  value={terms}
                  onChange={(event) => setTerms(event.target.value)}
                />
                <FormControlLabel
                  sx={{ marginBottom: "2vh" }}
                  required
                  control={<Checkbox />}
                  label={pplabel}
                  value={privacy}
                  onChange={(event) => setPrivacy(event.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  id="login-btn"
                  className="signup-submit"
                  type="submit"
                >
                  Sign up
                </Button>
              </Grid>
              <span className="link-organizer l-o-2">
                Already signed up?
                <Link to="../login">Login</Link>
                instead
              </span>
            </Grid>
          </FormControl>
        </form>
      </div>
    </>
  );
}

export default SignUpOrganiser;
