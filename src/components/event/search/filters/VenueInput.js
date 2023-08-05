/**
 * Venue input component
 */


//Import dependencies
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
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



  const uniqueVenues = new Set();
  events.get.forEach((event) => uniqueVenues.add(event.event.venueName));
  const uniqueVenueNames = Array.from(uniqueVenues);


  /**
   * Selects the venue filter display chip
   * @param {*} venue 
   */
  const chipSelectVenue = (venue) => {
    let newKey = chipData.get.length + 1;
    let temp = chipData.get;
    //Don't duplicate venue listings.
    if (!temp.find(x => x.value === venue)) {
      temp.push({
        key: newKey,
        searchCategory: "venue",
        label: venue,
        value: venue,
      });
    }
    //Set chip data
    chipData.set(temp);
    //Flag the filter options as having changed
    change.set(!change.get);
  };



//TODO CONTINUE. USE USEEFFECT TO FILTER OUT OLD VENUE SELECTION CORRECTLY....
  const toggleVenueFilter = (venue) => {


    let temp = chipData.get;

    // Remove existing venue chip, if any
    temp = temp.filter((x) => x.searchCategory !== "venue");

    if (venue !== "All") {
      // Add the selected venue as a chip
      const newKey = chipData.get.length + 1;
      temp.push({
        key: newKey,
        searchCategory: "venue",
        label: venue,
        value: venue,
      });
    }
    // // Update the chip data
     chipData.set(temp);
    // // Flag the filter options as having changed
     change.set(!change.get);
    // console.log("Test");
    // console.log(temp); console.log(chipData.get);
    // console.log(temp.length === chipData.get.length);



  }

  // Use useEffect to perform filtering logic when chipData changes
  useEffect(() => {

    // Update the chip data
    chipData.set(temp);
    // Flag the filter options as having changed
    change.set(!change.get);
  }, [chipData]);



  //TODO
  const loadMoreVenues = (event) => {
    console.log("TODO LOAD MORE VENUES");
  };


  //The HTML template
  return (
    <div>
      <h2>Venue</h2>
      {events.get.length === 0 ? (
        <p>No Venues Found</p>
      ) : (
        <>
          <RadioGroup
            defaultValue="All"
            name="venue-radio"
            onChange={(event) => chipSelectVenue(event.target.value)}
          >
            <FormControlLabel
              key={null}
              value="All"
              control={<Radio />}
              label="All"
              onChange={() => toggleVenueFilter("All")}
            />
            {uniqueVenueNames.map((venueName, i) => (
              <FormControlLabel
                key={i}
                value={venueName}
                control={<Radio />}
                label={venueName}
                onChange={() => toggleVenueFilter(venueName)}
              />
            ))}
          </RadioGroup>
          <Button onClick={loadMoreVenues}>View more</Button>
        </>
      )}
    </div>

  );
};



//Export the Event Venue Input component
export default VenueInput;


