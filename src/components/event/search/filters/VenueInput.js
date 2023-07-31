/**
 * Venue input component
 */


//Import dependencies
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";


const VenueInput = () => {


  /**
   * Prop context for search event data
   */
  const {
    events,
    pageCount,
    tags
  } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const {
    change,
    chipData
  } = useContext(SearchEventFiltersContext);


  /**
   * Selects the venue filter display chip
   * @param {*} venue 
   */
  const chipSelectVenue = (venue) => {
    let newKey = chipData.get.length + 1;
    let temp = chipData.get;
    //Don't duplicate venue listings. Limit to displaying 10 venues
    if (!temp.find(x => x.value === venue) && temp.length <= 10)
      temp.push({
        key: newKey,
        searchCategory: "venue",
        label: venue,
        value: venue,
      });
    //Set chip data
    chipData.set(temp);
    //Flag the filter options as having changed
    change.set(!change.get);
  };



  //The HTML template
  return (
    <div>
      <h2>Venue</h2>
      <RadioGroup disabled={true} defaultValue="" name="venue-radio" onChange={(event) => chipSelectVenue(event.target.value)}>
        {events.get.map((event, i) => (
          <FormControlLabel
            key={i}
            value={event.event.venueName}
            control={<Radio />}
            label={event.event.venueName}
          />
        ))
        }
      </RadioGroup>
      <Link>View more</Link>
    </div>

  );
};



//Export the Event Venue Input component
export default VenueInput;