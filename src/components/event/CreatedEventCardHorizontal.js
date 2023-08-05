import { Card, CardContent, CardMedia, Box, Link } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { getDateRangeString, getPriceRangeString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const CreatedEventCardHorizontal = (props) => {
  const navigate = useNavigate();
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
    imgUrl = props.event.eventImg.url
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
          <Link id="card-name-link" onClick={cardRedirect}><h3>{props.event.event.title}</h3></Link>
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
          <div className="ev-menu-h">
            <MoreVertIcon sx={{ fontSize: 45, color: "#f58146" }} />
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CreatedEventCardHorizontal;
