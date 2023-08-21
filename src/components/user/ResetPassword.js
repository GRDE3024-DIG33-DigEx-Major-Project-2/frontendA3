/**
 * Reset Password component
 */

//Import dependencies
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../shared/Toaster";
import { PATHS } from "../../utils/constants.util";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { logoutErrorHandler } from "../../services/AuthAPI";
import { resetPassword } from "../../services/UserAPI";
import { LoadingContext } from "../../props/loading-spinner.prop";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


/**
 * Reset Password component
 * @returns 
 */
const ResetPassword = () => {

  //Props
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  //Loading spinner props
  const {
    setLoading
  } = useContext(LoadingContext);

  //SPA navigator
  const navigate = useNavigate();

  /**
   * Handles password reset attempt
   * @param {*} event 
   */
  const resetHandler = async (event) => {
    event.preventDefault();

    //Both new password inputs must match
    if (newPassword != confirmPassword) {
      showErrorToast("New password input mismatch!");
    }
    //Password inputs match, attempting reset password request
    else {
      try {
        setLoading(true);

        let response = await resetPassword(oldPassword, newPassword);

        if (response.status === 200) {
          console.log(response.data.msg);
          showSuccessToast("Password successfully reset! Please log in with your new password.");
          logoutErrorHandler();
          navigate(PATHS.LOGIN);
        }
        else {
          console.log(response.data.msg);
          showErrorToast(response.data.msg);
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
  };


  //Return render of reset password component
  return (
    <>
      <h3>Change Password</h3>
      <p>Current Password:</p>
      <TextField
        variant="outlined"
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Enter your current password"
        onChange={e => setOldPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon color="primary" />
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
      />
      <p>New Password:</p>
      <TextField
        variant="outlined"
        type={setShowPassword ? "text" : "password"}
        id="new-password"
        placeholder="Enter your new password"
        onChange={e => setNewPassword(e.target.value)}
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
      />
      <p>Confirm New Password:</p>
      <TextField
        variant="outlined"
        id="confirm-password"
        type={setShowPassword ? "text" : "password"}
        placeholder="Confirm your new password"
        onChange={e => setConfirmPassword(e.target.value)}
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
      />
      <Button
        variant="contained"
        id="save-pwd-btn"
        type="submit"
        sx={{ color: "black" }}
        onClick={resetHandler}
      >
        Save new password
      </Button>
    </>);

};


//Export the reset password component
export default ResetPassword;
