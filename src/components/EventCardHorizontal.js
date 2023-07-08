import {
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const EventCardHorizontal = (props) => {

  return (
    <Card className="horizontal-card">
      <CardMedia
        component="img"
        height="200"
        image={props.event.img}
        alt="gigney logo"
      />
      <Box className="horizontal-card-box">
        <CardContent>
          <h2>{props.event.name}</h2>
          <p>{props.event.description}</p>
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
