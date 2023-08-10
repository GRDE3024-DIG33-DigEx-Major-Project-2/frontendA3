/**
 * Account settings component
 */

import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import ResetPassword from "./ResetPassword";
import { PATHS } from "../../utils/constants.util";
import { LoadingContext } from "../../props/loading-spinner.prop";
import { useContext } from "react";
import { deleteUser } from "../../services/UserAPI";
import { showSuccessToast, showToast, showErrorToast } from "../shared/Toaster";
import { logoutErrorHandler } from "../../services/AuthAPI";

const AccountSettings = () => {

      //Loading spinner props
      const {
        loading,
        setLoading
      } = useContext(LoadingContext);
  
    const navigate = useNavigate();


    /**
     * Deletes the user's account and then logs them out
     */
  const handleDelete = async (e) => {

    e.preventDefault();
    console.log("...deleting account");

    const userConfirmation = window.confirm("Are you sure you want to delete your account?");
    if (userConfirmation) {
    try {
      setLoading(true);

      let response = await deleteUser();

    navigate(PATHS.LOGIN);        
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }      
    }
  }


    return (
      <>
                    <h2>Account settings</h2>
                    <Box className="profile-box prof-left">
    <FormControl fullWidth>
<ResetPassword></ResetPassword>     
        <Link
        id="delete-account-profile"
        to={PATHS.HOME}
        onClick={handleDelete}
      >
        Delete this account
      </Link>     
    </FormControl>
  </Box>      
      </>
    );
  };
  
  export default AccountSettings;