/**
 * Signup Attendee component
 */

//Import dependencies
import {
  FormControl,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { LoadingContext } from "../../props/loading-spinner.prop";
import { register } from "../../services/UserAPI";
import { showSuccessToast, showErrorToast } from "../shared/Toaster";
import { PATHS } from "../../utils/constants.util";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * Build the signup attendee component
 * @returns Render of signup attendee component
 */
function SignupAttendee() {
  //Fullpage loading spinner props
  const { setLoading } = useContext(LoadingContext);

  //Props
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(dayjs());
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");

  //Privacy policy label template
  const pplabel = (
    <span>
      I accept Gigney's&nbsp;
      <Link to={PATHS.PRIVACY_POLICY}>Privacy Policy</Link>
    </span>
  );

  //Terms of use label template
  const tclabel = (
    <span>
      I agree to Gigney's&nbsp;
      <Link to={PATHS.TERMS_OF_USE}>Terms of Use</Link>
    </span>
  );

  //SPA navigator
  const navigate = useNavigate();

  /**
   * Registration request handler
   * @param {*} event
   */
  const signupHandler = async (event) => {
    event.preventDefault();

    //Enable fullpage loading spinner
    setLoading(true);

    if (password !== confirmPassword) {
      showErrorToast("Passwords must match");
    } else {
      const requestBody = {
        userType: "attendee",
        firstName: firstName,
        lastName: lastName,
        dob: dob.format("YYYY-MM-DD"),
        email: email,
        password: password,
      };

      await register(requestBody)
        .then((response) => {
          showSuccessToast("Registration Succesful");
          navigate(PATHS.LOGIN);
        })
        .catch((error) => {
          showErrorToast(
            "Sorry, the backend server is down! Please try again later."
          );
        })
        .finally(() => {
          //Disable fullpage loading spinner
          setLoading(false);
        });
    }
  };

  //Return signup attendee component render
  return (
    <>
      <div id="guest-height" className="signup-second-page">
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
              <Grid container item xs={12} sm={6} direction="column">
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
                <p>Date of birth:</p>
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
              <Grid container item xs={12} sm={6} direction="column">
                <p>Password:</p>
                <TextField
                  sx={{ marginBottom: "1%" }}
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  placeholder="Enter a new password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
            <span className="login-link">
              Already have an account?
              <Link to={PATHS.LOGIN}>Login</Link>
              instead
            </span>
          </FormControl>
        </form>
      </div>
    </>
  );
}

//Export the signup attendee component
export default SignupAttendee;
