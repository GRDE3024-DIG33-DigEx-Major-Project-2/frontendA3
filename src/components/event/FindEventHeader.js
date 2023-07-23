/**
 * Main event search filter component that handles location, date, and keywords
 */


//Import dependencies
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect, useContext } from "react";
import {
  MenuItem,
  Select,
  Chip,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as dayjs from 'dayjs';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchEventFiltersContext, SearchEventsContext } from "../../props/search-events.prop";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../services/EventAPI";


/**
 * React component for main event filter UI
 * @returns 
 */
const FindEventHeader = () => {

  //Add in the search events context props
  const { events, setEvents, pageCount, setPageCount } = useContext(SearchEventsContext);
  //Search filter props
  const {
    location,
    date,
    tags,
    keywords,
    setLocation,
    setDate,
    setTags,
    setKeywords,
    today,
    paid,
    price,
    change,
    setPaid,
    setPrice,
    setChange,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    selectedTagIds,
    setSelectedTagIds,
  } = useContext(SearchEventFiltersContext);

  //React navigator
  const navigate = useNavigate();

  //Location specifier
  const spaLocation = useLocation();


  /**
   * Fetch api data on load
   */
  useEffect(() => {

    /**
     * Get all pre-defined tags/genres
     */
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    //Get tags
    fetchTags();
  }, [setTags]);

  /**
   * Search for first page of filtered events
   */
  const searchHandler = async (event) => {

    //Prevent default submit form behaviour
    event.preventDefault();

    //Format date for db storage
    let stringDate = dayjs(date.toISOString()).format("YYYY-MM-DD HH:mm:ss");

    console.log("Search event fired");
    console.log(selectedTagIds, keywords, stringDate, location, 0);

    //Make request for filtered events
    let searchResult = await searchEvents(selectedTagIds, keywords, stringDate, location, 0);

    console.log("After search result found");
    console.log(searchResult);
    console.log("Page Count: "+ pageCount);

    //Set state props of events and page count
    setEvents(searchResult.events);
    setPageCount(searchResult.pageCount);


    console.log(spaLocation.pathname);

    //Navigate to the event search component
    if (spaLocation.pathname != "/events")
    navigate("events");
    else
    navigate();
  };





  //The HTML template
  return (
    <div className="find-event-header">
      <h1 className="find-event-header-text">Find an event</h1>
      <form id="search-event-form" onSubmit={searchHandler}>
        <div className="find-event-search">
          <FormControl fullWidth>
            <InputLabel id="location-label"><FmdGoodOutlinedIcon /> My location</InputLabel>
            <Select
              className="search-form-els"
              labelId="location-label"
              label="My Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <MenuItem selected value="Sydney">Sydney</MenuItem>
              <MenuItem value="Balmain">Balmain</MenuItem>
              <MenuItem value="Surry Hills">Surry Hills</MenuItem>
              <MenuItem value="Parramatta">Parramatta</MenuItem>
              <MenuItem value="Marrickville">Marrickville</MenuItem>
              <MenuItem value="Lane Cove">Lane Cove</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            className="search-form-els"
            onChange={(startDate) => setDate(new Date(Date.parse(startDate)))}
          />
          <span>
            <TextField
              className="search-form-els"
              id="events-txt-field"
              variant="outlined"
              label="Search artists, venues or events"
              onChange={(keywords) => setKeywords(keywords.target.value)}
            ></TextField>
            <Button
              className="search-form-els"
              type="submit"
              variant="contained"
            >
              Search
            </Button>
          </span>
        </div>
      </form>
    </div>
  );
};

//Export the main event filter UI
export default FindEventHeader;
