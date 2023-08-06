/**
 * Main search component for events
 */


//Import dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Button,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import FindEventHeader from "./FindEventHeader";
import EventCardHorizontal from "../EventCardHorizontal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as dayjs from 'dayjs';
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../../services/EventAPI";
import { getTodayISODates, getTomorrowISODates, getWeekendISODates } from "../../../utils/utils";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../props/search-events.prop";
//Import JSX components
import DateRangePicker from "./filters/DateRangePicker";
import VenueInput from "./filters/VenueInput";
import DateRadioBtns from "./filters/DateRadioButtons";
import TicketPriceRange from "./filters/TicketPriceRange";
import { SearchSelectedTags } from "./filters/TagSelection";

/**
 * The event search component
 * @param {*} param0 
 * @returns The event search component
 */
const SearchEvent = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {



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
    change,
    tagSelection,
    chipData,
    currPage,
    selectedVenue,
    isFree
  } = useContext(SearchEventFiltersContext);


  /**
   * Load more events
   * @param {*} event 
   */
  const loadMoreHandler = async (event) => {

    //Prevent default submit form behaviour
    event.preventDefault();

    console.log("Search event load more fired");

    //Increment to next page
    currPage.set(currPage.get++);

    //Make request for filtered events
    let searchResult = await searchEvents(
      tagSelection.get, 
      keywords, 
      dateRange.minDate.get,
      dateRange.maxDate.get, 
      location.get, 
      {minPrice: Number(priceRange.minPrice.get), 
        maxPrice: Number(priceRange.maxPrice.get)}, 
        currPage.get
        );

    console.log("After search result found");
    console.log(searchResult);
    console.log("Page Count: "+ pageCount.get);

    let currEvents = events.get;

    console.log("Curr Events " + currEvents);
    console.log("New Events " + searchResult.events);
    pageCount.set(searchResult.pageCount);
let newArr = [...events.get, ...searchResult.events]
    //Set state props of events and page count
    events.set(newArr);
    pageCount.set(searchResult.pageCount);

    console.log("NUM RENDERED EVENTS: ", events.get);
  }




  /**
   * Scroll to top of page
   * @param {*} event 
   */
  const scrollToTop = async (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  


  /**
   * Removes selected filter option
   * @param {*} chipToDelete 
   * @returns 
   */
  const handleDelete = (chipToDelete) => () => {
    chipData.set((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    change.set(!change.get);
  };

  /**
   * Clear search filters
   */
  const clearFilters = () => {
    console.log("CLEARING ALL FILTERS");
    //Reset selected chips
    chipData.set([]);
    //Reset pagination
    currPage.set(0);
    //Reset filter props
    tagSelection.set([]);
    keywords.set("");
    selectedVenue.set("All Venues");
    dateRange.minDate.set(null);
    dateRange.maxDate.set(null);
    priceRange.minPrice.set(null);
    priceRange.maxPrice.set(null);
    isFree.set("free");
    console.log(tagSelection.get, keywords.get, dateRange.minDate.get, dateRange.maxDate.get, priceRange.minPrice.get, priceRange.maxPrice.get, location.get, currPage.get);
    change.set(!change.get);
  };


  /**
   * Event listing display container
   */
  let eventListings = <>
    <Box className="events-result">
        {events.get.map((event, i) => {
          //Filter out event display results by venue selected
          if (event.event.venueName === selectedVenue.get || selectedVenue.get === "All Venues")
          return (<EventCardHorizontal key={i} event={event} />)})
        }
        {((currPage.get + 1) == pageCount.get) || (currPage.get == 0 && pageCount.get == 0) ? null : <>
        <Button id="load-more-events-btn" onClick={loadMoreHandler}>Load More</Button>
        <Button id="back-to-top-btn" onClick={scrollToTop}>Back To Top</Button>
        </>}
      </Box>  
      </>;


  /**
   * React hook that is used for fetching data on load
   */
  useEffect(() => {

    /**
     * Find all pre-defined tag/genre options
     */
    async function fetchTags() {
      const fetchedTags = await getAllTags();
      tags.set(fetchedTags);
    }

    /**
     * Fetcgh a page of events that match the filter options
     */
    async function fetchEvents() {

        currPage.set(0);

        const data = await searchEvents(
          tagSelection.get,
          keywords.get,
          null,
          null,
          location.get,
          { minPrice: Number(priceRange.minPrice.get), maxPrice: Number(priceRange.maxPrice.get) },
          currPage.get);
        //Set events
        events.set(data.events);
        //Set total page count
        pageCount.set(data.pageCount);
    }

    //Fetch all possible pre-defined tags if none have been retrieved
    if (tags.get.length == 0)
      fetchTags();

    //No events have been retrieved -- fetching events
    if (events.get.length == 0) {
      console.log("No events have been retrieved -- fetching events");
      fetchEvents();
    }
    //Events have already been retrieved
    else {
      console.log("Events have already been retrieved");
    }

  }, [tags.set, events.set]);






  //HTML Template for searching events
  return (
    <section className="home-section">
      <FindEventHeader />
      <article className="search-results-grid">
        <div className="search-filters">
          <h1>Filters</h1>
          <FormControl fullWidth>
            <Stack
              className="filter-box"
              spacing={2}
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <DateRadioBtns></DateRadioBtns>
              <TicketPriceRange></TicketPriceRange>
              <SearchSelectedTags></SearchSelectedTags>
              <VenueInput></VenueInput>
            </Stack>
          </FormControl>
        </div>
        <div className="search-results">
          <h1>Search Results</h1>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            className="search-filters-top"
          >
            {chipData.get.map((data) => (
              <Chip
                sx={{
                  backgroundColor: "#9c9ced",
                  color: "white",
                  margin: "1%",
                }}
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            ))}
            {chipData.get < 1 ? null : <><Link onClick={clearFilters}>Clear all filters</Link></>}
            
          </Stack>
          {eventListings}
        </div>
      </article>
    </section>
  );
};

export default SearchEvent;
