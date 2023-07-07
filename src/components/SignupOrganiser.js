import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Select from '@mui/material/Select';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SignUpOrganiser() {
  const [accountType, setAccountType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");


  const handleChange = (event) => {
    setAccountType('guest');
    console.log(accountType);
    setFirstName(event.target.value);
    console.log(firstName);
  };

  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <>
      <div className="signup">
        <div className="signup-left">
          <Box className="signup-form" alignItems="center"
            justifyContent="center" sx={{ maxWidth: 450 }}>
            <div className="signup-logo">
              <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
            </div>
            <h1>Create an account</h1>
            <form className="signup-form" onSubmit={handleChange}>
              <FormControl fullWidth>
                <TextField
                  value={firstName}
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
                  onChange={(event) => setEmail(event.target.value)}
                  id="input-with-icon-textfield"
                  label="Email"
                  type="email"
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
                  value={dob}
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
                                                        <TextField
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="input-with-icon-textfield"
                  label="Password"
                  type="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                  <FormControlLabel required control={<Checkbox />} label="Terms and conds" />
                  <FormControlLabel required control={<Checkbox />} label="privacy" />
                <div className="signup-next-button">
                  <input className="next-button" type="submit" value="Submit" onClick={handleClick} />
                  <p>&nbsp;</p>
                </div>
              </FormControl>
            </form>
          </Box >
        </div>
        </div>

        <div className="signup-right"></div>
      </>
      );
};

export default SignUpOrganiser;