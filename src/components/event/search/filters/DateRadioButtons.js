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
    console.clear();
    //Filter chip key
    let newKey = chipData.get.length + 1;
    //Filter chips
    let temp = chipData.get;

    //Date range specified
    let tempDateRange = null;

    //Disable date range filtering
    if (value === "None") {
      console.log("Disabling date range filtering");
      tempDateRange = {minDate: null, maxDate: null};
    }
    //Get ISO range for today
    else if (value === "Today") {
      console.log("Getting Today's date range");
      tempDateRange = getTodayISODates();
    }
    //Get ISO range for tomorrow
    else if (value === "Tomorrow") {
      console.log("Getting Tomorrow's date range");
      tempDateRange = getTomorrowISODates();
    }
    //Get ISO range for this weekend
    else if (value === "Weekend") {
      console.log("Getting Weekend's date range");
      tempDateRange = getWeekendISODates();
    }
    //Get ISO range for this week
    else if (value === "Week") {
      console.log("Getting this Week's date range");
      tempDateRange = getThisWeekISODates();
    }
    //Get ISO range for this month 
    else if (value === "Month") {
      console.log("Getting this Month's date range");
      tempDateRange = getThisMonthsISODates();
    }
    else return;

    console.log("Result: ", tempDateRange);

    //Remove old date filter chip
    temp = temp.filter(x => x.searchCategory !== "date");

    //Add chip to temp filter chips
    if (value !== "None")
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
        defaultValue="None"
        name="date-radio"
        onChange={(event) => chipSelectDate(event.target.value)}
      >
        <FormControlLabel
          value="None"
          control={<Radio />}
          label="None"
        />
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
          value="Week"
          control={<Radio />}
          label="This week"
        />
        <FormControlLabel
          value="Month"
          control={<Radio />}
          label="This month"
        />
      </RadioGroup>
      {/* <Link>View more</Link> */}
    </div>
  );
};



//Export the Event Radiobutton Date Range component
export default DateRadioBtns;