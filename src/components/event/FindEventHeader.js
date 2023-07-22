import { DatePicker } from "@mui/x-date-pickers";
import {
  MenuItem,
  Select,
  Chip,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getAllTags } from "../../utils/utils";
import { useState, useEffect } from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import InputAdornment from "@mui/material/InputAdornment";

const FindEventHeader = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [genre, setGenre] = useState("country");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getAllTags();
      setTags(tags);
    }

    fetchTags();
  }, [setTags]);

  const searchHandler = () => {
    console.log("Search event fired");
    console.log(location, date, genre);
  };

  const chipHandler = (genre) => {
    setGenre(genre);
  };

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
          <TextField
            className="search-form-els"
            id="events-txt-field"
            variant="outlined"
            label="Search artists, venues or events"
          ></TextField>
          <Button
            className="search-form-els"
            id="search-form-submit-btn"
            type="submit"
            variant="contained"
          >
            Search
          </Button>
        </div>
        <div className="find-event-tags">
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
        </div>
      </form>
    </div>
  );
};

export default FindEventHeader;
