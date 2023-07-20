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
import { getAllEvents, getAllTags } from "../utils/utils";

const Events = () => {
  const [paid, setPaid] = useState("free");
  const [price, setPrice] = useState([50, 500]);
  const [change, setChange] = useState(true);
  const [chipData, setChipData] = useState([
    { key: 0, label: "My Location" },
    { key: 1, label: "23 Jun 2023" },
    { key: 2, label: "Country" },
  ]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    fetchTags();
  }, [setTags]);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    }

    fetchEvents();
  }, [setEvents]);

  const chipSelect = (genre) => {
    let newKey = chipData.length + 1;
    let temp = chipData;
    temp.push({ key: newKey, label: genre });
    setChipData(temp);
    setChange(!change);
  };

  const handleDelete = (chipToDelete) => () => {
    console.log("deleting this filter: ");
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const clearFilters = () => {
    setChipData([]);
  };

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const priceText = (price) => {
    return "$" + ` ${price}`;
  };

  const valueLabelFormat = (priceText) => {
    return `AUD$${priceText}`;
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
                <RadioGroup defaultValue="today" name="date-radio">
                  <FormControlLabel
                    value="today"
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    value="tomorrow"
                    control={<Radio />}
                    label="Tomorrow"
                  />
                  <FormControlLabel
                    value="weekend"
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
                      getAriaValueText={priceText}
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
                        onClick={() => chipSelect(tag.name)}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Link id="view-more-tags">View more</Link>
              </div>
              <div>
                <h2>Venue</h2>
                <RadioGroup defaultValue="today" name="venue-radio">
                  <FormControlLabel
                    value="aware super theatre"
                    control={<Radio />}
                    label="Aware Super Theatre"
                  />
                  <FormControlLabel
                    value="city recital hall"
                    control={<Radio />}
                    label="City Recital Hall"
                  />
                  <FormControlLabel
                    value="enmore theatre"
                    control={<Radio />}
                    label="Enmore Theatre"
                  />
                  <FormControlLabel
                    value="metro theatre"
                    control={<Radio />}
                    label="Metro Theatre"
                  />
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
