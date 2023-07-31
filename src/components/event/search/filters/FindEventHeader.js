/**
 * Main event search filter component that handles location, date, and keywords
 */


//Import dependencies
import { useEffect, useContext } from "react";
import {
  MenuItem,
  Select,
  Chip,
  TextField,
  Button,
  FormControl,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchEventFiltersContext, SearchEventsContext } from "../../../../props/search-events.prop";
//MUI imports
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../../../services/EventAPI";
//Import JSX components
import DateRangePicker from "./DateRangePicker";
import ByLocation from "./ByLocation";
import ByKeywords from "./ByKeywords";
import {HeaderSelectedTags} from "./TagSelection";


/**
 * React component for main event filter UI
 * @returns 
 */
const FindEventHeader = () => {

    /**
   * Prop context for search event data
   */
    const { 
      events, 
      pageCount,
      tags
    } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const {
    keywords,
    location,
    dateRange,
    priceRange,
    isFree,
    change,
    tagSelection,
    chipData,
    currPage
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
      const fetchedTags = await getAllTags();
      tags.set(fetchedTags);
    }

    //Get tags
    fetchTags();
  }, [tags.set]);

  /**
   * Search for first page of filtered events
   */
  const searchHandler = async (event) => {

    //Prevent default submit form behaviour
    event.preventDefault();

    console.log("Search event fired");
    console.log(tagSelection.get, keywords.get, dateRange.minDate.get, dateRange.maxDate.get, location.get, 0);

    //Make request for filtered events
    let searchResult = await searchEvents(
      tagSelection.get, 
      keywords, 
      dateRange.minDate.get,
      dateRange.maxDate.get, 
      location.get, 
      {minPrice: Number(priceRange.minPrice.get), 
        maxPrice: Number(priceRange.maxPrice.get)}, 
        0
        );

    console.log("After search result found");
    console.log(searchResult);
    console.log("Page Count: "+ pageCount.get);

    //Set state props of events and page count
    events.set(searchResult.events);
    pageCount.set(searchResult.pageCount);


    console.log(spaLocation.pathname);

    //Navigate to the event search component
    if (spaLocation.pathname !== "/events")
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

      <ByLocation/>
              <DateRangePicker />
      <ByKeywords></ByKeywords>

          <Button
            className="search-form-els"
            id="search-form-submit-btn"
            type="submit"
            variant="contained"
          >
            Search
          </Button>
        </div>
      <HeaderSelectedTags></HeaderSelectedTags>
      </form>
    </div>
  );
};

//Export the main event filter UI
export default FindEventHeader;