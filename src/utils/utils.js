// we can use this file for shared global scope functions
import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;

const searchEventsURL = baseURL + "event/search-page";
const getAllTagsUrl = baseURL + "event/tags"

// Get all events from endpoint - can specify genre
export const getAllEvents = async function (tagId) {
  let events = [];
  let requestBody = {}

  if (tagId){
    requestBody = {
      page: 0,
      tags: [tagId]
    };
  } else {
    requestBody = {
      page: 0,
      tags: []
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
  tomorrow.setDate(today.getDate()+1);
  return tomorrow.toISOString();
}

// get first letter of organisation's or customer's name
export const getFirstLetters = (name) => {
  if(name.includes(" ")){
    let split = name.split(" ");
    let a = split[0].charAt(0);
    let b = split[1].charAt(0);

    return a+b;
  } else {
    return name.charAt(0);
  }
}
