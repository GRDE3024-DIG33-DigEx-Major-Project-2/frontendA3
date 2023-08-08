import * as React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MobileStepper,
  Stack,
  Divider,
  Avatar,
  Chip,
  Box,
  Button
} from "@mui/material";
import { getFirstLetters } from "../../utils/utils";
import { Link } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { createEvent } from "../../services/EventAPI";
import BasicInfo from "./CE1_BasicInfo";
import ArtistsAndSummary from "./CE2_ArtistsAndSummary";
import Location from "./CE3_Location";
import DateTime from "./CE4_DateTime";
import Pricing from "./CE5_Pricing";
import EventMedia from "./CE6_EventMedia";
import { addDraft, removeDraft } from "../../utils/localStorage";

function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  let draft = null;
  let draftNo = null;
  if (location.state) {
    draft = location.state.draft;
    draftNo = location.state.draftNo;
  }

  const [activeStep, setActiveStep] = useState(0);

  //** FIRST SCREEN - BASIC INFO **//
  const [eventName, setEventName] = useState(
    draft && draft.eventName ? draft.eventName : ""
  );
  const [eventOrganiser, setEventOrganiser] = useState(
    draft && draft.eventOrganiser ? draft.eventOrganiser : ""
  );
  const [description, setDescription] = useState(
    draft && draft.description ? draft.description : ""
  );
  const [tags, setTags] = useState(draft && draft.tags ? draft.tags : []);
  const [eventURL, setEventURL] = useState(
    draft && draft.eventURL ? draft.eventURL : ""
  );
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
  const [eventAddress2, setEventAddress2] = useState(
    draft && draft.eventAddress2 ? draft.eventAddress2 : ""
  );
  const [eventCity, setEventCity] = useState(
    draft && draft.eventCity ? draft.eventCity : ""
  );
  const [eventCountry, setEventCountry] = useState(
    draft && draft.eventCountry ? draft.eventCountry : ""
  );
  const [eventState, setEventState] = useState(
    draft && draft.eventState ? draft.eventState : ""
  );
  const [eventPostCode, setEventPostCode] = useState(
    draft && draft.eventPostCode ? draft.eventPostCode : ""
  );
  // ** FOURTH SCREEN - DATE AND TIME ** //
  let startDate = null;
  let endDate = null;
  let startTime = null;
  let endTime = null;
  if (draft) {
    startDate = new Date(draft.eventStartDate);
    endDate = new Date(draft.eventEndDate);
    startTime = new Date(draft.eventStartTime);
    endTime = new Date(draft.eventEndTime);
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
    draft && draft.eventTimezone ? draft.eventTimezone : "AEST"
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
  // ** SIXTH SCREEN - MEDIA **//
  const [selectedImage, setSelectedImage] = useState(
    draft && draft.selectedImage ? draft.selectedImage : null
  );

  const handleNext = (e) => {
    if (activeStep === 5 && !selectedImage) {
      alert("Please upload an image to proceed");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitEvent = async () => {
    // merge date and time into single date field
    var startDateTime = new Date(
      eventStartDate.getFullYear(),
      eventStartDate.getMonth(),
      eventStartDate.getDate(),
      eventStartTime.getHours(),
      eventStartTime.getMinutes(),
      eventStartTime.getSeconds()
    );

    var endDateTime = new Date(
      eventEndDate.getFullYear(),
      eventEndDate.getMonth(),
      eventEndDate.getDate(),
      eventEndTime.getHours(),
      eventEndTime.getMinutes(),
      eventEndTime.getSeconds()
    );

    const event = {
      title: eventName,
      venueName: venueName,
      description: description,
      summary: eventSummary,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      suburb: suburb,
      address: eventAddress1 + " " + eventAddress2,
      city: eventCity,
      region: eventState,
      postcode: eventPostCode,
      country: eventCountry,
      isFree: eventFree,
      purchaseUrl: eventURL,
    };

    let acts = [];
    acts.push({ name: artistName });
    if (artistName2 !== "") acts.push({ name: artistName2 });
    if (artistName3 !== "") acts.push({ name: artistName3 });
    if (artistName4 !== "") acts.push({ name: artistName4 });

    let ticketTypes = [];
    ticketTypes.push({ name: eventTierName1, price: eventPrice1 });
    if (eventTierName2 !== "")
      ticketTypes.push({ name: eventTierName2, price: eventPrice2 });
    if (eventTierName3 !== "")
      ticketTypes.push({ name: eventTierName3, price: eventPrice3 });
    if (eventTierName4 !== "")
      ticketTypes.push({ name: eventTierName4, price: eventPrice4 });

    let formattedTags = [];
    tags.forEach((tag) => {
      let formattedTag = tag.split(",");
      formattedTags.push({ id: formattedTag[1], name: formattedTag[0] });
    });

    const formData = {
      event: event,
      acts: acts,
      ticketTypes: ticketTypes,
      tags: formattedTags,
      filename: selectedImage.name.split(".")[0],
      "event-img": selectedImage,
    };

    console.log(formData);

    await createEvent(formData);

    navigate("/dashboard");
  };

  const deleteEvent = () => {
    navigate("/dashboard");
  };

  const saveExit = () => {
    if (draft) {
      console.log("DELETING", draftNo);
      removeDraft(draftNo);
    }

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
      eventAddress2: eventAddress2,
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

    console.log(currentDraft);
    addDraft(currentDraft);
    navigate("/dashboard");
  };

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
          <Link id="discard-ev-btn" onClick={deleteEvent}>
            Discard this event
          </Link>
        </div>
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
                          {eventStartDate.toDateString()}{" "}
                          {eventStartTime.toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          - {eventEndDate.toDateString()}{" "}
                          {eventEndTime.toLocaleString("en-US", {
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
                          {venueName}, {eventAddress1}
                          {eventAddress2}, {suburb}, {eventPostCode},{" "}
                          {eventCity} {eventCountry}
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
                      <div className="event-prev-price">
                        <span className="icon-title">
                          <LocalActivityOutlinedIcon
                            sx={{ color: "#4B7CBE" }}
                          />
                          <h3>{eventTierName1}</h3>
                        </span>
                        <p>$ {eventPrice1}</p>
                      </div>
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
                    </div>
                  </div>
                  <button className="event-buy-button">Buy Tickets</button>
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
              {(() => {
                if (activeStep === 0) {
                  return (
                    <BasicInfo
                      eventName={eventName}
                      setEventName={setEventName}
                      eventOrganiser={eventOrganiser}
                      setEventOrganiser={setEventOrganiser}
                      description={description}
                      setDescription={setDescription}
                      tags={tags}
                      setTags={setTags}
                      eventURL={eventURL}
                      setEventURL={setEventURL}
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
                      eventAddress2={eventAddress2}
                      setEventAddress2={setEventAddress2}
                      eventCity={eventCity}
                      setEventCity={setEventCity}
                      eventCountry={eventCountry}
                      setEventCountry={setEventCountry}
                      eventState={eventState}
                      setEventState={setEventState}
                      eventPostCode={eventPostCode}
                      setEventPostCode={setEventPostCode}
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

export default CreateEvent;
