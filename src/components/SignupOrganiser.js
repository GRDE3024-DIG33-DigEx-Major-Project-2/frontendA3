import * as React from "react";
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import Grid from "@mui/material/Grid";
import axios from "axios";

function SignUpOrganiser() {
  const [organizationName, setOrganizationName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");

  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords must match");
    } else {
      const registerUrl = "https://gigney.ryanriddiford.com/user/register";

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
          <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
          <h1>Create an account</h1>
        </div>
        <form className="signup-second-page-form" onSubmit={signupHandler}>
          <FormControl fullWidth>
            <Grid container spacing={4} paddingBottom="15px">
              <Grid container item xs={6} direction="column">
                <TextField
                  value={organizationName}
                  required
                  onChange={(event) => setOrganizationName(event.target.value)}
                  id="input-with-icon-textfield"
                  label="Organization Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <TextField
                  value={email}
                  required
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
                  value={phoneNumber}
                  required
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  id="phone-number"
                  label="Phone Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactMailIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <div className="link-organizer">
                  Already have an account?
                  <Link to="../Login" className="login-link">
                    Login instead
                  </Link>
                </div>
              </Grid>{" "}
              <Grid container item xs={6} direction="column">
                <TextField
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  label="Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <TextField
                  value={confirmPassword}
                  required
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="I accept Gigney's terms of use"
                  value={terms}
                  onChange={(event) => setTerms(event.target.value)}
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="I accept Gigney's privacy policy"
                  value={privacy}
                  onChange={(event) => setPrivacy(event.target.value)}
                />
                <Button
                  variant="contained"
                  id="login-btn"
                  className="signup-submit"
                  type="submit"
                  startIcon={<LoginIcon />}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    </>
  );
}

export default SignUpOrganiser;
