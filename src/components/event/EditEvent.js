import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  TextField,
  InputAdornment,
  MobileStepper,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Checkbox } from "@mui/material";
import {
  getAustralianTimezones,
  getFirstLetters,
} from "../../utils/utils";
import { Link } from "@mui/material";
import CreateEventMap from "../mapbox/CreateEventMap";
import { forwardGeocoding } from "../../services/Geocoding";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { getUser } from "../../utils/localStorage";
import { updateEvent, getAllTags } from "../../services/EventAPI";

function EditEvent() {
  const user = getUser();
  const location = useLocation();
  const event = location.state.event;
  console.log(event);
  const tagString = [];
  event.tags.forEach((tag) => {
    tagString.push(tag.name + "," + tag.id);
  });
  console.log(event);

  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    eventFree: event.event.isFree,
    eventPaid: !event.event.isFree,
  });

  const navigate = useNavigate();

  //** FIRST SCREEN - BASIC INFO **//
  const [eventID, setEventID] = useState(event.event.id);
  const [eventName, setEventName] = useState(event.event.title);
  const [eventOrganiser, setEventOrganiser] = useState(
    event.event.organizationName
  );
  const [description, setDescription] = useState(event.event.description);
  const [tags, setTags] = useState(tagString);
  const [availableTags, setAvailableTags] = useState([]);
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
  const [lat, setLat] = useState(-33.86);
  const [lng, setLng] = useState(151.2);
  const [mapKey, setMapKey] = useState(1);
  // ** FOURTH SCREEN - DATE AND TIME ** //
  const timezones = getAustralianTimezones();
  const startDate = new Date(event.event.startDate);
  const endDate = new Date(event.event.endDate);
  const [eventStartDate, setEventStartDate] = useState(startDate);
  const [eventEndDate, setEventEndDate] = useState(endDate);
  const [eventStartTime, setEventStartTime] = useState(startDate);
  const [eventEndTime, setEventEndTime] = useState(endDate);
  const [eventTimezone, setEventTimezone] = useState("AEST");
  // ** FIFTH SCREEN - PRICE **//
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
    !event.eventImg ? "" : event.eventImg.url
  );

  // functions to enable/disable artist form fields
  const handleDisable2 = () => {
    if (enableArtist2) setEnableArtist2(false);
    if (!enableArtist2) setEnableArtist2(true);
  };
  const handleDisable3 = () => {
    if (enableArtist3) setEnableArtist3(false);
    if (!enableArtist3) setEnableArtist3(true);
  };
  const handleDisable4 = () => {
    if (enableArtist4) setEnableArtist4(false);
    if (!enableArtist4) setEnableArtist4(true);
  };

  // functions to enable/disable price form fields
  const handleTicketDisable2 = () => {
    if (enableTicket2) setEnableTicket2(false);
    if (!enableTicket2) setEnableTicket2(true);
  };
  const handleTicketDisable3 = () => {
    if (enableTicket3) setEnableTicket3(false);
    if (!enableTicket3) setEnableTicket3(true);
  };
  const handleTicketDisable4 = () => {
    if (enableTicket4) setEnableTicket4(false);
    if (!enableTicket4) setEnableTicket4(true);
  };

  /**
   * Fetch api data on load
   */
  useEffect(() => {
    /**
     * Get all pre-defined tags/genres
     */
    async function fetchTags() {
      const tags = await getAllTags();
      setAvailableTags(tags);
    }

    //Get tags
    fetchTags();
  }, [setAvailableTags]);

  useEffect(() => {
    /** Update map location as address is typed in*/
    async function fetchCoordinates() {
      let address =
        eventAddress1 +
        eventAddress2 +
        "," +
        suburb +
        "," +
        eventCity +
        "," +
        eventState +
        "," +
        eventPostCode;
      if (suburb !== "") {
        address += "," + suburb;
      }
      if (eventCity !== "") {
        address += "," + eventCity;
      }
      if (eventState !== "") {
        address += "," + eventState;
      }
      if (eventPostCode !== "") {
        address += "," + eventPostCode;
      }
      if (eventCountry !== "") {
        address += "," + eventCountry;
      }

      let result = await forwardGeocoding(address);
      setLat(result[0]);
      setLng(result[1]);
      setMapKey(result[0] + result[1]);
    }

    fetchCoordinates();
  }, [eventState, eventPostCode]);

  // select keywords styling
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = -55;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // select tags handler
  const selectTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
    console.log(tags);
  };

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
      };
      console.log(formData);
      await updateEvent(formData);
    }

    navigate("/dashboard");
  };

  const deleteEvent = () => {
    navigate("/dashboard");
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
    setNewImg(true);
  };

  const handleChecked = (event) => {
    if (event.target.name === "eventFree") {
      setState({
        ...state,
        eventFree: true,
        eventPaid: false,
      });
    }

    if (event.target.name === "eventPaid") {
      setState({
        ...state,
        eventFree: false,
        eventPaid: true,
      });
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
                    <>
                      <h2>Basic Information</h2>
                      <div className="basic-information">
                        <Box alignItems="center" justifyContent="center">
                          <form>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid container item xs={6} direction="column">
                                  <p>Event Name:</p>
                                  <TextField
                                    fullWidth
                                    value={eventName}
                                    required
                                    onChange={(event) =>
                                      setEventName(event.target.value)
                                    }
                                    id="create-event-name"
                                    placeholder="Enter the event name"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Event Organiser:</p>
                                  <TextField
                                    fullWidth
                                    value={eventOrganiser}
                                    required
                                    onChange={(event) =>
                                      setEventOrganiser(event.target.value)
                                    }
                                    id="create-event-organiser"
                                    placeholder="Enter the event organiser"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid container item l={12} direction="row">
                                  <p>Event description:</p>
                                  <TextField
                                    fullWidth
                                    value={description}
                                    required
                                    onChange={(event) =>
                                      setDescription(event.target.value)
                                    }
                                    placeholder="Enter a description for the event"
                                    multiline
                                    id="create-event-description"
                                    variant="outlined"
                                    rows={8}
                                  />
                                </Grid>{" "}
                                <Grid container item xs={12} direction="column">
                                  <p>Keywords</p>
                                  <Select
                                    fullWidth
                                    id="create-event-multiple-tags"
                                    multiple
                                    value={tags}
                                    onChange={selectTags}
                                    input={
                                      <OutlinedInput id="select-multiple-chip" />
                                    }
                                    renderValue={(selected) => (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value) => (
                                          <Chip
                                            key={value}
                                            sx={{
                                              backgroundColor: "#7759A6",
                                              color: "white",
                                            }}
                                            label={value.split(",")[0]}
                                          />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {availableTags.map((tag) => (
                                      <MenuItem
                                        key={tag.id}
                                        value={tag.name + "," + tag.id}
                                      >
                                        {tag.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Event purchase URL:</p>
                                  <TextField
                                    fullWidth
                                    value={eventURL}
                                    required
                                    onChange={(event) =>
                                      setEventURL(event.target.value)
                                    }
                                    placeholder="Enter a URL for ticket purchasing"
                                    id="create-event-eventURL"
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
                  );
                } else if (activeStep === 1) {
                  return (
                    <>
                      {/* PAGE 2 - ARTISTS AND SUMMARY */}
                      <h2>Artists and summary</h2>
                      <div className="artist-and-summary">
                        <Box alignItems="center" justifyContent="center">
                          <form>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid container item xs={5} direction="column">
                                  <p className="form-label-active">
                                    Artist name:
                                  </p>
                                  <TextField
                                    fullWidth
                                    value={artistName}
                                    required
                                    onChange={(event) => {
                                      setArtistName(event.target.value);
                                      setArtistID("");
                                    }}
                                    id="create-event-an1"
                                    placeholder="Enter an artist's name"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={1}
                                  direction="column"
                                  className="fab-container"
                                >
                                  <Fab
                                    className="add-artist-fab-disabled"
                                    id="add-artist-1"
                                    aria-label="Add"
                                    disabled="true"
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className="remove-artist-fab-disabled"
                                    id="remove-artist-1"
                                    aria-label="Remove"
                                    disabled="true"
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p
                                    className={
                                      enableArtist2
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Artist name:
                                  </p>
                                  <TextField
                                    fullWidth
                                    value={artistName2}
                                    required
                                    onChange={(event) => {
                                      setArtistName2(event.target.value);
                                      setArtistID2("");
                                    }}
                                    id="create-event-an2"
                                    placeholder="Enter an artist's name"
                                    variant="outlined"
                                    disabled={!enableArtist2}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={1}
                                  direction="column"
                                  className="fab-container"
                                >
                                  <Fab
                                    className={
                                      !enableArtist2
                                        ? "add-artist-fab"
                                        : "add-artist-fab-disabled"
                                    }
                                    id="add-artist-2"
                                    aria-label="Add"
                                    onClick={handleDisable2}
                                    disabled={enableArtist2}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableArtist2
                                        ? "remove-artist-fab"
                                        : "remove-artist-fab-disabled"
                                    }
                                    id="remove-artist-2"
                                    aria-label="Remove"
                                    onClick={handleDisable2}
                                    disabled={!enableArtist2}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p
                                    className={
                                      enableArtist3
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Artist name:
                                  </p>
                                  <TextField
                                    fullWidth
                                    value={artistName3}
                                    required
                                    onChange={(event) => {
                                      setArtistName3(event.target.value);
                                      setArtistID3("");
                                    }}
                                    id="create-event-an3"
                                    placeholder="Enter an artist's name"
                                    variant="outlined"
                                    disabled={!enableArtist3}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={1}
                                  direction="column"
                                  className="fab-container"
                                >
                                  <Fab
                                    className={
                                      !enableArtist3
                                        ? "add-artist-fab"
                                        : "add-artist-fab-disabled"
                                    }
                                    id="add-artist-3"
                                    aria-label="Add"
                                    onClick={handleDisable3}
                                    disabled={enableArtist3}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableArtist3
                                        ? "remove-artist-fab"
                                        : "remove-artist-fab-disabled"
                                    }
                                    id="remove-artist-3"
                                    aria-label="Remove"
                                    onClick={handleDisable3}
                                    disabled={!enableArtist3}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p
                                    className={
                                      enableArtist4
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Artist name:
                                  </p>
                                  <TextField
                                    fullWidth
                                    value={artistName4}
                                    required
                                    onChange={(event) => {
                                      setArtistName4(event.target.value);
                                      setArtistID4("");
                                    }}
                                    id="create-event-an4"
                                    placeholder="Enter an artist's name"
                                    variant="outlined"
                                    disabled={!enableArtist4}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={1}
                                  direction="column"
                                  className="fab-container"
                                >
                                  <Fab
                                    className={
                                      !enableArtist4
                                        ? "add-artist-fab"
                                        : "add-artist-fab-disabled"
                                    }
                                    id="add-artist-4"
                                    aria-label="Add"
                                    onClick={handleDisable4}
                                    disabled={enableArtist4}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableArtist4
                                        ? "remove-artist-fab"
                                        : "remove-artist-fab-disabled"
                                    }
                                    id="remove-artist-4"
                                    aria-label="Remove"
                                    onClick={handleDisable4}
                                    disabled={!enableArtist4}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={11} direction="row">
                                  <p>Event summary:</p>
                                  <TextField
                                    fullWidth
                                    value={eventSummary}
                                    required
                                    onChange={(event) =>
                                      setEventSummary(event.target.value)
                                    }
                                    multiline
                                    id="create-ev-summary"
                                    variant="outlined"
                                    rows={5}
                                  />
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
                  );
                } else if (activeStep === 2) {
                  return (
                    <>
                      {/* PAGE 3 - LOCATION */}
                      <h2>Location</h2>
                      <div className="create-event-location-div">
                        <Box alignItems="center" justifyContent="center">
                          <form className="create-event-location-box">
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid container item xs={6} direction="column">
                                  <p>Venue name:</p>
                                  <TextField
                                    value={venueName}
                                    required
                                    onChange={(event) =>
                                      setVenueName(event.target.value)
                                    }
                                    id="create-event-venue-name"
                                    placeholder="Enter the name of the venue"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Venue location:</p>
                                  <TextField
                                    value={suburb}
                                    required
                                    onChange={(event) =>
                                      setSuburb(event.target.value)
                                    }
                                    id="create-event-venue-suburb"
                                    placeholder="Enter the suburb of the venue"
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                              <CreateEventMap
                                lat={lat}
                                lng={lng}
                                key={mapKey}
                              />
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid
                                  container
                                  item
                                  xs={6}
                                  direction="column"
                                  sx={{ height: "300px" }}
                                >
                                  <Grid container item xs={1} direction="row">
                                    <p>Street Address</p>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={3}
                                    direction="column"
                                  >
                                    <TextField
                                      value={eventAddress1}
                                      required
                                      onChange={(event) =>
                                        setEventAddress1(event.target.value)
                                      }
                                      id="create-event-address1"
                                      placeholder="Address line 1"
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={3}
                                    direction="column"
                                  >
                                    <TextField
                                      value={eventCity}
                                      required
                                      onChange={(event) =>
                                        setEventCity(event.target.value)
                                      }
                                      id="create-event-city"
                                      placeholder="City"
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={3}
                                    direction="column"
                                  >
                                    <TextField
                                      value={eventCountry}
                                      required
                                      onChange={(event) =>
                                        setEventCountry(event.target.value)
                                      }
                                      id="create-event-country"
                                      placeholder="Country"
                                      variant="outlined"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={6}
                                  direction="column"
                                  sx={{ height: "300px" }}
                                >
                                  <Grid container item xs={1} direction="row">
                                    <p>&nbsp;</p>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={3}
                                    direction="column"
                                  >
                                    <TextField
                                      value={eventAddress2}
                                      required
                                      onChange={(event) =>
                                        setEventAddress2(event.target.value)
                                      }
                                      id="create-event-address2"
                                      placeholder="Address line 2"
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid container item xs={3} direction="row">
                                    <Grid
                                      container
                                      item
                                      xs={5}
                                      direction="column"
                                    >
                                      <TextField
                                        value={eventState}
                                        required
                                        onChange={(event) =>
                                          setEventState(event.target.value)
                                        }
                                        id="create-event-state"
                                        placeholder="State or territory"
                                        variant="outlined"
                                      />
                                    </Grid>
                                    <Grid
                                      container
                                      item
                                      xs={2}
                                      direction="column"
                                    />
                                    <Grid
                                      container
                                      item
                                      xs={5}
                                      direction="column"
                                    >
                                      <TextField
                                        value={eventPostCode}
                                        required
                                        onChange={(event) =>
                                          setEventPostCode(event.target.value)
                                        }
                                        id="create-event-postcode"
                                        placeholder="Postcode"
                                        variant="outlined"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
                  );
                } else if (activeStep === 3) {
                  return (
                    <>
                      {/* PAGE 4 - DATE AND TIME */}
                      <h2>Date and Time</h2>
                      <div className="create-event-date-time">
                        <Box alignItems="center" justifyContent="center">
                          <form>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid
                                  container
                                  item
                                  xs={6}
                                  direction="column"
                                  components={["DatePicker"]}
                                  fullWidth
                                >
                                  <p>Event start date:</p>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      id="start-date-field-create-event"
                                      className="search-form-els"
                                      placeholder="Event Start Date"
                                      value={
                                        eventStartDate
                                          ? dayjs(eventStartDate)
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        setEventStartDate(
                                          new Date(Date.parse(newValue))
                                        )
                                      }
                                      slots={{
                                        openPickerIcon:
                                          ArrowDropDownOutlinedIcon,
                                      }}
                                      slotProps={{
                                        textField: {
                                          placeholder: "Select a starting date",
                                          InputProps: {
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <CalendarMonthIcon color="primary" />
                                              </InputAdornment>
                                            ),
                                          },
                                        },
                                      }}
                                    />
                                  </LocalizationProvider>
                                  <p>Event end date:</p>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      id="start-date-field-create-event"
                                      className="search-form-els"
                                      placeholder="Event End Date"
                                      value={
                                        eventEndDate
                                          ? dayjs(eventEndDate)
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        setEventEndDate(
                                          new Date(Date.parse(newValue))
                                        )
                                      }
                                      slots={{
                                        openPickerIcon:
                                          ArrowDropDownOutlinedIcon,
                                      }}
                                      slotProps={{
                                        textField: {
                                          placeholder: "Select an ending date",
                                          InputProps: {
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <CalendarMonthIcon color="primary" />
                                              </InputAdornment>
                                            ),
                                          },
                                        },
                                      }}
                                    />
                                  </LocalizationProvider>
                                  <p>Time Zone:</p>
                                  <Select
                                    value={eventTimezone}
                                    sx={{ color: "#4B7CBE" }}
                                    id="create-event-time-zone"
                                    placeholder="Timezone"
                                    onChange={(event) =>
                                      setEventTimezone(event.target.value)
                                    }
                                  >
                                    {timezones.map((time, i) => (
                                      <MenuItem value={time.value}>
                                        {time.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Event start time:</p>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <TimePicker
                                      value={
                                        eventStartTime
                                          ? dayjs(eventStartTime)
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        setEventStartTime(
                                          new Date(Date.parse(newValue))
                                        )
                                      }
                                      viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                      }}
                                      slotProps={{
                                        textField: {
                                          placeholder: "Select a starting time",
                                        },
                                      }}
                                    />
                                  </LocalizationProvider>
                                  <p>Event end time:</p>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <TimePicker
                                      value={
                                        eventEndTime
                                          ? dayjs(eventEndTime)
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        setEventEndTime(
                                          new Date(Date.parse(newValue))
                                        )
                                      }
                                      viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                      }}
                                      slotProps={{
                                        textField: {
                                          placeholder: "Select an ending time",
                                        },
                                      }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
                  );
                } else if (activeStep === 4) {
                  return (
                    <>
                      {/* PAGE 5 - PRICING */}
                      <h2>Pricing</h2>
                      <div className="create-event-pricing">
                        <Box alignItems="center" justifyContent="center">
                          <form>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid
                                  container
                                  spacing={1}
                                  item
                                  s={6}
                                  paddingBottom="15px"
                                  direction="row"
                                >
                                  <Checkbox
                                    checked={eventFree}
                                    onChange={handleChecked}
                                    name="eventFree"
                                    label="Free"
                                    inputProps={{
                                      "aria-label": "controlled",
                                    }}
                                  />
                                  <p>Free</p>{" "}
                                  <Checkbox
                                    checked={eventPaid}
                                    onChange={handleChecked}
                                    name="eventPaid"
                                    label="paid"
                                    inputProps={{
                                      "aria-label": "controlled",
                                    }}
                                  />
                                  <p>Paid</p>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket type:
                                  </p>
                                  <TextField
                                    value={eventTierName1}
                                    required
                                    id="create-event-ticket-tier1"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                    inputProps={{ readonly: true }}
                                    disabled={eventFree}
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket price:
                                  </p>
                                  <TextField
                                    variant="outlined"
                                    value={parseFloat(eventPrice1).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice1(event.target.value)
                                    }
                                    id="create-event-ticket-price1"
                                    disabled={eventFree}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={12}
                                  direction="row"
                                  className="fab-container-tickets"
                                >
                                  <Fab
                                    className="add-ticket-fab-disabled"
                                    id="add-ticket-1"
                                    aria-label="Add"
                                    disabled={true}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className="remove-ticket-fab-disabled"
                                    id="remove-ticket-1"
                                    aria-label="Remove"
                                    disabled={true}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket2 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket type:
                                  </p>
                                  <TextField
                                    value={eventTierName2}
                                    required
                                    onChange={(event) => {
                                      setEventTierName2(event.target.value);
                                      setEventTierID2("");
                                    }}
                                    id="create-event-ticker-tier2"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                    disabled={eventFree || !enableTicket2}
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket2 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket price:
                                  </p>
                                  <TextField
                                    variant="outlined"
                                    value={parseFloat(eventPrice2).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice2(event.target.value)
                                    }
                                    id="create-event-ticket-price2"
                                    disabled={eventFree || !enableTicket2}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={12}
                                  direction="row"
                                  className="fab-container-tickets"
                                >
                                  <Fab
                                    className={
                                      !(eventFree || enableTicket2)
                                        ? "add-ticket-fab"
                                        : "add-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable2}
                                    id="add-ticket-2"
                                    aria-label="Add"
                                    disabled={eventFree || enableTicket2}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableTicket2 ||
                                      (!eventFree && enableTicket2)
                                        ? "remove-ticket-fab"
                                        : "remove-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable2}
                                    id="remove-ticket-2"
                                    aria-label="Remove"
                                    disabled={eventFree || !enableTicket2}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket3 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket type:
                                  </p>
                                  <TextField
                                    value={eventTierName3}
                                    required
                                    onChange={(event) => {
                                      setEventTierName3(event.target.value);
                                      setEventTierID3("");
                                    }}
                                    id="create-event-ticket-tier3"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                    disabled={eventFree || !enableTicket3}
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket3 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket price:
                                  </p>
                                  <TextField
                                    variant="outlined"
                                    value={parseFloat(eventPrice3).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice3(event.target.value)
                                    }
                                    id="create-event-ticket-price3"
                                    disabled={eventFree || !enableTicket3}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={12}
                                  direction="row"
                                  className="fab-container-tickets"
                                >
                                  <Fab
                                    className={
                                      !(eventFree || enableTicket3)
                                        ? "add-ticket-fab"
                                        : "add-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable3}
                                    id="add-ticket-3"
                                    aria-label="Add"
                                    disabled={eventFree || enableTicket3}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableTicket3 ||
                                      (!eventFree && enableTicket3)
                                        ? "remove-ticket-fab"
                                        : "remove-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable3}
                                    id="remove-ticket-3"
                                    aria-label="Remove"
                                    disabled={eventFree || !enableTicket3}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket4 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket type:
                                  </p>
                                  <TextField
                                    value={eventTierName4}
                                    required
                                    onChange={(event) => {
                                      setEventTierName4(event.target.value);
                                      setEventTierID4("");
                                    }}
                                    id="create-event-ticket-tier4"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                    disabled={eventFree || !enableTicket4}
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p
                                    className={
                                      enableTicket4 || !eventFree
                                        ? "form-label-active"
                                        : "form-label-disabled"
                                    }
                                  >
                                    Ticket price:
                                  </p>
                                  <TextField
                                    variant="outlined"
                                    value={eventPrice4}
                                    onChange={(event) =>
                                      setEventPrice4(event.target.value)
                                    }
                                    id="create-event-ticket-price4"
                                    disabled={eventFree || !enableTicket4}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  item
                                  xs={12}
                                  direction="row"
                                  className="fab-container-tickets"
                                >
                                  <Fab
                                    className={
                                      !(eventFree || enableTicket4)
                                        ? "add-ticket-fab"
                                        : "add-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable4}
                                    id="add-ticket-4"
                                    aria-label="Add"
                                    disabled={eventFree || enableTicket4}
                                  >
                                    <AddIcon />
                                  </Fab>
                                  <Fab
                                    className={
                                      enableTicket4 ||
                                      (!eventFree && enableTicket4)
                                        ? "remove-ticket-fab"
                                        : "remove-ticket-fab-disabled"
                                    }
                                    onClick={handleTicketDisable4}
                                    id="remove-ticket-4"
                                    aria-label="Remove"
                                    disabled={eventFree || !enableTicket4}
                                  >
                                    <RemoveIcon />
                                  </Fab>
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
                  );
                } else if (activeStep === 5) {
                  return (
                    <>
                      {/* PAGE 6 - EVENT MEDIA */}
                      <h2>Event media</h2>
                      <div className="create-event-media">
                        <Box alignItems="center" justifyContent="center">
                          <form>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid
                                  container
                                  spacing={1}
                                  item
                                  s={6}
                                  paddingBottom="15px"
                                  direction="row"
                                >
                                  {!selectedImage && (
                                    <div className="create-ev-img-box">
                                      {" "}
                                      <label>
                                        <input
                                          id="create-ev-img-input"
                                          accept="image/*"
                                          type="file"
                                          onChange={imageChange}
                                        />
                                        <Link color="#f58146">
                                          Upload image
                                        </Link>
                                      </label>
                                    </div>
                                  )}
                                  {selectedImage && (
                                    <>
                                      <div className="create-ev-img-box">
                                        <img
                                          src={
                                            newImg
                                              ? URL.createObjectURL(
                                                  selectedImage
                                                )
                                              : selectedImage
                                          }
                                          onerror="this.onerror=null"
                                          alt="Thumb"
                                          className="preview-image"
                                        />
                                      </div>
                                      <div id="remove-img-box">
                                        <Link
                                          color="#f58146"
                                          onClick={removeSelectedImage}
                                        >
                                          Remove This Image
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </FormControl>
                          </form>
                        </Box>
                      </div>
                    </>
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
