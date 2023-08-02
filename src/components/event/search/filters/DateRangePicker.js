/**
 * Date range picker component
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
import { useState, useEffect } from "react";
import { getTodayISODates, getTomorrowISODates, getWeekendISODates } from "../../../../utils/utils";
import { useContext } from "react";
//Import search event props
import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
import * as dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const DateRangePicker = () => {




  //const defaultMin = 


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
 * Disable invalid dates for min-max datetime picker
 * @param {*} date 
 * @returns 
 */
const ShouldDisableDate = (date) => {
      const currentDate = date.toDate();
      return currentDate < dateRange.minDate || currentDate > dateRange.maxDate;
}  



  const SetDateHandler = (selectedDate, dateVal) => {
    console.log("in setDateHandler");

    const selectedDateObj = selectedDate.toDate();
    const selectedDateISO = selectedDateObj.toISOString();

    const formattedDate = dayjs(selectedDateISO).format("YYYY-MM-DD HH:mm:ss");

    //minDate change attempt -- validate it and complete
    if (dateVal == "minDate") {
      //Make sure minDate change is less/equal maxDate
      if (dateRange.maxDate.get >= formattedDate) {
        dateRange.minDate.set(formattedDate);
      }
    //Invalid -- revert
    else {
      selectedDate.value = dayjs(dateRange.minDate.get);
    }      
    }
    //maxDate change attempt -- validate it and complete
    else if (dateVal == "maxDate") {
  //Make sure maxDate change is greater/equal minDate
  if (dateRange.minDate.get <= formattedDate) {
    dateRange.maxDate.set(formattedDate);
  }
  //Invalid -- revert
  else {
    selectedDate.value = dayjs(dateRange.maxDate.get);
  }
}
  }



//The HTML template
return (
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        id="date-field-search-min"
        className="search-form-els"
        //label="Minimum Date"
        dateFormat="YYYY-MM-DD HH:MM:SS"
        placeholder="Minimum Date"
        defaultValue={dayjs(dateRange.minDate.get)}
        value={dayjs(dateRange.minDate.get)}
        onChange={(minDate) => SetDateHandler(minDate, 'minDate')}
        shouldDisableDate={ShouldDisableDate}
        slots={{
          openPickerIcon: ArrowDropDownOutlinedIcon
        }}
        slotProps={{
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon color="primary" />
                </InputAdornment>
              ),
            },
          },
        }}
      />
      <DateTimePicker
        id="date-field-search-max"
        className="search-form-els"
        //label="Maximum Date"
        dateFormat="YYYY-MM-DD HH:MM:SS"
        placeholder="Maximum Date"
        defaultValue={dayjs(dateRange.maxDate.get)}
        value={dayjs(dateRange.maxDate.get)}
        onChange={(maxDate) => SetDateHandler(maxDate, 'maxDate')}
        shouldDisableDate={ShouldDisableDate}
        slots={{
          openPickerIcon: ArrowDropDownOutlinedIcon
        }}
        slotProps={{
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon color="primary" />
                </InputAdornment>
              ),
            },
          },
        }}
      />


    </LocalizationProvider>
  </>
);
};



//Export the Event Date Range component
export default DateRangePicker;