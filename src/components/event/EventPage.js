import { useLocation } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Divider, Stack, Chip, Avatar, Button } from "@mui/material";
import { getFirstLetters } from "../../utils/utils";

function Event() {
  const location = useLocation();
  const event = location.state.event;
  console.log(event);

  // get date range
  const startDate = new Date(Date.parse(event.event.startDate));
  const endDate = new Date(Date.parse(event.event.endDate));
  // get ticket types
  const ticketTypes = event.ticketTypes;
  // get lineup
  const lineup = event.acts;
  // get tags
  const tags = event.tags;
  // find URL - if image not added, use default image
  let imgUrl = "../Gigney_login.png";
  if (event.eventImg) {
    imgUrl = event.eventImg.url;
  }

  return (
    <div className="event-preview">
      <div className="event-prev-card-icon-share">
        <ShareIcon sx={{ fontSize: 22, color: "black" }} />
      </div>
      <div className="event-prev-card-icon-bookmark">
        <BookmarkAddIcon sx={{ fontSize: 23, color: "black" }} />
      </div>
      <h1>&nbsp;</h1>
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
              {ticketTypes.length === 0 && <h2 style={{padding: "3% 5%"}}>This event is free.</h2>}
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
export default Event;
