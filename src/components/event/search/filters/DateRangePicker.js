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




  const SetDateHandler = (startDate) => {
    console.log("in setDateHandler");
    //TODO CONTINUE
//dateRange.minDate.set(dayjs(new Date(startDate).toISOString()).format("YYYY-MM-DD HH:mm:ss"))
  }



  //The HTML template
  return (
    <DatePicker
      id="date-field-search"
      className="search-form-els"
      placeholder="Date"
      //value={getTodayISODates().minDate}
      onChange={SetDateHandler(this)}
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
      localeText={{ start: 'Check-in', end: 'Check-out' }} />
  );
};



//Export the Event Date Range component
export default DateRangePicker;