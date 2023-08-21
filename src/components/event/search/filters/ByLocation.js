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
import { capitaliseString, getAllSuburbs} from "../../../../utils/utils";


const ByLocation = () => {
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  // const [userLocation, setUserLocation] = useState(2001);
  const [suburbs, setSuburbs] = useState(getAllSuburbs());

  // geolocation. User permission asked
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(success, error);
  // } else {
  //   console.log("Geolocation not supported");
  // }
  // function success(position) {
  //   setLat(position.coords.latitude);
  //   setLng(position.coords.longitude);
  // }
  // function error() {
  //   console.log("Unable to retrieve your location");
  // }



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
                <MenuItem key={i} value={sub}>
                  {sub}
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
