import { Box, Avatar, Button } from "@mui/material";
import EditNote from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import EventCardHorizontal from "../event/EventCardHorizontal";

const Profile = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
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

  return (
    <>
      <div className="profile-container">
        {isLoggedIn && (
          <>
            <div className="profile-banner">
              <h1>My Profile</h1>
            </div>
            <article className="personal-bio">
              <h2>Personal Bio</h2>
              <Box className="profile-box prof-center">
                <EditNote className="edit-note" />
                <Avatar
                  alt={user.fullName}
                  src="../gigney.png"
                  className="profile-avatar"
                />
                <h4>{user.fullName}</h4>
                <p>{user.bio}</p>
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
              <h2>Saved Events</h2>
              <Box className="events-profile">
                {events.map((event, i) => (
                  <EventCardHorizontal key={i} event={event} />
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

export default Profile;
