/**
 * Date radio buttons component
 */


//Import dependencies
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { getTodayISODates, getTomorrowISODates, getWeekendISODates, getThisWeekISODates, getThisMonthsISODates } from "../../../../utils/utils";
import { useContext } from "react";
//Import search event props
import { SearchEventFiltersContext } from "../../../../props/search-events.prop";
import { v4 as uuidv4 } from 'uuid';

/**
 * Builds DateRadioBtns component
 * @returns Render of DateRadioBtns component
 */
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


  /**
   * Selects the event start-date filter display chip
   * @param {*} value
   */
  const chipSelectDate = (value) => {
    //Filter chip key
    const newKey = uuidv4();
    //Filter chips
    let temp = chipData.get;

    //Date range specified
    let tempDateRange = null;

    //Disable date range filtering
    if (value === DATE_RANGES.ANY) {
      tempDateRange = { minDate: null, maxDate: null };
    }
    //Get ISO range for today
    else if (value === DATE_RANGES.TODAY) {
      tempDateRange = getTodayISODates();
    }
    //Get ISO range for tomorrow
    else if (value === DATE_RANGES.TOMORROW) {
      tempDateRange = getTomorrowISODates();
    }
    //Get ISO range for this weekend
    else if (value === DATE_RANGES.WEEKEND) {
      tempDateRange = getWeekendISODates();
    }
    //Get ISO range for this week
    else if (value === DATE_RANGES.WEEK) {
      tempDateRange = getThisWeekISODates();
    }
    //Get ISO range for this month
    else if (value === DATE_RANGES.MONTH) {
      tempDateRange = getThisMonthsISODates();
    }
    else return;

    //Set the value for the date range radio buttons
    selectedDateRange.set(value);

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