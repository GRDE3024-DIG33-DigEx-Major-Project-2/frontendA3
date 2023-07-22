import { useLocation } from "react-router-dom";

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
      <img className="event-main-image" alt="eventimage" src={imgUrl}></img>
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
                <h4>Date & Time</h4>
                <p className="dateandtime">{stringDate}</p>
              </div>
              <div className="event-column-detail">
                <h4>Location</h4>
                <h5>{event.event.venueName}</h5>
                <p className="eventlocation">{event.event.address}</p>
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
        <div>
          <div className="pricing">
            <h2><span>Pricing</span></h2>
            <p></p>
          </div>
        </div>

          <p>&nbsp;</p>
          <div className="about">
            <h2>About this event</h2>
            <p>{event.event.description}</p>
          </div>
          <div className="lineup">
            <h2 className="lineup"><span>Artist Line-Up</span></h2>
            <p></p>
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
