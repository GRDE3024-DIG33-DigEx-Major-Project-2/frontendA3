// we can use this file for shared global scope functions

import axios from "axios";

// URL FOR DEPLOYED VERSION
// const searchEventsURL = "https://gigney.ryanriddiford.com/event/search-page";

// URL FOR LOCALHOST
const searchEventsURL = "http://localhost:3000/event/search-page";
const getAllTagsUrl = "http://localhost:3000/event/tags"

// Get all events from endpoint
export const getAllEvents = async function (genre) {
  let events = [];

  const requestBody = {
    page: 0,
    tags: []
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
