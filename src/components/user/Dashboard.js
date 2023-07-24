import {
  Box,
  Avatar,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import CreatedEventCardHorizontal from "../event/CreatedEventCardHorizontal";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, useEffect } from "react";
import { getAllEvents, getFirstLetters } from "../../utils/utils";

const Dashboard = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
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
              <h2>Organisation Info</h2>
              <Box className="profile-box prof-center">
                <Avatar className="profile-avatar">
                  {getFirstLetters(user.organizationName)}
                </Avatar>
                <h3>{user.organizationName}</h3>
                <p>Organisation description</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque urna nisi, mollis consequat nisi ac, efficitur
                  accumsan enim. Interdum et malesuada fames ac ante ipsum
                  primis in faucibus. Vivamus rhoncus aliquam nibh egestas
                  convallis. Aenean efficitur laoreet leo non sagittis. Proin
                  eget diam volutpat enim volutpat interdum.
                </p>
              </Box>
            </article>
            <article className="account-settings">
              <h2>Account settings</h2>
              <Box className="profile-box prof-left">
                <FormControl fullWidth>
                  <h3>Change Password</h3>
                  <p>Password:</p>
                  <TextField
                    variant="outlined"
                    id="password"
                    placeholder="Enter your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p>Confirm Password:</p>
                  <TextField
                    variant="outlined"
                    id="confirm-password"
                    placeholder="Enter your password again"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    id="save-pwd-btn"
                    type="submit"
                    sx={{ color: "black" }}
                  >
                    Save new password
                  </Button>
                  <Link
                    id="delete-account-profile"
                    to="/"
                    onClick={handleDelete}
                  >
                    Delete this account
                  </Link>
                </FormControl>
              </Box>
            </article>
            <article className="saved-events">
              <div id="saved-events-header">
                <h2>Created Events</h2>
                <Link
                  className="bttn-style-orange"
                  onClick={createNewEventHandler}
                >
                  Create a new event
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
