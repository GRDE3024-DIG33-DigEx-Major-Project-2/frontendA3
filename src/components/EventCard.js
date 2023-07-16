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
        navigate("/event");
    }

  return (
    <Card className="event-card">
      <CardActionArea onClick={cardRedirect}>
        <CardMedia
          component="img"
          height="140"
          image= {props.event.img}
          alt="gigney logo"
        />
        <CardContent>
          <h3 className="card-name">{props.event.name}</h3>
          <p className="card-date"><CalendarTodayIcon sx={{ fontSize: 15}}/>  {props.event.date}</p>
          <p clasName="card-location"><LocationOnOutlinedIcon sx={{ fontSize: 15}}/>  {props.event.location}</p>
        </CardContent>
      </CardActionArea>
        <div className="card-icon ev-share">
          <ShareIcon sx={{ fontSize: 22 }} />
        </div>
        <div className="card-icon ev-bookmark">
          <BookmarkAddIcon sx={{ fontSize: 23 }} />
        </div>
    </Card>
  );
};

export default EventCard;
