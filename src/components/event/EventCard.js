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
import { getDateRangeString } from "../../utils/utils";
import { useState, useEffect } from "react";
import { toggleFavourite, isFavourited } from "../../services/EventAPI";
import { getUser } from "../../utils/localStorage";

const EventCard = (props) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    async function setIsFavourite() {
      const isFav = await isFavourited([props.event.event.id]);
      if (isFav.length > 0)
      if (isFav[0].isFavourite)
      setFavourite(isFav[0].isFavourite);
    }
    if (getUser.userType == "Attendee") {
setIsFavourite();
    }
  }, [setFavourite]);

  // on load, check if the event is already in the favourite list
  
  const cardRedirect = () => {
    navigate("/event", { state: { event: props.event } });
  };

  const handleFavourite = () => {
    if (favourite) {
      console.log("removing from favourite events");
      setFavourite(false);
    } else {
      console.log("adding to favourite events");
      setFavourite(true);
    }
    // favourite/unfavourite event using backend api
    toggleFavourite(props.event.event.id);
  };

  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );

  let imgUrl = "../Gigney_login.png";

  if (props.event.eventImg) {
    imgUrl =
      "https://gigney.s3.ap-southeast-2.amazonaws.com/" +
      props.event.eventImg.filename +
      ".jpeg";
  }

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
      <Tooltip title="Share this event">
        <div id="ev-share" className="card-icon">
          <ShareIcon sx={{ fontSize: 22, color: "black" }} />
        </div>
      </Tooltip>
      {getUser().userType === "Attendee" && (
  <Tooltip
    title={!favourite ? "Add to favourites" : "Remove from favourites"}
  >
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
    </div>
  </Tooltip>
)}
    </Card>
  );
};

export default EventCard;
