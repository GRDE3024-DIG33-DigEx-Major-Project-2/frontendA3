import { Card, CardContent, CardMedia, CardActionArea, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const EventCardHorizontal = (props) => {
  // get date range


  const navigate = useNavigate();
    
  const cardRedirect = ()=> {
    navigate("/event", {state:{event:props.event}});
  }


  const stringDate = getDateRangeString(
    props.event.event.startDate,
    props.event.event.endDate
  );

  // get price range
  const priceString = getPriceRangeString(props.event.ticketTypes);

  // get img URL
  let imgUrl = "../Gigney_login.png";
  if (props.event.eventImg) {
    imgUrl =
      "https://gigney.s3.ap-southeast-2.amazonaws.com/" +
      props.event.eventImg.filename +
      ".jpeg";
  }

  return (
    <CardActionArea onClick={cardRedirect} sx={{height: "100%"}}>
    <Card className="horizontal-card">
      <CardMedia
        component="img"
        image={imgUrl}
        alt={props.event.event.title}
      />
      <Box className="horizontal-card-box">
        <CardContent>
          <h3 className="card-name">{props.event.event.title}</h3>
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
          <div className="card-icon ev-share-h">
            <ShareIcon sx={{ fontSize: 23, color: "black" }} />
          </div>
          <div className="card-icon ev-bookmark-h">
            <BookmarkAddIcon sx={{ fontSize: 21, color: "black" }} />
          </div>
        </CardContent>
      </Box>
    </Card>
    </CardActionArea>

  );
};

export default EventCardHorizontal;
