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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { getAustralianTimezones } from "../../utils/utils";

const DateTime = (props) => {
  const timezones = getAustralianTimezones();
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
                      <MenuItem key={i} value={time.value}>{time.label}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <p>Event start time:</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={
                        props.eventStartTime
                          ? dayjs(props.eventStartTime)
                          : null
                      }
                      onChange={(newValue) =>
                        props.setEventStartTime(new Date(Date.parse(newValue)))
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
                        props.eventEndTime ? dayjs(props.eventEndTime) : null
                      }
                      onChange={(newValue) =>
                        props.setEventEndTime(new Date(Date.parse(newValue)))
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
