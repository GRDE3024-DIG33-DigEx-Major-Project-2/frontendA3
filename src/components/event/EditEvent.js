import * as React from "react";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MobileStepper,
  Stack,
  Divider,
  Avatar,
  Chip,
  Button,
  Link,
  Box,
  Modal
} from "@mui/material";
import { getFirstLetters, isValidURL, mergeDateTime } from "../../utils/utils";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { updateEvent, deleteEvent } from "../../services/EventAPI";
import EditBasicInfo from "./edit/EE1_BasicInfo";
import EditArtistsAndSummary from "./edit/EE2_ArtistsAndSummary";
import EditLocation from "./edit/EE3_Location";
import EditDateTime from "./edit/EE4_DateTime";
import EditPricing from "./edit/EE5_Pricing";
import EditEventMedia from "./edit/EE6_EventMedia";
import { PATHS } from "../../utils/constants.util";
import { LoadingContext } from "../../props/loading-spinner.prop";

function EditEvent() {
  const location = useLocation();
  const event = location.state.event;
  console.log(event);

  const tagString = [];
  event.tags.forEach((tag) => {
    tagString.push(tag.name + "," + tag.id);
  });

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [modalSpinner, setModalSpinner] = useState(false);

  const {isLoading} = useContext(LoadingContext);

  // Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  const handleEventDelete = async () => {
    try {
      setModalSpinner(true);
    const response = await deleteEvent(event.event.id);
    console.log(response);
    handleConfirmationModalOpen();
    handleModalClose();      
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setModalSpinner(false);
    }
  };

  

  //** FIRST SCREEN - BASIC INFO **//
  const [eventID, setEventID] = useState(event.event.id);
  const [eventName, setEventName] = useState(event.event.title);
  const eventOrganiser = event.event.organizationName;
  const [description, setDescription] = useState(event.event.description);
  const [tags, setTags] = useState(tagString);
  const [eventURL, setEventURL] = useState(event.event.purchaseUrl);

  /* First screen error flags */
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  // ** SECOND SCREEN - ARTISTS AND SUMMARY ** //
  const [artistName, setArtistName] = useState(
    event.acts[0] ? event.acts[0].name : ""
  );
  const [artistName2, setArtistName2] = useState(
    event.acts.length > 1 ? event.acts[1].name : ""
  );
  const [artistName3, setArtistName3] = useState(
    event.acts.length > 2 ? event.acts[2].name : ""
  );
  const [artistName4, setArtistName4] = useState(
    event.acts.length > 3 ? event.acts[3].name : ""
  );
  const [artistID, setArtistID] = useState(
    event.acts.length > 0 ? event.acts[0].id : ""
  );
  const [artistID2, setArtistID2] = useState(
    event.acts.length > 1 ? event.acts[1].id : ""
  );
  const [artistID3, setArtistID3] = useState(
    event.acts.length > 2 ? event.acts[2].id : ""
  );
  const [artistID4, setArtistID4] = useState(
    event.acts.length > 3 ? event.acts[3].id : ""
  );
  const [eventSummary, setEventSummary] = useState(event.event.summary);
  const [enableArtist2, setEnableArtist2] = useState(
    event.acts.length > 1 ? true : false
  );
  const [enableArtist3, setEnableArtist3] = useState(
    event.acts.length > 2 ? true : false
  );
  const [enableArtist4, setEnableArtist4] = useState(
    event.acts.length > 3 ? true : false
  );

  /* Second screen error flags */
  const [summaryError, setSummaryError] = useState(false);

  // ** THIRD SCREEN - LOCATION ** //
  const [venueName, setVenueName] = useState(event.event.venueName);
  const [suburb, setSuburb] = useState(event.event.suburb);
  const [eventAddress1, setEventAddress1] = useState(event.event.address);
  const [eventCity, setEventCity] = useState(event.event.city);
  const [eventCountry, setEventCountry] = useState(event.event.country);
  const [eventState, setEventState] = useState(event.event.region);
  const [eventPostCode, setEventPostCode] = useState(event.event.postcode);

  /* Third screen error flags */
  const [venueNameError, setVenueNameError] = useState(false);
  const [suburbError, setSuburbError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [postcodeError, setPostcodeError] = useState(false);

  // ** FOURTH SCREEN - DATE AND TIME ** //
  const startDate = new Date(event.event.startDate);
  const endDate = new Date(event.event.endDate);
  const [eventStartDate, setEventStartDate] = useState(dayjs(startDate));
  const [eventEndDate, setEventEndDate] = useState(dayjs(endDate));
  const [eventStartTime, setEventStartTime] = useState(dayjs(startDate));
  const [eventEndTime, setEventEndTime] = useState(dayjs(endDate));
  const [eventTimezone, setEventTimezone] = useState("Australia/Sydney");
  // ** FIFTH SCREEN - PRICE **//
  const [state, setState] = useState({
    eventFree: event.event.isFree,
    eventPaid: !event.event.isFree,
  });
  const { eventFree, eventPaid } = state;
  const eventTierName1 = "General Admission";
  const [eventPrice1, setEventPrice1] = useState(
    event.ticketTypes[0]
      ? parseFloat(event.ticketTypes[0].price).toFixed(2)
      : 0.0
  );
  const [eventTierID1, setEventTierID1] = useState(
    event.ticketTypes[0] ? event.ticketTypes[0].id : ""
  );
  const [eventTierName2, setEventTierName2] = useState(
    event.ticketTypes[1] ? event.ticketTypes[1].name : ""
  );
  const [eventPrice2, setEventPrice2] = useState(
    event.ticketTypes[1]
      ? parseFloat(event.ticketTypes[1].price).toFixed(2)
      : 0.0
  );
  const [eventTierID2, setEventTierID2] = useState(
    event.ticketTypes[1] ? event.ticketTypes[1].id : ""
  );
  const [eventTierName3, setEventTierName3] = useState(
    event.ticketTypes[2] ? event.ticketTypes[2].name : ""
  );
  const [eventPrice3, setEventPrice3] = useState(
    event.ticketTypes[2]
      ? parseFloat(event.ticketTypes[2].price).toFixed(2)
      : 0.0
  );
  const [eventTierID3, setEventTierID3] = useState(
    event.ticketTypes[2] ? event.ticketTypes[2].id : ""
  );
  const [eventTierName4, setEventTierName4] = useState(
    event.ticketTypes[3] ? event.ticketTypes[3].name : ""
  );
  const [eventPrice4, setEventPrice4] = useState(
    event.ticketTypes[3]
      ? parseFloat(event.ticketTypes[3].price).toFixed(2)
      : 0.0
  );
  const [eventTierID4, setEventTierID4] = useState(
    event.ticketTypes[3] ? event.ticketTypes[3].id : ""
  );
  const [enableTicket2, setEnableTicket2] = useState(
    event.ticketTypes[1] ? true : false
  );
  const [enableTicket3, setEnableTicket3] = useState(
    event.ticketTypes[2] ? true : false
  );
  const [enableTicket4, setEnableTicket4] = useState(
    event.ticketTypes[3] ? true : false
  );

  /* Fifth screen error flags */
  const [price1Error, setPrice1Error] = useState(false);
  const [price2Error, setPrice2Error] = useState(false);
  const [price3Error, setPrice3Error] = useState(false);
  const [price4Error, setPrice4Error] = useState(false);
  const [ticket2Error, setTicket2Error] = useState(false);
  const [ticket3Error, setTicket3Error] = useState(false);
  const [ticket4Error, setTicket4Error] = useState(false);

  // ** SIXTH SCREEN - MEDIA **//
  const [newImg, setNewImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    !event.eventImg ? null : event.eventImg.url
  );

  // determines if the conditions are satisfied for users to proceed to screen six
  const canProceed = (enableArtist, eventPrice, eventTierName) => {
    if (enableArtist) {
      if (eventPrice === parseFloat(0.0).toFixed(2) || !eventTierName) {
        return false;
      } else return true;
    } else return true;
  };

  // handles validation and changes pages in the form
  const handleNext = (e) => {
    switch (activeStep) {
      // RULES: name, description and URL are required
      case 0:
        if (eventName === "") setNameError(true);
        else setNameError(false);

        if (description === "") setDescriptionError(true);
        else setDescriptionError(false);

        if (!eventURL) setUrlError(true);
        else setUrlError(false);

        if (isValidURL(eventURL)) setUrlError(false);
        else setUrlError(true);

        if (eventName !== "" && description !== "" && eventURL && isValidURL(eventURL))
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      // RULES: At least one artist. Summary is required.
      case 1:
        let atLeastOneArtist = !(
          !artistName &&
          !artistName2 &&
          !artistName3 &&
          !artistName4
        );
        if (!atLeastOneArtist) {
          alert("At least one artist is required in order to proceed.");
        }

        if (!eventSummary) setSummaryError(true);
        else setSummaryError(false);

        if (atLeastOneArtist && eventSummary)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      // RULES: Venue name and all address fields are required.
      case 2:
        if (!venueName) setVenueNameError(true);
        else setVenueNameError(false);

        if (!suburb) setSuburbError(true);
        else setSuburbError(false);

        if (!eventAddress1) setAddressError(true);
        else setAddressError(false);

        if (!eventCity) setCityError(true);
        else setCityError(false);

        if (!eventCountry) setCountryError(true);
        else setCountryError(false);

        if (!eventState) setStateError(true);
        else setStateError(false);

        if (!eventPostCode) setPostcodeError(true);
        else setPostcodeError(false);

        if (
          venueName &&
          suburb &&
          eventAddress1 &&
          eventCity &&
          eventCountry &&
          eventState &&
          eventPostCode
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        break;
      // RULES: Start date cannot be earlier than end date. All fields required. End time needs to be at least one hour later than start time
      case 3:
        if (eventStartDate && eventEndDate && eventStartTime && eventEndTime)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else alert("All date and time fields are required to continue.");
        break;
      // RULES: At least general admission price required if the event is paid. Once a ticket type is enabled, name and price are required.
      case 4:
        if (eventPaid && eventPrice1 === parseFloat(0.0).toFixed(2))
          setPrice1Error(true);
        else setPrice1Error(false);

        if (eventPaid && enableTicket2) {
          if (eventPrice2 === parseFloat(0.0).toFixed(2)) setPrice2Error(true);
          else setPrice2Error(false);

          if (!eventTierName2) setTicket2Error(true);
          else setTicket2Error(false);
        }

        if (eventPaid && enableTicket3) {
          if (eventPrice3 === parseFloat(0.0).toFixed(2)) setPrice3Error(true);
          else setPrice3Error(false);

          if (!eventTierName3) setTicket3Error(true);
          else setTicket3Error(false);
        }

        if (eventPaid && enableTicket4) {
          if (eventPrice4 === parseFloat(0.0).toFixed(2)) setPrice4Error(true);
          else setPrice4Error(false);

          if (!eventTierName4) setTicket4Error(true);
          else setTicket4Error(false);
        }

        if (eventFree) setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (
          !eventFree &&
          canProceed(enableArtist2, eventPrice2, eventTierName2) &&
          canProceed(enableArtist3, eventPrice3, eventTierName3) &&
          canProceed(enableArtist4, eventPrice4, eventTierName4) &&
          eventPrice1 !== parseFloat(0.0).toFixed(2)
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        break;
      // RULES: Image upload is required.
      case 5:
        if (!selectedImage) alert("Please upload an image to proceed");
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      default:
        console.log("Event preview");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    console.log("TO DO SAVE");
  };

  const submitEvent = async () => {
    // merge date and time into single date field
    var startDateTime = new Date(
      eventStartDate.year(),
      eventStartDate.month(),
      eventStartDate.date(),
      eventStartTime.hour(),
      eventStartTime.minute(),
      eventStartTime.second()
    );

    var endDateTime = new Date(
      eventEndDate.year(),
      eventEndDate.month(),
      eventEndDate.date(),
      eventEndTime.hour(),
      eventEndTime.minute(),
      eventEndTime.second()
    );

    const event = {
      id: eventID,
      title: eventName,
      venueName: venueName,
      description: description,
      summary: eventSummary,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      suburb: suburb,
      address: eventAddress1,
      city: eventCity,
      region: eventState,
      postcode: eventPostCode,
      country: eventCountry,
      isFree: eventFree,
      purchaseUrl: eventURL,
    };

    let acts = [];
    let newActs = [];
    if (artistID !== "") acts.push({ id: artistID, name: artistName });
    else newActs.push({ name: artistName });

    if (artistName2 !== "") {
      if (artistID2 !== "") acts.push({ id: artistID2, name: artistName2 });
      else newActs.push({ name: artistName2 });
    }

    if (artistName3 !== "") {
      if (artistID3 !== "") acts.push({ id: artistID3, name: artistName3 });
      else newActs.push({ name: artistName3 });
    }

    if (artistName4 !== "") {
      if (artistID4 !== "") acts.push({ id: artistID4, name: artistName4 });
      else newActs.push({ name: artistName4 });
    }

    let ticketTypes = [];
    let newTicketTypes = [];

    if (eventTierID1 !== "")
      ticketTypes.push({
        id: eventTierID1,
        name: eventTierName1,
        price: eventPrice1,
      });
    else newTicketTypes.push({ name: eventTierName1, price: eventPrice1 });

    if (eventTierName2 !== "") {
      if (eventTierID2 !== "")
        ticketTypes.push({
          id: eventTierID2,
          name: eventTierName2,
          price: eventPrice2,
        });
      else newTicketTypes.push({ name: eventTierName2, price: eventPrice2 });
    }

    if (eventTierName3 !== "") {
      if (eventTierID3 !== "")
        ticketTypes.push({
          id: eventTierID3,
          name: eventTierName3,
          price: eventPrice3,
        });
      else newTicketTypes.push({ name: eventTierName3, price: eventPrice3 });
    }

    if (eventTierName4 !== "") {
      if (eventTierID4 !== "")
        ticketTypes.push({
          id: eventTierID4,
          name: eventTierName4,
          price: eventPrice4,
        });
      else newTicketTypes.push({ name: eventTierName4, price: eventPrice4 });
    }

    let formattedTags = [];
    tags.forEach((tag) => {
      let formattedTag = tag.split(",");
      formattedTags.push({ id: formattedTag[1], name: formattedTag[0] });
    });

    try {
      isLoading.set(true);
    if (newImg) {
      let formData = {
        event: event,
        acts: acts,
        newActs: newActs,
        ticketTypes: ticketTypes,
        newTicketTypes: newTicketTypes,
        tags: formattedTags,
        eventImg: null,
        filename: selectedImage.name.split(".")[0],
        "event-img": selectedImage,
      };
      console.log(formData);
      await updateEvent(formData);
    } else {
      let formData = {
        event: event,
        acts: acts,
        newActs: newActs,
        ticketTypes: ticketTypes,
        newTicketTypes: newTicketTypes,
        tags: formattedTags,
        eventImg: selectedImage,
      };
      console.log(formData);
      await updateEvent(formData);
    }   
       navigate(PATHS.DASHBOARD);
    }
    catch (error) {
      console.log(error);
    }
    finally {
        isLoading.set(false);
    }


    
  };

  return (
    <div id="create-event-main">
      <div className="create-event-header">
        <h1>Edit event</h1>
      </div>
      <Box className="create-event-stepper" sx={{ width: "100%" }}>
        <div id="stepper-box">
          <span>
            <h2>
              {"Step " + parseInt(parseInt(activeStep) + parseInt(1)) + " of 7"}
            </h2>
          </span>
          <MobileStepper
            variant="progress"
            steps={7}
            position="static"
            activeStep={activeStep}
            sx={{ width: "30%" }}
          />
          <Link id="discard-ev-btn" onClick={handleModalOpen}>
            Discard this event
          </Link>
        </div>
        <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="delete-event-modal">
          <h2>Are you sure you want to delete this event?</h2>
          <span>
            All event data will be removed and permanently deleted, so you will
            not be able to retrieve aby of the existing information.
          </span>
          <div>
            <Button
              id="save-exit-ev-btn"
              variant="contained"
              className="input-btn"
              onClick={handleModalClose}
            >
              No, I've changed my mind
            </Button>
            <Button
              id="save-cont-ev-btn"
              variant="contained"
              onClick={handleEventDelete}
            >
              Yes, delete this event
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
          <h2>Success!</h2>
          <span>This event has been permanently deleted.</span>
            <Button
              id="save-cont-ev-btn"
              variant="contained"
              href="/dashboard"
            >
              Go to Dashboard
            </Button>
        </Box>
      </Modal>
        {/* event preview */}
        {activeStep === 6 ? (
          <div className="event-preview-screen">
            <div className="event-preview">
              <div className="event-prev-card-icon-share">
                <ShareIcon sx={{ fontSize: 22, color: "black" }} />
              </div>
              <div className="event-prev-card-icon-bookmark">
                <BookmarkAddIcon sx={{ fontSize: 23, color: "black" }} />
              </div>
              <h1>Event preview</h1>
              <div className="event-main-image">
                <img
                  alt="event image"
                  src={
                    newImg ? URL.createObjectURL(selectedImage) : selectedImage
                  }
                />
              </div>
              <div className="prev-event-body">
                <div className="event-prev-first-row">
                  <h1 className="event-title">{eventName}</h1>
                  <button className="event-buy-button">Buy Tickets</button>
                </div>
                <div className="event-prev-second-row">
                  <div className="when-where-box outlined">
                    <h2 className="event-prev-title">When and where</h2>
                    <Stack
                      spacing={2}
                      direction="row"
                      className="horizontal-stack"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <div className="prev-date-time">
                        <span className="icon-title">
                          <CalendarTodayOutlinedIcon
                            sx={{ color: "#4B7CBE" }}
                          />
                          <h3>Date and time</h3>
                        </span>
                        <p className="strong-string-prev">
                          {mergeDateTime(
                            dayjs(eventStartDate),
                            dayjs(eventStartTime)
                          ).toDateString()}{" "}
                          {mergeDateTime(
                            dayjs(eventStartDate),
                            dayjs(eventStartTime)
                          ).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {mergeDateTime(
                            dayjs(eventEndDate),
                            dayjs(eventEndTime)
                          ).toDateString()}{" "}
                          {mergeDateTime(
                            dayjs(eventEndDate),
                            dayjs(eventEndTime)
                          ).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="prev-location">
                        <span className="icon-title">
                          <LocationOnOutlinedIcon sx={{ color: "#4B7CBE" }} />
                          <h3>Location</h3>
                        </span>
                        <p className="strong-string-prev">
                          {venueName}, {eventAddress1}, {suburb},{" "}
                          {eventPostCode}, {eventCity} {eventCountry}
                        </p>
                      </div>
                    </Stack>
                  </div>
                  <div className="organiser-box outlined">
                    <h2 className="event-prev-title">Organiser</h2>
                    <Avatar id="event-avatar">
                      {getFirstLetters(eventOrganiser)}
                    </Avatar>
                    <h2>{eventOrganiser}</h2>
                  </div>
                </div>
                <div className="event-prev-third-row">
                  <div className="pricing-box outlined">
                    <h2 className="event-prev-title-2">Pricing</h2>
                    <Stack
                      spacing={2}
                      direction="row"
                      className="horizontal-stack"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      {eventFree && (
                        <h2 style={{padding: "3% 5%"}}>This event is free.</h2>
                      )}
                      {eventPaid && (
                        <div className="event-prev-price">
                          <span className="icon-title">
                            <LocalActivityOutlinedIcon
                              sx={{ color: "#4B7CBE" }}
                            />
                            <h3>{eventTierName1}</h3>
                          </span>
                          <p>$ {eventPrice1}</p>
                        </div>
                      )}
                      {eventTierName2 && (
                        <div className="event-prev-price">
                          <span className="icon-title">
                            <LocalActivityOutlinedIcon
                              sx={{ color: "#4B7CBE" }}
                            />
                            <h3>{eventTierName2}</h3>
                          </span>
                          <p>$ {eventPrice2}</p>
                        </div>
                      )}
                      {eventTierName3 && (
                        <div className="event-prev-price">
                          <span className="icon-title">
                            <LocalActivityOutlinedIcon
                              sx={{ color: "#4B7CBE" }}
                            />
                            <h3>{eventTierName3}</h3>
                          </span>
                          <p>$ {eventPrice3}</p>
                        </div>
                      )}
                      {eventTierName4 && (
                        <div className="event-prev-price">
                          <span className="icon-title">
                            <LocalActivityOutlinedIcon
                              sx={{ color: "#4B7CBE" }}
                            />
                            <h3>{eventTierName4}</h3>
                          </span>
                          <p>$ {eventPrice4}</p>
                        </div>
                      )}
                    </Stack>
                  </div>
                </div>
                <div className="event-prev-fourth-row">
                  <div className="create-prev-about">
                    <h2>About this event</h2>
                    <p>{description}</p>
                  </div>
                  <div className="create-prev-lineup outlined">
                    <h2 className="event-prev-title">Artist line-up</h2>
                    <ul>
                      <li>{artistName}</li>
                      {artistName2 && (
                        <>
                          <li>{artistName2}</li>
                        </>
                      )}
                      {artistName3 && (
                        <>
                          <li>{artistName3}</li>
                        </>
                      )}
                      {artistName4 && (
                        <>
                          <li>{artistName4}</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="event-prev-fifth-row">
                  <div className="event-prev-tags">
                    <h2>Tags</h2>
                    <div>
                      {tags.map((tag, i) => (
                        <Chip
                          sx={{
                            backgroundColor: "white",
                            color: "#7759a6",
                            border: "solid 1px #7759a6",
                            margin: "0 1%",
                          }}
                          key={i}
                          label={tag.split(",")[0]}
                        />
                      ))}
                      {tags.length === 0 && (
                        <p>No tags have been added for this event</p>
                      )}
                    </div>
                  </div>
                  <Button
                    href={eventURL}
                    variant="contained"
                    id="buy-tickets-btn"
                  >
                    Buy Tickets
                  </Button>
                </div>
              </div>
            </div>
            <div className="event-prev-end-bttns">
              <Button
                id="save-ex-ev-btn"
                variant="contained"
                onClick={handleSave}
              >
                Save and exit
              </Button>
              <Button
                id="save-publish-ev-btn"
                variant="contained"
                onClick={submitEvent}
              >
                Save and publish
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="create-event-screen">
              {(() => {
                // FIRST SCREEN - BASIC INFO
                if (activeStep === 0) {
                  return (
                    <EditBasicInfo
                      eventName={eventName}
                      setEventName={setEventName}
                      eventOrganiser={eventOrganiser}
                      description={description}
                      setDescription={setDescription}
                      tags={tags}
                      setTags={setTags}
                      eventURL={eventURL}
                      setEventURL={setEventURL}
                      nameError={nameError}
                      descriptionError={descriptionError}
                      urlError={urlError}
                    />
                  );
                } else if (activeStep === 1) {
                  return (
                    <EditArtistsAndSummary
                      artistName={artistName}
                      setArtistName={setArtistName}
                      artistName2={artistName2}
                      setArtistName2={setArtistName2}
                      artistName3={artistName3}
                      setArtistName3={setArtistName3}
                      artistName4={artistName4}
                      setArtistName4={setArtistName4}
                      eventSummary={eventSummary}
                      setEventSummary={setEventSummary}
                      enableArtist2={enableArtist2}
                      setEnableArtist2={setEnableArtist2}
                      enableArtist3={enableArtist3}
                      setEnableArtist3={setEnableArtist3}
                      enableArtist4={enableArtist4}
                      setEnableArtist4={setEnableArtist4}
                      artistID={artistID}
                      setArtistID={setArtistID}
                      artistID2={artistID2}
                      setArtistID2={setArtistID2}
                      artistID3={artistID3}
                      setArtistID3={setArtistID3}
                      artistID4={artistID4}
                      setArtistID4={setArtistID4}
                      summaryError={summaryError}
                    />
                  );
                } else if (activeStep === 2) {
                  return (
                    <EditLocation
                      venueName={venueName}
                      setVenueName={setVenueName}
                      suburb={suburb}
                      setSuburb={setSuburb}
                      eventAddress1={eventAddress1}
                      setEventAddress1={setEventAddress1}
                      eventCity={eventCity}
                      setEventCity={setEventCity}
                      eventCountry={eventCountry}
                      setEventCountry={setEventCountry}
                      eventState={eventState}
                      setEventState={setEventState}
                      eventPostCode={eventPostCode}
                      setEventPostCode={setEventPostCode}
                      venueNameError={venueNameError}
                      suburbError={suburbError}
                      addressError={addressError}
                      cityError={cityError}
                      countryError={countryError}
                      stateError={stateError}
                      postcodeError={postcodeError}
                    />
                  );
                } else if (activeStep === 3) {
                  return (
                    <EditDateTime
                      eventStartDate={eventStartDate}
                      setEventStartDate={setEventStartDate}
                      eventEndDate={eventEndDate}
                      setEventEndDate={setEventEndDate}
                      eventStartTime={eventStartTime}
                      setEventStartTime={setEventStartTime}
                      eventEndTime={eventEndTime}
                      setEventEndTime={setEventEndTime}
                      eventTimezone={eventTimezone}
                      setEventTimezone={setEventTimezone}
                    />
                  );
                } else if (activeStep === 4) {
                  return (
                    <EditPricing
                      eventFree={eventFree}
                      eventPaid={eventPaid}
                      eventTierName1={eventTierName1}
                      eventPrice1={eventPrice1}
                      setEventPrice1={setEventPrice1}
                      eventTierName2={eventTierName2}
                      setEventTierName2={setEventTierName2}
                      eventPrice2={eventPrice2}
                      setEventPrice2={setEventPrice2}
                      eventTierName3={eventTierName3}
                      setEventTierName3={setEventTierName3}
                      eventPrice3={eventPrice3}
                      setEventPrice3={setEventPrice3}
                      eventTierName4={eventTierName4}
                      setEventTierName4={setEventTierName4}
                      eventPrice4={eventPrice4}
                      setEventPrice4={setEventPrice4}
                      enableTicket2={enableTicket2}
                      setEnableTicket2={setEnableTicket2}
                      enableTicket3={enableTicket3}
                      setEnableTicket3={setEnableTicket3}
                      enableTicket4={enableTicket4}
                      setEnableTicket4={setEnableTicket4}
                      state={state}
                      setState={setState}
                      eventTierID1={eventTierID1}
                      setEventTierID1={setEventTierID1}
                      eventTierID2={eventTierID2}
                      setEventTierID2={setEventTierID2}
                      eventTierID3={eventTierID3}
                      setEventTierID3={setEventTierID3}
                      eventTierID4={eventTierID4}
                      setEventTierID4={setEventTierID4}
                      price1Error={price1Error}
                      price2Error={price2Error}
                      price3Error={price3Error}
                      price4Error={price4Error}
                      ticket2Error={ticket2Error}
                      ticket3Error={ticket3Error}
                      ticket4Error={ticket4Error}
                    />
                  );
                } else if (activeStep === 5) {
                  return (
                    <EditEventMedia
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      newImg={newImg}
                      setNewImg={setNewImg}
                    />
                  );
                } else {
                  return <p>Form error.. trying reloading the page</p>;
                }
              })()}
            </div>
            <Box sx={{ margin: "1% 2%" }} id="create-ev-bttns">
              <div id="create-ev-bttns-left">
                <Button
                  id={activeStep === 0 ? "hide" : "show"}
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Go back a step
                </Button>
              </div>
              <div id="create-ev-bttns-right">
                <Button
                  id="save-cont-ev-btn"
                  variant="contained"
                  onClick={handleNext}
                >
                  {activeStep === 5 ? "Save & Preview" : "Save & Continue"}
                </Button>
              </div>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}

export default EditEvent;
