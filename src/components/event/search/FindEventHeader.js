/**
 * Main event search filter component that handles location, date, and keywords
 */

//Import dependencies
import { useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SearchEventFiltersContext,
  SearchEventsContext,
} from "../../../props/search-events.prop";
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../../services/EventAPI";
//Import JSX components
import DateRangePicker from "./filters/DateRangePicker";
import ByLocation from "./filters/ByLocation";
import ByKeywords from "./filters/ByKeywords";
import { HeaderSelectedTags } from "./filters/TagSelection";
import { PATHS } from "../../../utils/constants.util";
import { isFavourited } from "../../../services/EventAPI";
import { getUser } from "../../../utils/localStorage";
import { logoutErrorHandler } from "../../../services/AuthAPI";

/**
 * React component for main event filter UI
 * @returns
 */
const FindEventHeader = () => {
  /**
   * Prop context for search event data
   */
  const { events, pageCount, tags, fetchStatus } =
    useContext(SearchEventsContext);

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
  } = useContext(SearchEventFiltersContext);

  //React navigator
  const navigate = useNavigate();

  //Location specifier
  const spaLocation = useLocation();

  const user = getUser();

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
    if (tags.get == 0) fetchTags();
  }, [tags.set]);

  //Extract the logic to fetch favorite status of events into a reusable function
  async function fetchEventsWithFavouriteStatus(events) {
    if (!user || user.type !== "attendee") {
      return events;
    }

    try {
      const response = await isFavourited(events.map((x) => x.event.id));
      return events.map((eventContainer) => {
        const favEvent = response.data.favStatuses.find(
          (fav) => fav.eventId === eventContainer.event.id
        );
        return {
          ...eventContainer,
          event: favEvent
            ? { ...eventContainer.event, ...favEvent }
            : eventContainer.event,
        };
      });
    } catch (error) {
      logoutErrorHandler(error);
      return events;
    }
  }

  /**
   * Search for first page of filtered events
   */
  const searchHandler = async (event) => {
    //Reset currPage to 0
    currPage.set(0);

    //Prevent default submit form behaviour
    event.preventDefault();

    //Toggle loading UI on
    fetchStatus.set(true);

    console.log("Search event fired");
    console.log(
      tagSelection.get,
      keywords.get,
      dateRange.minDate.get,
      dateRange.maxDate.get,
      location.get,
      0
    );
    console.log(priceRange.minPrice.get);
    console.log(priceRange.maxPrice.get);

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

    const searchEventsWithFavourites = await fetchEventsWithFavouriteStatus(
      searchResult.events
    );

    //Set state props of events and page count
    events.set(searchEventsWithFavourites);
    pageCount.set(searchResult.pageCount);

    console.log("After search result found");
    console.log(searchResult);
    console.log("Page Count: " + pageCount.get);

    //Toggle loading UI off
    fetchStatus.set(false);

    console.log(spaLocation.pathname);

    //Navigate to the event search component
    if (spaLocation.pathname !== "/events") navigate(PATHS.SEARCH_EVENTS);
  };

  //The HTML template
  return (
    <div className="find-event-header">
      <h1 className="find-event-header-text">Find an event</h1>
      <form id="search-event-form" onSubmit={searchHandler}>
        <div className="find-event-search">
          <ByLocation />
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
