/**
 * Main search component for events
 */

//Import dependencies
import {
  Box,
  FormControl,
  Stack,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import FindEventHeader from "./FindEventHeader";
import EventCardHorizontal from "../display/EventCardHorizontal";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../../services/EventAPI";
import { scrollToTop } from "../../../utils/utils";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../../props/search-events.prop";
//Import JSX components
import VenueInput from "./filters/VenueInput";
import DateRadioBtns from "./filters/DateRadioButtons";
import TicketPriceRange from "./filters/TicketPriceRange";
import { SearchSelectedTags } from "./filters/TagSelection";
import { v4 as uuidv4 } from 'uuid';
//Partial page spinner
import { PartialLoadSpinner } from "../../shared/LoadingSpinner";

/**
 * The event search component
 * @returns The event search component
 */
const SearchEvent = () => {

  /**
   * Prop context for search event data
   */
  const { events,
    pageCount,
    tags,
    fetchStatus
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
    isFree,
    IMMUTABLE_CHIP_VALUES,
    DATE_RANGES,
    selectedDateRange,
    selectedVenueLoading
  } = useContext(SearchEventFiltersContext);

  const IMMUTABLE_CHIP_MAP = {
    venue: {
      key: uuidv4(),
      searchCategory: "venue",
      label: "All Venues",
      value: "All Venues"
    },
    isFree: {
      key: uuidv4(),
      searchCategory: "isFree",
      label: "Free",
      value: "free"
    },
    date: {
      key: uuidv4(),
      searchCategory: "date",
      label: "Any Date",
      value: "Any Date"
    }
  };


  /**
   * Load more events
   * @param {*} event
   */
  const loadMoreHandler = async (event) => {
    //Prevent default submit form behaviour
    event.preventDefault();

    //Toggle loading UI on
    fetchStatus.set(true);

    //Increment to next page
    currPage.set(currPage.get++);

    //Make request for filtered events
    let searchResult = await searchEvents(
      tagSelection.get,
      keywords,
      dateRange.minDate.get,
      dateRange.maxDate.get,
      location.get,
      {
        minPrice: Number(priceRange.minPrice.get),
        maxPrice: Number(priceRange.maxPrice.get),
      },
      currPage.get
    );

    pageCount.set(searchResult.pageCount);
    let newArr = [...events.get, ...searchResult.events];
    //Set state props of events and page count
    events.set(newArr);
    pageCount.set(searchResult.pageCount);

    //Toggle loading UI off
    fetchStatus.set(false);
  };

  /**
   * Removes selected filter option if applicable
   * @param {*} chipToDelete
   * @returns
   */
  const handleDelete = (chipToDelete) => () => {
    chipData.set((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );

    //Check if chip is date category
    if (chipToDelete.searchCategory === "date") {
      //Reset minDate and maxDate to null values
      dateRange.minDate.set(null);
      dateRange.maxDate.set(null);
      selectedDateRange.set(DATE_RANGES.ANY);
    }

    //Reset selected venue to default
    if(chipToDelete.searchCategory === "venue") {
      selectedVenue.set("All Venues");  
    }

    //Check if the chip category is in the immutable map
    const immutableChip = IMMUTABLE_CHIP_MAP[chipToDelete.searchCategory];
    if (immutableChip) {
      chipData.set((prevChips) => [...prevChips, immutableChip]);
    }

    change.set(!change.get);
  };


  /**
   * Clear search filters
   */
  const clearFilters = () => {

    //Only remove chips that aren't immutable
    const remainingChips = chipData.get.filter(chip => Object.values(IMMUTABLE_CHIP_VALUES).includes(chip.label));
    chipData.set(remainingChips);

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

    //Render initial chips only if they don't already exist in the current chips
    const chipValues = chipData.get.map(chip => chip.label);

    if (!chipValues.includes("All Venues")) {
      chipData.set(prev => [...prev, {
        key: uuidv4(),
        searchCategory: "venue",
        label: "All Venues",
        value: "All Venues",
      }]);
    }

    if (!chipValues.includes("Free")) {
      chipData.set(prev => [...prev, {
        key: uuidv4(),
        searchCategory: "isFree",
        label: "Free",
        value: "free",
      }]);
    }

    if (!chipValues.includes("Any Date")) {
      chipData.set(prev => [...prev, {
        key: uuidv4(),
        searchCategory: "date",
        label: "Any Date",
        value: "Any Date",
      }]);
    }

    change.set(!change.get);
  };


  /**
   * React hook that is used for fetching data on load
   */
  useEffect(() => {
    async function fetchTagsAndEvents() {
      const fetchedTags = await getAllTags();
      tags.set(fetchedTags);

      events.set([]);
      pageCount.set(0);
      fetchStatus.set(true);

      const data = await searchEvents(
        tagSelection.get,
        keywords.get,
        null,
        null,
        location.get,
        {
          minPrice: Number(priceRange.minPrice.get),
          maxPrice: Number(priceRange.maxPrice.get),
        },
        currPage.get
      );

      let newArr = [...data.events];
      fetchStatus.set(false);
      events.set(newArr);
      pageCount.set(data.pageCount);
    }

    if (tags.get.length === 0) {
      fetchTagsAndEvents();
    }
  }, [tags, events]);

  /**
   * Dynamic search handling React Hook when filter options change
   */
  useEffect(() => {
    async function fetchFilteredEvents() {
      fetchStatus.set(true);
      events.set([]);
      pageCount.set(0);

      const data = await searchEvents(
        tagSelection.get,
        keywords.get,
        dateRange.minDate.get,
        dateRange.maxDate.get,
        location.get,
        {
          minPrice: Number(priceRange.minPrice.get),
          maxPrice: Number(priceRange.maxPrice.get),
        },
        currPage.get
      );

      events.set(data.events);
      pageCount.set(data.pageCount);
      fetchStatus.set(false);
      selectedVenueLoading.set(false);
    }

    fetchFilteredEvents();

  }, [
    keywords.get,
    dateRange.minDate.get,
    dateRange.maxDate.get,
    priceRange.minPrice.get,
    priceRange.maxPrice.get,
    location.get,
    tagSelection.get,
    change.get,
    isFree.get
  ]);


  /**
   * Event listing display container
   */
  let eventListings = (
    <Box className="events-result">
      {fetchStatus.get || selectedVenueLoading.get ? (
        <PartialLoadSpinner className="partial-loader"></PartialLoadSpinner>
      ) : events.get && events.get.length ? (
        events.get.map((event, i) => {
          //Filter out event display results by venue selected
          if (
            event.event.venueName === selectedVenue.get ||
            selectedVenue.get === "All Venues"
          ) {
            return <EventCardHorizontal key={i} event={event} />;
          }
          return null;
        })
      ) : (
        <h2>No results found</h2>
      )}

      {currPage.get + 1 < pageCount.get && (
        <div className="search-buttons">
          <Button variant="contained" id="load-more-events-btn" onClick={loadMoreHandler}>
            Load More
          </Button>
          <Button variant="outlined" id="back-to-top-btn" onClick={scrollToTop}>
            Back To Top
          </Button>
        </div>
      )}
    </Box>
  );



  //Check for mutable chips in chip data
  const hasMutableChip = chipData.get
    .some(chip => !Object.values(IMMUTABLE_CHIP_VALUES).includes(chip.label));

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
                {...(!Object.values(IMMUTABLE_CHIP_VALUES).some(
                  (value) => value === data.label
                )
                  ? { onDelete: handleDelete(data) }
                  : {})}
              />
            ))}
            {hasMutableChip && (
              <Link onClick={clearFilters}>Clear all filters</Link>
            )}
          </Stack>
          {eventListings}
        </div>
      </article>
    </section>
  );
};


//Export Search Event component
export default SearchEvent;
