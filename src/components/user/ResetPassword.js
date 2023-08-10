import { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { showToast, showSuccessToast, showErrorToast } from "../shared/Toaster";
import { PATHS } from "../../utils/constants.util";
import {
  Box,
  Avatar,
  Button,
  FormControl,
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

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);


  const [showPassword, setShowPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    //Loading spinner props
    const {
      loading,
      setLoading
    } = useContext(LoadingContext);

  const navigate = useNavigate();

  const resetHandler = async (event) => {
    event.preventDefault();
    console.log("Reset Password Handler");

    if (newPassword != confirmPassword) {
      showErrorToast("New password input mismatch!");
    }
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
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }      
    }


  };
  

  return (
<>
      <h3>Change Password</h3>
      <p>Password:</p>
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

export default ResetPassword;
