/**
 * HTTP request handler for Event-related endpoints
 */

//Import dependencies
import { AUTH_ENDPOINTS, EVENT_ENDPOINTS, BASE_URL } from "../utils/constants.util";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;

const searchEventsURL = baseURL + "event/search-page";
const getAllTagsUrl =  baseURL + "event/tags"

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

//TODO FINISH REFRESH TOKEN IMPLEMENTATION
/**
 * Create event via API POST request
 * Check api-docs for more info
 * You may have to do extra logic for req.body.filename if it isn't handled before. Get the filename minus the extension
 * @param {*} formData Formdata from form which contains all the event request body data you would require
 * @returns Event creation result
 */
export const createEvent = async function (formData) {

  console.log("Inside createEvent");

  //Event Create request options
  const createEventOptions = {
    //Set to multipart/form-data
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };


  //Perform first event create request
  let response = await axios
    .post(EVENT_ENDPOINTS.createEventUrl, formData, createEventOptions);

  console.log("Performed first event create request");

  //Refresh tokens in case of expired access token (should be equal to 403, but it catches all non-201 statuses)
  if (response.status != 201) {
    console.log("Initial event create failed. Attempting token refresh");
    //Perform refresh token request
    let refreshResponse = await axios
      .get(AUTH_ENDPOINTS.refreshTokenUrl);

    //Token refresh successful! Retry previous request
    if (refreshResponse.status == 201) {

      console.log("Token refresh successful!", refreshResponse.data);
      //Set the accessToken
      localStorage.setItem("accessToken", refreshResponse.data.accessToken);
      //You will also receive the user data @ refreshResponse.data.user TODO REMOVE THIS COMMENT

      //Retry event create
      response = await axios
        .post(EVENT_ENDPOINTS.createEventUrl, formData, createEventOptions);

      console.log("Retried initial event request");

      //Event retry failed -- Throw error or log user out?
      if (response.status != 201) {
        //TODO
        console.log("Event retry failed");
        console.log(response);
      }
    }
    //Refresh token failed -- Throw error or log user out?
    else {
      //TODO
      console.log("Refresh token failed");
      console.log(response);
      //Checking old accessToken
      console.log(localStorage.getItem("accessToken"));
    }
  }

  console.log("Create Event Success!");
  console.log(response.data);

  //Return object containing API response data 
  //event obj, eventImg obj, obj arrays etc... Optional data might be null (eventImg and possibly arrays for example)
  return response.data;

};
