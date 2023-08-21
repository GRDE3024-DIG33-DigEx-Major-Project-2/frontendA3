/**
 * Signup base component
 */

//Import dependencies
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  GIGNEY_SIGNUP_LOGO,
  PATHS,
  GIGNEY_SIGNUP_LEFT_LOGO,
  GIGNEY_SIGNUP_RIGHT_LOGO,
} from "../../utils/constants.util";


/**
 * Build the signup base component
 * @returns Render of signup component
 */
function SignupBase() {

  //Account type flag
  const [accountType, setAccountType] = useState("");

  /**
   * Handle signup user type change
   * @param {*} event 
   */
  const handleChange = (event) => {
    setAccountType(event.target.value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (accountType == "attendee") navigate(PATHS.SIGN_UP_ATTENDEE);
    else if (accountType == "organiser") navigate(PATHS.SIGN_UP_ORGANISER);
  };

  //Return render of signup base page
  return (
    <>
      <div className="signup">
        <div className="signup-left">
          <div className="signup-logo">
            <img src={GIGNEY_SIGNUP_LEFT_LOGO} alt="gigney logo" />
            <h1>Create an account</h1>
          </div>
          <FormControl onSubmit={handleChange} className="signup-form">
            <Select
              fullWidth
              displayEmpty
              id="demo-simple-select"
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <span className="select-span">
                      What would you like to do on this site?
                    </span>
                  );
                } else if (selected === "attendee") {
                  return <span className="select-span">Search for events</span>;
                } else
                  return <span className="select-span">Create an event</span>;
              }}
            >
              <MenuItem id="guest" value={"attendee"}>
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
                <Link to={PATHS.LOGIN}>Login</Link>
                instead
              </span>
            </div>
          </FormControl>
        </div>

        <div className="signup-right">
          {" "}
          <img
            src={GIGNEY_SIGNUP_LOGO}
            alt="live concert"
            id="signup-right-img"
          />{" "}
          <div className="mobile-signup-logo">
            <img
              src={GIGNEY_SIGNUP_RIGHT_LOGO}
              alt="live concert"
              className="signup-logo-img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

//Export base signup page
export default SignupBase;
