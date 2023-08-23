/**
 * Location filter component
 */

//Import dependencies
import { MenuItem, Select, FormControl, Box } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import { useContext, useState } from "react";
//Import search event props
import { SearchEventFiltersContext } from "../../../../props/search-events.prop";
import { getAllSuburbs } from "../../../../utils/utils";


/**
 * Builds ByLocation component
 * @returns Render of ByLocation component
 */
const ByLocation = () => {

  //Suburbs of Sydney
  const [suburbs] = useState(getAllSuburbs());
  /**
   * Prop context for search event filters
   */
  const { location } = useContext(SearchEventFiltersContext);

  /**
   * Handler for when location selection changes
   * @param {*} event 
   */
  const handleLocationChange = (event) => {
    location.set(event.target.value);
  };

  //The HTML template
  return (
    <FormControl id="location-field-search">
      <Select
        className="search-form-els"
        displayEmpty
        placeholder="Any Suburb"
        value={location.get || ''}
        onChange={handleLocationChange}
        renderValue={(value) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <SvgIcon color="primary">
              <FmdGoodOutlinedIcon />
            </SvgIcon>
            {value ? value : "Any Suburb"}
          </Box>
        )}
      >
        <MenuItem value="">Any Suburb</MenuItem>
        {suburbs.map((sub, i) => (
          <MenuItem key={i} value={sub}>
            {sub}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

//Export the ByLocation component
export default ByLocation;
