/**
 * Axios instance setup
 */

//Import dependencies
import axios from "axios";
import { AUTH_ENDPOINTS, PATHS } from "../utils/constants.util";
import {
  setAccessToken,
  resetTokenSession,
  resetUserSession,
} from "../utils/localStorage";
import { showToast } from "../components/shared/Toaster";

//Init Axios instance
const axiosClient = axios.create({
  withCredentials: true,
});

/**
 * Sets up Axios client's interceptors
 * @param {*} navigate
 * @param {*} setIsLoggedIn
 * @returns The Axios client after interceptor setup
 */
export const setupAxiosInterceptors = (navigate, setIsLoggedIn) => {
  /**
   * Setup refresh JWT interceptor
   */
  axiosClient.interceptors.response.use(
    //Return response if it was initially successful
    (response) => response,
    //Handle error if initial request failed
    async (error) => {
      //Deconstruct original request instance
      const originalRequest = error.config;

      //If the error is not 403 or it's a retry or the URL is the refresh token URL, reject the promise
      //Reject promise if it is not 403, it's a retry, or it's a refresh token request
      if (
        error.response.status !== 403 ||
        originalRequest._retry ||
        originalRequest.url === AUTH_ENDPOINTS.refreshTokenUrl
      ) {
        return Promise.reject(error);
      }

      //Conditions met for refresh token attempt
      originalRequest._retry = true;

      //Attempt refresh token request, then original request
      try {
        const refreshTokenResponse = await axiosClient.get(
          AUTH_ENDPOINTS.refreshTokenUrl
        );
        if (
          (refreshTokenResponse.status >= 200 &&
            refreshTokenResponse.status <= 299) ||
          refreshTokenResponse.status === 400
        ) {
          setAccessToken(refreshTokenResponse.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${refreshTokenResponse.data.accessToken}`;
          return axiosClient(originalRequest);
        }

        //Logout user and reject promise on failed requests
        logoutAndRedirect(navigate, setIsLoggedIn);
        return Promise.reject(
          new Error("Refresh token responded with a failed status")
        );

        //Logout user and reject promise on caught error
      } catch (refreshError) {
        logoutAndRedirect(navigate, setIsLoggedIn);
        return Promise.reject(refreshError);
      }
    }
  );

  //Return axios instance with the interceptors configured
  return axiosClient;
};

/**
 * Handles normal logout procedures
 * @param {*} navigate
 * @param {*} setIsLoggedIn
 */
function logoutAndRedirect(navigate, setIsLoggedIn) {
  console.log("In the logout function");
  setIsLoggedIn(false);
  resetTokenSession();
  resetUserSession();
  showToast("You have been logged out");
  navigate(PATHS.LOGIN);
}

//Export the axios instance as default export
export default axiosClient;
