import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";

function SignUp() {
  const [accountType, setAccountType] = useState("");

  const handleChange = (event) => {
    setAccountType(event.target.value);
    console.log(accountType);
  };
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup" + accountType);

  return (
    <>
      <div className="signup">
        <div className="signup-left">
          <Box
            className="signup-form"
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: 450 }}
          >
            <div className="signup-logo">
              <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
            </div>
            <h1>Create an account</h1>
            <form className="signup-form" onSubmit={handleChange}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  What would you like to do on this site?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="What would you like to do on this site?"
                  value={accountType}
                  onChange={(event) => setAccountType(event.target.value)}
                >
                  <MenuItem value={"guest"}  InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}>Search for events</MenuItem>
                  <MenuItem value={"organiser"} InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddCircleOutlineRoundedIcon />
                  </InputAdornment>
                ),
              }}>Create an event</MenuItem>
                </Select>
                <div className="signup-next-button">
                  <input
                    className="next-button"
                    type="submit"
                    value="Continue"
                    onClick={handleClick}
                  />
                  <p>&nbsp;</p>
                  <Link to="../Login" class="login-divert">
                    Already have an account? Login instead
                  </Link>
                </div>
              </FormControl>
            </form>
          </Box>
        </div>

        <div className="signup-right"> <img src="Gigney-signup-img.png" alt="Signup photo"/> </div>
      </div>
    </>
  );
}

export default SignUp;
