import { Box, Avatar, Button } from "@mui/material";
import EditNote from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreatedEventCardHorizontal from "./CreatedEventCardHorizontal";

const Dashboard = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  var events = [
    {
      name: "Event #1",
      description: "Some event description!",
      img: "../gigney.png",
    },
    {
      name: "Event #2",
      description: "Hello World!",
      img: "../gigney.png",
    },
    {
      name: "Event #3",
      description: "Another one..",
      img: "../gigney.png",
    },
    {
      name: "Event #4",
      description: "Some event description!",
      img: "../gigney.png",
    },
  ];

  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };

  const createNewEventHandler = () => {
    console.log("redirecting to create event page");
  }

  return (
    <>
      <div className="profile-container">
        {isLoggedIn && (
          <>
            <div className="profile-banner">
              <h2>Dashboard</h2>
            </div>
            <article className="personal-bio">
              <h2>Organisation Bio</h2>
              <Box className="profile-box prof-center">
                <EditNote className="edit-note" />
                <Avatar
                  alt={user.name}
                  src="../gigney.png"
                  className="profile-avatar"
                />
                <h4>{user.name}</h4>
                <p>Something here</p>
              </Box>
            </article>
            <article className="account-settings">
              <h2>Account settings</h2>
              <Box className="profile-box prof-left">
                <div>
                  <h4>Password:</h4>
                  <p>********</p>
                  <Button color="secondary" variant="outlined" size="small">
                    Reset Password
                  </Button>
                </div>
                <div>
                  <h4>Permissions:</h4>
                  <p>Location</p>
                  <Button color="secondary" variant="outlined" size="small">
                    Revoke permissions
                  </Button>
                </div>
                <Link id="delete-account-profile" to="/" onClick={handleDelete}>
                  Delete account
                </Link>
              </Box>
            </article>
            <article className="saved-events">
              <div id="saved-events-header">
                <h2>Created Events</h2>
                <Button variant="contained" onClick={createNewEventHandler} endIcon={<AddCircleOutlineIcon />}>Create New Event</Button>
              </div>
              <Box className="events-profile">
                {events.map((event, i) => (
                  <CreatedEventCardHorizontal key={i} event={event} />
                ))}
              </Box>
            </article>
          </>
        )}
        {!isLoggedIn && (
          <>
            <h1>You must login to view this page.</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
