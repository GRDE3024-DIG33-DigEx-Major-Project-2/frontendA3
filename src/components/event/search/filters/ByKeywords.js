/**
 * Keywords filter component for searching events
 */

//Import dependencies
import {
  TextField,
  FormControl,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { useContext } from "react";
//Import search event props
import {
  SearchEventFiltersContext
} from "../../../../props/search-events.prop";

/**
 * Builds ByKeywords component
 * @returns Render of ByKeywords component
 */
const ByKeywords = () => {

  /**
   * Prop context for search event filters
   */
  const { keywords } = useContext(SearchEventFiltersContext);

  //The HTML template
  return (
    <FormControl id="events-txt-field">
      <TextField
        className="search-form-els"
        variant="outlined"
        placeholder="Search artists, venues or events"
        onChange={(val) => keywords.set(val.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon color="primary" />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </FormControl>
  );
};

//Export the ByLocation component
export default ByKeywords;
