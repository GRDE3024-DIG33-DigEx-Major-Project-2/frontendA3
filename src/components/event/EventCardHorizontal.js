import { Card, CardContent, CardMedia, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

const EventCardHorizontal = (props) => {
  const date = new Date(Date.parse(props.event.event.startDate));
  const stringDate = date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  let imgUrl = "../Gigney_login.png";

  if (props.event.eventImg) {
    imgUrl =
      "https://gigney.s3.ap-southeast-2.amazonaws.com/" +
      props.event.eventImg.filename +
      ".jpeg";
  }

  let price = "No price data";
  if (props.event.ticketTypes.length > 0) {
    if (props.event.ticketTypes.length > 1) {
      // TODO: implement function to find min and max price
    } else {
      price = "$" + props.event.ticketTypes[0].price;
    }
  }

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
          <h3 className="card-name">{props.event.event.title}</h3>
          <p className="card-date">
            <CalendarTodayIcon sx={{ fontSize: 15 }} /> {stringDate}
          </p>
          <p className="card-location">
            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />{" "}
            {props.event.event.venueName}
          </p>
          <p className="card-price">
            <SellOutlinedIcon sx={{ fontSize: 15 }} /> {price}
          </p>
          <div className="card-icon ev-share-h">
            <ShareIcon sx={{ fontSize: 23 }} />
          </div>
          <div className="card-icon ev-bookmark-h">
            <BookmarkAddIcon sx={{ fontSize: 21 }} />
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};

export default EventCardHorizontal;
