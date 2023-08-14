/**
 * Event page component
 */

//Import dependencies
import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Divider, Stack, Chip, Avatar, Button, Tooltip } from "@mui/material";
import { getFirstLetters } from "../../../utils/utils";
import { SearchEventsContext } from "../../../props/search-events.prop";
import { PartialLoadSpinner } from "../../shared/LoadingSpinner";
import { getEventById } from "../../../services/EventAPI";
import { EVENT_IMG_PLACEHOLDER } from "../../../utils/constants.util";
import { toggleFavourite, isFavourited } from "../../../services/EventAPI";
import { getUser } from "../../../utils/localStorage";
import { PATHS } from "../../../utils/constants.util";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import zIndex from "@mui/material/styles/zIndex";

/**
 * Builds the Event page component
 * @returns The rendered event page component
 */
function EventPage() {


  /**
  * Prop context for search event data
  */
  const {
    fetchStatus
  } = useContext(SearchEventsContext);

  const user = getUser();


  //Config event data
  const location = useLocation();
  const [event, setEvent] = useState(location.state ? location.state.event : null);
  //Destructure eventId from params if this is a shareable link
  const { eventId } = useParams();
  const [tooltipMessage, setTooltipMessage] = useState('Share this event');
  const [favourite, setFavourite] = useState(false);


      /**
   * Set favourite status of event onload
   */
  useEffect(() => {
    if (user)
    if (user.type == "attendee") {
      let val = event.event.isFavourite;
      if (val == true || val == "true")
      setFavourite(true);
      else if (val == false || val == "false")
      setFavourite(false);
    }
}, []);


  /**
   * Onload hook handling
   */
  useEffect(() => {


    //If event is not passed through location state, fetch by id
    if (!event && eventId) {
    //Toggle loading UI on
    fetchStatus.set(true);      
      fetchEventById(eventId).then((data) => {
        //Set the event data
        setEvent(data);
        //Toggle loading UI on
        fetchStatus.set(false);
      });
    }
  }, [event, eventId], [setFavourite]);

  /**
   * Fetch the event data by id
   * @param {*} eventId The event's id
   * @returns The event data if found, else null
   */
  const fetchEventById = async (eventId) => {
    try {
      let response = await getEventById(eventId);
      let data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      return null;
    }
  };


    /**
   * Toggle favourite status of event
   */
    const handleFavourite = (e) => {
      //Prevent parent element events from propagating
      e.stopPropagation();
      if (favourite) {
        console.log("removing from favourite events");
        setFavourite(false);
      } else {
        console.log("adding to favourite events");
        setFavourite(true);
      }
      toggleFavourite(event.id);
    };

    /**
   * Constructs shareable link and saves it to clipboard
   * @param {*} event The event to generate a link for
   */
    const handleShareClick = (e) => {
      //Prevent parent element events from propagating
      e.stopPropagation();
      //Construct link to event
      const linkToCopy = `${window.location.origin}${PATHS.EVENT_PAGE_NO_PARAMS}/${event.id}`;
  
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



  //Render component load spinner while event is being fetched
  if (!event) return <PartialLoadSpinner></PartialLoadSpinner>;
  else {
  //Destructure event props from event object
  const startDate = new Date(Date.parse(event.event.startDate));
  const endDate = new Date(Date.parse(event.event.endDate));
  const ticketTypes = event.ticketTypes;
  const lineup = event.acts;
  const tags = event.tags;
  //Find URL -- if image not added, use default image
  let imgUrl = EVENT_IMG_PLACEHOLDER;
  if (event.eventImg) {
    imgUrl = event.eventImg.url;
  }    
  //Return the render of the event page
  return (
    <div className="event-preview">
            <Tooltip title={tooltipMessage}>
      <div className="event-prev-card-icon-share" onClick={handleShareClick}>
        <ShareIcon sx={{ fontSize: 22, color: "black" }} />
      </div>
      </Tooltip>
      {user !== null && (
        user.type === "attendee" ? (
          <Tooltip
            title={!favourite ? "Add to favourites" : "Remove from favourites"}
          >
          <div className="event-prev-card-icon-bookmark">
            <div
              id={favourite ? 'ev-bookmark-selected' : 'ev-bookmark'}
              className={favourite ? 'card-icon-selected' : 'card-icon'}
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
            </div> </div>
          </Tooltip>
        ) : null )}
      <div className="event-main-image">
        <img alt={event.event.title} src={imgUrl} />
      </div>
      <div className="prev-event-body">
        <div className="event-prev-first-row">
          <h1 className="event-title">{event.event.title}</h1>
          <button className="event-buy-button">Buy Tickets</button>
        </div>
        <div className="event-prev-second-row">
          <div className="when-where-box outlined">
            <h2 className="event-prev-title">When and where</h2>
            <Stack
              spacing={2}
              direction="row"
              className="horizontal-stack"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <div className="prev-date-time">
                <span className="icon-title">
                  <CalendarTodayOutlinedIcon sx={{ color: "#4B7CBE" }} />
                  <h3>Date and time</h3>
                </span>
                <p className="strong-string-prev">
                  {startDate.toDateString()}{" "}
                  {startDate.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  - {endDate.toDateString()}{" "}
                  {endDate.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="prev-location">
                <span className="icon-title">
                  <LocationOnOutlinedIcon sx={{ color: "#4B7CBE" }} />
                  <h3>Location</h3>
                </span>
                <p className="strong-string-prev">
                  {event.event.venueName}, {event.event.address}
                  {event.event.suburb}, {event.event.postcode},{" "}
                  {event.event.city} {event.event.region}
                </p>
              </div>
            </Stack>
          </div>
          <div className="organiser-box outlined">
            <h2 className="event-prev-title">Organiser</h2>
            <Avatar id="event-avatar">{getFirstLetters(event.event.organizationName)}</Avatar>
            <h2>{event.event.organizationName}</h2>
          </div>
        </div>
        <div className="event-prev-third-row">
          <div className="pricing-box outlined">
            <h2 className="event-prev-title-2">Pricing</h2>
            <Stack
              spacing={2}
              direction="row"
              className="horizontal-stack"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {ticketTypes.length !== 0 &&
                ticketTypes.map((ticket) => (
                  <div className="event-prev-price">
                    <span className="icon-title">
                      <LocalActivityOutlinedIcon sx={{ color: "#4B7CBE" }} />
                      <h3>{ticket.name}</h3>
                    </span>
                    <p>$ {ticket.price}</p>
                  </div>
                ))}
              {ticketTypes.length === 0 && <h2 style={{ padding: "3% 5%" }}>This event is free.</h2>}
            </Stack>
          </div>
        </div>
        <div className="event-prev-fourth-row">
          <div className="create-prev-about">
            <h2>About this event</h2>
            <p>{event.event.description}</p>
          </div>
          <div className="create-prev-lineup outlined">
            <h2 className="event-prev-title">Artist line-up</h2>
            <ul>
              {lineup.length !== 0 && lineup.map((act) => <li>{act.name}</li>)}
            </ul>
          </div>
        </div>
        <div className="event-prev-fifth-row">
          <div className="event-prev-tags">
            <h2>Tags</h2>
            <div>
              {tags.map((tag) => (
                <Chip
                  sx={{
                    backgroundColor: "white",
                    color: "#7759a6",
                    border: "solid 1px #7759a6",
                    margin: "0 1%",
                  }}
                  key={tag.id}
                  label={tag.name}
                />
              ))}
            </div>
          </div>
          <Button href={event.event.purchaseUrl} variant="contained" id="buy-tickets-btn">Buy Tickets</Button>
        </div>
      </div>
    </div>
  );


  }



};


//Export event page component
export default EventPage;
