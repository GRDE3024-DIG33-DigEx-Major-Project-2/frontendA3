/**
 * Ticker price range component
 */

//Import dependencies
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack
} from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
import { v4 as uuidv4 } from 'uuid';

/**
 * Builds TicketPriceRange component
 * @returns Render of TicketPriceRange component
 */
const TicketPriceRange = () => {


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



  //If set to free, set price range to default
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
    if (option === "free") {
      priceRange.minPrice.set(0);
      priceRange.maxPrice.set(0);
      setMinPrice(0);
      setMaxPrice(0);
      isFree.set("free");
    } else if (option === "paid") {
      priceRange.minPrice.set(1);
      priceRange.maxPrice.set(200);
      setMinPrice(1);
      setMaxPrice(200);
      isFree.set("paid");
    }
    //Trigger the change for the search
    change.set(!change.get);
  };


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
        onChange={(event) => handleIsFree(event.target.value)}
      >
        <FormControlLabel
          value="free"
          defaultChecked={true}
          control={<Radio />}
          label="Free"
        />
        <FormControlLabel
          value="paid"
          control={<Radio />}
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