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
import FindEventHeader from "./FindEventHeader";
import EventCardHorizontal from "./EventCardHorizontal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//Import endpoint handlers for events
import { searchEvents, getAllTags } from "../../services/EventAPI";
import { getTomorrowISODate } from "../../utils/utils";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../props/search-events.prop";
import * as dayjs from 'dayjs';

/**
 * The event search component
 * @param {*} param0 
 * @returns The event search component
 */
const Events = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {

  /**
   * Prop context for search event data
   */
  const { events, setEvents, pageCount, setPageCount } = useContext(SearchEventsContext);
  /**
   * Prop context for search event filters
   */
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


  /**
   * Pre-made filters
   */
  const [chipData, setChipData] = useState([
    { key: 0, searchCategory: "venue", label: "Arena51", value: "Arena51" },
    { key: 1, searchCategory: "date", label: "Today", value: { today } },
    {
      key: 2,
      searchCategory: "genre",
      label: "Rock",
      value: "9a58b4a6-af1d-4102-b074-6cc5f1fda00e",
    },
  ]);


  /**
   * React hook that is used for fetching data on load
   */
  useEffect(() => {

    /**
     * Find all pre-defined tag/genre options
     */
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    /**
     * Fetcgh a page of events that match the filter options
     */
    async function fetchEvents() {
      const data = await searchEvents(selectedTagIds, keywords, dayjs(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss"), {minPrice: Number(minPrice), maxPrice: Number(maxPrice)}, location, 0);
      //Set events
      setEvents(data.events);
      //Set total page count
      setPageCount(data.pageCount);
    }

    //Fetch all possible pre-defined tags if none have been retrieved
    if (tags.length == 0)
    fetchTags();
    
    //No events have been retrieved -- fetching events
    if (events.length == 0) {
      console.log("No events have been retrieved -- fetching events");
      fetchEvents();
    } 
    //Events have already been retrieved
    else {
      console.log("Events have already been retrieved");
    }

  }, [setTags, setEvents]);


  /**
   * Handles new tag selection display chip
   * @param {*} genre 
   */
  const chipSelect = (genre) => {
    let newKey = chipData.length + 1;
    let temp = chipData;
    temp.push({
      key: newKey,
      searchCategory: "genre",
      label: genre.name,
      value: genre.id,
    });
    setChipData(temp);
    setChange(!change);
  };


  /**
   * Selects the event start-date filter display chip
   * @param {*} value 
   */
  const chipSelectDate = (value) => {
    let newKey = chipData.length + 1;
    let temp = chipData;

    let ISODate = "";
    // get ISO date value
    if (value === "Today") {
      ISODate = new Date().toISOString();
    } else if (value === "Tomorrow") {
      ISODate = getTomorrowISODate();
    }

    temp.push({
      key: newKey,
      searchCategory: "date",
      label: value,
      value: ISODate,
    });

    setChipData(temp);
    setChange(!change);
  };


  /**
   * Selects the venue filter display chip
   * @param {*} venue 
   */
  const chipSelectVenue = (venue) => {
    let newKey = chipData.length + 1;
    let temp = chipData;
    //Don't duplicate venue listings. Limit to displaying 10 venues
    if (!temp.find(x => x.value === venue) && temp.length <= 10)
    temp.push({
      key: newKey,
      searchCategory: "venue",
      label: venue,
      value: venue,
    });
    setChipData(temp);
    setChange(!change);
  };

  /**
   * Removes selected filter option
   * @param {*} chipToDelete 
   * @returns 
   */
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setChange(!change);
  };

  /**
   * Clear search filters
   */
  const clearFilters = () => {
    setChipData([]);
    setChange(!change);
  };

  /**
   * Sets the new price filter
   * @param {*} event 
   * @param {*} newPrice 
   */
  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  /**
   * Formats the display for price in AUD
   * @param {*} price 
   * @returns 
   */
  const valueLabelFormat = (price) => {
    return `AUD$${price}`;
  };

  //Add template components to render if events exist
    let venueFilter = <RadioGroup disabled={true} defaultValue="" name="venue-radio" onChange={(event) => chipSelectVenue(event.target.value)}>
    {events.map((event, i) => (
            <FormControlLabel
              key={i}
              value={event.event.venueName}
              control={<Radio />}
              label={event.event.venueName}
            />
          ))
      }
  </RadioGroup>

  let eventListings = <Box className="events-result">
  {events.map((event, i) => (
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
              <div>
                <h2>Date</h2>
                <RadioGroup
                  defaultValue="Today"
                  name="date-radio"
                  onChange={(event) => chipSelectDate(event.target.value)}
                >
                  <FormControlLabel
                    value="Today" disabled={true}
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    value="Tomorrow" disabled={true}
                    control={<Radio />}
                    label="Tomorrow"
                  />
                  <FormControlLabel
                    value="Weekend" disabled={true}
                    control={<Radio />}
                    label="This weekend"
                  />
                  <FormControlLabel
                    value="select-date" disabled={true}
                    control={<Radio />}
                    label="Select a date"
                  />
                </RadioGroup>
                <Link>View more</Link>
              </div>
              <div>
                <h2>Price</h2>
                <RadioGroup
                  aria-labelledby="price-radio-label"
                  name="price-radio"
                  defaultValue={paid}
                  onChange={(event) => { 
                    //Set price range to default
                    if (event.target.value == true) {
                      setMinPrice(0);setMaxPrice(200);
                    }
                    //Set price range to free 
                    else {
                      setMinPrice(0);setMaxPrice(0);
                    }
                    //Set paid flag
                    setPaid(event.target.value)}}
                >
                  <FormControlLabel
                    value="free"
                    control={<Radio  disabled={true}/>}
                    label="Free"
                  />
                  <FormControlLabel
                    value="paid"
                    control={<Radio  disabled={true}/>}
                    label="Paid"
                  />
                </RadioGroup>
                {paid === "paid" && (
                  <Stack
                    id="price-select-box"
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                  >
                    <p>$5</p>
                    <Slider
                      sx={{
                        color: "#EF7F4E",
                        "& .MuiSlider-valueLabelOpen": {
                          backgroundColor: "#4B7CBE",
                        },
                      }}
                      getAriaLabel={() => "Price range"}
                      value={price}
                      onChange={handlePriceChange}
                      min={5}
                      max={1000}
                      step={5}
                      valueLabelDisplay="on"
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                    />
                    <p>$1000</p>
                  </Stack>
                )}
              </div>
              <div>
                <h2>Genre</h2>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  {tags.map((tag, i) => (
                    <Grid item xs={4} key={i}>
                      <Chip
                        sx={{
                          width: 1,
                          backgroundColor: "#7759A6",
                          color: "white",
                          margin: "4%",
                        }}
                        label={tag.name}
                        id={tag.id}
                        color="default"
                        onClick={() => chipSelect(tag)}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Link id="view-more-tags">View more</Link>
              </div>
              <div>
                <h2>Venue</h2>
                        {venueFilter}
                <Link>View more</Link>
              </div>
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
            {chipData.map((data) => (
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

export default Events;
