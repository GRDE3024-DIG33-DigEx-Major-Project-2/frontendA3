/**
 * Search event prop context. Handles search listing array and total page count
 */

//Import dependencies
import { React, createContext, useState } from 'react';
import { GENRES } from '../utils/constants.util';


//Create the Context instance
const SearchEventsContext = createContext();

//Create the provider
const SearchEventsProvider = ({ children }) => {

    //Event listing data and total page count that matches the filter provided
    const [events, setEvents] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [tags, setTags] = useState([
        {
            id: "40e6215d-b5c6-4896-987c-f30f3678f608",
            name: GENRES.rock
        },
        {
            id: "6ecd8c99-4036-403d-bf84-c2c23a4de7ed",
            name: GENRES.blues
        },
        {
            id: "3d3d8cd6-58e7-452b-a17f-80b7958b3b5d",
            name: GENRES.hiphop
        },
        {
            id: "a4f1e8c8-8cfb-4a96-9cf3-a2c1e0f90f1b",
            name: GENRES.indie
        },
        {
            id: "e7cd5752-bc0d-4cc8-acdf-3aeadf5cb3e6",
            name: GENRES.country
        },
        {
            id: "1b2277e2-7c20-4ad6-99fd-253a15f3ca1f",
            name: GENRES.dance
        },
        {
            id: "1e6c706e-7fb1-4e4e-8e1f-0573f1dba088",
            name: GENRES.classical
        },
        {
            id: "e2dc8b34-314d-4098-9b2f-3f64fa5f7cda",
            name: GENRES.jazz
        },
        {
            id: "f7177163-14e8-4b54-845c-c0e2c2eeb9f9",
            name: GENRES.reggae
        },
        {
            id: "6fa459ea-ee8a-3ca4-894e-db77e160355e",
            name: GENRES.electronic
        },
        {
            id: "0a40017f-eddb-41b8-ae88-5abe027bf3b3",
            name: GENRES.pop
        },
        {
            id: "0f7d0d90-4b6b-4f8f-98d6-3c096f3e673a",
            name: GENRES.metal
        },
        {
            id: "1b3d6f7a-9b1f-4d5d-9257-12fa52a1ad63",
            name: GENRES.solo
        },
        {
            id: "32e7f9a4-75b8-45c6-a9d3-67b2e83a794a",
            name: GENRES.instrumental
        },
        {
            id: "82e5e124-8b10-401b-a5c9-177701090d21",
            name: GENRES.rap
        },
        {
            id: "6dfc3e23-ef20-414a-8cfe-1f57533e716a",
            name: GENRES.international
        }
    ]);
    //Used for flagging in-progress async operation. True if running, else false
    const [fetchStatus, setFetchStatus] = useState(false);


    //Search Events related props
    const props = {
        events: {
            get: events,
            set: setEvents
        },
        pageCount: {
            get: pageCount,
            set: setPageCount
        },
        tags: {
            get: tags,
            set: setTags
        },
        fetchStatus: {
            get: fetchStatus,
            set: setFetchStatus
        }
    };

    //Return the context provider with props
    return (
        <SearchEventsContext.Provider value={props}>
            {children}
        </SearchEventsContext.Provider>
    );
};




/**
 * Search event filter prop context. Handles search event filters
 */

//Create the Context instance
const SearchEventFiltersContext = createContext();

//Create the provider
const SearchEventFiltersProvider = ({ children }) => {



    //Default date range for events
    const DEFAULT_DATE_RANGE = { minDate: null, maxDate: null };
    //Default selected venue is all venues
    const DEFAULT_VENUE_SELECT = "All Venues";
    //Default search chip values
    const DEFAULT_FILTER_CHIPS = [];

    //Filter form fields as props
    const [location, setLocation] = useState(null);
    const [minDate, setMinDate] = useState(DEFAULT_DATE_RANGE.minDate);
    const [maxDate, setMaxDate] = useState(DEFAULT_DATE_RANGE.maxDate);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [keywords, setKeywords] = useState("");
    //const [isFree, setIsFree] = useState(DEFAULT_ISFREE);
    const [change, setChange] = useState(true);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    //Filter chip UI data
    const [chipData, setChipData] = useState(DEFAULT_FILTER_CHIPS);
    const [currPage, setCurrPage] = useState(0);
    //Filter for selected venue
    const [selectedVenue, setSelectedVenue] = useState(DEFAULT_VENUE_SELECT);
    const [isFree, setIsFree] = useState("free");

      /**
   * Date range values for filtering and UI
   */
  const DATE_RANGES = {
    ANY:"Any Date",
    TODAY:"Today",
    TOMORROW:"Tomorrow",
    WEEKEND:"This Weekend",
    WEEK:"This Week",
    MONTH:"This Month",
    CUSTOM:"Custom"
  };
  //Filter chip UI selected date range
    const [selectedDateRange, setSelectedDateRange] = useState(DATE_RANGES.ANY);


    //Filter chip values that cannot be directly cleared
    const IMMUTABLE_CHIP_VALUES = {
        VENUE:"All Venues",
        DATE:DATE_RANGES.ANY,
        FREE:"free",
        PAID:"paid",
        CAP_FREE:"Free",
        CAP_PAID:"Paid"
    };






    //Filter-related props
    const props = {
        keywords: {
            get: keywords,
            set: setKeywords
        },
        location: {
            get: location,
            set: setLocation,
        },
        dateRange: {
            minDate: {
                get: minDate,
                set: setMinDate,
            },
            maxDate: {
                get: maxDate,
                set: setMaxDate,
            }
        },
        priceRange: {
            minPrice: {
                get: minPrice,
                set: setMinPrice,
            },
            maxPrice: {
                get: maxPrice,
                set: setMaxPrice,
            }
        },
        selectedVenue: {
            get: selectedVenue,
            set: setSelectedVenue
        },
        change: {
            get: change,
            set: setChange
        },
        tagSelection: {
            get: selectedTagIds,
            set: setSelectedTagIds,
        },
        isFree: {
            get: isFree,
            set: setIsFree
        },
        chipData: {
            get: chipData,
            set: setChipData
        },
        currPage: {
            get: currPage,
            set: setCurrPage
        },
        selectedDateRange: {
            get: selectedDateRange,
            set: setSelectedDateRange
        },
        DATE_RANGES: DATE_RANGES,
        IMMUTABLE_CHIP_VALUES: IMMUTABLE_CHIP_VALUES
    };

    //Return the context provider with props
    return (
        <SearchEventFiltersContext.Provider value={props}>
            {children}
        </SearchEventFiltersContext.Provider>
    );
};




//Export the search event-related prop contexts
export { SearchEventsContext, SearchEventsProvider, SearchEventFiltersContext, SearchEventFiltersProvider };