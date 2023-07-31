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
import { getTodayISODates, getTomorrowISODates, getWeekendISODates } from "../../../../utils/utils";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";


const DateRadioBtns = () => {


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
    dateRange,
    change,
    chipData
  } = useContext(SearchEventFiltersContext);



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

    //Get ISO range for today
    if (value === "Today") {
      tempDateRange = getTodayISODates();
    }
    //Get ISO range for tomorrow
    else if (value === "Tomorrow") {
      tempDateRange = getTomorrowISODates();
    }
    //Get ISO range for this weekend
    else if (value === "Weekend") {
      tempDateRange = getWeekendISODates();
    }

    //Add chip to temp filter chips
    temp.push({
      //Set key
      key: newKey,
      //Set search category
      searchCategory: "date",
      //Set label
      label: value,
      //Set the value
      value: tempDateRange.minDate + "-" + tempDateRange.maxDate,
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
        defaultValue="Today"
        name="date-radio"
        onChange={(event) => chipSelectDate(event.target.value)}
      >
        <FormControlLabel
          value="Today"
          control={<Radio />}
          label="Today"
        />
        <FormControlLabel
          value="Tomorrow"
          control={<Radio />}
          label="Tomorrow"
        />
        <FormControlLabel
          value="Weekend"
          control={<Radio />}
          label="This weekend"
        />
        <FormControlLabel
          value="select-date"
          control={<Radio />}
          label="Select a date"
          disabled={true}
        />
      </RadioGroup>
      <Link>View more</Link>
    </div>
  );
};



//Export the Event Radiobutton Date Range component
export default DateRadioBtns;