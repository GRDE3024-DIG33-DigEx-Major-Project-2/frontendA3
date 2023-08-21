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
import { useNavigate } from "react-router-dom";

import AccountSettings from "./AccountSettings";
import { scrollToTop } from "../../utils/utils";



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

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  /**
 * Prop context for search event data
 */
  const { fetchStatus, pageCount } = useContext(SearchEventsContext);

  const [modalSpinner, setModalSpinner] = useState(false);

  /**
   * Prop context for search event filters
   */
  const { currPage } = useContext(SearchEventFiltersContext);



  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  // Function handling the organiser's profile update
  const handleUserUpdate = async () => {
    // create formData
    let formData = null;

    let removeImg = false;
    if (user.imgUrl || imgDelete) removeImg = true;

    if (newImg) {
      formData = {
        bio: bio,
        organizationName: name,
        phoneNumber: phoneNo,
        removeImg: removeImg,
        "profile-img": newImg,
        filename: newImg.name.split(".")[0],
      };
    } else {
      formData = {
        bio: bio,
        organizationName: name,
        phoneNumber: phoneNo,
        removeImg: removeImg,
      };
    }

    try {
      setModalSpinner(true);
      const response = await updateUser(formData);
      //If the update request was successful, show confirmation, else, show error
      if (response === "Success") setUpdateSuccess(true);
      else setUpdateSuccess(false);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setModalSpinner(false);
      handleConfirmationModalOpen();
      handleModalClose();
    }
  };

  // UPDATE PROFILE STATES
  const [name, setName] = useState(user.organizationName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNumber);
  const [bio, setBio] = useState(user.bio);
  const [newImg, setNewImg] = useState();
  const [imgDelete, setImgDelete] = useState(false);

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

  // remove all images and flag that the existing image needs to be removed from the bucket on update
  const removeAllImgs = () => {
    setNewImg();
    setImgDelete(true);
  };



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

        const data = await searchOwnedEvents(currPage.get);
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
   * Event listing display container
   */
  let eventListings = (
    <>
      <Box className="events-profile">
        {/* Map through the owned events and render them */}
        {ownedEvents.map((event, i) => (
          <CreatedEventCardHorizontal key={i} event={event} />
        ))}

        {/* If there are no owned events, display this message */}
        {ownedEvents.length === 0 && <h2>You have not created any events.</h2>}

        {/* Show the spinner during fetching, under the already loaded events */}
        {fetchStatus.get && <PartialLoadSpinner className="partial-loader" />}
      </Box>
      <div className="search-buttons">
        {/* Conditionally render the Load More button */}
        {ownedEvents.length > 0 &&
          (currPage.get + 1 < pageCount.get) && !fetchStatus.get && (
            <Button variant="contained" id="load-more-events-btn" onClick={loadMoreHandler}>
              Load More
            </Button>
          )}

        {/* Always render the Back To Top button */}
        <Button variant="contained" id="back-to-top-btn" onClick={scrollToTop}>
          Back To Top
        </Button>
      </div>
    </>
  );


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
                      <Grid container item xs={6} direction="column" className="update-profile-name">
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
                      <Grid container item xs={6} direction="column" className="update-profile-phone">
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
                      <Grid container item xs={12} direction="column" className="update-profile-bio">
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
                        className="avatar-row"
                      >
                        {user.imgUrl && !imgDelete && (
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
                              Click on the avatar to change your profile pic, or
                              click here to{" "}
                              <Link onClick={removeAllImgs}>
                                remove the current image
                              </Link>
                            </p>
                          </>
                        )}
                        {((!user.imgUrl && !newImg) ||
                          (imgDelete && !newImg) ||
                          (!user.imgUrl && !imgDelete && !newImg)) && (
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
                            </>
                          )}
                        {((!user.imgUrl && newImg) ||
                          (imgDelete && newImg) ||
                          (!user.imgUrl && !imgDelete && newImg)) && (
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
                      <div className="avatar-info">
                        <p>Click on the avatar to add an image for your organization</p></div>
                    </Grid>
                  </FormControl>
                  <div id="update-profile-btns">
                    {modalSpinner ? (
                      <PartialLoadSpinner></PartialLoadSpinner>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </Box>
              </Modal>
              <Modal
                open={confirmationModalOpen}
                onClose={handleConfirmationModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="confirmation-modal"
              >
                <Box className="delete-event-modal">
                  {updateSuccess && (
                    <>
                      <h2>Success!</h2>
                      <span>Your profile has been successfully updated.</span>
                    </>
                  )}
                  {!updateSuccess && (
                    <>
                      <h2>Something went wrong.</h2>
                      <span>
                        We weren't able to process your request. Try again
                        later!
                      </span>
                    </>
                  )}
                  <Button
                    id="save-cont-ev-btn"
                    variant="contained"
                    href="/dashboard"
                  >
                    Go to Dashboard
                  </Button>
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
