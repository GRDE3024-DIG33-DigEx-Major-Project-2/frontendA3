import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MobileStepper,
  Stack,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { getFirstLetters } from "../../utils/utils";
import { Link } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { updateEvent } from "../../services/EventAPI";
import EditBasicInfo from "./EE1_BasicInfo";
import EditArtistsAndSummary from "./EE2_ArtistsAndSummary";
import EditLocation from "./EE3_Location";
import EditDateTime from "./EE4_DateTime";
import EditPricing from "./EE5_Pricing";
import EditEventMedia from "./EE6_EventMedia";
import { PATHS } from "../../utils/constants.util";

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

  //** FIRST SCREEN - BASIC INFO **//
  const [eventID, setEventID] = useState(event.event.id);
  const [eventName, setEventName] = useState(event.event.title);
  const [eventOrganiser, setEventOrganiser] = useState(
    event.event.organizationName
  );
  const [description, setDescription] = useState(event.event.description);
  const [tags, setTags] = useState(tagString);
  const [eventURL, setEventURL] = useState(event.event.purchaseUrl);
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
  // ** THIRD SCREEN - LOCATION ** //
  const [venueName, setVenueName] = useState(event.event.venueName);
  const [suburb, setSuburb] = useState(event.event.suburb);
  const [eventAddress1, setEventAddress1] = useState(event.event.address);
  const [eventAddress2, setEventAddress2] = useState("");
  const [eventCity, setEventCity] = useState(event.event.city);
  const [eventCountry, setEventCountry] = useState(event.event.country);
  const [eventState, setEventState] = useState(event.event.region);
  const [eventPostCode, setEventPostCode] = useState(event.event.postcode);
  // ** FOURTH SCREEN - DATE AND TIME ** //
  const startDate = new Date(event.event.startDate);
  const endDate = new Date(event.event.endDate);
  const [eventStartDate, setEventStartDate] = useState(startDate);
  const [eventEndDate, setEventEndDate] = useState(endDate);
  const [eventStartTime, setEventStartTime] = useState(startDate);
  const [eventEndTime, setEventEndTime] = useState(endDate);
  const [eventTimezone, setEventTimezone] = useState("AEST");
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
  // ** SIXTH SCREEN - MEDIA **//
  const [newImg, setNewImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    !event.eventImg ? null : event.eventImg.url
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

  const handleSave = () => {
    console.log("TO DO SAVE");
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
      id: eventID,
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
        eventImg: selectedImage
      };
      console.log(formData);
      await updateEvent(formData);
    }

    navigate(PATHS.DASHBOARD);
  };

  const deleteEvent = () => {
    navigate(PATHS.DASHBOARD);
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
