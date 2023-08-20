/**
 * Location filter component
 */

//Import dependencies
import { MenuItem, Select, FormControl, Box } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import { useContext, useState, useEffect } from "react";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../../../props/search-events.prop";
import { capitaliseString, getSydneySuburbs } from "../../../../utils/utils";
import { reverseGeocodingPostcode } from "../../../../services/Geocoding";

const ByLocation = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [userLocation, setUserLocation] = useState(2001);
  const [suburbs, setSuburbs] = useState([]);

  // geolocation. User permission asked
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  function success(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  // Fetch user location based on the coordinates shared and find a list of suburbs for the given postcode
  useEffect(() => {
    const fetchLocation = async () => {
      const data = await reverseGeocodingPostcode(lat, lng);
      setUserLocation(data);
      fetchSuburbs(data);
    };

    const fetchSuburbs = async (userLocation) => {
      let surroundingSubs = await getSydneySuburbs(userLocation);
      let result = [];

      // if the suburbs are in NSW, proceed. Else, placeholder to 2000
      if (surroundingSubs) {
        if (surroundingSubs[0].StateShort === "NSW") {
          let intPC = parseInt(userLocation) - 3;
          let result = await getSydneySuburbs(intPC);
          intPC++;
          for (let i = 0; i < 5; i++) {
            console.log(intPC);
            let temp = await getSydneySuburbs(intPC);
            let search = temp;
            result = [...new Set([...result, ...temp])]
            intPC++;
          }
          console.log(result);
          setSuburbs(result);
        } else {
          let intPC = parseInt(2000);
          let result = await getSydneySuburbs(intPC);
          intPC = parseInt(2001);
          for (let i = 0; i < 5; i++) {
            let temp = await getSydneySuburbs(intPC);
            let search = temp;
            result = [...new Set([...result, ...temp])]

            intPC++;
          }
          console.log(result);
          setSuburbs(result);
        }
      }
      console.log(suburbs);
    };

    fetchLocation();
  }, [lat, lng, userLocation]);

  /**
   * Prop context for search event data
   */
  const { events, pageCount, tags } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const { change, location, chipData } = useContext(SearchEventFiltersContext);

  //The HTML template
  return (
    <FormControl id="location-field-search">
      <Select
        className="search-form-els"
        displayEmpty
        placeholder="My location"
        onChange={(event) => location.set(event.target.value)}
        renderValue={(value) => {
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <SvgIcon color="primary">
                <FmdGoodOutlinedIcon />
              </SvgIcon>
              {value ? value : "My Location"}
            </Box>
          );
        }}
      >
        {suburbs.length > 0 ? (
          suburbs.map(
            (sub, i) =>
              sub !== undefined && (
                <MenuItem key={i} value={capitaliseString(sub.Name)}>
                  {capitaliseString(sub.Name)}
                </MenuItem>
              )
          )
        ) : (
          <MenuItem selected value="Sydney">
            Sydney
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

//Export the ByLocation component
export default ByLocation;
