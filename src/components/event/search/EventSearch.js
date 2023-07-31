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
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import FindEventHeader from "./filters/FindEventHeader";
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
import {SearchSelectedTags} from "./filters/TagSelection";

/**
 * The event search component
 * @param {*} param0 
 * @returns The event search component
 */
const EventSearch = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {

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

      try {
        let isoDates = getTodayISODates();
        const minDate = dayjs(isoDates.minDate).format("YYYY-MM-DD HH:MM:SS:mm");
        const maxDate = dayjs(isoDates.maxDate).format("YYYY-MM-DD HH:MM:SS:mm");

        const data = await searchEvents(
          tagSelection.get,
          keywords.get,
          minDate,
          maxDate,
          location.get,
          { minPrice: Number(priceRange.minPrice.get), maxPrice: Number(priceRange.maxPrice.get) },
          0);
        //Set events
        events.set(data.events);
        //Set total page count
        pageCount.set(data.pageCount);

      }
      catch (error) {
        console.log("Error in search event input");
      }
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
    chipData.set([]);
    change.set(!change.get);
  };



  let eventListings = <Box className="events-result">
    {events.get.map((event, i) => (
      <EventCardHorizontal key={i} event={event} />
    ))
    }
  </Box>

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
            <Link onClick={clearFilters}>Clear all filters</Link>
          </Stack>
          {eventListings}
        </div>
      </article>
    </section>
  );
};

export default EventSearch;
