import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";

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
          <div className="signup-logo">
            <img
              src="../gigney_logo_black_square_no_bg_web.png"
              alt="gigney logo"
            />
            <h1>Create an account</h1>
          </div>
          <FormControl onSubmit={handleChange} className="signup-form">
            <InputLabel id="demo-simple-select-label">
              What would you like to do on this site?
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
            >
              <MenuItem id="guest" value={"guest"}>
                <LocationOnIcon color="primary" className="dropdown-icon" />
                Search for events
              </MenuItem>
              <MenuItem id="organiser" value={"organiser"}>
                <AddCircleOutlineRoundedIcon
                  color="primary"
                  className="dropdown-icon"
                />
                Create an event
              </MenuItem>
            </Select>
            <div className="signup-next-button">
              <Button
                sx={{ color: "black", backgroundColor: "#f58146" }}
                className="input-btn"
                id="next-button"
                type="submit"
                onClick={handleClick}
                variant="contained"
              >
                Continue
              </Button>
              <p>&nbsp;</p>
              <span className="login-link">
              Already have an account?
              <Link to="../Login">
                 Login
              </Link>
              instead
            </span>
            </div>
          </FormControl>
        </div>

        <div className="signup-right">
        {" "}
          <img src="Gigney-signup-img.png" alt="live concert" id="signup-right-img" />{" "}
          <div className="mobile-signup-logo">
            <img
              src="./gigney_logo_white_square_no_bg_web.png"
              alt="live concert"
              className="signup-logo-img"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
