import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const EventCard = () => {


    return <Card className="event-card">
        <CardActionArea>
            <CardMedia component="img" height="140" image="../gigney.png" alt="gigney logo" />
            <CardContent>
                <div className="card-icon ev-share">
                    <ShareIcon sx={{ fontSize: 22 }} />
                </div>
                <div className="card-icon ev-bookmark">
                    <BookmarkAddIcon sx={{ fontSize: 23 }} />
                </div>
                <h2>Event Name</h2>
                <p>Event Description</p>
            </CardContent>
        </CardActionArea>
        
    </Card>
}

export default EventCard;