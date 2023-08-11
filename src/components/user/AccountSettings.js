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
  Modal,
} from "@mui/material";
import ResetPassword from "./ResetPassword";
import { PATHS } from "../../utils/constants.util";
import { LoadingContext } from "../../props/loading-spinner.prop";
import { useContext, useState } from "react";
import { deleteUser } from "../../services/UserAPI";
import { showSuccessToast, showToast, showErrorToast } from "../shared/Toaster";
import { logoutErrorHandler } from "../../services/AuthAPI";

const AccountSettings = () => {
  //Loading spinner props
  const { loading, setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  /**
   * Deletes the user's account and then logs them out
   */
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("...deleting account");

    // const userConfirmation = window.confirm(
    //   "Are you sure you want to delete your account?"
    // );
    // if (userConfirmation) {
      try {
        setLoading(true);

        let response = await deleteUser();
        handleConfirmationModalOpen();
        handleModalClose();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    // }
  };

  return (
    <>
      <h2>Account settings</h2>
      <Box className="profile-box prof-left">
        <FormControl fullWidth>
          <ResetPassword></ResetPassword>
          <Link
            id="delete-account-profile"
            onClick={handleModalOpen}
          >
            Delete this account
          </Link>
        </FormControl>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="delete-event-modal">
          <h2>Are you sure you want to delete your Gigney account?</h2>
          <span>
            All your data will be removed and permanently deleted, so you will
            not be able to retrieve any of your existing information.
          </span>
          <div>
            <Button
              id="save-exit-ev-btn"
              variant="contained"
              className="input-btn"
              onClick={handleModalClose}
            >
              No, I've changed my mind
            </Button>
            <Button
              id="save-cont-ev-btn"
              variant="contained"
              onClick={handleDelete}
            >
              Yes, delete my account
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={confirmationModalOpen}
        onClose={handleConfirmationModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="confirmation-modal"
      >
        <Box className="delete-event-modal">
          <h2>Success!</h2>
          <span>
            Your account and all its data has been permanently deleted.
          </span>
          <Button id="save-cont-ev-btn" variant="contained" href="/login">
            Sign out
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AccountSettings;
