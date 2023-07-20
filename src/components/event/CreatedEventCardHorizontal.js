import {
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CreatedEventCardHorizontal = (props) => {

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
          <div className="card-icon ev-share-h-2">
            <ShareIcon sx={{ fontSize: 23 }} />
          </div>
          <div className="ev-menu-h">
            <MoreVertIcon  sx={{ fontSize: 28 }} />
          </div>

        </CardContent>
      </Box>
    </Card>
  );
};

export default CreatedEventCardHorizontal;
