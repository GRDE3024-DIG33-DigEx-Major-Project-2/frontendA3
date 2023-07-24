import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const EventCard = (props) => {

    const navigate = useNavigate();
    
    const cardRedirect = ()=> {
      navigate("/event", {state:{event:props.event}});
    }

    const date = new Date(Date.parse(props.event.event.startDate));
    const stringDate = date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    let imgUrl = "../Gigney_login.png";

    if(props.event.eventImg){
      imgUrl = "https://gigney.s3.ap-southeast-2.amazonaws.com/" + props.event.eventImg.filename + ".jpeg";
    }

  return (
    <Card className="event-card">
      <CardActionArea onClick={cardRedirect}>
        <CardMedia
          component="img"
          height="140"
          image= {imgUrl}
          alt={props.event.event.title}
        />
        <CardContent>
          <h3 className="card-name">{props.event.event.title}</h3>
          <p className="card-date"><CalendarTodayIcon sx={{ fontSize: 15}}/>  {stringDate}</p>
          <p className="card-location"><LocationOnOutlinedIcon sx={{ fontSize: 15}}/>  {props.event.event.venueName}</p>
        </CardContent>
      </CardActionArea>
        <div className="card-icon ev-share">
          <ShareIcon sx={{ fontSize: 22, color:"black" }} />
        </div>
        <div className="card-icon ev-bookmark">
          <BookmarkAddIcon sx={{ fontSize: 23, color:"black" }} />
        </div>
    </Card>
  );
};

export default EventCard;
