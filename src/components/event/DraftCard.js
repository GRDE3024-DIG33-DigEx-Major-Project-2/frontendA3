/**
 * DraftCard component
 */

//Import dependencies
import { Button, Card, Link, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDrafts, removeDraft } from "../../utils/localStorage";
import { PATHS } from "../../utils/constants.util";
import { deleteEvent } from "../../services/EventAPI";
import { useState } from "react";
import { PartialLoadSpinner } from "../shared/LoadingSpinner";

/**
 * Builds the DraftCard component
 * @param {*} props
 * @returns Render of the DraftCard component
 */
const DraftCard = (props) => {
  //SPA navigator
  const navigate = useNavigate();
  //Retrieve draft from local storage
  const drafts = getDrafts();
  const draft = drafts[props.draftNo];
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [modalSpinner, setModalSpinner] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Redirect to the create event flow with the selected draft
   */
  const cardRedirect = () => {
    navigate(PATHS.CREATE_EVENT, {
      state: { draft: draft, draftNo: props.draftNo },
    });
  };

  /**
   * Delete draft
   */
  const remove = () => {
    removeDraft(props.draftNo);
    props.setRefresh(!props.refresh);
  };

  //Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  /**
   * Handler for deleting event
   */
  const handleEventDelete = async () => {
    try {
      setModalSpinner(true);
      const response = await deleteEvent(props.event.event.id);
      handleConfirmationModalOpen();
      handleModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      setModalSpinner(false);
    }
  };

  /**
   * Close the modal
   * @param {*} event
   */
  const handleDelete = (event) => {
    handleModalOpen();
    setMenuOpen(false);
  };

  //Return render of the DraftCard component
  return (
    <Card className="draft-card">
      <Link id="card-name-link" onClick={cardRedirect}>
        <h3>{props.name}</h3>
      </Link>
      <div>
        <Button
          id="save-cont-ev-btn"
          variant="contained"
          onClick={cardRedirect}
        >
          Keep editing
        </Button>
        <Button
          id="save-exit-ev-btn"
          variant="contained"
          onClick={handleDelete}
        >
          Delete draft
        </Button>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="delete-event-modal">
          <h2>Are you sure you want to delete this event?</h2>
          <span>
            All event data will be removed and permanently deleted, so you will
            not be able to retrieve any of the existing information.
          </span>
          <div>
            {modalSpinner ? (
              <PartialLoadSpinner></PartialLoadSpinner>
            ) : (
              <>
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
                  onClick={remove}
                >
                  Yes, delete this event
                </Button>
              </>
            )}
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
          <span>This event has been permanently deleted.</span>
          <Button id="save-cont-ev-btn" variant="contained" href="/dashboard">
            Go to Dashboard
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

//Export the DraftCard component
export default DraftCard;
