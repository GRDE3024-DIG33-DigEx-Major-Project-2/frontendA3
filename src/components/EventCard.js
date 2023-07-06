import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";

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
          <h2>{props.event.name}</h2>
          <p>{props.event.description}</p>
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
