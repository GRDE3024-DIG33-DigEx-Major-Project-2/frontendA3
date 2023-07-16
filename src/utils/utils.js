// we can use this file for shared global scope functions

import axios from "axios";

const searchEventsURL = "https://gigney.ryanriddiford.com/event/search-page";

// Get all events from endpoint
export const getAllEvents = async function (genre) {
  let events = [];

  const requestBody = {
    offset: 0,
  };

  await axios
    .post(searchEventsURL, requestBody)
    .then((response) => {
      events = response.data.events;
      console.log(events);
    })
    .catch((error) => {
      console.log(error);
    });

  return events;
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
