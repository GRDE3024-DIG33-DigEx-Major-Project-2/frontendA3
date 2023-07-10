import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import { useNavigate, Link } from "react-router-dom";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { Create } from '@mui/icons-material';
import event from './EventPage.js';
import { Suspense } from 'react';


const steps = ['Basic Information', 'Artists and Summary', 'Location', 'Date and Time', 'Pricing', 'Event Media'];


function CreateEvent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

        const [eventName, setEventName] = useState("");
        const [eventOrganiser, setEventOrganiser] = useState("");
        const [description, setDescription] = useState("");
        const [tags, setTags] = useState("");
   

    const isStepOptional = (step) => {
        return step === '';
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
        console.log(eventName, eventOrganiser)
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
        
        return (
            <div>
            <h1>Create an event</h1>
            <Box class="create-event-header" sx={{ width: '100%' }}>
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
                                           <p>page 2</p>
                                        )
                                    } else if (activeStep === 2) {
                                        return (
                                            <p>Hello 3</p>
                                        )
                                    } else if (activeStep === 3) {
                                        return (
                                            <p>Hello 4</p>
                                        )
                                    } else if (activeStep === 4) {
                                        return (
                                            <p>Hello 5</p>
                                        )
                                    } else if (activeStep === 5) {
                                        return (
                                            <p>Hello 6</p>
                                        )
                                    } else {
                                        return (
                                            <p>Bye</p>
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
