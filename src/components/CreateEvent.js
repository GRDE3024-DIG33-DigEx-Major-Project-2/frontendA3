import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState, Component  } from "react";
import ReactDOM from 'react-dom/client';
import { useNavigate, Link } from "react-router-dom";
import { FormControl, TextField, InputAdornment, Hidden } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Input from '@mui/base/Input';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { Create, Height } from '@mui/icons-material';
import event from './EventPage.js';
import { Suspense } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';


const steps = ['Basic Information', 'Artists and Summary', 'Location', 'Date and Time', 'Pricing', 'Event Media'];


function CreateEvent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

        const [eventName, setEventName] = useState("");
        const [eventOrganiser, setEventOrganiser] = useState("");
        const [description, setDescription] = useState("");
        const [tags, setTags] = useState("");
        const [artistName, setArtistName] = useState("");
        const [artistName2, setArtistName2] = useState("");
        const [artistName3, setArtistName3] = useState("");
        const [artistName4, setArtistName4] = useState("");
        const [eventSummary, setEventSummary] = useState("");
        const [eventURL, setEventURL] = useState("");
        const [venueName, setVenueName] = useState("");
        const [venueOrganiser, setVenueOrganiser] = useState("");
        const [eventAddress1, setEventAddress1] = useState("");
        const [eventAddress2, setEventAddress2] = useState("");
        const [eventCity, setEventCity] = useState("");
        const [eventCountry, setEventCountry] = useState("");
        const [eventState, setEventState] = useState("");
        const [eventPostCode, setEventPostCode] = useState("");
        const [eventStartDate, setEventStartDate] = React.useState(null);
        const [eventEndDate, setEventEndDate] = React.useState(null);
        const [eventStartTime, setEventStartTime] = React.useState(null);
        const [eventEndTime, setEventEndTime] = React.useState(null);
        const [eventTimezone, setEventTimezone] = useState("");
        const [state, setState] = React.useState({
            eventFree: false,
            eventPaid: false,
          });
          const [eventTierName, setEventTierName] = useState("");
          const [eventPrice, setEventPrice] = useState("");
          const [selectedImage, setSelectedImage] = useState();

    const isStepOptional = (step) => {
        return step === '';
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = (e) => {
        if (activeStep === steps.length - 1 && !selectedImage){
    alert("Please upload an image to proceed");

            } else {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const navigate = useNavigate();

    const submitEvent = () => {
        navigate("/dashboard");
        console.log(eventName, eventOrganiser, description, tags, artistName, eventSummary, eventURL)
    }


        const signupHandler = async (event) => {
                event.preventDefault();
                console.log(eventName, eventOrganiser, description, tags);
            }

            const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const theme = useTheme();
const [personName, setPersonName] = React.useState([]);

const deleteEvent = () => {
    navigate("/dashboard");
}

const saveExit = () => {
    navigate("/dashboard");
}

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setPersonName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
  
};


const names = [
  'Pop',
  'Punk',
  'Country',
  'Electronic',
  '18+',
  'EDM',
  'Heavy Metal',
  'Indoors',
  'Outdoors',
  'Smoking Allowed',
];

const arrayDataItems = names.map((name) => <span className="event-tag">{name}</span>);


const imageChange = (e) => {
       if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const { eventFree, eventPaid } = state;
  
  
const handleChecked = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

  };



        return (
            <div>
            <h1 className="create-event-title">Create an event</h1>
            <Box className="create-event-header" sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <h2>Event preview</h2>
                            <div className="Event">

<img className="event-main-image" alt="eventimage" src={URL.createObjectURL(selectedImage)}></img>
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
                    <p>{eventStartDate} - {eventEndDate}</p>
                    <p>{eventStartTime} - {eventEndTime}</p>
                </div>
                <div className="event-column-detail">
                    <h4>Location</h4>
                    <p>{eventAddress1}, {eventCity}, {eventCountry}, {eventPostCode} </p>
                </div>
            </div>
        </div>
        <div className="event-column-button">
            <h2>Organised By</h2>
            <div className="event-columns-details">
                <div className="event-column-detail">
                    <img className="event-logo" src="https://www.frontiertouring.com/files/web_images/logo-frontier_footer.png" alt="artist"></img>
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
      <Suspense fallback={<div>Loading...</div>}>
      </Suspense>
    </event>
                        </>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Edit</Button>
                            <Button onClick={submitEvent}>Publish</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    
                        <div id="create-event-screen">
                            {
                                (() => {
                                    if (activeStep === 0) {
                                        return (
                                            <>
                                            <h2>Basic Information</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={2} paddingBottom="15px">
                                                                    <Grid container item xs={6} direction="column" >
                                                                        <TextField fullWidth
                                                                            value={eventName}
                                                                            required
                                                                            onChange={(event) => setEventName(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Event Name"
                                                                            variant="standard"
                                                                        /></Grid>
                                                                         <Grid container item xs={6} direction="column" >
                                                                        <TextField fullWidth
                                                                            value={eventOrganiser}
                                                                            required
                                                                            onChange={(event) => setEventOrganiser(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Organiser"
                                                                            variant="standard"
                                                                        /></Grid>
                                                                           <Grid container item l={12} direction="row" >
                                                                        <TextField fullWidth
                                                                            value={description}
                                                                            required
                                                                            onChange={(event) => setDescription(event.target.value)}
                        
                                                                            label="Description"
                                                                            multiline
                                                                            id="standard-multiline-static"
                                                                            variant="standard"
                                                                            rows={8}
                                                                        />
                                                                        
                                                                    </Grid>  <Grid container item xs={12} direction="column" >
                                                                    <Select fullWidth
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          label="Tags"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
                                                                    </Grid>
                                                                </Grid>
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else if (activeStep === 1) {
                                        return (
                                            <>
                                            <h2>Artists and summary</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={3} paddingBottom="15px">
                                                                    <Grid container item xs={5} direction="column" >
                                                                        <TextField fullWidth
                                                                            value={artistName}
                                                                            required
                                                                            onChange={(event) => setArtistName(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Artist Name"
                                                                            variant="standard"
                                                                            placeholder='add artists name'

                                                                        />                      <TextField fullWidth
                                                                        value={artistName2}
                                                                        required
                                                                        onChange={(event) => setArtistName2(event.target.value)}
                                                                        id="input-with-icon-textfield"
                                                                    
                                                                        className="Artist2"
                                                                        variant="standard"
                                                                    />  <TextField fullWidth
                                                                    value={artistName3}
                                                                    required
                                                                    onChange={(event) => setArtistName3(event.target.value)}
                                                                    id="input-with-icon-textfield"
                                                                    

                                                                    className="Artist3"
                                                                    variant="standard"
                                                                /> 
                                                                 <TextField fullWidth
                                                                value={artistName4}
                                                                required
                                                                onChange={(event) => setArtistName4(event.target.value)}
                                                                id="input-with-icon-textfield"
                                                                
                                                                variant="standard"
                                                                className="Artist4"
                                                            /> </Grid>
                                                                         <Grid container item xs={1} direction="column" >
                                                                            <Fab size="small" id="add-artist-1" color="primary" aria-label="add">
                                                                        <AddIcon />
                                                                      </Fab>
                                                                      <div className="">
                                                                      <Fab size="small" id="add-artist-2"  color="primary" aria-label="Add">
                                                                        <AddIcon />
                                                                      </Fab>
                                                                      <Fab size="small"  id="remove-artist-2" color="primary" aria-label="remove">
                                                                        <RemoveIcon />
                                                                      </Fab>
                                                                      </div>
                                                                      <div>
                                                                      <Fab size="small"  id="add-artist-3" color="primary" aria-label="Add">
                                                                        <AddIcon />
                                                                      </Fab>
                                                                      <Fab size="small"  id="remove-artist-3" color="primary" aria-label="remove">
                                                                        <RemoveIcon />
                                                                      </Fab>
                                                                      </div>

                            
                                                                       </Grid>
                                                                           <Grid container item xs={4} direction="row" >
                                                                           <TextField fullWidth
                                                                            value={eventSummary}
                                                                            required
                                                                            onChange={(event) => setEventSummary(event.target.value)}
                        
                                                                            label="Event summary"
                                                                            multiline
                                                                            id="standard-multiline-static"
                                                                            variant="standard"
                                                                            rows={12}
                                                                        />
                                    
                                                                            <TextField fullWidth sx={{ marginTop:10 }}
                                                                            value={eventURL}
                                                                            required
                                                                            onChange={(event) => setEventURL(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Ticket purchase URL"
                                                                            variant="standard"
                                                                        />
                                                                    </Grid>  
                                                                </Grid>
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else if (activeStep === 2) {
                                        return (
                                            <>
                                            <h2>Location</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={2} paddingBottom="15px">
                                                                    <Grid container item xs={6} direction="column" >
                                                                        <TextField fullWidth
                                                                            value={venueName}
                                                                            required
                                                                            onChange={(event) => setVenueName(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Venue Name"
                                                                            variant="standard"
                                                                        /></Grid>
                                                                         <Grid container item xs={6} direction="column" >
                                                                        <TextField fullWidth
                                                                            value={venueOrganiser}
                                                                            required
                                                                            onChange={(event) => setVenueOrganiser(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Organiser"
                                                                            variant="standard"
                                                                        /></Grid>
                                                                        
                                             <Grid container item xs={6} direction="column" >
                                             <Grid container item l={48} direction="row" >
                                             <h5>Street Address</h5>
                                                                    </Grid> 
                                        
                                                                       
                                                                        <TextField fullWidth
                                                                            value={eventAddress1}
                                                                            required
                                                                            onChange={(event) => setEventAddress1(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Address 1"
                                                                            variant="standard"
                                                                        />
                                                                               <TextField fullWidth
                                                                            value={eventCity}
                                                                            required
                                                                            onChange={(event) => setEventCity(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="City"
                                                                            variant="standard"
                                                                        />
                                                                               <TextField fullWidth
                                                                            value={eventCountry}
                                                                            required
                                                                            onChange={(event) => setEventCountry(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Country"
                                                                            variant="standard"
                                                                        />
                                                                        
                                                                        
                                                                        
                                                                        </Grid>
                                                                         <Grid container item xs={6} direction="column" >
                                                                         <Grid container item l={48} direction="row" >
                                             <h5>&nbsp;</h5>
                                                                    </Grid> 
                                        
                                                                        <TextField fullWidth
                                                                            value={eventAddress2}
                                                                            required
                                                                            onChange={(event) => setEventAddress2(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Address 2"
                                                                            variant="standard"
                                                                        />
                                                                       <Grid container item s={2} direction="row" >
                                                                                                                            <TextField 
                                                                            value={eventState}
                                                                            required
                                                                            onChange={(event) => setEventState(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="State"
                                                                            variant="standard"
                                                                        /> <p>&nbsp;</p>
                                                                                                                            <TextField 
                                                                            value={eventPostCode}
                                                                            required
                                                                            onChange={(event) => setEventPostCode(event.target.value)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Post Code"
                                                                            variant="standard"
                                                                        />
                                                                       </Grid>
                                                                        
                                                                        </Grid>
            
                                                                </Grid>
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else if (activeStep === 3) {
                                        return (
                                            
                                            <>
                                            
                                            <h2>Date and Time</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={2} paddingBottom="15px">
                                                                    <Grid container item xs={6} direction="column"components={['DatePicker']} fullWidth>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                 
                                                                        <DatePicker fullWidth
                                                                   value={eventStartDate}
                                                                   onChange={(newValue) => setEventStartDate(newValue)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Event Start Date"
                                                                            variant="standard"
                                                                            type="date"
                                                                        />     
                                                                            </LocalizationProvider>
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    
                                                                        <DatePicker fullWidth
                                                                           value={eventEndDate}
                                                                           onChange={(newValue) => setEventEndDate(newValue)}
                                                                            id="input-with-icon-textfield"
                                                                            label="Event End Date"
                                                                            variant="standard"
                                                                            type="date"
                                                                        />
                                                                        </LocalizationProvider>
                                                                      

  <Select
    labelId="demo-simple-select-label"
    value={eventTimezone}
    id="demo-simple-select"

    label="Timezone"
    onChange={(event) => setEventTimezone(event.target.value)}
  >
    <MenuItem value={'AEST'}>AEST</MenuItem>
    <MenuItem value={'UTC'}>UTC</MenuItem>
    <MenuItem value={'GMT'}>GMT</MenuItem>
  </Select>
                                                                        
                                                                        </Grid>

                                                                         <Grid container item xs={6} direction="column">
                                                                         
                                                                
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="With Time Clock"
         
          defaultValue={dayjs('2022-04-17T15:30')}
          value={eventStartTime} onChange={(newValue) => setEventStartTime(newValue)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="With Time Clock"
          value={eventEndTime} onChange={(newValue) => setEventEndTime(newValue)}
          defaultValue={dayjs('2022-04-17T19:30')}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>

                                                                        </Grid>
                                                                        
            
                                                                </Grid>
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else if (activeStep === 4) {
                                        return (
                                            <>
                                            <h2>Pricing</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={2} paddingBottom="15px">
                                                                <Grid container spacing={1} item s={6} paddingBottom="15px" direction="row">
                                                                <p>Free</p>  <Checkbox
   checked={eventFree} onChange={handleChecked} name="eventFree" label="Free"
      inputProps={{ 'aria-label': 'controlled' }}
    />
  <p>Paid</p>
      <Checkbox
       checked={eventPaid} onChange={handleChecked} name="eventPaid" label="paid"
        inputProps={{ 'aria-label': 'controlled' }}
      /></Grid>
                                                                    <Grid container item xs={6} direction="column" >
                        

                
                                                                       
  <Select
    labelId="demo-simple-select-label"
    value={eventTierName}
    id="demo-simple-select"

    label="Tier name"
    onChange={(event) => setEventTierName(event.target.value)}
  >
    <MenuItem value={'General'}>General Admission</MenuItem>
    <MenuItem value={'VIP'}>VIP</MenuItem>
    <MenuItem value={'Gold'}>Gold Package</MenuItem>
  </Select>   

 </Grid>
                                                                         <Grid container item xs={6} direction="column" >
                                                                
                                                                    
                                                                       
  <OutlinedInput
          
          label="Price"
          type="number"
          value={eventPrice}
          onChange={(event) => setEventPrice(event.target.value)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          id="outlined-adornment-amount"
        
        /></Grid>
                                                                                
                                                                </Grid>
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else if (activeStep === 5) {
                                        return (
                                            <>
                                            <h2>Upload Media</h2>
                                                <div className="">
                                                    <Box
    
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <form onSubmit={signupHandler}>
                                                            <FormControl fullWidth>
                                                                <Grid container spacing={2} paddingBottom="15px">
                                                                <Grid container spacing={1} item s={6} paddingBottom="15px" direction="row">
                                                                <div> <input
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
          {selectedImage && (
          <div>
            <img
              src={URL.createObjectURL(selectedImage)}
              onerror="this.onerror=null"
              alt="Thumb"
              className="preview-image"
            />
            <Button onClick={removeSelectedImage}>
              Remove This Image
            </Button>
          </div>
        )}
      </div></Grid>
   
      </Grid>  
                                                            </FormControl>
                                                        </form>
                                                    </Box>
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <p>Form error.. trying reloading the page</p>
                                        )
                                    }
                                })()
                            }
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                
                            >
                                Back
                            </Button>
                            <Button onClick={deleteEvent}>
                                Discard Event
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                             <Button onClick={saveExit}>
                                Save & Exit
                            </Button>
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Save & Preview' : 'Save & Continue'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            </div>
        );
    }

    export default CreateEvent;
