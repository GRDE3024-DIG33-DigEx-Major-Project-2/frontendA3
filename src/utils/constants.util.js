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
  isFavourited: BASE_URL + "event/is-favourited"
};


//Auth-related endpoints
export const AUTH_ENDPOINTS = {
  loginUrl: BASE_URL + "auth/login",
  validateUrl: BASE_URL + "auth/validate",
  refreshTokenUrl: BASE_URL + "auth/refresh-tokens"
};


//User-related endpoints
export const USER_ENDPOINTS = {
  registerUrl: BASE_URL + "user/register",
  updateUrl: BASE_URL + "user",
  deleteUrl: BASE_URL + "user",
  resetPasswordUrl: BASE_URL + "user/reset-password",
};



//SPA paths of app
export const PATHS = {
  HOME: "/",
  SEARCH_EVENTS: "/search-events",
  ABOUT: "/about",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",
  TERMS_OF_USE: "/terms-of-use",
  PRIVACY_POLICY: "/privacy-policy",
  EVENT_PAGE: "/events/event-page",
  SIGN_UP_ATTENDEE: "/signup/attendee",
  SIGN_UP_ORGANISER: "/signup/organiser",
  CREATE_EVENT: "/dashboard/create-event",
  EDIT_EVENT: "/dashboard/edit-event",
  PAGE_NOT_FOUND: "*"
};