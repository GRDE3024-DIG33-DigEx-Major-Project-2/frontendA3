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
  import { v4 as uuidv4 } from 'uuid';

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
    priceRange,
    isFree,
    change,
    chipData,
    IMMUTABLE_CHIP_VALUES
  } = useContext(SearchEventFiltersContext);


    //Ticket price range UI values
    const [minPrice, setMinPrice] = useState(priceRange.minPrice.get);
    const [maxPrice, setMaxPrice] = useState(priceRange.maxPrice.get);

    

  //Handle chip data changes when free/paid toggle changes
  useEffect(() => {
    let temp = chipData.get;
    temp = temp.filter((x) => x.searchCategory !== "isFree");
    const newKey = uuidv4();
    if (isFree.get === "free") {
    temp.push({
      key: newKey,
      searchCategory: "isFree",
      label: "Free",
      value: "free",
    });   
    }
    else if (isFree.get === "paid") {
    temp.push({
      key: newKey,
      searchCategory: "isFree",
      label: "Paid",
      value: "paid",
    });          
    }


    //Delay setting the chip data to the next render cycle
    setTimeout(() => {
      chipData.set(temp, false);
      change.set(!change.get);
    }, 0);
  }, [isFree.get]);



    useEffect(() => {   
      if (isFree.get == IMMUTABLE_CHIP_VALUES.FREE) {
        setMinPrice(1);
        setMaxPrice(200);
      }
    }, [priceRange.minPrice.get, priceRange.maxPrice.get, isFree.get]);


  /**
   * Sets the new price filter
   * @param {*} event 
   * @param {*} newPrice 
   */
  const handlePriceChange = (event, newPrice) => {
    console.log("Handling price change");
    //Set UI price range
    setMinPrice(newPrice[0]);
    setMaxPrice(newPrice[1]);

    //Set filter data price range
    priceRange.minPrice.set(newPrice[0]);
    priceRange.maxPrice.set(newPrice[1]);
  };



  /**
   * Toggles search events as free or paid
   * @param {*} option 
   */
  const handleIsFree = (option) => {
    //Set ticket price filter to free
    if (option == "free") {
      priceRange.minPrice.set(null);
      priceRange.maxPrice.set(null);
      isFree.set("free");
    }
    //Set ticket price filter to paid
    else if (option == "paid") {
      priceRange.minPrice.set(1);
      priceRange.maxPrice.set(200);
      isFree.set("paid");
    }
  }

  
  /**
   * Formats the display for price in AUD
   * @param {*} price 
   * @returns 
   */
  const valueLabelFormat = (price) => {
    return `$${price}`;
  };



  //The HTML template
  return (
    <div>
    <h2>Price</h2>
    <RadioGroup
      aria-labelledby="price-radio-label"
      name="price-radio"
      value={isFree.get}
      onChange={(event) => {
        //Set price range to default paid
        if (event.target.value == false) {
          priceRange.minPrice.set(1); priceRange.maxPrice.set(200);
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
        defaultChecked={true}
        control={<Radio />}
        label="Free"
        onClick={() => handleIsFree("free")}
      />
      <FormControlLabel
        value="paid"
        control={<Radio />}
        label="Paid"
        onClick={() => handleIsFree("paid")}
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
        <p>AUD$5</p>
        <Slider
          sx={{
            color: "#EF7F4E",
            "& .MuiSlider-valueLabelOpen": {
              backgroundColor: "#4B7CBE",
            },
          }}
          getAriaLabel={() => "Price range"}
          onChange={handlePriceChange}
          value={[minPrice, maxPrice]}
          min={1}
          max={1000}
          step={1}
          valueLabelDisplay="on"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
        />
        <p>AUD$1000</p>
      </Stack>
    )}
  </div>
  );
  };



  //Export the Ticket Price Range component
  export default TicketPriceRange;