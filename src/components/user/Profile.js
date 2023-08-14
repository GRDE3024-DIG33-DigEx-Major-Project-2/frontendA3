/**
 * Profile component for Attendees
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
import EventCardHorizontal from "../event/display/EventCardHorizontal";
import { useState, useEffect } from "react";
import { getFirstLetters } from "../../utils/utils";
//Search for favourited events
import { searchFavourites } from "../../services/EventAPI";
import { updateUser } from "../../services/UserAPI";
import { useContext } from "react";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../props/search-events.prop";
//Partial page spinner
import { PartialLoadSpinner } from "../shared/LoadingSpinner";
import { getUser } from "../../utils/localStorage";
import { PATHS } from "../../utils/constants.util";
import { useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import { scrollToTop } from "../../utils/utils";

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
  const { fetchStatus, pageCount } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const { currPage } = useContext(SearchEventFiltersContext);

  const navigate = useNavigate();

  //Get the user session data
  const user = getUser();
  console.log(user);
  const fullName = user.firstName + " " + user.lastName;

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  // Function handling the attendee's profile update
  const handleUserUpdate = async () => {
    // create formData
    let formData = null;

    let removeImg = false;
    if (user.imgUrl || imgDelete) removeImg = true;

    if (newImg) {
      formData = {
        bio: bio,
        firstName: firstName,
        lastName: lastName,
        removeImg: removeImg,
        "profile-img": newImg,
        filename: newImg.name.split(".")[0],
      };
    } else {
      formData = {
        bio: bio,
        firstName: firstName,
        lastName: lastName,
        removeImg: removeImg,
      };
    }

    const response = await updateUser(formData);

    // if the update request was successful, show confirmation, else, show errro
    if (response === "Success") setUpdateSuccess(true);
    else setUpdateSuccess(false);

    handleConfirmationModalOpen();
    handleModalClose();
  };

  // UPDATE PROFILE STATES
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
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

        const data = await searchFavourites(currPage.get);
        console.log("Favourited events search results: ", data);
        setFavouritedEvents(data.events);
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
  }, [setFavouritedEvents]); 

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
      let newArr = [...currEvents, ...searchResult.events];
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
  };



  // //Favourited events listings
  // let eventListings;
  // //Conditionally render events, no events message, load/back to top buttons, or loading spinner
  // if (!fetchStatus.get) {
  //   eventListings = (
  //     <Box className="events-profile">
  //       {favouritedEvents.map((event, i) => (
  //         <EventCardHorizontal key={i} event={event} />
  //       ))}
  //       {favouritedEvents.length === 0 && (
  //         <>
  //           <h2>You have not bookmarked any events.</h2>
  //         </>
  //       )}
  //       {currPage.get + 1 == pageCount.get ||
  //       (currPage.get == 0 && pageCount.get == 0) ? null : (
  //         <>
  //           <Button id="load-more-events-btn" onClick={loadMoreHandler}>
  //             Load More
  //           </Button>
  //           <Button id="back-to-top-btn" onClick={scrollToTop}>
  //             Back To Top
  //           </Button>
  //         </>
  //       )}
  //     </Box>
  //   );
  // } else {
  //   eventListings = <PartialLoadSpinner />;
  // }


  let eventListings = (
    <>
      {fetchStatus.get ? (
        <PartialLoadSpinner />
      ) : (
        <Box className="events-profile">
          {favouritedEvents.length !== 0 &&
            favouritedEvents.map((event, i) => (
              <EventCardHorizontal key={i} event={event} />
            ))}
          {favouritedEvents.length === 0 && (
            <>
              <h2>You have not bookmarked any events.</h2>
            </>
          )}

          {/* Loading spinner for loading more events */}
          {fetchStatus.get && favouritedEvents.length > 0 && <PartialLoadSpinner />}

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
                {user.imgUrl && (
                  <Avatar
                    className="profile-avatar"
                    alt={fullName}
                    src={user.imgUrl}
                  />
                )}
                {!user.imgUrl && (
                  <Avatar className="profile-avatar">
                    {getFirstLetters(fullName)}
                  </Avatar>
                )}
                <h3>{fullName}</h3>
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
                        <p>First Name:</p>
                        <TextField
                          fullWidth
                          value={firstName}
                          required
                          onChange={(event) => setFirstName(event.target.value)}
                          id="update-profile-name"
                          placeholder="Update first name"
                          variant="outlined"
                        />
                      </Grid>{" "}
                      <Grid container item xs={6} direction="column">
                        <p>Last Name:</p>
                        <TextField
                          fullWidth
                          value={lastName}
                          required
                          onChange={(event) => setLastName(event.target.value)}
                          id="update-profile-phone"
                          placeholder="Update last name"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid container item xs={12} direction="column">
                        <p>Your Bio:</p>
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
                        {user.imgUrl && !imgDelete && (
                          <>
                            <Avatar
                              id="edit-avatar"
                              alt={fullName}
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
                                {getFirstLetters(fullName)}
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
                        {((!user.imgUrl && newImg) ||
                          (imgDelete && newImg) ||
                          (!user.imgUrl && !imgDelete && newImg)) && (
                          <>
                            <Avatar
                              id="edit-avatar"
                              alt={fullName}
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
                    href="/profile"
                  >
                    Go to Profile
                  </Button>
                </Box>
              </Modal>
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
