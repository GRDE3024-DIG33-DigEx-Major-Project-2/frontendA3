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
        navigate("/event", {state:{event:props.event}});
    }

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
          image = {imgUrl}
          alt="gigney logo"
        />
        <CardContent>
          <h2>{props.event.event.title}</h2>
          <p>{props.event.event.summary}</p>
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
