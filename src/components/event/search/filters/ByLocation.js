/**
 * Location filter component
 */

//Import dependencies
import { MenuItem, Select, FormControl, Box } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import { useContext } from "react";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../../../props/search-events.prop";

const ByLocation = () => {
  /**
   * Prop context for search event data
   */
  const { events, pageCount, tags } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const { change, location, chipData } = useContext(SearchEventFiltersContext);

  //The HTML template
  return (
    <FormControl id="location-field-search">
      <Select
        className="search-form-els"
        displayEmpty
        placeholder="My location"
        onChange={(event) => location.set(event.target.value)}
        renderValue={(value) => {
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <SvgIcon color="primary">
                <FmdGoodOutlinedIcon />
              </SvgIcon>
              {value ? value : "My Location"}
            </Box>
          );
        }}
      >
        <MenuItem selected value="Sydney">
          Sydney
        </MenuItem>
        <MenuItem value="Balmain">Balmain</MenuItem>
        <MenuItem value="Surry Hills">Surry Hills</MenuItem>
        <MenuItem value="Parramatta">Parramatta</MenuItem>
        <MenuItem value="Marrickville">Marrickville</MenuItem>
        <MenuItem value="Lane Cove">Lane Cove</MenuItem>
      </Select>
    </FormControl>
  );
};

//Export the ByLocation component
export default ByLocation;
