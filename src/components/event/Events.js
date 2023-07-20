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
import { getAllEvents, getAllTags, getTomorrowISODate } from "../../utils/utils";



/**
 * The event search component
 * @param {*} param0 
 * @returns The event search component
 */
const Events = ({ isLoggedIn, user, setIsLoggedIn, setUser, setEvents, events, setPageCount, pageCount }) => {

  //Filter form fields
  const today = new Date().toISOString();
  const [paid, setPaid] = useState("free");
  const [price, setPrice] = useState([50, 500]);
  const [change, setChange] = useState(true);
  //Pre-made filters
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

  //The tag filters
  const [tags, setTags] = useState([]);

  //
  useEffect(() => {
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    async function fetchEvents() {
      const data = await getAllEvents();
      setEvents(data);
    }

    fetchTags();
    console.log("Set Events Test:");
    console.log(events);
    if (events.length == 0) {
      fetchEvents();
    } else {
      console.log("Events have already been retrieved");
    }

  }, [setTags, setEvents]);

  //
  const chipSelect = (genre) => {

    let newKey = chipData.length + 1;
    let temp = chipData;
    temp.push({ key: newKey, searchCategory: "genre", label: genre.name, value: genre.id });
    setChipData(temp);
    setChange(!change);
  };

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

  const chipSelectVenue = (venue) => {
    let newKey = chipData.length + 1;
    let temp = chipData;
    temp.push({ key: newKey, searchCategory: "venue", label: venue, value: venue });
    setChipData(temp);
    setChange(!change);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setChange(!change);
  };

  const clearFilters = () => {
    setChipData([]);
    setChange(!change);
  };

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const valueLabelFormat = (price) => {
    return `AUD$${price}`;
  };

  return (
    <section className="home-section">
      <FindEventHeader />
      <article className="search-results-grid">
        <div className="search-filters">
          <h1>Filters</h1>
          <FormControl>
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
                    value="Today"
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    value="Tomorrow"
                    control={<Radio />}
                    label="Tomorrow"
                  />
                  <FormControlLabel
                    value="Weekend"
                    control={<Radio />}
                    label="This weekend"
                  />
                  <FormControlLabel
                    value="select-date"
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
                  onChange={(event) => setPaid(event.target.value)}
                >
                  <FormControlLabel
                    value="free"
                    control={<Radio />}
                    label="Free"
                  />
                  <FormControlLabel
                    value="paid"
                    control={<Radio />}
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
                <RadioGroup defaultValue="" name="venue-radio" onChange={(event) => chipSelectVenue(event.target.value)}>
                  {events.map((event, i) => (
                    <FormControlLabel
                      key={i}
                      value={event.event.venueName}
                      control={<Radio />}
                      label={event.event.venueName}
                    />
                  ))}
                </RadioGroup>
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
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            ))}
            <Link onClick={clearFilters}>Clear all filters</Link>
          </Stack>
          <Box className="events-result">
            {events.map((event, i) => (
              <EventCardHorizontal key={i} event={event} />
            ))}
          </Box>
        </div>
      </article>
    </section>
  );
};

export default Events;
