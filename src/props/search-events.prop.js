/**
 * Search event prop context. Handles search listing array and total page count
 */

//Import dependencies
import { React, createContext, useState } from 'react';
import { getAllTags } from '../services/EventAPI';
import { getTodayISODates } from '../utils/utils';

//Create the Context instance
const SearchEventsContext = createContext();

//Create the provider
const SearchEventsProvider = ({ children }) => {

    //Event listing data and total page count that matches the filter provided
    const [events, setEvents] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [tags, setTags] = useState([]);


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



    //Default range for ticket price filter
    const DEFAULT_MIN_PRICE = 1;
    const DEFAULT_MAX_PRICE = 200;
    //Default isFree value (paid or free)
    const DEFAULT_ISFREE = "paid";
    //Default date range for events
    const DEFAULT_DATE_RANGE = getTodayISODates();
    //Default search chip values
    const DEFAULT_FILTER_CHIPS = [
        { key: 0, searchCategory: "venue", label: "Arena51", value: "Arena51" },
        //{ key: 1, searchCategory: "date", label: "Today", value: getTodayISODates() },
        //   {
        //     key: 2,
        //     searchCategory: "genre",
        //     label: "Rock",
        //     value: "9a58b4a6-af1d-4102-b074-6cc5f1fda00e",
        //   },    
    ]

//console.clear();
//console.log("DEFAULT DATE RANGE: ", DEFAULT_DATE_RANGE);

//Filter form fields as props
const [location, setLocation] = useState(null);
const [minDate, setMinDate] = useState(DEFAULT_DATE_RANGE.minDate);
const [maxDate, setMaxDate] = useState(DEFAULT_DATE_RANGE.maxDate);
const [selectedTagIds, setSelectedTagIds] = useState([]);
const [keywords, setKeywords] = useState("");
const [isFree, setIsFree] = useState(DEFAULT_ISFREE);
const [change, setChange] = useState(true);
const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
//Filter chip UI data
const [chipData, setChipData] = useState(DEFAULT_FILTER_CHIPS);
const [currPage, setCurrPage] = useState(0);



    //Filter-related props
    const props = {
        keywords: {
            get: keywords,
            set: setKeywords
        },
        //TODO revamp from city-only values
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
        isFree: {
            get: isFree,
            set: setIsFree,
        },
        change: {
            get: change,
            set: setChange
        },
        tagSelection: {
            get: selectedTagIds,
            set: setSelectedTagIds,
        },
        chipData: {
            get: chipData,
            set: setChipData
        },
        currPage: {
            get: currPage,
            set: setCurrPage
        }
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