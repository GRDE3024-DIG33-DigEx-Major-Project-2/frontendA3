import {
  Box,
  Avatar,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditNote from "@mui/icons-material/EditNote";
import { useNavigate, Link } from "react-router-dom";
import CreatedEventCardHorizontal from "../event/CreatedEventCardHorizontal";
import LockIcon from "@mui/icons-material/Lock";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../utils/utils";

const Dashboard = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  // var events = [
  //   {
  //     name: "Event #1",
  //     description: "Some event description!",
  //     img: "../gigney.png",
  //   },
  //   {
  //     name: "Event #2",
  //     description: "Hello World!",
  //     img: "../gigney.png",
  //   },
  //   {
  //     name: "Event #3",
  //     description: "Another one..",
  //     img: "../gigney.png",
  //   },
  //   {
  //     name: "Event #4",
  //     description: "Some event description!",
  //     img: "../gigney.png",
  //   },
  // ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getAllEvents();
      setEvents(data);
    }

    fetchEvents();
  }, [setEvents]);

  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };

  const navigate = useNavigate();

  const createNewEventHandler = () => {
    navigate("/createevent");
  };

  return (
    <>
      <div className="profile-container">
        {isLoggedIn && (
          <>
            <div className="profile-banner">
              <h1>Dashboard</h1>
            </div>
            <article className="personal-bio">
              <h2>Organisation Bio</h2>
              <Box className="profile-box prof-center">
                <EditNote className="edit-note" />
                <Avatar
                  alt={user.organizationName}
                  src="../gigney.png"
                  className="profile-avatar"
                />
                <h3>{user.organizationName}</h3>
                <p>Something here</p>
              </Box>
            </article>
            <article className="account-settings">
              <h2>Account settings</h2>
              <Box className="profile-box prof-left">
                <div>
                  <h3>Change Password</h3>
                  <FormControl fullWidth>
                    <TextField
                      id="password"
                      label="Password:"
                      placeholder="Enter your password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="password"
                      label="Confirm Password:"
                      placeholder="Enter your password again"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                    <Button
                      variant="contained"
                      id="login-btn"
                      className="input-btn"
                      type="submit"
                      sx={{color: "black"}}
                    >
                      Save new password
                    </Button>
                    <Link
                      id="delete-account-profile"
                      to="/"
                      onClick={handleDelete}
                    >
                      Delete account
                    </Link>
                  </FormControl>
                </div>
              </Box>
            </article>
            <article className="saved-events">
              <div id="saved-events-header">
                <h2>Created Events</h2>
                <Link
                  className="bttn-style-orange"
                  onClick={createNewEventHandler}
                >
                  Create New Event
                </Link>
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
