/**
 * Shared global scope functions
 */

//Import dependencies
import dayjs from "dayjs";
import axios from "axios";

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
 * Play a sound file
 */
export const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play();
};

/**
 * Delay by ms specified
 * @param {*} ms
 * @returns Promise that resolves after the ms set
 */
export const delay = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
    maxDate: maxIso,
  };
};

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
  minDate.setDate(minDate.getDate() + 1);
  minDate.setHours(minTimeField, minTimeField, minTimeField);
  minIso = dayjs(minDate.toISOString()).format(isoFormat);

  //Set maximum date iso
  maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1);
  maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  maxIso = dayjs(maxDate.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso,
  };
};

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
    minDate.setHours(minTimeField, minTimeField, minTimeField);
    //Find ISO string of latest Sunday datetime
    maxDate = new Date(currDate);
    maxDate.setDate(currDate.getDate() + daysTilSunday);
    maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  }
  //If today is Saturday
  else if (currDay == 6) {
    //Find minimum date iso string
    minDate = new Date();
    minDate.setHours(minTimeField, minTimeField, minTimeField);
    //Find maximum date iso string
    maxDate = new Date(currDate.getDate() + 1);
    maxDate.setHours(maxHour, maxMin, maxSec, maxMs);
  }
  //If today is Sunday
  else if (currDay == 0) {
    //Find minimum date
    minDate = new Date();
    minDate.setHours(minTimeField, minTimeField, minTimeField);
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
    maxDate: maxIso,
  };
};

/**
 * Get this week's remaining time ISO date range
 * @returns Object containing minDate and maxDate iso strings
 */
export const getThisWeekISODates = () => {
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
  const remainingDays = 6 - currDay;

  minDate = new Date();
  maxDate = new Date(
    currDate.getTime() + (remainingDays + 1) * 24 * 60 * 60 * 1000
  );

  //Date range iso strings
  minIso = dayjs(minDate.toISOString()).format(isoFormat);
  maxIso = dayjs(maxDate.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso,
  };
};

/**
 * Get this month's remaining time ISO date range
 * @returns Object containing minDate and maxDate iso strings
 */
export const getThisMonthsISODates = () => {
  //Min and max date iso strings
  let minIso;
  let maxIso;

  //Calculate start and end datetime of remaining month
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const remainingTime = lastDayOfMonth.getTime() - now.getTime();
  const endOfMonth = new Date(now.getTime() + remainingTime);

  //Date range iso strings
  minIso = dayjs(now.toISOString()).format(isoFormat);
  maxIso = dayjs(endOfMonth.toISOString()).format(isoFormat);

  //Return date range ISO strings
  return {
    minDate: minIso,
    maxDate: maxIso,
  };
};

/**
 * Get first letter of organiser's or attendee's name
 * @param {*} name
 * @returns The first letter of the organiser/attendee name
 */
export const getFirstLetters = (name) => {
  if (name.includes(" ")) {
    if (name.includes(" ")) {
      let split = name.split(" ");
      let a = split[0].charAt(0);
      let b = split[1].charAt(0);

      return a + b;
    } else {
      return name.charAt(0);
    }
  }
};

/**
 * Get australia time zones
 * @returns Australia time zones
 */
export const getAustralianTimezones = () => {
  let timezones = [];
  timezones.push({ value: "Australia/Perth", label: "(UTC+8:00) Perth" });
  timezones.push({ value: "Australia/Eucla", label: "(UTC+8:45) Eucla" });
  timezones.push({ value: "Australia/Adelaide", label: "(UTC+9:30) Adelaide" });
  timezones.push({
    value: "Australia/Sydney",
    label: "(UTC+10:00) Sydney, Melbourne, Brisbane",
  });
  timezones.push({
    value: "Australia/Lord_Howe",
    label: "(UTC+10:30) Lord Howe Island",
  });

  return timezones;
};

/**
 * Get Sydney suburbs in your postcode area
 * @param {*} postcode The postcode to pinpoint nearby suburbs
 * @returns Nearby suburbs
 */
export const getSuburbs = async (postcode) => {
  let suburbs = [];

  let intPC = parseInt(postcode);
  await axios
    .get("https://data.handyapi.com/au-postcodes/" + parseInt(intPC))
    .then((response) => (suburbs = response.data.Locations))
    .catch((error) => {
      console.log(error);
    });

  return suburbs;
};

/**
 * Normalise string to capitalise first letter of each word
 * @param {*} string Words to capitalise
 * @returns String of capitalised words
 */
export const capitaliseString = (string) => {
  const splitStr = string.split(" ");

  let result = "";

  splitStr.forEach((subStr) => {
    let firstLetter = subStr[0].toUpperCase();
    let remainder = subStr.slice(1).toLowerCase();
    let word = firstLetter + remainder;
    result += word += " ";
  });

  return result.trim();
};

/**
 * Get date range for event cards
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns Date range string for event cards
 */
export const getDateRangeString = (startDate, endDate) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const currentStartDate = new Date(Date.parse(startDate));
  const currentEndDate = new Date(Date.parse(endDate));

  if (
    currentStartDate.getDate() === currentEndDate.getDate() &&
    currentStartDate.getMonth() === currentEndDate.getMonth()
  ) {
    return currentStartDate.toLocaleDateString("en-AU", dateOptions);
  }

  if (currentStartDate.getMonth() === currentEndDate.getMonth()) {
    return (
      currentStartDate.getDate() +
      " - " +
      currentEndDate.toLocaleDateString("en-AU", dateOptions)
    );
  }

  return (
    currentStartDate.toLocaleDateString("en-AU", dateOptions) +
    " - " +
    currentEndDate.toLocaleDateString("en-AU", dateOptions)
  );
};

