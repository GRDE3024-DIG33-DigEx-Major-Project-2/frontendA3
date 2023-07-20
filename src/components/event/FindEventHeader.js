import { DatePicker } from "@mui/x-date-pickers";
import { MenuItem, Select, Chip, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

const FindEventHeader = () => {
  const [location, setLocation] = useState("-");
  const [date, setDate] = useState(null);
  // const [genre, setGenre] = useState("country");
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState(null);
  const [startDate, setStartDate] = useState(null);


  // const [events, setEvents] = useState([]);
  // const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    fetchTags();
  }, [setTags]);

  /**
   * Search for first page of filtered events
   */
  const searchHandler = async () => {
    console.log("Search event fired");
    console.log(location, date, keywords);
    //Make request for filtered events
    const searchResult = await searchEvents(tags, keywords, startDate, location, 0);
    //Set state props of events and page count
    setEvents(searchResult.events);
    setPageCount(searchResult.pageCount);

    console.log("After search result found");
    console.log(searchResult);
    console.log("Page Count: "+pageCount);

    //Navigate to event listing component
    navigator();

  };

  // const chipHandler = (genre) => {
  //   setGenre(genre);
  // };

  return (
    <div className="find-event-header">
      <h1 className="find-event-header-text">Find an event</h1>
      <form id="search-event-form" onSubmit={searchHandler}>
        <div className="find-event-search">
          <FormControl fullWidth>
            <InputLabel id="location-label"><FmdGoodOutlinedIcon /> My location</InputLabel>
            <Select
              className="search-form-els"
              labelId="location-label"
              label="My Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {/* <MenuItem disabled selected hidden value="-">
              My Location
            </MenuItem> */}
              <MenuItem value="Sydney">Sydney</MenuItem>
              <MenuItem value="Balmain">Balmain</MenuItem>
              <MenuItem value="Surry Hills">Surry Hills</MenuItem>
              <MenuItem value="Parramatta">Parramatta</MenuItem>
              <MenuItem value="Marrickville">Marrickville</MenuItem>
              <MenuItem value="Lane Cove">Lane Cove</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            className="search-form-els"
            onChange={(event) => setDate(event.target.value)}
          />
          <span>
            <TextField
              className="search-form-els"
              id="events-txt-field"
              variant="outlined"
              label="Search artists, venues or events"
              onChange={(event) => setLocation(event.target.value)}
            ></TextField>
            <Button
              className="search-form-els"
              type="submit"
              variant="contained"
            >
              Search
            </Button>
          </span>
        </div>
        {/* <div className="find-event-tags">
          {tags.map((tag, i) => (
            <Chip
              sx={{
                backgroundColor: "#7759A6",
                color: "white",
                margin: "1%",
              }}
              key={i}
              label={tag.name}
              id={tag.id}
              color="default"
              onClick={() => chipHandler(tag.name)}
            />
          ))}
        </div> */}
      </form>
    </div>
  );
};

export default FindEventHeader;
