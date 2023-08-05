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
  ClickAwayListener
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const CreatedEventCardHorizontal = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);

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
    navigate("/edit-event", { state: { event: props.event } });
  };

  //TODO
  const handleDelete = (event) => {
    console.log("..deleting event");
    setMenuOpen(false);
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
  let imgUrl = "../Gigney_login.png";
  if (props.event.eventImg) {
    imgUrl = props.event.eventImg.url;
  }

  const cardRedirect = () => {
    navigate("/event", { state: { event: props.event } });
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
    </Card>
  );
};

export default CreatedEventCardHorizontal;
