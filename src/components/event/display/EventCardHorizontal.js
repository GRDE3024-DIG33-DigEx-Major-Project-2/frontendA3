/**
 * The event listing in search results
 */

//Import dependencies
import { Card, CardContent, CardMedia, CardActionArea, Box, Link, Tooltip, } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { toggleFavourite, isFavourited } from "../../../services/EventAPI";
import { useState, useEffect } from "react";
import { getUser } from "../../../utils/localStorage";
import { EVENT_IMG_PLACEHOLDER, PATHS } from "../../../utils/constants.util";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

/**
 * The event listing component for search results
 * @param {*} props 
 * @returns 
 */
const EventCardHorizontal = (props) => {

  //Setup props
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  const user = getUser();
  const [tooltipMessage, setTooltipMessage] = useState('Share this event');

  console.log("THIS IS THE OWNED EVENT EVENT");
  console.log(props.event.event.isFavourite);

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
   * Build the date range string
   */
  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );

  //Get price range
  const priceString = getPriceRangeString(props.event.ticketTypes);

  //Find url to image -- if image not added, use default image
  let imgUrl = EVENT_IMG_PLACEHOLDER;
  //Assign the event's image url if found
  if (props.event.eventImg) {
    imgUrl = props.event.eventImg.url
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


  //Return render of component
  return (
    <CardActionArea onClick={cardRedirect}>
      <Card className="horizontal-card">
        <CardMedia component="img" image={imgUrl} alt={props.event.event.title} />
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
            <div className="card-icon ev-share-h" onClick={handleShareClick}>
              <ShareIcon sx={{ fontSize: 23, color: "black" }} />
            </div>
      </Tooltip>
            {user !== null && (
              user.type === "attendee" ? (
                <Tooltip
                  title={!favourite ? "Add to favourites" : "Remove from favourites"}
                >
                  <div
                    id={favourite ? 'ev-bookmark-h-selected' : 'ev-bookmark-h'}
                    className={favourite ? 'card-icon-selected ev-bookmark-h' : 'card-icon ev-bookmark-h'}
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
              ) : null)}
          </CardContent>
        </Box>
      </Card>
    </CardActionArea>

  );
};

//Export event listing component for search results
export default EventCardHorizontal;
