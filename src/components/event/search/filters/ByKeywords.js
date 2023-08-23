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
import { v4 as uuidv4 } from 'uuid';

/**
 * Builds ByKeywords component
 * @returns Render of ByKeywords component
 */
const ByKeywords = () => {

  /**
   * Prop context for search event filters
   */
  const {
    keywords,
    chipData,
    change
  } = useContext(SearchEventFiltersContext);

  /**
   * Add keyword chip display
   * @param {*} keyword 
   */
  const addKeywordChip = (keyword) => {
    const temp = chipData.get;
    if (!temp.find(chip => chip.searchCategory === "keyword" && chip.value === keyword)) {
      temp.push({
        key: uuidv4(),
        searchCategory: "keyword",
        label: keyword,
        value: keyword,
      });
      chipData.set(temp);
      change.set(!change.get);
    }
  };

  /**
   * Handler for keyword selection filter
   * @param {*} selectedKeyword 
   */
  const handleKeywordSelection = (selectedKeyword) => {
    const temp = chipData.get;
    const keywordChipIndex = temp.findIndex(
      (chip) => chip.searchCategory === "keyword"
    );

    if (keywordChipIndex !== -1) {
      temp[keywordChipIndex].label = selectedKeyword;
      temp[keywordChipIndex].value = selectedKeyword;
    } else {
      temp.push({
        key: uuidv4(),
        searchCategory: "keyword",
        label: selectedKeyword,
        value: selectedKeyword,
      });
    }

    keywords.set(selectedKeyword)
    addKeywordChip(selectedKeyword);

    chipData.set(temp);
    change.set(!change.get);
  };

  //The HTML template
  return (
    <FormControl id="events-txt-field">
      <TextField
        className="search-form-els"
        variant="outlined"
        placeholder="Search artists, venues or events"
        onChange={(val) => handleKeywordSelection(val.target.value)}
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
