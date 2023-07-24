/**
 * Search event prop context. Handles search listing array and total page count
 */

//Import dependencies
import { React, createContext, useState } from 'react';
import { getAllTags } from '../services/EventAPI';

//Create the Context instance
const SearchEventsContext = createContext();

//Create the provider
const SearchEventsProvider = ({ children }) => {

    //Event listing data and total page count that matches the filter provided
    const [events, setEvents] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    //Return the context provider with props
    return (
        <SearchEventsContext.Provider value={{ events, setEvents, pageCount, setPageCount }}>
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
    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 200;


    //Filter form fields as props
    const [location, setLocation] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [keywords, setKeywords] = useState(null);
    const today = new Date().toISOString();
    const [isPaid, setPaid] = useState(false);
    const [price, setPrice] = useState([50, 500]);
    const [change, setChange] = useState(true);
    const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
    

    //All tag options
    const [tags, setTags] = useState([]);

    //Filter-related props
    const props = {
        location,
        date,
        tags,
        keywords,
        setLocation,
        setDate,
        setTags,
        setKeywords,
        today,
        paid: isPaid,
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