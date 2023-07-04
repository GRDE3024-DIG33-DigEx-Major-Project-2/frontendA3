import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

const EventCard = () => {


    return <Card className="event-card">
        <CardActionArea>
            <CardMedia component="img" height="140" image="../gigney.png" alt="gigney logo" />
            <CardContent>
                <h2>Event Name</h2>
                <p>Event Description</p>
            </CardContent>
        </CardActionArea>
        
    </Card>
}

export default EventCard;