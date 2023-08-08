import {
  Box,
  Avatar,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import CreatedEventCardHorizontal from "../event/CreatedEventCardHorizontal";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, useEffect } from "react";
import { getFirstLetters } from "../../utils/utils";
import {
  getUser,
  getDrafts,
} from "../../utils/localStorage";
import { searchOwnedEvents } from "../../services/EventAPI";
import DraftCard from "../event/DraftCard";

const Dashboard = () => {

  const [ownedEvents, setOwnedEvents] = useState([]);
  const [drafts, setDrafts] = useState(getDrafts());
  const [refresh, setRefresh] = useState(false);
  
  const user = getUser();
  console.log(drafts);

  useEffect(() => {
    async function fetchEvents() {
      const data = await searchOwnedEvents(0);
      console.log("Owned events search results: ", data);
      setOwnedEvents(data.events);
    }

    fetchEvents();
  }, [setOwnedEvents]);

  useEffect(() => {
    setDrafts(getDrafts());
  },[refresh])

  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };

// return (<>
// <Button onclick={testCreate}
//                   variant="contained"
//                   id="save-pwd-btn"
//                   type="submit"
//                   >
//                     TEST CREATE</Button>
//   <button onClick={testCreate}>Test Create</button>
// </>
// );

  return (
    <>
      <div className="profile-container">
        {user && (
          <>
            <div className="profile-banner">
              <h1>Dashboard</h1>
            </div>
            <article className="personal-bio">
              <h2>Organisation Info</h2>
              <Box className="profile-box prof-center">
                {user.imgUrl && (
                  <Avatar
                    className="profile-avatar"
                    alt={user.organizationName}
                    src={user.imgUrl}
                  />
                )}
                {!user.imgUrl && (
                  <Avatar className="profile-avatar">
                    {getFirstLetters(user.organizationName)}
                  </Avatar>
                )}
                <h3>{user.organizationName}</h3>
                <p>Organisation description</p>
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
              {drafts.length > 0 && (
                <div id="event-drafts">
                  <h2>Event Drafts</h2>
                  <Box className="drafts">
                    {drafts.map((draft, i) => (
                      <DraftCard key={i} name={draft.eventName ? draft.eventName : "Draft " + (i+1)} draftNo={i} setRefresh={setRefresh} refresh={refresh} />
                    ))}
                  </Box>
                </div>
              )}
              <div id="saved-events-header">
                <h2>Created Events</h2>
                <Link className="bttn-style-orange" to="/createevent">
                  Create a new event
                </Link>
              </div>
              <Box className="events-profile">
                {ownedEvents.length !== 0 &&
                  ownedEvents.map((event, i) => (
                    <CreatedEventCardHorizontal key={i} event={event} />
                  ))}
                {ownedEvents.length === 0 && (
                  <>
                    <h2>You have not yet created any events.</h2>
                  </>
                )}
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

export default Dashboard;
