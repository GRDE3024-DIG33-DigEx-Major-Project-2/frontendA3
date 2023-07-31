/**
 * Ticker price range component
 */


//Import dependencies
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    Chip,
    Divider,
    Grid,
  } from "@mui/material";
  import { DatePicker, DateRange } from "@mui/x-date-pickers";
  import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";
  //Import endpoint handlers for events
  import { searchEvents, getAllTags } from "../../../../services/EventAPI";
  import { getTodayISODates, getTomorrowISODates, getWeekendISODates } from "../../../../utils/utils";
  import { useContext } from "react";
  //Import search event props
  import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
  import * as dayjs from 'dayjs';


  const TicketPriceRange = () => {


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
    keywords,
    location,
    dateRange,
    priceRange,
    isFree,
    change,
    tagSelection,
    chipData
  } = useContext(SearchEventFiltersContext);


  /**
   * Sets the new price filter
   * @param {*} event 
   * @param {*} newPrice 
   */
  const handlePriceChange = (event, newPrice) => {
    //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    priceRange.minPrice.set(newPrice.minPrice);
    priceRange.macPrice.set(newPrice.maxPrice);
  };

  /**
   * Formats the display for price in AUD
   * @param {*} price 
   * @returns 
   */
  const valueLabelFormat = (price) => {
        //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    //TODOTODOTODO THIS IS BROKEN
    return `AUD$${price}`;
  };



  //The HTML template
  return (
    <div>
    <h2>Price</h2>
    <RadioGroup
      aria-labelledby="price-radio-label"
      name="price-radio"
      defaultValue={priceRange.minPrice.get}
      onChange={(event) => {
        //Set price range to default paid
        if (event.target.value == false) {
          priceRange.minPrice.set(0); priceRange.maxPrice.set(200);
        }
        //Set price range to free 
        else {
          priceRange.minPrice.set(0); priceRange.maxPrice.set(0);
        }
        //Set paid flag
        isFree.set(event.target.value)
      }}
    >
      <FormControlLabel
        value="free"
        control={<Radio disabled={true} />}
        label="Free"
      />
      <FormControlLabel
        value="paid"
        control={<Radio disabled={true} />}
        label="Paid"
      />
    </RadioGroup>
    {isFree.get === "paid" && (
      <Stack
        id="price-select-box"
        spacing={2}
        direction="row"
        sx={{ mb: 1 }}
        alignItems="center"
      >
        <p>$5</p>
        <Slider
          sx={{
            color: "#EF7F4E",
            "& .MuiSlider-valueLabelOpen": {
              backgroundColor: "#4B7CBE",
            },
          }}
          getAriaLabel={() => "Price range"}
          value={"TODO"}
          onChange={handlePriceChange}
          min={5}
          max={1000}
          step={5}
          valueLabelDisplay="on"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
        />
        <p>$1000</p>
      </Stack>
    )}
  </div>
  );
  };



  //Export the Ticket Price Range component
  export default TicketPriceRange;