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
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { EVENT_IMG_PLACEHOLDER, PATHS } from "../../utils/constants.util";
import { deleteEvent } from "../../services/EventAPI";
import { getUser } from "../../utils/localStorage";
import { toggleFavourite } from "../../services/EventAPI";

const CreatedEventCardHorizontal = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [favourite, setFavourite] = useState(false);
  const user = getUser();

  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  const handleDelete = (event) => {
    handleModalOpen();
    setMenuOpen(false);
  };

  const handleEventDelete = async () => {
    const response = await deleteEvent(props.event.event.id);
    console.log(response);
    handleConfirmationModalOpen();
    handleModalClose();
  };

  // Dropdown menu functions
  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuOpen(false);
    } else if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  const handleEdit = (event) => {
    setMenuOpen(false);
    navigate(PATHS.EDIT_EVENT, { state: { event: props.event } });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(menuOpen);
  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  // get date range
  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );

  // get price range
  const priceString = getPriceRangeString(props.event.ticketTypes);

  // find URL - if image not added, use default image
  let imgUrl = EVENT_IMG_PLACEHOLDER;
  if (props.event.eventImg) {
    imgUrl = props.event.eventImg.url;
  }

  const cardRedirect = () => {
    navigate(PATHS.EVENT_PAGE, { state: { event: props.event } });
  };


  /**
   * Set favourite status of event onload
   */
  useEffect(() => {
    if (user.type == "attendee") {
      console.log("IS AN ATTENDEE");
      console.log(props.event.event.isFavourite);
      let val = props.event.event.isFavourite;
      if (val == true || val == "true")
      setFavourite(true);
      else if (val == false || val == "false")
      setFavourite(false);
    }
}, []);

    /**
   * Toggle favourite status of event
   */
    const handleFavourite = (event) => {
      //Prevent parent element events from propagating
      event.stopPropagation();
      if (favourite) {
        console.log("removing from favourite events");
        setFavourite(false);
      } else {
        console.log("adding to favourite events");
        setFavourite(true);
      }
      toggleFavourite(props.event.event.id);
    };




  return (
    <Card className="horizontal-card">
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
          <div className="card-icon ev-share-h-2">
            <ShareIcon sx={{ fontSize: 23, color: "black" }} />
          </div>
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
            All event data will be removed and permanently deleted, so you will
            not be able to retrieve aby of the existing information.
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
              onClick={handleEventDelete}
            >
              Yes, delete this event
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
          <span>This event has been permanently deleted.</span>
            <Button
              id="save-cont-ev-btn"
              variant="contained"
              href="/dashboard"
            >
              Go to Dashboard
            </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default CreatedEventCardHorizontal;
