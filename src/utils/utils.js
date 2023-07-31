/**
 * Shared global scope functions
 */


import dayjs from 'dayjs';

//Minimum time field for hours, minutes, seconds, and ms
const minTimeField = 0;
//Max time fields for hours, minutes, seconds, and ms
const maxHour = 23;
const maxMin = 59;
const maxSec = 59;
const maxMs = 999;
//ISO string format for sending to db
const isoFormat = "YYYY-MM-DD HH:mm:ss";
const isoTimezone = "Z";


/**
 * Convert ISO date string to locale date time
 * @param {*} ISOdate ISO date string (without the timezone)
 * @returns Local date string
 */
export const toLocalDTString = async function (ISOdate) {
  //Date obj from ISO string
  const date = new Date(Date.parse(ISOdate + isoTimezone));
  //Convert date obj to localtime String in custom format
  const stringDate = date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  //Return local time string
  console.log("Local Time: ", stringDate);
  return stringDate;
};


/**
 * Get today's ISO date range
 * @returns Object containing minDate and maxDate iso strings
 */
export const getTodayISODates = () => {
  //Min and max date objs
  let minDate;
  let maxDate;
  //Min and max date iso strings
  let minIso;
  let maxIso;

  //Assign current datetime as ISO String
  minDate = new Date();

  //Assign latest datetime ISO string for today
  maxDate = new Date();
  maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  //Date range iso strings
  minIso = dayjs(minDate.toISOString()).format(isoFormat);
  maxIso = dayjs(maxDate.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso
  }
}

/**
 * Get tomorrow's ISO date range
 * @returns Object containing minDate and maxDate iso strings
 */
export const getTomorrowISODates = () => {
  //Min and max date objs
  let minDate;
  let maxDate;
  //Min and max date iso strings
  let minIso;
  let maxIso;

  //Set minimum date iso
  minDate = new Date();
  minDate.setDate(new Date() + 1);
  minDate.setHours(minTimeField);
  minIso = dayjs(minDate.toISOString()).format(isoFormat);

  //Set maximum date iso
  maxDate = new Date();
  maxDate.setDate(new Date() + 1);
  maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  maxIso = dayjs(maxDate.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso
  }
}


/**
 * Get this weekend's remaining time ISO date range
 * @returns Object containing minDate and maxDate iso strings
 */
export const getWeekendISODates = () => {
  //Min and max date objs
  let minDate;
  let maxDate;
  //Min and max date iso strings
  let minIso;
  let maxIso;

  //Assign current datetime as ISO String
  const currDate = new Date();
  //Get current day (0 is sunday...6 is Saturday)
  const currDay = currDate.getDay();

  //If today isn't during a weekend
  if (currDay != 0 && currDay != 6) {
    //Find days til saturday and sunday
    const daysTilSaturday = (6 - currDay + 7) % 7;
    const daysTilSunday = (7 - currDay + 7) % 7;
    //Find ISO string of earliest Saturday datetime
    minDate = new Date(currDate);
    minDate.setDate(currDate.getDate() + daysTilSaturday);
    minDate.setHours(minTimeField);
    //Find ISO string of latest Sunday datetime
    maxDate = new Date(currDate);
    maxDate.setDate(currDate.getDate() + daysTilSunday);
    maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  }
  //If today is Saturday
  else if (currDay == 6) {
    //Find minimum date iso string
    minDate = new Date();
    minDate.setHours(minTimeField);
    //Find maximum date iso string
    maxDate = new Date(currDate.getDate() + 1);
    maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  }
  //If today is Sunday
  else if (currDay == 0) {
    //Find minimum date
    minDate = new Date();
    minDate.setHours(minTimeField);
    //Find maximum date
    maxDate = new Date();
    maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  }
  //currDay has invalid value
  else {
    throw new Error("A problem occured when finding weekend date range");
  }

  //Set minimum date iso string
  minIso = dayjs(minDate.toISOString()).format(isoFormat);
  //Set maximum date iso string
  maxIso = dayjs(maxDate.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso
  }
}


/**
 * Get first letter of organisation's or customer's name
 * @param {*} name 
 * @returns 
 */
export const getFirstLetters = (name) => {
  if (name.includes(" ")) {
    let split = name.split(" ");
    let a = split[0].charAt(0);
    let b = split[1].charAt(0);

    return a + b;
  } else {
    return name.charAt(0);
  }
}
