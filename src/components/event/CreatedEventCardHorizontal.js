/**
 * CreatedEventCardHorizontal component
 */

//Import dependencies
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Modal,
  Button,
  Tooltip
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { EVENT_IMG_PLACEHOLDER, PATHS } from "../../utils/constants.util";
import { getUser } from "../../utils/localStorage";
import { deleteEvent } from "../../services/EventAPI";
import { LoadingContext } from "../../props/loading-spinner.prop";
import { PartialLoadSpinner } from "../shared/LoadingSpinner";


/**
 * Builds the CreatedEventCardHorizontal component
 * @param {*} props props to consume
 * @returns Render of the CreatedEventCardHorizontal component
 */
const CreatedEventCardHorizontal = (props) => {
  
  //SPA navigator
  const navigate = useNavigate();
  
  //Props
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [modalSpinner, setModalSpinner] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const { isLoading } = useContext(LoadingContext);
  const [tooltipMessage, setTooltipMessage] = useState("Share this event");

  //User data
  const user = getUser();

  //Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  /**
   * Close the modal
   * @param {*} event 
   */
  const handleDelete = (event) => {
    handleModalOpen();
    setMenuOpen(false);
  };


  /**
   * Handler for deleting event
   */
  const handleEventDelete = async () => {
    try {
      setModalSpinner(true);
      const response = await deleteEvent(props.event.event.id);
      handleConfirmationModalOpen();
      handleModalClose();
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setModalSpinner(false);
    }
  };

  /**
   * Toggle menu open/close for event actions
   */
  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  /**
   * Close menu
   * @param {*} event 
   * @returns 
   */
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  /**
   * Handler for keydown events with the event card menu
   * @param {*} event 
   */
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuOpen(false);
    } else if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  /**
   * Navigate to event edit page for selected event
   * @param {*} event 
   */
  const handleEdit = (event) => {
    setMenuOpen(false);
    navigate(PATHS.EDIT_EVENT, { state: { event: props.event } });
  };

  /**
   * Return focus to the button after transition from not open, to open
   */
  const prevOpen = useRef(menuOpen);
  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  /**
   * Get date range string for event card UI
   */
  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );

  /**
   * Get price range string for event card UI
   */
  const priceString = getPriceRangeString(props.event.ticketTypes);

  /**
   * Find the event image url, else display the placeholder image
   */
  let imgUrl = EVENT_IMG_PLACEHOLDER;
  if (props.event.eventImg) {
    imgUrl = props.event.eventImg.url;
  }

  /**
   * Redirect to the event's page
   */
  const cardRedirect = () => {
    navigate(PATHS.EVENT_PAGE, { state: { event: props.event } });
  };

    /**
     * Constructs shareable link and saves it to clipboard
     * @param {*} event The event to generate a link for
     */
    const handleShareClick = (event) => {
      //Prevent parent element events from propagating
      event.stopPropagation();
      //Construct link to event
      const linkToCopy = `${window.location.origin}${PATHS.EVENT_PAGE_NO_PARAMS}/${props.event.event.id}`;
  
      //Copy link to clipboard
      navigator.clipboard
        .writeText(linkToCopy)
        .then(() => {
          //Update tooltip message
          setTooltipMessage("Event Link Copied!");
          //The ms delay after event url is copied to revert the tooltip message
          const MS_TIL_REVERT_MSG = 2200;
  
          //Revert back to the original message after 2 seconds
          setTimeout(() => {
            setTooltipMessage("Share this event!");
          }, MS_TIL_REVERT_MSG);
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    };

  /**
   * Set favourite status of event onload
   */
  useEffect(() => {
    if (user.type === "attendee") {
      let val = props.event.event.isFavourite;
      if (val === true || val === "true") setFavourite(true);
      else if (val === false || val === "false") setFavourite(false);
    }
  }, []);

  //Return render of the component
  return (
    <Card className="horizontal-card-created">
      <CardMedia
        component="img"
        height="200"
        image={imgUrl}
        alt={props.event.event.title}
      />
      <Box className="horizontal-card-box">
        <CardContent>
          <Link id="card-name-link" onClick={cardRedirect}>
            <h3>{props.event.event.title}</h3>
          </Link>
          <p className="card-date">
            <CalendarTodayIcon sx={{ fontSize: 15 }} /> {stringDate}
          </p>
          <p className="card-location">
            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />{" "}
            {props.event.event.venueName}
          </p>
          <p className="card-price">
            <SellOutlinedIcon sx={{ fontSize: 15 }} /> {priceString}
          </p>
          <Tooltip title={tooltipMessage}>
        <div id="ev-share" className="card-icon ev-share-h-2" onClick={handleShareClick}>
          <ShareIcon sx={{ fontSize: 23, color: "black" }} />
        </div>
      </Tooltip>
          <div
            className="ev-menu-h"
            ref={anchorRef}
            aria-controls={menuOpen ? "composition-menu" : undefined}
            aria-expanded={menuOpen ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVertIcon sx={{ fontSize: 45, color: "#f58146" }} />
          </div>
          <Popper
            open={menuOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={menuOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleEdit}>Edit event</MenuItem>
                      <MenuItem onClick={handleDelete}>Delete event</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </CardContent>
      </Box>
      <Modal
  open={modalOpen}
  onClose={handleModalClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="delete-event-modal">
    <h2>Are you sure you want to delete this event?</h2>
    <span>
      All event data will be removed and permanently deleted, so you
      will not be able to retrieve any of the existing information.
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
            onClick={handleEventDelete}
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

//Export CreatedEventCardHorizontal component
export default CreatedEventCardHorizontal;
