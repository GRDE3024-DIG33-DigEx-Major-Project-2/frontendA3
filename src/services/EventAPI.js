/**
 * HTTP request handler for Event-related endpoints
 */

//Import dependencies
import {
  AUTH_ENDPOINTS,
  EVENT_ENDPOINTS,
  BASE_URL,
} from "../utils/constants.util";
import axios from "axios";
import { getAccessToken } from "../utils/localStorage";
import axiosRetry from 'axios-retry';


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

  let priceSetting = null;

  if (priceRange != null) {
  if (priceRange.minPrice != null 
    && priceRange.maxPrice != null
    && priceRange.minPrice != 0
    && priceRange.maxPrice != 0)
  priceSetting = {
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice
  };    
  }


  //Set empty keywords string to null
  if (keywords == "")
  keywords = null;


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
    priceRange: priceSetting,
    page: page | 0
  };

  console.log("Request body test");
  console.log(requestBody);

  try {
  //Get the array of events and the page number
  await axios
    .post(EVENT_ENDPOINTS.searchEventsUrl, requestBody)
    .then((response) => {
      console.log("Search Events Test...");
      console.log(response.data);
      events = response.data.events;
      pageCount = response.data.pageCount;
    });  
  }
  catch(error) {

    //console.clear();
    console.log(tagIds, keywords, minDate, maxDate, city, page);
    console.log("An error occured while searching events!");

      //Request body is invalid!
  if (error.response.status == 422) {
console.log("Request body is invalid!");
console.log(error.response.data.errors);

//TODO ADJUST THIS PART TO MEET YOUR NEEDS
return { events: events, pageCount: pageCount };
//return response.data.errors;
  }
  }

  //Return object containing API response data
  return { events: events, pageCount: pageCount };
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
};

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
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    page: page | 0,
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


    //Extract event data from formData
    const event = formData.event;

    //Validate event startDate and endDate
    if (event.startDate > event.endDate) {
      throw new Error("startDate must be earlier than endDate");
    }
  
    //Validate event required props
    if (
      !event.title ||
      !event.venueName ||
      !event.description ||
      !event.summary ||
      !event.startDate ||
      !event.endDate ||
      !event.address ||
      !event.city ||
      !event.region ||
      !event.postcode ||
      !event.country ||
      event.isFree === undefined
    ) {
      throw new Error("Invalid event data");
    }


    if (event.purchaseUrl == null || event.purchaseUrl == "") {
      formData.event.purchaseUrl = undefined;
    }
  
    //Validate acts array
    if (Array.isArray(formData.acts)) {
      for (let act of formData.acts) {
        //acts fields arent set, send empty array instead
        if (!act.name) {
          formData.acts = [];
        }
      }
    }
  
    //Validate ticketTypes array
    if (Array.isArray(formData.ticketTypes)) {
      for (let ticketType of formData.ticketTypes) {
        if (!ticketType.name || ticketType.price === undefined) {
          formData.ticketTypes = [];
        }
      }
    }
  
    //Validate tags array
    if (Array.isArray(formData.tags)) {
      for (let tag of formData.tags) {
        if (!tag.name || !tag.id) {
          formData.tags = [];
        }
      }
    }

  //Event Create request options
  const createEventOptions = {
    //Set to multipart/form-data
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  //Perform first event create request
  let response = await axios.post(
    EVENT_ENDPOINTS.createEventUrl,
    formData,
    createEventOptions
  );

  console.log("Performed first event create request");

  //Refresh tokens in case of expired access token (should be equal to 403, but it catches all non-201 statuses)
  if (response.status != 201) {
    console.log("Initial event create failed. Attempting token refresh");
    //Perform refresh token request
    let refreshResponse = await axios.get(AUTH_ENDPOINTS.refreshTokenUrl);

    //Token refresh successful! Retry previous request
    if (refreshResponse.status == 201) {
      console.log("Token refresh successful!", refreshResponse.data);
      //Set the accessToken
      localStorage.setItem("accessToken", refreshResponse.data.accessToken);
      //You will also receive the user data @ refreshResponse.data.user TODO REMOVE THIS COMMENT

      //Retry event create
      response = await axios.post(
        EVENT_ENDPOINTS.createEventUrl,
        formData,
        createEventOptions
      );

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
      console.log(getAccessToken());
    }
  }

  console.log("Create Event Success!");
  console.log(response.data);

  //Return object containing API response data
  //event obj, eventImg obj, obj arrays etc... Optional data might be null (eventImg and possibly arrays for example)
  return response.data;
};

//TODO REFRESH TOKEN IMPLEMENTATION
/**
 * Get a page of favourited events from api endpoint
 * @param {*} page
 * @returns Array of events and number of pages that match the filter options
 */
export const searchFavourites = async function (page) {
  // console.log("Inside Search Favourites");
  // console.log(page);

  const options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  //The array of events to return
  let events = [];
  //The total number of event pages that match the filter options
  let pageCount = 0;

  //Set request body values
  let requestBody = {
    page: page | 0,
  };

  // console.log("Request body test");
  // console.log(requestBody);

  //Get the array of events and the page number
  await axios
    .post(EVENT_ENDPOINTS.searchFavouritesUrl, requestBody, options)
    .then((response) => {
      // console.log("Search Favourites Test...");
      // console.log(response.data);
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

/** Toggles an event as favourited/unfavourited for an Attendee
 * @param {*} eventId
 */

export const toggleFavourite = async function (eventId) {
  const options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  const requestBody = {
    eventId: eventId,
  };

  await axios
    .post(EVENT_ENDPOINTS.toggleFavouriteUrl, requestBody, options)
    .then((response) => {
      console.log(response.data);
      console.log("Event favourited toggled!");
      return response;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

/** Checks if an event has already been added to favourites by a user
 * @param {*} eventId
 */

export const isFavourite = async function (events, eventId) {
  // get list of favourited events
  const favouritedEvents = await searchFavourites(0);

  // check if the eventId is in the list
  if (favouritedEvents.events) {
    favouritedEvents.events.forEach((event) => {
      if (event.id === eventId) return true;
    });
  }

  // else return false
  return false;
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
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  //Perform first event update request
  let response = await axios
    .put(EVENT_ENDPOINTS.updateEventUrl, formData, updateEventOptions);

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
        .put(EVENT_ENDPOINTS.updateEventUrl, formData, updateEventOptions);

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
      console.log(getAccessToken());
    }
  }

  console.log("Update Event Success!");
  console.log(response.data);

  //Return object containing API response data 
  return response.data;

};
