/**
 * Organizer dashboard component
 */


//Import dependencies
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
import { useState, useEffect, useContext } from "react";
import { getFirstLetters } from "../../utils/utils";
import {
  getUser,
  getDrafts,
} from "../../utils/localStorage";
import { searchOwnedEvents } from "../../services/EventAPI";
import DraftCard from "../event/DraftCard";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../props/search-events.prop";
//Partial page spinner
import { PartialLoadSpinner } from "../shared/LoadingSpinner";
import { PATHS } from "../../utils/constants.util";
import { resetTokenSession, resetUserSession } from "../../utils/localStorage";
import { showErrorToast, showSuccessToast, showToast } from "../shared/Toaster";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/UserAPI";

import AccountSettings from "./AccountSettings";


/**
 * Builds the Dashboard react component
 * @returns The rendered react component
 */
const Dashboard = () => {

  /**
   * Prop setup
   */
  const [ownedEvents, setOwnedEvents] = useState([]);
  const [drafts, setDrafts] = useState(getDrafts());
  const [refresh, setRefresh] = useState(false);


  

  //Get the user session data
  const user = getUser();
  console.log(drafts);

  const navigate = useNavigate();

  /**
   * Prop context for search event data
   */
  const {
    fetchStatus,
    pageCount,
  } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const {
    currPage
  } = useContext(SearchEventFiltersContext);



  /**
   * Load first page of events on page load
   */
  useEffect(() => {

    async function fetchEvents() {
      try {
        pageCount.set(0);
        currPage.set(0);
        //Toggle loading UI on
        fetchStatus.set(true);

        const data = await searchOwnedEvents(pageCount.get);
        console.log("Owned events search results: ", data);
        setOwnedEvents(data.events);
        pageCount.set(data.pageCount);
        //Toggle loading UI off
        fetchStatus.set(false);
      } catch (error) {
        //Toggle loading UI off
        fetchStatus.set(false);
        navigate(PATHS.LOGIN);
      }
    }

    console.log("currPage:", currPage.get)
    console.log("pageCount:", pageCount.get)
    fetchEvents();

  }, [setOwnedEvents]);



  /**
   * Set the event drafts
   */
  useEffect(() => {
    setDrafts(getDrafts());
  }, [refresh])




  /**
   * 
   */
  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };


  console.log("currPage:", currPage.get)
  console.log("pageCount:", pageCount.get)

  /**
   * Load more owned events
   */
  const loadMoreHandler = async (event) => {

    //Prevent default submit form behaviour
    event.preventDefault();

    console.log("Owned event load more fired");

    //Toggle loading UI on
    fetchStatus.set(true);

    //Increment to next page
    currPage.set(currPage.get++);
try {
    //Make request for owned events
    let searchResult = await searchOwnedEvents(currPage.get);

    let currEvents = ownedEvents;

    pageCount.set(searchResult.pageCount);
    let newArr = [...currEvents, ...searchResult.events]
    //Set state props of events and page count
    setOwnedEvents(newArr);
    pageCount.set(searchResult.pageCount);

    //Toggle loading UI off
    fetchStatus.set(false);
  } catch (error) {
    //Toggle loading UI off
    fetchStatus.set(false);
    navigate(PATHS.LOGIN);
  }
  }



  /**
   * Scroll to top of page
   * @param {*} event 
   */
  const scrollToTop = async (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }





  //Conditionally render events, no events message, load/back to top buttons, or loading spinner
  let eventListings = (
    <>
      {fetchStatus.get ? ( // Show loading spinner when fetching
        <PartialLoadSpinner />
      ) : (
        <Box className="events-profile">
          {/* Render existing owned events */}
          {ownedEvents.length !== 0 &&
            ownedEvents.map((event, i) => (
              <CreatedEventCardHorizontal key={i} event={event} />
            ))}
          {ownedEvents.length === 0 && (
            <>
              <h2>You have not created any events.</h2>
            </>
          )}

          {/* Loading spinner for loading more events */}
          {fetchStatus.get && ownedEvents.length > 0 && (
            <PartialLoadSpinner />
          )}

          {/* Load More and Back To Top buttons */}
          {((currPage.get + 1) === pageCount.get || (currPage.get === 0 && pageCount.get === 0)) ? null : (
            <>
              <Button id="load-more-events-btn" onClick={loadMoreHandler}>Load More</Button>
              <Button id="back-to-top-btn" onClick={scrollToTop}>Back To Top</Button>
            </>
          )}
        </Box>
      )}
    </>
  );



  let loadingSpinner = <>
  </>

  //Return the react component render
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
<AccountSettings></AccountSettings>
            </article>
            <article className="saved-events">
              {drafts.length > 0 && (
                <div id="event-drafts">
                  <h2>Event Drafts</h2>
                  <Box className="drafts">
                    {drafts.map((draft, i) => (
                      <DraftCard key={i} name={draft.eventName ? draft.eventName : "Draft " + (i + 1)} draftNo={i} setRefresh={setRefresh} refresh={refresh} />
                    ))}
                  </Box>
                </div>
              )}
              <div id="saved-events-header">
                <h2>Created Events</h2>
                <Link className="bttn-style-orange" to={PATHS.CREATE_EVENT}>
                  Create a new event
                </Link>
              </div>
              {eventListings}
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


//Export the Dashboard React component
export default Dashboard;
