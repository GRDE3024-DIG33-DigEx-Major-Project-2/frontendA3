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
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState, useEffect } from "react";
import {
  getTodayISODates,
  getTomorrowISODates,
  getWeekendISODates,
} from "../../../../utils/utils";
import { useContext } from "react";
//Import search event props
import {
  SearchEventsContext,
  SearchEventFiltersContext,
} from "../../../../props/search-events.prop";
import * as dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { v4 as uuidv4 } from "uuid";

const DateRangePicker = () => {
  /**
   * Prop context for search event data
   */
  const { events, pageCount, tags } = useContext(SearchEventsContext);

  /**
   * Prop context for search event filters
   */
  const { dateRange, change, chipData, selectedDateRange, DATE_RANGES } =
    useContext(SearchEventFiltersContext);

  const [selectedMinDate, setSelectedMinDate] = useState();
  const [selectedMaxDate, setSelectedMaxDate] = useState();

  /**
   * Disable invalid dates for min-max datetime picker
   * @param {*} date
   * @returns
   */
  const ShouldDisableDate = (date, dateVal) => {
    if (dateVal === "maxDate" && dateRange.minDate.get) {
      return dayjs(date).isBefore(dayjs(dateRange.minDate.get));
    } else if (dateVal === "minDate" && dateRange.maxDate.get) {
      return dayjs(date).isAfter(dayjs(dateRange.maxDate.get));
    }
    return false;
  };

  /**
   * Set the date range values
   * @param {*} selectedDate
   * @param {*} dateVal
   */
  const SetDateHandler = (selectedDate, dateVal) => {
    if (
      dateVal === "minDate" &&
      dayjs(selectedDate).isBefore(dayjs(dateRange.maxDate.get))
    ) {
      setSelectedMinDate(selectedDate);
    } else if (
      dateVal === "maxDate" &&
      dayjs(selectedDate).isAfter(dayjs(dateRange.minDate.get))
    ) {
      setSelectedMaxDate(selectedDate);
    }
  };

  /**
   * Update the date range prop values and filter diaplay
   */
  useEffect(() => {
    if(!selectedMinDate || !selectedMaxDate) {
      return;
   }

    dateRange.minDate.set(selectedMinDate);

    dateRange.maxDate.set(selectedMaxDate);

    const replaceDateChip = () => {
      if(!selectedMinDate || !selectedMaxDate) {
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          className="search-form-els date-picker"
          dateFormat="YYYY-MM-DD HH:MM:SS"
          minDate={dayjs()}
          value={selectedMinDate ? dayjs(selectedMinDate) : null}
          onChange={(minDate) => SetDateHandler(minDate, "minDate")}
          shouldDisableDate={(minDate) => ShouldDisableDate(minDate, "minDate")}
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
          dateFormat="YYYY-MM-DD HH:MM:SS"
          value={selectedMaxDate ? dayjs(selectedMaxDate) : null}
          onChange={(maxDate) => SetDateHandler(maxDate, "maxDate")}
          shouldDisableDate={(maxDate) => ShouldDisableDate(maxDate, "maxDate")}
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
