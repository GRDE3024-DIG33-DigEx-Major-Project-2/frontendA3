/**
 * CreateEvent component
 */

//Import dependencies
import * as React from "react";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MobileStepper,
  Stepper,
  StepButton,
  Step,
  Stack,
  Divider,
  Avatar,
  Chip,
  Box,
  Button,
  Link,
  Modal,
} from "@mui/material";
import { getFirstLetters, isValidURL, mergeDateTime } from "../../utils/utils";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { createEvent } from "../../services/EventAPI";
import BasicInfo from "./create/CE1_BasicInfo";
import ArtistsAndSummary from "./create/CE2_ArtistsAndSummary";
import Location from "./create/CE3_Location";
import DateTime from "./create/CE4_DateTime";
import Pricing from "./create/CE5_Pricing";
import EventMedia from "./create/CE6_EventMedia";
import { PATHS } from "../../utils/constants.util";
import { addDraft, getUser, removeDraft } from "../../utils/localStorage";
import { LoadingContext } from "../../props/loading-spinner.prop";

/**
 * Builds the CreateEvent component
 * @returns Render of the CreateEvent component
 */
function CreateEvent() {
  //SPA navigator
  const navigate = useNavigate();
  //SPA location for linking
  const location = useLocation();
  //User data
  const user = getUser();

  //Draft setup
  let draft = null;
  let draftNo = null;
  if (location.state) {
    draft = location.state.draft;
    draftNo = location.state.draftNo;
  }

  //Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = [
    "Basic Information",
    "Artists and Summary",
    "Location",
    "Date and Time",
    "Pricing",
    "Event Media",
  ];

  //Modal for discard option
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  //Modal functions
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
  const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

  //Fullpage loading spinner context
  const { isLoading } = useContext(LoadingContext);

  /**
   * Discard the draft event
   */
  const handleDiscard = () => {
    // set draft to null if it exists
    if (draft) removeDraft(draftNo);
    // open confirmation modal
    handleConfirmationModalOpen();
    handleModalClose();
  };

  //** FIRST SCREEN - BASIC INFO **//
  const [eventName, setEventName] = useState(
    draft && draft.eventName ? draft.eventName : ""
  );
  const eventOrganiser = user.organizationName;
  const [description, setDescription] = useState(
    draft && draft.description ? draft.description : ""
  );
  const [tags, setTags] = useState(draft && draft.tags ? draft.tags : []);
  const [eventURL, setEventURL] = useState(
    draft && draft.eventURL ? draft.eventURL : ""
  );

  /* First screen error flags */
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  // ** SECOND SCREEN - ARTISTS AND SUMMARY ** //
  const [artistName, setArtistName] = useState(
    draft && draft.artistName ? draft.artistName : ""
  );
  const [artistName2, setArtistName2] = useState(
    draft && draft.artistName2 ? draft.artistName2 : ""
  );
  const [artistName3, setArtistName3] = useState(
    draft && draft.artistName3 ? draft.artistName3 : ""
  );
  const [artistName4, setArtistName4] = useState(
    draft && draft.artistName4 ? draft.artistName4 : ""
  );
  const [eventSummary, setEventSummary] = useState(
    draft && draft.eventSummary ? draft.eventSummary : ""
  );
  const [enableArtist2, setEnableArtist2] = useState(
    draft && draft.enableArtist2 ? draft.enableArtist2 : false
  );
  const [enableArtist3, setEnableArtist3] = useState(
    draft && draft.enableArtist3 ? draft.enableArtist3 : false
  );
  const [enableArtist4, setEnableArtist4] = useState(
    draft && draft.enableArtist4 ? draft.enableArtist4 : false
  );

  /* Second screen error flags */
  const [summaryError, setSummaryError] = useState(false);

  // ** THIRD SCREEN - LOCATION ** //
  const [venueName, setVenueName] = useState(
    draft && draft.venueName ? draft.venueName : ""
  );
  const [suburb, setSuburb] = useState(
    draft && draft.suburb ? draft.suburb : ""
  );
  const [eventAddress1, setEventAddress1] = useState(
    draft && draft.eventAddress1 ? draft.eventAddress1 : ""
  );

  // Hardcoded values as the app is meant to function in Sydney only
  const eventCity = "Sydney";
  const eventCountry = "Australia";
  const eventState = "NSW";

  const [eventPostCode, setEventPostCode] = useState(
    draft && draft.eventPostCode ? draft.eventPostCode : ""
  );

  /* Third screen error flags */
  const [venueNameError, setVenueNameError] = useState(false);
  const [suburbError, setSuburbError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [postcodeError, setPostcodeError] = useState(false);

  // ** FOURTH SCREEN - DATE AND TIME ** //
  let startDate = null;
  let endDate = null;
  let startTime = null;
  let endTime = null;
  if (draft) {
    if (draft.eventStartDate) startDate = new Date(draft.eventStartDate);
    if (draft.eventEndDate) endDate = new Date(draft.eventEndDate);
    if (draft.eventStartTime) startTime = new Date(draft.eventStartTime);
    if (draft.eventEndTime) endTime = new Date(draft.eventEndTime);
  }
  const [eventStartDate, setEventStartDate] = useState(
    draft && startDate ? startDate : null
  );
  const [eventEndDate, setEventEndDate] = useState(
    draft && endDate ? endDate : null
  );
  const [eventStartTime, setEventStartTime] = useState(
    draft && startTime ? startTime : null
  );
  const [eventEndTime, setEventEndTime] = useState(
    draft && endTime ? endTime : null
  );
  const [eventTimezone, setEventTimezone] = useState(
    draft && draft.eventTimezone ? draft.eventTimezone : "Australia/Sydney"
  );

  // ** FIFTH SCREEN - PRICE **//
  const [state, setState] = useState({
    eventFree: draft && draft.eventFree ? draft.eventFree : false,
    eventPaid: draft && draft.eventPaid ? draft.eventPaid : true,
  });
  const { eventFree, eventPaid } = state;
  const eventTierName1 = "General Admission";
  const [eventPrice1, setEventPrice1] = useState(
    draft && draft.eventPrice1 ? draft.eventPrice1 : parseFloat(0.0).toFixed(2)
  );
  const [eventTierName2, setEventTierName2] = useState(
    draft && draft.eventTierName2 ? draft.eventTierName2 : ""
  );
  const [eventPrice2, setEventPrice2] = useState(
    draft && draft.eventPrice2 ? draft.eventPrice2 : parseFloat(0.0).toFixed(2)
  );
  const [eventTierName3, setEventTierName3] = useState(
    draft && draft.eventTierName3 ? draft.eventTierName3 : ""
  );
  const [eventPrice3, setEventPrice3] = useState(
    draft && draft.eventPrice3 ? draft.eventPrice3 : parseFloat(0.0).toFixed(2)
  );
  const [eventTierName4, setEventTierName4] = useState(
    draft && draft.eventTierName4 ? draft.eventTierName4 : ""
  );
  const [eventPrice4, setEventPrice4] = useState(
    draft && draft.eventPrice4 ? draft.eventPrice4 : parseFloat(0.0).toFixed(2)
  );
  const [enableTicket2, setEnableTicket2] = useState(
    draft && draft.enableTicket2 ? draft.enableTicket2 : false
  );
  const [enableTicket3, setEnableTicket3] = useState(
    draft && draft.enableTicket3 ? draft.enableTicket3 : false
  );
  const [enableTicket4, setEnableTicket4] = useState(
    draft && draft.enableTicket4 ? draft.enableTicket4 : false
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
  const [selectedImage, setSelectedImage] = useState(
    draft && draft.selectedImage ? draft.selectedImage : null
  );

  // checks that all steps are completed
  const allCompleted = (completed) => {
    let flag = true;
    for(let i=0; i<6; i++){
      if(!completed[i]) flag = false;
    }

    return flag;
  }

  /**
   * Determines if the conditions are satisfied for users to proceed to screen six
   * @param {*} enableArtist
   * @param {*} eventPrice
   * @param {*} eventTierName
   * @returns
   */
  const canProceed = (enableArtist, eventPrice, eventTierName) => {
    if (enableArtist) {
      if (eventPrice === parseFloat(0.0).toFixed(2) || eventTierName === "") {
        return false;
      } else return true;
    } else return true;
  };

  /**
   * Handles validation and changes pages in the form
   * @param {*} e
   */
  const handleNext = (e) => {
    switch (activeStep) {
      //RULES: name, description and URL are required
      case 0:
        if (eventName === "") setNameError(true);
        else setNameError(false);

        if (description === "") setDescriptionError(true);
        else setDescriptionError(false);

        if (eventURL === "") setUrlError(true);
        else setUrlError(false);

        if (isValidURL(eventURL)) setUrlError(false);
        else setUrlError(true);

        if (
          eventName !== "" &&
          description !== "" &&
          eventURL !== "" &&
          isValidURL(eventURL)
        ) {
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const newCompleted = completed;
          newCompleted[activeStep] = false;
          setCompleted(newCompleted);
        }

        break;
      //RULES: At least one artist. Summary is required.
      case 1:
        let atLeastOneArtist = !(
          artistName === "" &&
          artistName2 === "" &&
          artistName3 === "" &&
          artistName4 === ""
        );
        if (!atLeastOneArtist) {
          alert("At least one artist is required in order to proceed.");
        }

        if (eventSummary === "") setSummaryError(true);
        else setSummaryError(false);

        if (atLeastOneArtist && eventSummary !== "") {
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const newCompleted = completed;
          newCompleted[activeStep] = false;
          setCompleted(newCompleted);
        }
        break;
      //RULES: Venue name and all address fields are required.
      case 2:
        if (venueName === "") setVenueNameError(true);
        else setVenueNameError(false);

        if (suburb === "") setSuburbError(true);
        else setSuburbError(false);

        if (eventAddress1 === "") setAddressError(true);
        else setAddressError(false);

        if (eventPostCode === "") setPostcodeError(true);
        else setPostcodeError(false);

        if (
          venueName !== "" &&
          suburb !== "" &&
          eventAddress1 !== "" &&
          eventPostCode !== ""
        ) {
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const newCompleted = completed;
          newCompleted[activeStep] = false;
          setCompleted(newCompleted);
        }

        break;
      //RULES: Start date cannot be earlier than end date. All fields required. End time needs to be at least one hour later than start time
      case 3:
        if (eventStartDate && eventEndDate && eventStartTime && eventEndTime)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else alert("All date and time fields are required to continue.");
        break;
      //RULES: At least general admission price required if the event is paid. Once a ticket type is enabled, name and price are required.
      case 4:
        if (eventPaid && eventPrice1 === parseFloat(0.0).toFixed(2))
          setPrice1Error(true);
        else setPrice1Error(false);

        if (eventPaid && enableTicket2) {
          if (eventPrice2 === parseFloat(0.0).toFixed(2)) setPrice2Error(true);
          else setPrice2Error(false);

          if (eventTierName2 === "") setTicket2Error(true);
          else setTicket2Error(false);
        }

        if (eventPaid && enableTicket3) {
          if (eventPrice3 === parseFloat(0.0).toFixed(2)) setPrice3Error(true);
          else setPrice3Error(false);

          if (eventTierName3 === "") setTicket3Error(true);
          else setTicket3Error(false);
        }

        if (eventPaid && enableTicket4) {
          if (eventPrice4 === parseFloat(0.0).toFixed(2)) setPrice4Error(true);
          else setPrice4Error(false);

          if (eventTierName4 === "") setTicket4Error(true);
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
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const newCompleted = completed;
          newCompleted[activeStep] = false;
          setCompleted(newCompleted);
        }
        break;
      //RULES: Image upload is required.
      case 5:
        if (!selectedImage) alert("Please upload an image to proceed");
        else if(!allCompleted(completed)) alert("Please complete all the steps to proceed");
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      default:
        console.log("Event preview");
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  /**
   * Moves the stepper backwards one step
   */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Create event request handler
   */
  const submitEvent = async () => {
    //Merge date and time into single startDate field
    var startDateTime = new Date(
      dayjs(eventStartDate).year(),
      dayjs(eventStartDate).month(),
      dayjs(eventStartDate).date(),
      dayjs(eventStartTime).hour(),
      dayjs(eventStartTime).minute(),
      dayjs(eventStartTime).second()
    );
    //Merge date and time into single endDate field
    var endDateTime = new Date(
      dayjs(eventEndDate).year(),
      dayjs(eventEndDate).month(),
      dayjs(eventEndDate).date(),
      dayjs(eventEndTime).hour(),
      dayjs(eventEndTime).minute(),
      dayjs(eventEndTime).second()
    );

    //Build the Event object to send
    const event = {
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

    //Build Act object array to send
    let acts = [];
    acts.push({ name: artistName });
    if (artistName2 !== "") acts.push({ name: artistName2 });
    if (artistName3 !== "") acts.push({ name: artistName3 });
    if (artistName4 !== "") acts.push({ name: artistName4 });

    //Build TicketType object array to send
    let ticketTypes = [];
    ticketTypes.push({ name: eventTierName1, price: eventPrice1 });
    if (eventTierName2 !== "")
      ticketTypes.push({ name: eventTierName2, price: eventPrice2 });
    if (eventTierName3 !== "")
      ticketTypes.push({ name: eventTierName3, price: eventPrice3 });
    if (eventTierName4 !== "")
      ticketTypes.push({ name: eventTierName4, price: eventPrice4 });
    //Build Tag object array to send
    let formattedTags = [];
    tags.forEach((tag) => {
      let formattedTag = tag.split(",");
      formattedTags.push({ id: formattedTag[1], name: formattedTag[0] });
    });
    //Init formData object with event data
    const formData = {
      event: event,
      acts: acts,
      ticketTypes: ticketTypes,
      tags: formattedTags,
      filename: selectedImage.name.split(".")[0],
      "event-img": selectedImage,
    };
    //Attempt to create event request
    try {
      isLoading.set(true);
      await createEvent(formData);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.set(false);
    }

    //If the event comes from a draft, delete existing draft when publishing
    if (draft) {
      console.log("Deleting Darft No: ", draftNo);
      removeDraft(draftNo);
    }

    //Navigate to the organiser's dashboard on completion
    navigate(PATHS.DASHBOARD);
  };

  /**
   * Draft implementation handler
   */
  const saveExit = () => {
    if (draft) {
      console.log("Deleting Darft No: ", draftNo);
      removeDraft(draftNo);
    }

    //Init the current draft to save
    const currentDraft = {
      eventName: eventName,
      eventOrganiser: eventOrganiser,
      description: description,
      tags: tags,
      eventURL: eventURL,
      artistName: artistName,
      artistName2: artistName2,
      artistName3: artistName3,
      artistName4: artistName4,
      eventSummary: eventSummary,
      enableArtist2: enableArtist2,
      enableArtist3: enableArtist3,
      enableArtist4: enableArtist4,
      venueName: venueName,
      suburb: suburb,
      eventAddress1: eventAddress1,
      eventCity: eventCity,
      eventCountry: eventCountry,
      eventState: eventState,
      eventPostCode: eventPostCode,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventTimezone: eventTimezone,
      eventFree: eventFree,
      eventPaid: eventPaid,
      eventPrice1: eventPrice1,
      eventPrice2: eventPrice2,
      eventPrice3: eventPrice3,
      eventPrice4: eventPrice4,
      eventTierName2: eventTierName2,
      eventTierName3: eventTierName3,
      eventTierName4: eventTierName4,
      enableTicket2: enableTicket2,
      enableTicket3: enableTicket3,
      enableTicket4: enableTicket4,
    };

    console.log("Current Draft: ", currentDraft);
    //Save event draft to session storage
    addDraft(currentDraft);
    //Navigate to the organiser's dashboard on completion
    navigate(PATHS.DASHBOARD);
  };

  //Return CreateEvent template render
  return (
    <div id="create-event-main">
      <div className="create-event-header">
        <h1>Create an event</h1>
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
            <h2>Are you sure you want to discard this event?</h2>
            <span>
              All event data will be removed and permanently deleted, so you
              will not be able to retrieve aby of the existing information.
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
                onClick={handleDiscard}
              >
                Yes, discard this event
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
            <span>This event has been permanently discarded.</span>
            <Button id="save-cont-ev-btn" variant="contained" href="/dashboard">
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
                <img alt={eventName} src={URL.createObjectURL(selectedImage)} />
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
                        <h2 style={{ padding: "3% 5%" }}>
                          This event is free.
                        </h2>
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
                onClick={saveExit}
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
              <div className="event-additional-stepper">
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      {completed[index] || completed[index - 1] ? (
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      ) : (
                        <StepButton color="inherit" disabled>
                          {label}
                        </StepButton>
                      )}
                    </Step>
                  ))}
                </Stepper>
              </div>
              {(() => {
                if (activeStep === 0) {
                  return (
                    <BasicInfo
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
                    <ArtistsAndSummary
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
                      summaryError={summaryError}
                    />
                  );
                } else if (activeStep === 2) {
                  return (
                    <Location
                      venueName={venueName}
                      setVenueName={setVenueName}
                      suburb={suburb}
                      setSuburb={setSuburb}
                      eventAddress1={eventAddress1}
                      setEventAddress1={setEventAddress1}
                      eventCity={eventCity}
                      eventCountry={eventCountry}
                      eventState={eventState}
                      eventPostCode={eventPostCode}
                      setEventPostCode={setEventPostCode}
                      venueNameError={venueNameError}
                      suburbError={suburbError}
                      addressError={addressError}
                      postcodeError={postcodeError}
                    />
                  );
                } else if (activeStep === 3) {
                  return (
                    <DateTime
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
                    <Pricing
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
                    <EventMedia
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
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
                  id="save-exit-ev-btn"
                  variant="contained"
                  className="input-btn"
                  onClick={saveExit}
                >
                  Save & Exit
                </Button>
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

//Export the CreateEvent component
export default CreateEvent;
