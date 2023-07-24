import { useLocation } from "react-router-dom";
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

function Event() {
  const location = useLocation();
  const event = location.state.event;

  // convert date
  const date = new Date(Date.parse(event.event.startDate));
  const stringDate = date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // find URL
  let imgUrl = "../Gigney_login.png";
  if (event.eventImg) {
    imgUrl =
      "https://gigney.s3.ap-southeast-2.amazonaws.com/" +
      event.eventImg.filename +
      ".jpeg";
  }

  return (
    <div className="Event">

    <div className="header">
      <img className="event-main-image" alt="eventimage" src={imgUrl}></img>
      </div>
      <p>&nbsp;</p>
      <div className="event-column-title">
      <div className="card-icon ev-share">
          <ShareIcon sx={{ fontSize: 22, color:"black" }} />
        </div>
        <div className="card-icon ev-bookmark">
          <BookmarkAddIcon sx={{ fontSize: 23, color:"black" }} />
        </div>
        </div>
      <div className="event-body">
        <div className="event-columns">
          <div className="event-column-title">
            <h1 className="event-title">{event.event.title}</h1>
          </div>
          <div className="event-column-button">
            <button className="event-buy-button">Buy Tickets</button>
          </div>
          <div className="event-column-title">
            <h2 className="event-details"><span>When and where</span></h2>
            <div className="event-columns-details">
              <div className="event-column-detail">
                <h4><CalendarMonthRoundedIcon />  Date & Time</h4>
                <p className="dateandtime">{stringDate}</p>
              </div>
              <hr></hr>
              <div className="event-column-detail">
                <h4><LocationOnRoundedIcon />    Location</h4>
                <p className="eventlocation">{event.event.venueName}, {event.event.address}</p>
                <p className="eventlocation">
                  {event.event.city} - {event.event.region}
                </p>
              </div>
            </div>
          </div>
          <div className="event-column-button">
            <h2 className="organised_by"><span>Organised By</span></h2>
            <div className="event-columns-details">
              <div className="event-column-detail">
                <img
                  className="event-logo"
                  // TODO - fetch organizer's logo
                  src="https://www.frontiertouring.com/files/web_images/logo-frontier_footer.png"
                  alt="artist"
                ></img>
              </div>
              <div className="event-column-detail">
                <p>{event.event.OrganizerId} - TODO FETCH ORGANIZER USING ID</p>
              </div>
            </div>
          </div>
        <p>&nbsp;</p>
        <div className="event-column-title">
        <p>&nbsp;</p>
          <div className="pricing">
            <h2><span>Pricing</span></h2>
            <div className="event-columns-details">
            <div className="event-column-detail">
            <table>
      <thead>
        <tr>
          <th><LocalActivityRoundedIcon /> Early Bird</th>
          <hr></hr>
          <th><LocalActivityRoundedIcon /> Concession</th>
          <hr></hr>
          <th><LocalActivityRoundedIcon /> General</th>
          <hr></hr>
          <th><LocalActivityRoundedIcon /> VIP</th>
          <hr></hr>
          <th><LocalActivityRoundedIcon /> Backstage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$95</td>
          <hr></hr>
          <td>$120</td>
          <hr></hr>
          <td>$240</td>
          <hr></hr>
          <td>$360</td>
          <hr></hr>
          <td>$150</td>
        </tr>
      </tbody>
    </table>
          </div>
        </div>
        </div>
        </div>

          <p>&nbsp;</p>
          
          <div className="event-column-title">
            <h2 className="about">About this event</h2>
            <p>{event.event.description}</p>
          </div>
          <div className="event-column-button">
            <h2 className="lineup"><span>Artist Line-Up</span></h2>
            <div className="event-columns-details">
            <div className="event-column-detail">
            <ul>
              <li>Artist 1</li>
              <li>Artist 2</li>
              <li>Artist 3</li>
              <li>Artist 4</li>
              <li>Artist 5</li>
            </ul>
            </div>
            </div>
          </div>
        </div>

        <div className="event-columns">
        <div className="tags"> 
            <h3>Tags</h3>
            {event.tags.map((tag, i) => (
              <span key={i} className="event-tag">{tag.name}</span>
            ))}
          </div>
         
          <div className="event-column-button">
            <button className="event-buy-button">Buy Tickets</button>
          </div>
        </div>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  );
}
export default Event;
