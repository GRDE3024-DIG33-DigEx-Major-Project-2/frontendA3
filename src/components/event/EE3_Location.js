import { Box, FormControl, Grid, TextField } from "@mui/material";
import CreateEventMap from "../mapbox/CreateEventMap";
import { forwardGeocoding } from "../../services/Geocoding";
import { useState, useEffect } from "react";

const EditLocation = (props) => {

  const [lat, setLat] = useState(-33.86);
  const [lng, setLng] = useState(151.2);
  const [mapKey, setMapKey] = useState(1);

  useEffect(() => {
    /** Update map location as address is typed in*/
    async function fetchCoordinates() {
      let address =
        props.eventAddress1 +
        props.eventAddress2 +
        "," +
        props.suburb +
        "," +
        props.eventCity +
        "," +
        props.eventState +
        "," +
        props.eventPostCode;
      if (props.suburb !== "") {
        address += "," + props.suburb;
      }
      if (props.eventCity !== "") {
        address += "," + props.eventCity;
      }
      if (props.eventState !== "") {
        address += "," + props.eventState;
      }
      if (props.eventPostCode !== "") {
        address += "," + props.eventPostCode;
      }
      if (props.eventCountry !== "") {
        address += "," + props.eventCountry;
      }

      let result = await forwardGeocoding(address);
      setLat(result[0]);
      setLng(result[1]);
      setMapKey(result[0] + result[1]);
    }

    fetchCoordinates();
  }, [props.eventState, props.eventPostCode]);

  return (
    <>
      <h2>Location</h2>
      <div className="create-event-location-div">
        <Box alignItems="center" justifyContent="center">
          <form className="create-event-location-box">
            <FormControl fullWidth>
              <Grid container spacing={2} paddingBottom="15px">
                <Grid container item xs={6} direction="column">
                  <p>Venue name:</p>
                  <TextField
                    value={props.venueName}
                    required
                    onChange={(event) => props.setVenueName(event.target.value)}
                    id="create-event-venue-name"
                    placeholder="Enter the name of the venue"
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p>Venue location:</p>
                  <TextField
                    value={props.suburb}
                    required
                    onChange={(event) => props.setSuburb(event.target.value)}
                    id="create-event-venue-suburb"
                    placeholder="Enter the suburb of the venue"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <CreateEventMap lat={lat} lng={lng} key={mapKey} />
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
                  <Grid container item xs={3} direction="column">
                    <TextField
                      value={props.eventAddress1}
                      required
                      onChange={(event) => props.setEventAddress1(event.target.value)}
                      id="create-event-address1"
                      placeholder="Address line 1"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container item xs={3} direction="column">
                    <TextField
                      value={props.eventCity}
                      required
                      onChange={(event) => props.setEventCity(event.target.value)}
                      id="create-event-city"
                      placeholder="City"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container item xs={3} direction="column">
                    <TextField
                      value={props.eventCountry}
                      required
                      onChange={(event) => props.setEventCountry(event.target.value)}
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
                  <Grid container item xs={3} direction="column">
                    <TextField
                      value={props.eventAddress2}
                      required
                      onChange={(event) => props.setEventAddress2(event.target.value)}
                      id="create-event-address2"
                      placeholder="Address line 2"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container item xs={3} direction="row">
                    <Grid container item xs={5} direction="column">
                      <TextField
                        value={props.eventState}
                        required
                        onChange={(event) => props.setEventState(event.target.value)}
                        id="create-event-state"
                        placeholder="State or territory"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid container item xs={2} direction="column" />
                    <Grid container item xs={5} direction="column">
                      <TextField
                        value={props.eventPostCode}
                        required
                        onChange={(event) =>
                          props.setEventPostCode(event.target.value)
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
};

export default EditLocation;
