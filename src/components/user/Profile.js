/**
 * Profile component for Attendees
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
import EventCardHorizontal from "../event/EventCardHorizontal";
import { useState, useEffect } from "react";
import { getFirstLetters } from "../../utils/utils";
//Search for favourited events
import { searchFavourites } from "../../services/EventAPI";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from "@mui/icons-material/Lock";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../props/search-events.prop";
//Partial page spinner
import { PartialLoadSpinner } from "../shared/LoadingSpinner";
import { getUser } from "../../utils/localStorage";
import { PATHS } from "../../utils/constants.util";
import { useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";

/**
 * Builds the Profile react component
 * @returns The rendered react component
 */
const Profile = () => {

  /**
   * Prop setup
   */
  const [favouritedEvents, setFavouritedEvents] = useState([]);

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



  const navigate = useNavigate();

  //Get the user session data
  const user = getUser();

  /**
   * Load first page of events on page load
   */
  useEffect(() => {
    async function fetchEvents() {

      try {
              //Toggle loading UI on
      fetchStatus.set(true);
      const data = await searchFavourites(0);
      console.log("Favourited events search results: ", data);
      setFavouritedEvents(data.events);
      //Toggle loading UI off
      fetchStatus.set(false);
    } catch (error) {
      //Toggle loading UI off
      fetchStatus.set(false);
      navigate(PATHS.LOGIN);
    }

    }

    fetchEvents();
  }, [setFavouritedEvents]);

  /**
   * 
   */
  const handleDelete = () => {
    console.log("redirecting to delete page or pop up");
  };



  /**
   * Load more favourited events
   */
  const loadMoreHandler = async (event) => {

    //Prevent default submit form behaviour
    event.preventDefault();

    console.log("Favourited event load more fired");

    //Toggle loading UI on
    fetchStatus.set(true);

    //Increment to next page
    currPage.set(currPage.get++);

    //Make request for favourited events
    try {
    let searchResult = await searchFavourites(currPage.get);

    let currEvents = favouritedEvents;

    pageCount.set(searchResult.pageCount);
    let newArr = [...currEvents, ...searchResult.events]
    //Set state props of events and page count
    setFavouritedEvents(newArr);
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



  //Favourited events listings
  let eventListings;
  //Conditionally render events, no events message, load/back to top buttons, or loading spinner
  if (!fetchStatus.get) {
    eventListings = (
      <Box className="events-profile">
        {favouritedEvents.map((event, i) => (
          <EventCardHorizontal key={i} event={event} />
        ))}
        {favouritedEvents.length === 0 && <><h2>You have not bookmarked any events.</h2></>}
        {((currPage.get + 1) == pageCount.get) || (currPage.get == 0 && pageCount.get == 0) ? null : <>
          <Button id="load-more-events-btn" onClick={loadMoreHandler}>Load More</Button>
          <Button id="back-to-top-btn" onClick={scrollToTop}>Back To Top</Button>
        </>
        }
      </Box>
    );
  } else {
    eventListings = <PartialLoadSpinner />;
  }

  //Return the react component render
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
<AccountSettings></AccountSettings>
            </article>
            <article className="saved-events">
              <h2>Saved Events</h2>
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
export default Profile;
