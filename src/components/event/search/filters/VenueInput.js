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
import { useContext, useEffect, useState } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
import { v4 as uuidv4 } from 'uuid';


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
    chipData,
    selectedVenue
  } = useContext(SearchEventFiltersContext);



  //Get unique venue names from search results
  const uniqueVenues = new Set();
  events.get.forEach((event) => uniqueVenues.add(event.event.venueName));
  const uniqueVenueNames = Array.from(uniqueVenues);


  /**
   * Selects the venue filter display chip
   * @param {*} venue 
   */
  const chipSelectVenue = (venue) => {
    let temp = chipData.get;
    //Don't duplicate venue listings.
    if (!temp.find(x => x.value === venue)) {
      selectedVenue.set(venue);
    }
  };

  //Handle chip data changes when selectedVenue changes
  useEffect(() => {
    let temp = chipData.get;
    temp = temp.filter((x) => x.searchCategory !== "venue");
    const newKey = uuidv4();
    temp.push({
      key: newKey,
      searchCategory: "venue",
      label: selectedVenue.get,
      value: selectedVenue.get,
    });

    //Delay setting the chip data to the next render cycle
    setTimeout(() => {
      chipData.set(temp, false);
      change.set(!change.get);
    }, 0);
  }, [selectedVenue.get]);



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
            value={selectedVenue.get}
            name="venue-radio"    
            onChange={(event) => chipSelectVenue(event.target.value)}
          >
            <FormControlLabel
              value="All Venues"
              control={<Radio />}
              label="All Venues"
            />
            {uniqueVenueNames.map((venueName, i) => (
              <FormControlLabel
                value={venueName}
                control={<Radio />}
                label={venueName}
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


