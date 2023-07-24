/**
 * HTTP request handler for Event-related endpoints
 */

//Import dependencies
import axios from "axios";

// URL FOR LOCALHOST
const searchEventsURL = "http://localhost:3000/event/search-page";
const getAllTagsUrl = "http://localhost:3000/event/tags"

/**
 * Get a page of events from api endpoint
 * @param {*} tagIds 
 * @param {*} keywords Keywords that match 
 * @param {*} startDate The starting date of the event
 * @param {*} city The city the event is in
 * @param {*} priceRange Object that contains minPrice and maxPrice
 * @param {*} page The page of event matches requested
 * @returns Array of events and number of pages that match the filter options
 */
export const searchEvents = async function (tagIds, keywords, startDate, city, priceRange, page) {

  console.log("Inside Search Events");
  console.log(tagIds, keywords, startDate, city, page);

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    tags: tagIds,
    keywords: keywords,
    startDate: startDate,
    city: city,
    //priceRange: priceRange,
    page: page | 0
  };

  console.log("Request body test");
  console.log(requestBody);

  //Get the array of events and the page number
  await axios
    .post(searchEventsURL, requestBody)
    .then((response) => {
      console.log("Search Events Test...");
      console.log(response.data);
      events = response.data.events;
      pageCount = response.data.pageCount;
    })
    .catch((error) => {
      console.log(error);
    });


  //Return object containing API response data
  return { events: events, pageCount: pageCount };
};


/**
 * Find all tags in the database
 * @returns Object Array of Tags
 */
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