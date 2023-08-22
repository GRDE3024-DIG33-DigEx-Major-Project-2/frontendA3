/**
 * HTTP request handler for Event-related endpoints
 */

//Import dependencies
import { showErrorToast } from "../components/shared/Toaster";
import { EVENT_ENDPOINTS } from "../utils/constants.util";
import { getAccessToken } from "../utils/localStorage";
import { logoutErrorHandler } from "./AuthAPI";
import axiosClient from "./Axios";
import dayjs from 'dayjs';

/**
 * Get a page of events from api endpoint
 * @param {*} tagIds
 * @param {*} keywords Keywords that match
 * @param {*} minDate The minimum date for an event
 * @param {*} maxDate The maximum date for an event
 * @param {*} suburb The suburb the event is in
 * @param {*} priceRange Object that contains minPrice and maxPrice
 * @param {*} page The page of event matches requested
 * @returns Array of events and number of pages that match the filter options
 */
export const searchEvents = async function (
  tagIds,
  keywords,
  minDate,
  maxDate,
  suburb,
  priceRange,
  page
) {

  //Validate minDate and maxDate time range
  if (typeof minDate === "string" && typeof maxDate === "string" &&
    dayjs(minDate).isSame(dayjs(maxDate), 'day') &&
    dayjs(minDate).isAfter(dayjs(maxDate), 'second')) {
    showErrorToast("Start time cannot be after the end time.");
  }


  //The sanitized price range for request body
  let priceSetting = null;

  //Sanitize price range for endpoint validation
  if (priceRange != null) {
    if (
      priceRange.minPrice !== null &&
      priceRange.maxPrice !== null &&
      priceRange.minPrice !== 0 &&
      priceRange.maxPrice !== 0
    )
      priceSetting = {
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
      };
  }

  //Sanitize keywords by setting empty keywords string to null
  if (keywords === "") keywords = null;

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
    suburb: suburb,
    priceRange: priceSetting,
    page: page | 0,
  };

  try {
    //Get the array of events and the page number
    await axiosClient
      .post(EVENT_ENDPOINTS.searchEventsUrl, requestBody)
      .then((response) => {
        events = response.data.events;
        pageCount = response.data.pageCount;
      });
  } catch (error) {
    console.log("An error occured while searching events!");
    console.log(tagIds, keywords, minDate, maxDate, suburb, page);
    //Request body is invalid!
    if (error.response.status === 422) {
      console.log("Request body is invalid!");
      console.log(error.response.data.errors);
    }
  } finally {
    //Return object containing events and total page count
    return { events: events, pageCount: pageCount };
  }
};

/**
 * Get an event by id
 * @param {*} eventId The event's id
 * @returns The event's data
 */
export const getEventById = async function (id) {
  try {
    let response = await axiosClient.get(EVENT_ENDPOINTS.getByIdUrl + `/${id}`);

    //Success!
    if (response.status == 200) {
      console.log("Event found by id!");
      return response;
    }
    //Failed!
    else {
      console.log("Failed to find event by id!");
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log("Failed to find event by id!");
    console.log(error);
  }
};

/**
 * Deletes the user's owned event by id (must be an Organizer)
 * @param {*} eventId Event to delete
 * @param {*} user
 */
export const deleteEvent = async function (eventId) {
  const options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  let response = await axiosClient
    .delete(EVENT_ENDPOINTS.deleteEventUrl + `/${eventId}`, options)
    .catch((error) => logoutErrorHandler(error));

  //Success!
  if (response.status === 200) {
    console.log("Event deleted!");
    return response;
  }
};

/**
 * Find all tags in the database
 * @returns Object Array of Tags
 */
export const getAllTags = async function () {
  let tags = [];

  await axiosClient
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

  //Get the array of events and the page number
  let response = await axiosClient.post(
    EVENT_ENDPOINTS.searchOwnedEventsUrl,
    requestBody,
    options
  );

  //Success!
  if (response.status === 200) {
    console.log("Owned events search completed!");
    events = response.data.events;
    pageCount = response.data.pageCount;
  }
  //Failed!
  else {
    console.log("Error while searching owned events");
    console.log(response.status);
    console.log(response);
  }

  //Return object containing API response data
  return { events: events, pageCount: pageCount };
};

/**
 * Create event via API POST request
 * Check api-docs for more info
 * You may have to do extra logic for req.body.filename if it isn't handled before. Get the filename minus the extension
 * @param {*} formData Formdata from form which contains all the event request body data you would require
 * @returns Event creation result
 */
export const createEvent = async function (formData) {
  //The created event
  let createdEvent = null;

  //Sanitize purchaseUrl for when it is not provided
  if (formData.event.purchaseUrl === "") {
    formData.event.purchaseUrl = null;
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
  let response = await axiosClient.post(
    EVENT_ENDPOINTS.createEventUrl,
    formData,
    createEventOptions
  );

  //Success!
  if (response.status === 201) {
    console.log("Create Event Success!");
    createdEvent = response.data;
  }

  //Return object containing API response data
  return createdEvent;
};

/**
 * Get a page of favourited events from api endpoint
 * @param {*} page
 * @returns Array of events and number of pages that match the filter options
 */
export const searchFavourites = async function (page) {

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

  //Get the array of favourited events and the page number
  let response = await axiosClient.post(
    EVENT_ENDPOINTS.searchFavouritesUrl,
    requestBody,
    options
  );

  //Success!
  if (response.status === 200) {
    console.log("Favourited events search completed!");
    events = response.data.events;
    pageCount = response.data.pageCount;
  }

  //Return object containing API response data
  return { events: events, pageCount: pageCount };
};


/**
 * Toggles an event as favourited/unfavourited for an Attendee
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

  let response = await axiosClient.post(
    EVENT_ENDPOINTS.toggleFavouriteUrl,
    requestBody,
    options
  );

  //Success!
  if (response.status === 200) {
    console.log("Event favourited toggled!");
    return response;
  }
};

/**
 * Checks favourited status of several events by id
 * @param {*} eventIds Array of event ids to find the favourite status of
 * @returns 
 */
export const isFavourited = async function (eventIds) {

  let requestBody = {
    eventIds: eventIds,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  let response = await axiosClient.post(
    EVENT_ENDPOINTS.isFavourited,
    requestBody,
    options
  );
  console.log(response.data);
  return response;
};

/**
 * Update event via API PUT request
 * @param {*} formData Formdata from form which contains all the event request body data you would require
 * @returns Event update result
 */
export const updateEvent = async function (formData) {
  //Event Update request options
  const updateEventOptions = {
    //Set to multipart/form-data
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  //Perform first event update request
  let response = await axiosClient
    .put(EVENT_ENDPOINTS.updateEventUrl, formData, updateEventOptions);

  //Success!
  if (response === 200) {
    console.log("Update Event Success!");
    return response.data;
  }
};
