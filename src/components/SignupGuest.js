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

function SignUpGuest() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
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
      // URL FOR DEPLOYED VERSION
      // const searchEventsURL = "https://gigney.ryanriddiford.com/user/register";

      // URL FOR LOCALHOST
      const registerUrl = "http://localhost:3000/user/register";

      const requestBody = {
        userType: "attendee",
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        password: password,
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
            <Grid container spacing={4}>
              <Grid container item xs={6} direction="column">
                <TextField
                  value={firstName}
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                  id="input-with-icon-textfield"
                  label="First Name:"
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
                  value={lastName}
                  required
                  onChange={(event) => setLastName(event.target.value)}
                  id="input-with-icon-textfield-1"
                  label="Last Name:"
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
                  label="Email:"
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
                  value={dob}
                  required
                  onChange={(event) => setDob(event.target.value)}
                  id="input-with-icon-textfield-2"
                  label="Date of Birth:"
                  type="Date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </Grid>{" "}
              <Grid container item xs={6} direction="column">
                <TextField
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  label="Password:"
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
                  label="Confirm Password:"
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

            <Link to="../Login" className="login-link">
              Already have an account? Login instead
            </Link>
          </FormControl>
        </form>
      </div>
    </>
  );
}

export default SignUpGuest;
