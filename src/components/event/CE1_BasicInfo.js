import {
  Box,
  FormControl,
  Grid,
  TextField,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllTags } from "../../services/EventAPI";

const BasicInfo = (props) => {
  const [availableTags, setAvailableTags] = useState([]);
  // select tags handler
  const selectTags = (event) => {
    const {
      target: { value },
    } = event;
    props.setTags(typeof value === "string" ? value.split(",") : value);
    console.log(props.tags);
  };
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
                    value={props.eventName}
                    required
                    onChange={(event) => props.setEventName(event.target.value)}
                    id="create-event-name"
                    placeholder="Enter the event name"
                    variant="outlined"
                    error={props.nameError && props.eventName === ""}
                    helperText={
                      props.nameError && props.eventName === ""
                        ? "An event name is required to continue"
                        : null
                    }
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p>Event Organiser:</p>
                  <TextField
                    fullWidth
                    value={props.eventOrganiser}
                    InputProps={{
                      readOnly: true,
                    }}
                    id="create-event-organiser"
                    placeholder="Enter the event organiser"
                    variant="outlined"
                  />
                </Grid>
                <Grid container item l={12} direction="row">
                  <p>Event description:</p>
                  <TextField
                    fullWidth
                    value={props.description}
                    required
                    onChange={(event) =>
                      props.setDescription(event.target.value)
                    }
                    placeholder="Enter a description for the event"
                    multiline
                    id="create-event-description"
                    variant="outlined"
                    rows={8}
                    error={props.descriptionError && props.description === ""}
                    helperText={
                      props.descriptionError && props.description === ""
                        ? "A description is required to continue"
                        : null
                    }
                  />
                </Grid>{" "}
                <Grid container item xs={12} direction="column">
                  <p>Keywords</p>
                  <Select
                    fullWidth
                    id="create-event-multiple-tags"
                    multiple
                    value={props.tags}
                    onChange={selectTags}
                    input={<OutlinedInput id="select-multiple-chip" />}
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
                      <MenuItem key={tag.id} value={tag.name + "," + tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p>Event purchase URL:</p>
                  <TextField
                    fullWidth
                    value={props.eventURL}
                    required
                    onChange={(event) => props.setEventURL(event.target.value)}
                    placeholder="Enter a URL for ticket purchasing"
                    id="create-event-eventURL"
                    variant="outlined"
                    error={props.urlError && props.eventURL === ""}
                    helperText={
                      props.urlError && props.eventURL === ""
                        ? "An event URL is required to continue"
                        : null
                    }
                  />
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </div>
    </>
  );
};

export default BasicInfo;
