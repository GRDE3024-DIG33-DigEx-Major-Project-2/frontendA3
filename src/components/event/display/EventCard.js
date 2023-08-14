/**
 * The event listing on the homepage
 */

//Import dependencies
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { getDateRangeString } from "../../../utils/utils";
import { useState, useEffect, useReducer } from "react";
import { toggleFavourite, isFavourited } from "../../../services/EventAPI";
import { getUser } from "../../../utils/localStorage";
import { EVENT_IMG_PLACEHOLDER, PATHS } from "../../../utils/constants.util";
import { logoutErrorHandler } from "../../../services/AuthAPI";

/**
 * Builds the event listing component for homepage
 * @param {*} props 
 * @returns The rendered evcent listing component for homepage
 */
const EventCard = (props) => {

  //Setup props
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  const user = getUser();
  const [tooltipMessage, setTooltipMessage] = useState('Share this event');

  /**
   * Set favourite status of event onload
   */
  useEffect(() => {
      if (user)
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
   * Redirect to the event's page
   */
  const cardRedirect = () => {
    navigate(PATHS.EVENT_PAGE, { state: { event: props.event } });
  };


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

  /**
   * Build the date range string to display
   */
  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );


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
    navigator.clipboard.writeText(linkToCopy).then(() => {
      //Update tooltip message
      setTooltipMessage('Copied!');
      //The ms delay after event url is copied to revert the tooltip message
      const MS_TIL_REVERT_MSG = 2200;

      //Revert back to the original message after 2 seconds
      setTimeout(() => {
        setTooltipMessage('Share this event');
      }, MS_TIL_REVERT_MSG);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  };



  //Init image url as placeholder image
  let imgUrl = EVENT_IMG_PLACEHOLDER;
  //Assign the event's image url if found
  if (props.event.eventImg)
    imgUrl = props.event.eventImg.url;

  //Return render of component
  return (
    <Card className="event-card">
      <CardActionArea onClick={cardRedirect} sx={{ height: "100%" }}>
        <CardMedia
          className="event-card-media"
          component="img"
          image={imgUrl}
          alt={props.event.event.title}
        />
        <CardContent sx={{ minHeight: "50%" }}>
          <h3 className="card-name">{props.event.event.title}</h3>
          <p className="card-date">
            <CalendarTodayIcon sx={{ fontSize: 15 }} /> {stringDate}
          </p>
          <p className="card-location">
            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />{" "}
            {props.event.event.venueName}
          </p>
        </CardContent>
      </CardActionArea>
      <Tooltip title={tooltipMessage}>
        <div id="ev-share" className="card-icon" onClick={handleShareClick}>
          <ShareIcon sx={{ fontSize: 22, color: "black" }} />
        </div>
      </Tooltip>
      {user !== null && (
        user.type === "attendee" ? (
          <Tooltip
            title={!favourite ? "Add to favourites" : "Remove from favourites"}
          >
            <div
              id={favourite ? 'ev-bookmark-selected' : 'ev-bookmark'}
              className={props.event.event.isFavourited ? 'card-icon-selected' : 'card-icon'}
              onClick={handleFavourite}
            >
              <BookmarkBorderOutlinedIcon
                id={favourite ? "bookmark-hide" : "bookmark-show"}
                sx={{ fontSize: 23, color: "black" }}
              />
              <BookmarkOutlinedIcon
                id={favourite ? "bookmark-show" : "bookmark-hide"}
                sx={{ fontSize: 23, color: "black" }}
              />
            </div>
          </Tooltip>
        ) : null
      )}
    </Card>
  );
};


//Export the event listing
export default EventCard;
