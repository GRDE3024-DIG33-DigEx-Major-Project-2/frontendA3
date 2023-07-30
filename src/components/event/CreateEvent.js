import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  TextField,
  InputAdornment,
  MobileStepper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { Suspense } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Checkbox } from "@mui/material";
import { getAllTags, getAustralianTimezones } from "../../utils/utils";
import { Link } from "@mui/material";
import CreateEventMap from "../mapbox/CreateEventMap";
import { forwardGeocoding } from "../../services/Geocoding";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

function CreateEvent() {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    eventFree: false,
    eventPaid: false,
  });

  const navigate = useNavigate();

  //** FIRST SCREEN - BASIC INFO **//
  const [eventName, setEventName] = useState("");
  const [eventOrganiser, setEventOrganiser] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [eventURL, setEventURL] = useState("");
  // ** SECOND SCREEN - ARTISTS AND SUMMARY ** //
  const [artistName, setArtistName] = useState("");
  const [artistName2, setArtistName2] = useState("");
  const [artistName3, setArtistName3] = useState("");
  const [artistName4, setArtistName4] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  // ** THIRD SCREEN - LOCATION ** //
  const [venueName, setVenueName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [eventAddress1, setEventAddress1] = useState("");
  const [eventAddress2, setEventAddress2] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventPostCode, setEventPostCode] = useState("");
  const [lat, setLat] = useState(-33.86);
  const [lng, setLng] = useState(151.2);
  const [mapKey, setMapKey] = useState(1);
  // ** FOURTH SCREEN - DATE AND TIME ** //
  const timezones = getAustralianTimezones();
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const [eventTimezone, setEventTimezone] = useState("AEST");
  // ** FIFTH SCREEN - PRICE **//
  const { eventFree, eventPaid } = state;
  const eventTierName1 = "General Admission";
  const [eventPrice1, setEventPrice1] = useState(parseFloat(0.0).toFixed(2));
  const [eventTierName2, setEventTierName2] = useState("");
  const [eventPrice2, setEventPrice2] = useState(parseFloat(0.0).toFixed(2));
  const [eventTierName3, setEventTierName3] = useState("");
  const [eventPrice3, setEventPrice3] = useState(parseFloat(0.0).toFixed(2));
  // ** SIXTH SCREEN - MEDIA **//
  const [selectedImage, setSelectedImage] = useState();

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
      console.log("HI", result[0], result[1]);
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

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitEvent = () => {
    navigate("/dashboard");
    console.log(
      eventName,
      eventOrganiser,
      description,
      tags,
      artistName,
      eventSummary,
      eventURL
    );
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    console.log(eventName, eventOrganiser, description, tags);
  };

  const deleteEvent = () => {
    navigate("/dashboard");
  };

  const saveExit = () => {
    navigate("/dashboard");
  };

  const arrayDataItems = availableTags.map((tag) => (
    <span className="event-tag">{tag.name}</span>
  ));

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleChecked = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
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
        {activeStep === 6 ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <h2>Event preview</h2>
              <div className="Event">
                <img
                  className="event-main-image"
                  alt="eventimage"
                  src={URL.createObjectURL(selectedImage)}
                ></img>
                <div className="event-body">
                  <div className="event-columns">
                    <div className="event-column-title">
                      <h1 className="event-title">{eventName}</h1>
                    </div>
                    <div className="event-column-button">
                      <button className="event-buy-button">Buy Tickets</button>
                    </div>
                    <div className="event-column-title">
                      <h2 className="event-title">When and where</h2>
                      <div className="event-columns-details">
                        <div className="event-column-detail">
                          <h4>Date & Time</h4>
                          <p>
                            {eventStartDate} - {eventEndDate}
                          </p>
                          <p>
                            {eventStartTime} - {eventEndTime}
                          </p>
                        </div>
                        <div className="event-column-detail">
                          <h4>Location</h4>
                          <p>
                            {eventAddress1}, {eventCity}, {eventCountry},{" "}
                            {eventPostCode}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="event-column-button">
                      <h2>Organised By</h2>
                      <div className="event-columns-details">
                        <div className="event-column-detail">
                          <img
                            className="event-logo"
                            src="https://www.frontiertouring.com/files/web_images/logo-frontier_footer.png"
                            alt="artist"
                          ></img>
                        </div>
                        <div className="event-column-detail">
                          <p>{eventOrganiser}</p>
                        </div>
                      </div>
                    </div>
                    <p>&nbsp;</p>
                    <div>
                      <h2>About this event</h2>
                      <p>{eventSummary}</p>
                    </div>
                    <div>
                      <h3>Tags</h3>
                      {arrayDataItems}
                    </div>
                  </div>
                  <p>&nbsp;</p>
                  <div className="event-columns">
                    <div className="event-column-title">
                      <h1 className="event-title">&nbsp;</h1>
                    </div>
                    <div className="event-column-button">
                      <button className="event-buy-button">Buy Tickets</button>
                    </div>
                  </div>
                </div>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </div>
            </Typography>
            <>
              <event>
                <Suspense fallback={<div>Loading...</div>}></Suspense>
              </event>
            </>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Edit</Button>
              <Button onClick={submitEvent}>Publish</Button>
            </Box>
          </>
        ) : (
          <>
            <div id="create-event-screen">
              {(() => {
                // FIRST SCREEN - BASIC INFO
                if (activeStep === 0) {
                  return (
                    <>
                      <h2>Basic Information</h2>
                      <div className="basic-information">
                        <Box alignItems="center" justifyContent="center">
                          <form onSubmit={signupHandler}>
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
                                            label={value}
                                          />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {availableTags.map((tag) => (
                                      <MenuItem key={tag.id} value={tag.name}>
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
                          <form onSubmit={signupHandler}>
                            <FormControl fullWidth>
                              <Grid container spacing={2} paddingBottom="15px">
                                <Grid container item xs={5} direction="column">
                                  <p>Artist name:</p>
                                  <TextField
                                    fullWidth
                                    value={artistName}
                                    required
                                    onChange={(event) =>
                                      setArtistName(event.target.value)
                                    }
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
                                    className="add-artist-fab"
                                    id="add-artist-1"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-artist-fab"
                                    id="remove-artist-1"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p>Artist name:</p>
                                  <TextField
                                    fullWidth
                                    value={artistName2}
                                    required
                                    onChange={(event) =>
                                      setArtistName2(event.target.value)
                                    }
                                    id="create-event-an2"
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
                                    className="add-artist-fab"
                                    id="add-artist-2"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-artist-fab"
                                    id="remove-artist-2"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p>Artist name:</p>
                                  <TextField
                                    fullWidth
                                    value={artistName3}
                                    required
                                    onChange={(event) =>
                                      setArtistName3(event.target.value)
                                    }
                                    id="create-event-an3"
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
                                    className="add-artist-fab"
                                    id="add-artist-3"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-artist-fab"
                                    id="remove-artist-3"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={5} direction="column">
                                  <p>Artist name:</p>
                                  <TextField
                                    fullWidth
                                    value={artistName4}
                                    required
                                    onChange={(event) =>
                                      setArtistName4(event.target.value)
                                    }
                                    id="create-event-an4"
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
                                    className="add-artist-fab"
                                    id="add-artist-4"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-artist-fab"
                                    id="remove-artist-4"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
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
                          <form
                            onSubmit={signupHandler}
                            className="create-event-location-box"
                          >
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
                          <form onSubmit={signupHandler}>
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
                                      value={eventStartDate}
                                      onChange={(newValue) =>
                                        setEventStartDate(newValue)
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
                                      value={eventEndDate}
                                      onChange={(newValue) =>
                                        setEventEndDate(newValue)
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
                                      value={eventStartTime}
                                      onChange={(newValue) =>
                                        setEventStartTime(newValue)
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
                                      value={eventEndTime}
                                      onChange={(newValue) =>
                                        setEventEndTime(newValue)
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
                          <form onSubmit={signupHandler}>
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
                                  <p>Ticket type:</p>
                                  <TextField
                                    value={eventTierName1}
                                    required
                                    id="create-event-ticker-tier1"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                    inputProps={{ readonly: true }}
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Ticket price:</p>
                                  <OutlinedInput
                                    type="money"
                                    value={parseFloat(eventPrice1).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice1(event.target.value)
                                    }
                                    startAdornment={
                                      <InputAdornment position="start">
                                        AUD$
                                      </InputAdornment>
                                    }
                                    id="create-event-ticker-price1"
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
                                    className="add-ticket-fab"
                                    id="add-ticket-1"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-ticket-fab"
                                    id="remove-ticket-1"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Ticket type:</p>
                                  <TextField
                                    value={eventTierName2}
                                    required
                                    onChange={(event) =>
                                      setEventTierName2(event.target.value)
                                    }
                                    id="create-event-ticker-tier2"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Ticket price:</p>
                                  <OutlinedInput
                                    type="money"
                                    value={parseFloat(eventPrice2).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice2(event.target.value)
                                    }
                                    startAdornment={
                                      <InputAdornment position="start">
                                        AUD$
                                      </InputAdornment>
                                    }
                                    id="create-event-ticker-price2"
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
                                    className="add-ticket-fab"
                                    id="add-ticket-2"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-ticket-fab"
                                    id="remove-ticket-2"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Ticket type:</p>
                                  <TextField
                                    value={eventTierName3}
                                    required
                                    onChange={(event) =>
                                      setEventTierName3(event.target.value)
                                    }
                                    id="create-event-ticker-tier3"
                                    placeholder="Enter the ticket tier name"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid container item xs={6} direction="column">
                                  <p>Ticket price:</p>
                                  <OutlinedInput
                                    type="money"
                                    value={parseFloat(eventPrice3).toFixed(2)}
                                    onChange={(event) =>
                                      setEventPrice3(event.target.value)
                                    }
                                    startAdornment={
                                      <InputAdornment position="start">
                                        AUD$
                                      </InputAdornment>
                                    }
                                    id="create-event-ticker-price3"
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
                                    className="add-ticket-fab"
                                    id="add-ticket-3"
                                    aria-label="Add"
                                  >
                                    <AddIcon sx={{ color: "#f58146" }} />
                                  </Fab>
                                  <Fab
                                    className="remove-ticket-fab"
                                    id="remove-ticket-3"
                                    aria-label="Remove"
                                  >
                                    <RemoveIcon sx={{ color: "#f58146" }} />
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
                          <form onSubmit={signupHandler}>
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
                                          src={URL.createObjectURL(
                                            selectedImage
                                          )}
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
