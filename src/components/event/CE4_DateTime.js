import {
  Box,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { getAustralianTimezones } from "../../utils/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

const DateTime = (props) => {
  const timezones = getAustralianTimezones();
  const today = dayjs.utc();

  // checks if the date in parameters is the same as today
  const isSameDate = (date, secondDate) => {
    const first = date.toDate();
    const second = secondDate.toDate();

    if (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
      return true;
    else return false;
  };

  // creates a single date given a date and a time field
  const mergeDateTime = (date, time) => {
    const paramDate = date.toDate();
    const paramTime = time.toDate();

    var result = new Date(
      paramDate.getFullYear(),
      paramDate.getMonth(),
      paramDate.getDate(),
      paramTime.getHours(),
      paramTime.getMinutes(),
      paramTime.getSeconds()
    );
    return result;
  };

  return (
    <>
      <h2>Date and Time</h2>
      <div className="create-event-date-time">
        <Box alignItems="center" justifyContent="center">
          <form>
            <FormControl fullWidth>
              <Grid container spacing={2} paddingBottom="15px">
                <Grid
                  container
                  item
                  xs={6}
                  direction="column"
                  components={["DatePicker"]}
                >
                  <p>Event start date:</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="start-date-field-create-event"
                      className="search-form-els"
                      placeholder="Event Start Date"
                      minDate={today}
                      value={
                        props.eventStartDate
                          ? dayjs(props.eventStartDate)
                          : null
                      }
                      onChange={(newValue) =>
                        props.setEventStartDate(new Date(Date.parse(newValue)))
                      }
                      slots={{
                        openPickerIcon: ArrowDropDownOutlinedIcon,
                      }}
                      slotProps={{
                        textField: {
                          placeholder: "Select a starting date",
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
                  <p>Event end date:</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="start-date-field-create-event"
                      className="search-form-els"
                      placeholder="Event End Date"
                      minDate={
                        props.eventStartDate
                          ? dayjs(props.eventStartDate)
                          : today
                      }
                      value={
                        props.eventEndDate ? dayjs(props.eventEndDate) : null
                      }
                      onChange={(newValue) =>
                        props.setEventEndDate(new Date(Date.parse(newValue)))
                      }
                      slots={{
                        openPickerIcon: ArrowDropDownOutlinedIcon,
                      }}
                      slotProps={{
                        textField: {
                          placeholder: "Select an ending date",
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
                  <p>Time Zone:</p>
                  <Select
                    value={props.eventTimezone}
                    sx={{ color: "#4B7CBE" }}
                    id="create-event-time-zone"
                    placeholder="Timezone"
                    onChange={(event) =>
                      props.setEventTimezone(event.target.value)
                    }
                  >
                    {timezones.map((time, i) => (
                      <MenuItem key={i} value={time.value}>
                        {time.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p>Event start time:</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={
                        props.eventStartTime
                          ? dayjs.utc(props.eventStartTime)
                          : null
                      }
                      minTime={
                        isSameDate(dayjs.utc(props.eventStartDate), dayjs.utc())
                          ? dayjs().tz(props.eventTimezone)
                          : null
                      }
                      timezone={props.eventTimezone}
                      onChange={(newValue) =>
                        props.setEventStartTime(dayjs.utc(newValue))
                      }
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                      slotProps={{
                        textField: {
                          placeholder: "Select a starting time",
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <p>Event end time:</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={
                        props.eventEndTime
                          ? dayjs.utc(props.eventEndTime)
                          : null
                      }
                      timezone={props.eventTimezone}
                      minTime={
                        props.eventStartDate &&
                        props.eventStartTime &&
                        isSameDate(
                          dayjs.utc(props.eventStartDate),
                          dayjs.utc(props.eventEndDate)
                        )
                          ? dayjs(
                              mergeDateTime(
                                dayjs.utc(props.eventStartDate),
                                dayjs.utc(props.eventStartTime)
                              )
                            ).tz(props.eventTimezone)
                          : null
                      }
                      onChange={(newValue) =>
                        props.setEventEndTime(dayjs.utc(newValue))
                      }
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                      slotProps={{
                        textField: {
                          placeholder: "Select an ending time",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </div>
    </>
  );
};

export default DateTime;
