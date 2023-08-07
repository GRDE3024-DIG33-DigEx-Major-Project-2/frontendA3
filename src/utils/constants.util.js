/**
 * Global constant variables
 */

//Base API url
export const BASE_URL = process.env.REACT_APP_BASEURL;

//Event-related endpoints
export const EVENT_ENDPOINTS = {
  searchEventsUrl: BASE_URL + "event/search-page",
  searchFavouritesUrl: BASE_URL + "event/favourites",
  searchOwnedEventsUrl: BASE_URL + "event/owned-events",
  getAllTagsUrl: BASE_URL + "event/tags",
  createEventUrl: BASE_URL + "event",
  updateEventUrl: BASE_URL + "event",
  //Requires id as param
  deleteEventUrl: BASE_URL + "event/",
  //Requires id as param
  getByIdUrl: BASE_URL + "event/",
  toggleFavouriteUrl: BASE_URL + "event/toggle-favourite",
};


//Auth-related endpoints
export const AUTH_ENDPOINTS = {
  loginUrl: BASE_URL + "auth/login",
  validateUrl: BASE_URL + "auth/validate",
  refreshTokenUrl: BASE_URL + "auth/refresh-tokens"
};


//User-related endpoints
export const USER_ENDPOINTS = {
  registerUrl: BASE_URL + "user",
  updateUrl: BASE_URL + "user",
  deleteUrl: BASE_URL + "user",
  resetPasswordUrl: BASE_URL + "user/reset-password",
};


