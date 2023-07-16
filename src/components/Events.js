import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Chip,
} from "@mui/material";
import FindEventHeader from "./FindEventHeader";
import EventCardHorizontal from "./EventCardHorizontal"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents } from "../utils/utils";

const Events = () => {

  const [paid, setPaid] = useState("free");
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(true);
  const [chipData, setChipData] = useState([
    { key: 0, label: "My Location" },
    { key: 1, label: "23 Jun 2023" },
    { key: 2, label: "Country" }
  ]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents(){
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    }

    fetchEvents();
  },[setEvents])

  const chipSelect = (genre) => {
    let newKey = chipData.length + 1;
    let temp = chipData;
    temp.push({key: newKey, label: genre});
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
  }

  return (
    <section className="home-section">
      <FindEventHeader />
      <article className="search-results-grid">
        <div className="search-filters">
          <h1>Filters</h1>
          <Box className="filter-box">
            <FormControl>
              <div>
                <FormLabel id="date-radio-label">
                  <h4>Date</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="date-radio-label"
                  defaultValue="today"
                  name="date-radio"
                >
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
                <FormLabel id="price-radio-label">
                  <h4>Price</h4>
                </FormLabel>
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
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      min={5}
                      max={1500}
                      step={5}
                      valueLabelDisplay="auto"
                    />
                    <p>$1500</p>
                  </Stack>
                )}
              </div>
              <div>
                <h4>Genre</h4>
                <div>
                  <Chip
                    label="Country"
                    color="default"
                    onClick={() => chipSelect("Country")}
                  />
                  <Chip
                    label="Jazz"
                    color="default"
                    onClick={() => chipSelect("Jazz")}
                  />
                  <Chip
                    label="Electronic"
                    color="default"
                    onClick={() => chipSelect("Electronic")}
                  />
                  <Chip
                    label="Reggae"
                    color="default"
                    onClick={() => chipSelect("Reggae")}
                  />
                  <Chip
                    label="Dance"
                    color="default"
                    onClick={() => chipSelect("Dance")}
                  />
                  <Chip
                    label="Metal"
                    color="default"
                    onClick={() => chipSelect("Metal")}
                  />
                  <Chip
                    label="Hip Hop"
                    color="default"
                    onClick={() => chipSelect("Hip Hop")}
                  />
                  <Chip
                    label="Pop"
                    color="default"
                    onClick={() => chipSelect("Pop")}
                  />
                  <Chip
                    label="Classical"
                    color="default"
                    onClick={() => chipSelect("Classical")}
                  />
                </div>
                <Link>View more</Link>
              </div>
              <div>
                <FormLabel id="venue-radio-label">
                  <h4>Venue</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="venue-radio-label"
                  defaultValue="today"
                  name="venue-radio"
                >
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
            </FormControl>
          </Box>
        </div>
        <div className="search-results">
          <h1>Search Results</h1>
          <Stack spacing={2} direction="row" alignItems="center" className="search-filters-top">
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
