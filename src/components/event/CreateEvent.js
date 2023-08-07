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
  Button,
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
import { addDraft } from "../../utils/localStorage";

function CreateEvent() {

  const navigate = useNavigate();
  const location = useLocation();
  let draft = null;
  if (location.state){
    draft = location.state.draft;
  }

  const [activeStep, setActiveStep] = useState(0);

  //** FIRST SCREEN - BASIC INFO **//
  const [eventName, setEventName] = useState(draft && draft.eventName ? draft.eventName : "");
  const [eventOrganiser, setEventOrganiser] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [eventURL, setEventURL] = useState("");
  // ** SECOND SCREEN - ARTISTS AND SUMMARY ** //
  const [artistName, setArtistName] = useState("");
  const [artistName2, setArtistName2] = useState("");
  const [artistName3, setArtistName3] = useState("");
  const [artistName4, setArtistName4] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  const [enableArtist2, setEnableArtist2] = useState(false);
  const [enableArtist3, setEnableArtist3] = useState(false);
  const [enableArtist4, setEnableArtist4] = useState(false);
  // ** THIRD SCREEN - LOCATION ** //
  const [venueName, setVenueName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [eventAddress1, setEventAddress1] = useState("");
  const [eventAddress2, setEventAddress2] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventPostCode, setEventPostCode] = useState("");
  // ** FOURTH SCREEN - DATE AND TIME ** //
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const [eventTimezone, setEventTimezone] = useState("AEST");
  // ** FIFTH SCREEN - PRICE **//
  const [state, setState] = useState({
    eventFree: false,
    eventPaid: true,
  });
  const { eventFree, eventPaid } = state;
  const eventTierName1 = "General Admission";
  const [eventPrice1, setEventPrice1] = useState(parseFloat(0.0).toFixed(2));
  const [eventTierName2, setEventTierName2] = useState("");
  const [eventPrice2, setEventPrice2] = useState(parseFloat(0.0).toFixed(2));
  const [eventTierName3, setEventTierName3] = useState("");
  const [eventPrice3, setEventPrice3] = useState(parseFloat(0.0).toFixed(2));
  const [eventTierName4, setEventTierName4] = useState("");
  const [eventPrice4, setEventPrice4] = useState(parseFloat(0.0).toFixed(2));
  const [enableTicket2, setEnableTicket2] = useState(false);
  const [enableTicket3, setEnableTicket3] = useState(false);
  const [enableTicket4, setEnableTicket4] = useState(false);
  // ** SIXTH SCREEN - MEDIA **//
  const [selectedImage, setSelectedImage] = useState();

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

    const draft = {
      eventName: eventName
    }

    addDraft(draft);
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
                <img
                  alt={eventName}
                  src={URL.createObjectURL(selectedImage)}
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
