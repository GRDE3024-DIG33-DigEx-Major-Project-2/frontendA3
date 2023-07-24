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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

function SignUpGuest() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(dayjs());
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
        dob: dob.format("YYYY-MM-DD"),
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
          <img
            src="../gigney_logo_black_square_no_bg_web.png"
            alt="gigney logo"
          />
          <h1>Create an account</h1>
        </div>
        <form className="signup-second-page-form" onSubmit={signupHandler}>
          <FormControl fullWidth>
            <Grid container columnSpacing={5}>
              <Grid container item xs={6} direction="column">
                <p>First name:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={firstName}
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                  id="input-with-icon-textfield"
                  placeholder="Enter your first name:"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <p>Last name:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={lastName}
                  required
                  onChange={(event) => setLastName(event.target.value)}
                  id="input-with-icon-textfield-1"
                  placeholder="Enter your last name:"
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
                <p>Date:</p>
                <DatePicker
                  sx={{ marginBottom: "5%" }}
                  onChange={(newDob) => setDob(newDob)}
                  value={dob}
                  slots={{
                    openPickerIcon: ArrowDropDownOutlinedIcon,
                  }}
                  slotProps={{
                    textField: {
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon color="primary" />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </Grid>{" "}
              <Grid container item xs={6} direction="column">
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
                  label="I accept Gigney's terms of use"
                  value={terms}
                  onChange={(event) => setTerms(event.target.value)}
                />
                <FormControlLabel
                  sx={{ marginBottom: "2vh" }}
                  required
                  control={<Checkbox />}
                  label="I accept Gigney's privacy policy"
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
                  Submit
                </Button>
              </Grid>
            </Grid>
            <span className="login-link">
              Already have an account?
              <Link to="../Login">
                 Login
              </Link>
              instead
            </span>
          </FormControl>
        </form>
      </div>
    </>
  );
}

export default SignUpGuest;
