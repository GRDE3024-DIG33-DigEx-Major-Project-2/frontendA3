/**
 * Date radio buttons component
 */


//Import dependencies
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getTodayISODates, getTomorrowISODates, getWeekendISODates, getThisWeekISODates, getThisMonthsISODates } from "../../../../utils/utils";
import { useContext, useState, useEffect } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
import { v4 as uuidv4 } from 'uuid';


const DateRadioBtns = () => {




  /**
   * Prop context for search event filters
   */
  const {
    dateRange,
    change,
    chipData,
    DATE_RANGES,
    selectedDateRange
  } = useContext(SearchEventFiltersContext);

  

    //Handle chip data changes when selectedDateRange changes
    useEffect(() => {
      let temp = chipData.get;
      temp = temp.filter((x) => x.searchCategory !== "date");
      const newKey = uuidv4();
      temp.push({
        key: newKey,
        searchCategory: "date",
        label: selectedDateRange.get,
        value: selectedDateRange.get,
      });
  
      //Delay setting the chip data to the next render cycle
      setTimeout(() => {
        chipData.set(temp, false);
        change.set(!change.get);
      }, 0);

      //Set initial default chip on page load
      if (temp.filter((x) => x.searchCategory === "date") == null)
      temp.push({
        key: newKey,
        searchCategory: "date",
        label: selectedDateRange.get,
        value: selectedDateRange.get,
      });
    }, [selectedDateRange.get]);


  /**
   * Selects the event start-date filter display chip
   * @param {*} value 
   */
  const chipSelectDate = (value) => {
    //Filter chip key
    let newKey = chipData.get.length + 1;
    //Filter chips
    let temp = chipData.get;

    //Date range specified
    let tempDateRange = null;

    //Disable date range filtering
    if (value === DATE_RANGES.ANY) {
      console.log("Disabling date range filtering");
      tempDateRange = {minDate: null, maxDate: null};
    }
    //Get ISO range for today
    else if (value === DATE_RANGES.TODAY) {
      console.log("Getting Today's date range");
      tempDateRange = getTodayISODates();
    }
    //Get ISO range for tomorrow
    else if (value === DATE_RANGES.TOMORROW) {
      console.log("Getting Tomorrow's date range");
      tempDateRange = getTomorrowISODates();
    }
    //Get ISO range for this weekend
    else if (value === DATE_RANGES.WEEKEND) {
      console.log("Getting Weekend's date range");
      tempDateRange = getWeekendISODates();
    }
    //Get ISO range for this week
    else if (value === DATE_RANGES.WEEK) {
      console.log("Getting this Week's date range");
      tempDateRange = getThisWeekISODates();
    }
    //Get ISO range for this month 
    else if (value === DATE_RANGES.MONTH) {
      console.log("Getting this Month's date range");
      tempDateRange = getThisMonthsISODates();
    }
    else return;

    //Set the value for the date range radio buttons
    selectedDateRange.set(value);

    console.log("Result: ", tempDateRange);

    //Remove old date filter chip
    temp = temp.filter(x => x.searchCategory !== "date");

    //Add chip to temp filter chips
    temp.push({
      //Set key
      key: newKey,
      //Set search category
      searchCategory: "date",
      //Set label
      label: value,
      //Set the value
      value: (value === DATE_RANGES.ANY) ? DATE_RANGES.ANY : tempDateRange.minDate + "-" + tempDateRange.maxDate,
    });

    //Set filter props
    dateRange.minDate.set(tempDateRange.minDate);
    dateRange.maxDate.set(tempDateRange.maxDate);

    //Set chip data
    chipData.set(temp);
    //Flag the filter options as having changed
    change.set(!change.get);
  };



  //The HTML template
  return (
    <div>
      <h2>Date</h2>
      <RadioGroup
        value={selectedDateRange.get}
        name="date-radio"
        onChange={(event) => chipSelectDate(event.target.value)}
      >
        <FormControlLabel
          value={DATE_RANGES.ANY}
          control={<Radio />}
          label={DATE_RANGES.ANY}
        />
        <FormControlLabel
          value={DATE_RANGES.TODAY}
          control={<Radio />}
          label={DATE_RANGES.TODAY}
        />
        <FormControlLabel
          value={DATE_RANGES.TOMORROW}
          control={<Radio />}
          label={DATE_RANGES.TOMORROW}
        />
        <FormControlLabel
          value={DATE_RANGES.WEEKEND}
          control={<Radio />}
          label={DATE_RANGES.WEEKEND}
        />
        <FormControlLabel
          value={DATE_RANGES.WEEK}
          control={<Radio />}
          label={DATE_RANGES.WEEK}
        />
        <FormControlLabel
          value={DATE_RANGES.MONTH}
          control={<Radio />}
          label={DATE_RANGES.MONTH}
        />
      </RadioGroup>
    </div>
  );
};



//Export the Event Radiobutton Date Range component
export default DateRadioBtns;