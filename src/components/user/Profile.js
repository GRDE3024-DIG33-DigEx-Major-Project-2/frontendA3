import {
  Box,
  Avatar,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import EventCardHorizontal from "../event/EventCardHorizontal";
import { useState, useEffect } from "react";
import {  getFirstLetters } from "../../utils/utils";
//Search for favourited events
import {searchFavourites} from "../../services/EventAPI";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from "@mui/icons-material/Lock";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../props/search-events.prop";

import { getUser } from "../../utils/localStorage";

const Profile = () => {


  const [favouritedEvents, setFavouritedEvents] = useState([]);

  
    /**
   * Prop context for search event data
   */
    const {
      events,
      pageCount,
      tags
    } = useContext(SearchEventsContext);
  
  const user = getUser();

  useEffect(() => {
    async function fetchEvents() {
      const data = await searchFavourites(0);
      console.log("Favourited events search results: ", data);
      setFavouritedEvents(data.events);
    }

    fetchEvents();
  }, [setFavouritedEvents]);

  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };

  return (
    <>
      <div className="profile-container">
        {user && (
          <>
            <div className="profile-banner">
              <h1>My Profile</h1>
            </div>
            <article className="personal-bio">
              <h2>Personal Bio</h2>
              <Box className="profile-box prof-center">
                <Avatar className="profile-avatar">
                  {getFirstLetters(user.fullName)}
                </Avatar>
                <h3>{user.fullName}</h3>
                <p>{user.bio}</p>
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
              <h2>Saved Events</h2>
              <Box className="events-profile">
                {favouritedEvents.get.map((event, i) => (
                  <EventCardHorizontal key={i} event={event} />
                ))}
                {favouritedEvents.length === 0 && <><h2>You have not yet saved any events.</h2></>}
              </Box>
            </article>
          </>
        )}
        {!user && (
          <>
            <h1>You must login to view this page.</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
