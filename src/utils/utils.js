// we can use this file for shared global scope functions
import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;

const searchEventsURL = baseURL + "event/search-page";
const getAllTagsUrl = baseURL + "event/tags";

// Get all events from endpoint - can specify genre
export const getAllEvents = async function (tagId) {
  let events = [];
  let requestBody = {};

  if (tagId) {
    requestBody = {
      page: 0,
      tags: [tagId],
    };
  } else {
    requestBody = {
      page: 0,
      tags: [],
    };
  }

  await axios
    .post(searchEventsURL, requestBody)
    .then((response) => {
      events = response.data.events;
    })
    .catch((error) => {
      console.log(error);
    });

  return events;
};

export const getAllTags = async function () {
  let tags = [];

  await axios
    .get(getAllTagsUrl)
    .then((response) => {
      tags = response.data.tags;
    })
    .catch((error) => {
      console.log(error);
    });

  return tags;
};

// convert ISO date to locale date time
export const getDateTimeString = async function (ISOdate) {
  const date = new Date(Date.parse(ISOdate));
  const stringDate = date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("THIS ");
  console.log(stringDate);
  return stringDate;
};

export const getTomorrowISODate = () => {
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString();
};

// get first letter of organisation's or customer's name
export const getFirstLetters = (name) => {
  if (name.includes(" ")) {
    let split = name.split(" ");
    let a = split[0].charAt(0);
    let b = split[1].charAt(0);

    return a + b;
  } else {
    return name.charAt(0);
  }
};

// Get australia time zones
export const getAustralianTimezones = () => {
  let timezones = [];
  timezones.push({ value: "AWST", label: "(UTC+8:00) Perth" });
  timezones.push({ value: "ACWST", label: "(UTC+8:45) Eucla" });
  timezones.push({ value: "ACST", label: "(UTC+9:30) Adelaide" });
  timezones.push({
    value: "AEST",
    label: "(UTC+10:00) Sydney, Melbourne, Brisbane",
  });
  timezones.push({ value: "LHST", label: "(UTC+10:30) Lord Howe Island" });

  return timezones;
};

// get date range for event cards
export const getDateRangeString = (startDate, endDate) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const currentStartDate = new Date(Date.parse(startDate));
  const currentEndDate = new Date(Date.parse(endDate));

  if (currentStartDate.getDate() === currentEndDate.getDate() && currentStartDate.getMonth() === currentEndDate.getMonth()) {
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
