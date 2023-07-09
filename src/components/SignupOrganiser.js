import * as React from "react";
import Box from "@mui/material/Box";
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';

function SignUpOrganiser() {
  const accountType = 'organiser';
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
    if (password !== confirmPassword) {
      alert("Passwords must match")
    } else {
    event.preventDefault();
    navigate("/login");
    console.log(accountType, firstName, lastName, email, dob);
    }
  };
  

  return (
    <>
      <div className="signup">
        <div className="signup-logo">
          <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
          <h1>Create an account</h1>
        </div>
          <Box
            className="signup-form"
            alignItems="center"
            justifyContent="center"
          >
            <form className="signup-form" onSubmit={signupHandler}>
              <FormControl fullWidth>
              <Grid container spacing={2} paddingBottom="15px">
              <Grid container item xs={6} direction="column" >
                <TextField
                  value={firstName}
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                  id="input-with-icon-textfield"
                  label="First Name"
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
                  id="input-with-icon-textfield"
                  label="Last Name"
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
                  value={dob}
                  required
                  onChange={(event) => setDob(event.target.value)}
                  id="input-with-icon-textfield"
                  label="Date of Birth"
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
 </Grid>  <Grid container item xs={6} direction="column" >
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
              onChange={(event) => setPasswordConfirmation(event.target.value)}
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
               </Grid>
                </Grid>
            <Button variant="contained" id="login-btn" className="signup-submit" type="submit"  startIcon={<LoginIcon />}>Submit</Button>
            <Link to="../Login" class="login-link">Already have an account? Login instead</Link>
              </FormControl>
            </form>
          </Box>
      </div>
    </>
  );
}

export default SignUpOrganiser;