/**
 * Date range picker component
 */

//Import dependencies
import {
  FormControl
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState, useEffect } from "react";
import { useContext } from "react";
//Import search event props
import {
  SearchEventFiltersContext,
} from "../../../../props/search-events.prop";
import * as dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en-au';


/**
 * Build DateRangePicker component
 * @returns Render of DateRangePicker component
 */
const DateRangePicker = () => {

  /**
   * Prop context for search event filters
   */
  const { dateRange, change, chipData, selectedDateRange } =
    useContext(SearchEventFiltersContext);

  //Prop states for selected min-max dates in template
  const [selectedMinDate, setSelectedMinDate] = useState();
  const [selectedMaxDate, setSelectedMaxDate] = useState();

  /**
   * Checks and disables invalid dates for minDate
   * @param {*} date The calendar date to assess
   * @returns {boolean} True if invalid date, false for valid date
   */
  const shouldDisableMinDate = (date) => {
    //Current date
    const currentDate = dayjs();

    if (dayjs(date).isBefore(currentDate, 'day')) {
      return true;
    }

    //Disable past dates
    if (dateRange.maxDate.get) {
    //Checks if min and max date are on the same day
    const isSameDay = dateRange.maxDate.get && dayjs(date).isSame(dayjs(dateRange.maxDate.get), 'day');
    //Disable the time if the time is after maxDate's selected time
    if (isSameDay && dayjs(date).isAfter(dayjs(dateRange.maxDate.get))) {
      return true;
    }
      return dayjs(date).isAfter(dayjs(dateRange.maxDate.get));
    }

    //Date is valid, so flag as not invalid
    return false;
  };


  /**
   * Checks and disables invalid dates for maxDate
   * @param {*} date The calendar date to assess
   * @returns {boolean} True if invalid date, false for valid date
   */
  const shouldDisableMaxDate = (date) => {
    //Current date
    const currentDate = dayjs();


    //Check if date is before today's date
    if (dayjs(date).isBefore(currentDate, 'day')) {
      return true;
    }
    //If the minDate is set, disable calendar dates before the minDate 
    else if (dateRange.minDate.get) {
    //Checks if min and max date are on the same day
    const isSameDay = dayjs(date).isSame(dayjs(dateRange.minDate.get), 'day');
    //Disable the time if the time is before minDate's selected time
    if (isSameDay && dayjs(date).isBefore(dayjs(dateRange.minDate.get))) {
      return true;
    }
      return dayjs(date).isBefore(dayjs(dateRange.minDate.get));
    }

    //Date is valid, so flag as not invalid
    return false;
  };


  /**
   * Set the date range values
   * @param {*} selectedDate
   * @param {*} dateVal
   */
  const SetDateHandler = (selectedDate, dateVal) => {
    const formattedDate = selectedDate.format("YYYY-MM-DD HH:mm:ss");
  
    if (dateVal === "minDate") {
      setSelectedMinDate(formattedDate);
    } else if (dateVal === "maxDate") {
      setSelectedMaxDate(formattedDate);
    }
  };
  


  /**
   * Update the date range prop values and filter display
   */
  useEffect(() => {
    if (!selectedMinDate || !selectedMaxDate) {
      return;
    }

    dateRange.minDate.set(selectedMinDate);
    dateRange.maxDate.set(selectedMaxDate);

    const replaceDateChip = () => {
      if (!selectedMinDate || !selectedMaxDate) {
        return;
      }
      //Filter chip key
      let newKey = chipData.get.length + 1;
      //Filter chips
      let temp = chipData.get;

      //Date range specified
      let tempDateRange = {
        minDate: selectedMinDate,
        maxDate: selectedMaxDate,
      };

      //Set the value for the date range radio buttons
      selectedDateRange.set(formatDateRange(selectedMinDate, selectedMaxDate));

      //Remove old date filter chip
      temp = temp.filter((x) => x.searchCategory !== "date");

      //Add chip to temp filter chips
      temp.push({
        //Set key
        key: newKey,
        //Set search category
        searchCategory: "date",
        //Set label
        label: tempDateRange.minDate + "-" + tempDateRange.maxDate,
        //Set the value
        value: tempDateRange.minDate + "-" + tempDateRange.maxDate,
      });

      //Set chip data
      chipData.set(temp);
      //Flag the filter options as having changed
      change.set(!change.get);
    };

    replaceDateChip();
  }, [selectedMinDate, selectedMaxDate]);

  /**
   * Formats the date range filter chip into readable text
   * @param {*} minDate
   * @param {*} maxDate
   * @returns
   */
  const formatDateRange = (minDate, maxDate) => {
    const formatString = "YYYY-MM-DD HH:mm:ss";
    const start = dayjs(minDate, formatString);
    const end = dayjs(maxDate, formatString);

    //Check if both dates are the same
    const isSameDay = start.format("YYYY-MM-DD") === end.format("YYYY-MM-DD");

    if (isSameDay) {
      //If same day, show date once followed by time range
      return `${start.format("DD/MM/YYYY HH:mm")} - ${end.format("HH:mm")}`;
    } else {
      //If different days, show full date-time range for both start and end
      return `${start.format("DD/MM/YYYY HH:mm")} - ${end.format(
        "DD/MM/YYYY HH:mm"
      )}`;
    }
  };

  //The HTML template
  return (
    <FormControl id="date-field-search">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
        <DateTimePicker
          className="search-form-els date-picker"
          minDate={dayjs()}
          value={selectedMinDate ? dayjs(selectedMinDate) : null}
          onChange={(minDate) => SetDateHandler(minDate, "minDate")}
          shouldDisableDate={shouldDisableMinDate}
          slots={{
            openPickerIcon: ArrowDropDownOutlinedIcon,
          }}
          slotProps={{
            textField: {
              placeholder: "Start date",
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
          className="search-form-els date-picker"
          minDate={dayjs()}
          value={selectedMaxDate ? dayjs(selectedMaxDate) : null}
          onChange={(maxDate) => SetDateHandler(maxDate, "maxDate")}
          shouldDisableDate={shouldDisableMaxDate}
          slots={{
            openPickerIcon: ArrowDropDownOutlinedIcon,
          }}
          slotProps={{
            textField: {
              placeholder: "End date",
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
    </FormControl>
  );
};

//Export the Event Date Range component
export default DateRangePicker;
