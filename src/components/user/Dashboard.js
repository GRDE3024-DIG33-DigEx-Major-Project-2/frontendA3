/**
 * Organizer dashboard component
 */

//Import dependencies
import {
  Box,
  Avatar,
  Button,
  Modal,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import CreatedEventCardHorizontal from "../event/CreatedEventCardHorizontal";
import { useState, useEffect, useContext } from "react";
import { getFirstLetters } from "../../utils/utils";
import { getUser, getDrafts } from "../../utils/localStorage";
import { updateUser } from "../../services/UserAPI";
import { searchOwnedEvents } from "../../services/EventAPI";
import DraftCard from "../event/DraftCard";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../props/search-events.prop";
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
  console.log(user);
  console.log(drafts);

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleUserUpdate = async () => {
    // create formData
    let formData = null;

    if(newImg){
      formData = {
        bio: bio,
        organizationName: name,
        phoneNumber: phoneNo,
        removeImg: false,
        "profile-img": newImg,
        imgFilename: newImg.name.split(".")[0],
      }
    } else {
      formData = {
        bio: bio,
        organizationName: name,
        phoneNumber: phoneNo,
        removeImg: false
      }
    }

    console.log(formData);
    console.log(newImg);
    const response = await updateUser(formData);
    console.log(response);
    handleModalClose();

    // TODO - Add spinner and success response
  };

  // UPDATE PROFILE STATES
  const [name, setName] = useState(user.organizationName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNumber);
  const [bio, setBio] = useState(user.bio);
  const [newImg, setNewImg] = useState();

  // change selected image
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImg(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeNewImg = () => {
    setNewImg();
  };

  /**
   * Prop context for search event data
   */
  const { fetchStatus, pageCount } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const { currPage } = useContext(SearchEventFiltersContext);

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

    console.log("currPage:", currPage.get);
    console.log("pageCount:", pageCount.get);
    fetchEvents();
  }, [setOwnedEvents]);

  /**
   * Set the event drafts
   */
  useEffect(() => {
    setDrafts(getDrafts());
  }, [refresh]);

  console.log("currPage:", currPage.get);
  console.log("pageCount:", pageCount.get);

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
      let newArr = [...currEvents, ...searchResult.events];
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
  };

  /**
   * Scroll to top of page
   * @param {*} event
   */
  const scrollToTop = async (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
          {fetchStatus.get && ownedEvents.length > 0 && <PartialLoadSpinner />}

          {/* Load More and Back To Top buttons */}
          {currPage.get + 1 === pageCount.get ||
          (currPage.get === 0 && pageCount.get === 0) ? null : (
            <>
              <Button id="load-more-events-btn" onClick={loadMoreHandler}>
                Load More
              </Button>
              <Button id="back-to-top-btn" onClick={scrollToTop}>
                Back To Top
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );

  let loadingSpinner = <></>;

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
                <Link onClick={handleModalOpen}>Edit account details</Link>
              </Box>
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="update-profile-modal">
                  <h1>Edit account details</h1>
                  <FormControl fullWidth>
                    <Grid container spacing={2}>
                      <Grid container item xs={6} direction="column">
                        <p>Organisation Name:</p>
                        <TextField
                          fullWidth
                          value={name}
                          required
                          onChange={(event) => setName(event.target.value)}
                          id="update-profile-name"
                          placeholder="Update the organization name"
                          variant="outlined"
                        />
                      </Grid>{" "}
                      <Grid container item xs={6} direction="column">
                        <p>Phone number:</p>
                        <TextField
                          fullWidth
                          value={phoneNo}
                          required
                          onChange={(event) => setPhoneNo(event.target.value)}
                          id="update-profile-phone"
                          placeholder="Update the organization's phone number"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid container item xs={12} direction="column">
                        <p>Organization's Bio:</p>
                        <TextField
                          fullWidth
                          value={bio}
                          required
                          multiline
                          rows={4}
                          onChange={(event) => setBio(event.target.value)}
                          id="update-profile-bio"
                          placeholder="You haven't yet added a bio. Write one now!"
                          variant="outlined"
                        />
                        <p id="update-profile-img-title">Profile image:</p>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={8}
                        direction="row"
                        id="avatar-row"
                      >
                        {user.imgUrl && (
                          <>
                            <Avatar
                              id="edit-avatar"
                              alt={user.organizationName}
                              src={
                                !newImg
                                  ? user.imgUrl
                                  : URL.createObjectURL(newImg)
                              }
                            />
                            <p>
                              Click on the avatar to change your organization's
                              pic.
                            </p>
                          </>
                        )}
                        {!user.imgUrl && !newImg && (
                          <>
                            <label>
                              <Avatar id="edit-avatar">
                                {getFirstLetters(user.organizationName)}
                                <input
                                  id="create-ev-img-input"
                                  accept="image/*"
                                  type="file"
                                  onChange={imageChange}
                                />
                              </Avatar>
                            </label>
                            <p>
                              Click on the avatar to add an image for your
                              organization
                            </p>
                          </>
                        )}
                        {!user.imgUrl && newImg && (
                          <>
                            <Avatar
                              id="edit-avatar"
                              alt={user.organizationName}
                              src={URL.createObjectURL(newImg)}
                            />
                            <Link
                              id="update-profile-remove-pic"
                              onClick={removeNewImg}
                            >
                              Remove This Image
                            </Link>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </FormControl>
                  <div id="update-profile-btns">
                    <Button
                      id="save-exit-ev-btn"
                      variant="contained"
                      className="input-btn"
                      onClick={handleModalClose}
                    >
                      Discard changes
                    </Button>
                    <Button
                      id="save-cont-ev-btn"
                      variant="contained"
                      onClick={handleUserUpdate}
                    >
                      Update profile
                    </Button>
                  </div>
                </Box>
              </Modal>
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
                      <DraftCard
                        key={i}
                        name={
                          draft.eventName ? draft.eventName : "Draft " + (i + 1)
                        }
                        draftNo={i}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
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