/**
 * Get price range for event cards
 * @param {*} tickets 
 * @returns Price range string for event cards
 */
export const getPriceRangeString = (tickets) => {
  if (tickets.length === 0) return "No price data";
  if (tickets.length === 1) return "$" + tickets[0].price;

  let max = parseFloat(tickets[0].price);
  let min = parseFloat(tickets[0].price);

  tickets.forEach((ticket) => {
    let currentPrice = parseFloat(ticket.price);
    if (currentPrice < min) min = currentPrice;
    if (currentPrice > max) max = currentPrice;
  });

  return "$" + min.toFixed(2) + " - " + "$" + max.toFixed(2);
};

/**
 * Creates a single date given a date and a time field
 * @param {*} date 
 * @param {*} time 
 * @returns Single date given a date and a time field
 */
export const mergeDateTime = (date, time) => {
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

/**
 * Checks if url is valid
 * @param {*} urlString 
 * @returns True if valid url, else false
 */
export const isValidURL = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Scroll to top of page
 * @param {*} event
 */
export const scrollToTop = async (event) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Creates and returns array of Sydney suburbs
 * @returns List of suburbs in Sydney
 */
export const getAllSuburbs = () => {
  let suburbs = [];
  suburbs.push("Alexandria");
  suburbs.push("Annandale");
  suburbs.push("Ashfield");
  suburbs.push("Balmain");
  suburbs.push("Barangaroo");
  suburbs.push("Beaconsfield");
  suburbs.push("Bellevue Hill");
  suburbs.push("Birchgrove");
  suburbs.push("Bondi Beach");
  suburbs.push("Bondi Junction");
  suburbs.push("Bronte");
  suburbs.push("Camperdown");
  suburbs.push("Centennial Park");
  suburbs.push("Chatswood");
  suburbs.push("Chinatown");
  suburbs.push("Chippendale");
  suburbs.push("Clifton Gardens");
  suburbs.push("Clovelly");
  suburbs.push("Concord");
  suburbs.push("Coogee");
  suburbs.push("Cremorne");
  suburbs.push("Crows Nest");
  suburbs.push("Darling Harbour");
  suburbs.push("Darlinghurst");
  suburbs.push("Darling Point");
  suburbs.push("Darlington");
  suburbs.push("Dawes Point");
  suburbs.push("Double Bay");
  suburbs.push("Dover Heights");
  suburbs.push("Drummoyne");
  suburbs.push("East Sydney");
  suburbs.push("Edgecliff");
  suburbs.push("Elizabeth Bay");
  suburbs.push("Erskineville");
  suburbs.push("Eveleigh");
  suburbs.push("Forest Lodge");
  suburbs.push("Glebe");
  suburbs.push("Greenwich");
  suburbs.push("Haberfield");
  suburbs.push("Haymarket");
  suburbs.push("Homebush");
  suburbs.push("Kings Cross");
  suburbs.push("Kingsford");
  suburbs.push("Kirribilli");
  suburbs.push("Lane Cove");
  suburbs.push("Lavender Bay");
  suburbs.push("Leichhardt");
  suburbs.push("Lewisham");
  suburbs.push("Lilyfield");
  suburbs.push("Manly");
  suburbs.push("Maroubra");
  suburbs.push("Marrickville");
  suburbs.push("Mascot");
  suburbs.push("McMahons Point");
  suburbs.push("Millers Point");
  suburbs.push("Milsons Point");
  suburbs.push("Moore Park");
  suburbs.push("Mosman");
  suburbs.push("Newtown");
  suburbs.push("Neutral Bay");
  suburbs.push("North Bondi");
  suburbs.push("North Sydney");
  suburbs.push("Northwood");
  suburbs.push("Paddington");
  suburbs.push("Parramatta");
  suburbs.push("Petersham");
  suburbs.push("Point Piper");
  suburbs.push("Potts Point");
  suburbs.push("Pyrmont");
  suburbs.push("Randwick");
  suburbs.push("Redfern");
  suburbs.push("Rose Bay");
  suburbs.push("Rosebery");
  suburbs.push("Rozelle");
  suburbs.push("Rushcutters Bay");
  suburbs.push("Ryde");
  suburbs.push("Stanmore");
  suburbs.push("St Peters");
  suburbs.push("Strathfield");
  suburbs.push("Surry Hills");
  suburbs.push("Sydenham");
  suburbs.push("Sydney");
  suburbs.push("Sydney Olimpic Park");
  suburbs.push("Tamarama");
  suburbs.push("Tempe");
  suburbs.push("The Rocks");
  suburbs.push("Ultimo");
  suburbs.push("Vaucluse");
  suburbs.push("Waterloo");
  suburbs.push("Waverley");
  suburbs.push("Waverton");
  suburbs.push("Watsons Bay");
  suburbs.push("Woollahra");
  suburbs.push("Wolli Creek");
  suburbs.push("Woolloomooloo");
  suburbs.push("Woolstonecraft");
  suburbs.push("Zetland");
  return suburbs;
};
