/**
 * HTTP request handler for Event-related endpoints
 */

//Import dependencies
import axios from "axios";
import axiosRetry from 'axios-retry';
import { AUTH_ENDPOINTS, EVENT_ENDPOINTS, BASE_URL } from "../utils/constants.util";


/**
 * Get a page of events from api endpoint
 * @param {*} tagIds 
 * @param {*} keywords Keywords that match 
 * @param {*} minDate The minimum date for an event
 * @param {*} maxDate The maximum date for an event
 * @param {*} city The city the event is in
 * @param {*} priceRange Object that contains minPrice and maxPrice
 * @param {*} page The page of event matches requested
 * @returns Array of events and number of pages that match the filter options
 */
export const searchEvents = async function (tagIds, keywords, minDate, maxDate, city, priceRange, page) {

  console.log("Inside Search Events");
  console.log(tagIds, keywords, minDate, maxDate, city, page);

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    tags: tagIds,
    keywords: keywords,
    minDate: minDate,
    maxDate: maxDate,
    city: city,
    priceRange: priceRange,
    page: page | 0
  };

  console.log("Request body test");
  console.log(requestBody);

  //Get the array of events and the page number
  await axios
    .post(EVENT_ENDPOINTS.searchEventsUrl, requestBody)
    .then((response) => {
      console.log("Search Events Test...");
      console.log(response.data);
      events = response.data.events;
      pageCount = response.data.pageCount;
    })
    .catch((error) => {
      console.log("Error while searching");
      console.log(error.status);
      console.log(error);
    });


  //Return object containing API response data
  return { events: events, pageCount: pageCount };
};

//TODO REFRESH TOKEN IMPLEMENTATION
/**
 * Get a page of favourited events from api endpoint
 * @param {*} page 
 * @returns Array of events and number of pages that match the filter options
 */
export const searchFavourites = async function (page) {

  console.log("Inside Search Favourites");
  console.log(page);

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    page: page | 0
  };

  console.log("Request body test");
  console.log(requestBody);

  //Get the array of events and the page number
  await axios
    .post(EVENT_ENDPOINTS.searchFavouritesUrl, requestBody, options)
    .then((response) => {
      console.log("Search Favourites Test...");
      console.log(response.data);
      events = response.data.events;
      pageCount = response.data.pageCount;
    })
    .catch((error) => {
      console.log("Error while searching");
      console.log(error.status);
      console.log(error);
    });

  //Return object containing API response data
  return { events: events, pageCount: pageCount };
};

//TODO REFRESH TOKEN IMPLEMENTATION
/**
 * Get a page of favourited events from api endpoint
 * @param {*} page 
 * @returns Array of events and number of pages that match the filter options
 */
export const searchOwnedEvents = async function (page) {

  console.log("Inside Owned Favourites");
  console.log(page);



  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    page: page | 0
  };

  console.log("Request body test");
  console.log(requestBody);

  //Get the array of events and the page number
  await axios
    .post(EVENT_ENDPOINTS.searchOwnedEventsUrl, requestBody, options)
    .then((response) => {
      console.log("Search Owned Test...");
      console.log(response.data);
      events = response.data.events;
      pageCount = response.data.pageCount;
    })
    .catch((error) => {
      console.log("Error while searching");
      console.log(error.status);
      console.log(error);
    });

  //Return object containing API response data
  return { events: events, pageCount: pageCount };
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

//TODO REFRESH TOKEN IMPLEMENTATION
//TODO INCOMPLETE
/**
 * Update event via API PUT request
 * @param {*} formData Formdata from form which contains all the event request body data you would require
 * @returns Event update result
 */
export const updateEvent = async function (formData) {

  console.log("Inside updateEvent");

  //Event Update request options
  const updateEventOptions = {
    //Set to multipart/form-data
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };



  //Perform first event update request
  let response = await axios
    .post(EVENT_ENDPOINTS.updateEventUrl, formData, updateEventOptions);

  console.log("Performed first event update request");

  //Refresh tokens in case of expired access token (should be equal to 403, but it catches all non-201 statuses)
  if (response.status != 201) {
    console.log("Initial event update failed. Attempting token refresh");
    //Perform refresh token request
    let refreshResponse = await axios
      .get(AUTH_ENDPOINTS.refreshTokenUrl);

    //Token refresh successful! Retry previous request
    if (refreshResponse.status == 201) {

      console.log("Token refresh successful!", refreshResponse.data);
      //Set the accessToken
      localStorage.setItem("accessToken", refreshResponse.data.accessToken);

      //Retry event create
      response = await axios
        .post(EVENT_ENDPOINTS.updateEventUrl, formData, updateEventOptions);

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

  console.log("Update Event Success!");
  console.log(response.data);

  //Return object containing API response data 
  return response.data;

};

//TODO REFRESH TOKEN IMPLEMENTATION
//TODO INCOMPLETE
/**
 * Deletes the user's owned event by id (must be an Organizer)
 * @param {*} eventId Event to delete
 * @param {*} user 
 */
export const deleteEvent = async function (eventId) {

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };


  await axios
    .delete(EVENT_ENDPOINTS.deleteEventUrl + `/${eventId}`, options)
    .then((response) => {
      console.log(response);
      console.log("Event deleted!")
      return response;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

/**
 * Toggles an event as favourited/unfavourited for an Attendee
 * @param {*} eventId 
 */
export const toggleFavourite = async function (eventId) {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };


  const requestBody = {
    eventId: eventId
  };


  await axios
    .post(EVENT_ENDPOINTS.toggleFavouriteUrl + `/${eventId}`, options)
    .then((response) => {
      console.log(response.data);
      console.log("Event favourited toggled!")
      return response;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

/**
 * Find all tags in the database
 * @returns Object Array of Tags
 */
export const getAllTags = async function () {
  let tags = [];

  await axios
    .get(EVENT_ENDPOINTS.getAllTagsUrl)
    .then((response) => {
      tags = response.data.tags;
    })
    .catch((error) => {
      console.log(error);
    });

  return tags;
};




