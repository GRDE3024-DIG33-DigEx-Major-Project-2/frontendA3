/**
 * Keywords filter component
 */


//Import dependencies
import {
    MenuItem,
    Select,
    Chip,
    TextField,
    Button,
    FormControl,
    Box,
  } from "@mui/material";
  import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SvgIcon from "@mui/material/SvgIcon";
  import { DatePicker, DateRange } from "@mui/x-date-pickers";
  import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
  import InputAdornment from "@mui/material/InputAdornment";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
  import { useState, useEffect } from "react";
  import { getTodayISODates, getTomorrowISODates, getWeekendISODates } from "../../../../utils/utils";
  import { useContext } from "react";
  //Import search event props
  import { SearchEventsContext, SearchEventFiltersContext } from "../../../../props/search-events.prop";
  import * as dayjs from 'dayjs';
  
  
  const ByKeywords = () => {
  
  
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
      change,
      location,
      chipData
    } = useContext(SearchEventFiltersContext);
  
  
  
    //The HTML template
    return (
        <TextField
        className="search-form-els"
        id="events-txt-field"
        variant="outlined"
        placeholder="Search artists, venues or events"
        onChange={(keywords) => keywords.set(keywords.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon color="primary" />
            </InputAdornment>
          ),
        }}
      ></TextField>
    );
  };
  
  
  
  //Export the ByLocation component
  export default ByKeywords;