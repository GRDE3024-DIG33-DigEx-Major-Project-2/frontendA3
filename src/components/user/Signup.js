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
              <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
              <h1>Create an account</h1>
            </div>
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
                  <MenuItem
                    id="guest"
                    value={"guest"}
                  >
                   <LocationOnIcon />    Search for events
                  </MenuItem>
                  <MenuItem
                    id="organiser"
                    value={"organiser"}
                  >
                   <AddCircleOutlineRoundedIcon />    Create an event
                  </MenuItem>
                </Select>
              </FormControl>
              <div className="signup-next-button">
                  <input
                    className="next-button"
                    type="submit"
                    value="Continue"
                    onClick={handleClick}
                  />
                  <p>&nbsp;</p>
                  <Link to="../Login" className="login-divert">
                    Already have an account? Login instead
                  </Link>
                </div>
            </form>
        </div>

        <div className="signup-right">
          {" "}
          <img src="Gigney-signup-img.png" alt="live concert" />{" "}
        </div>
      </div>
    </>
  );
}

export default SignUp;
