/**
 * Axios instance setup
 */

//Import dependencies
import axios from "axios";
import { AUTH_ENDPOINTS, PATHS } from "../utils/constants.util";
import {
  getAccessToken,
  setAccessToken,
  resetTokenSession,
  resetUserSession,
} from "../utils/localStorage";
import {
  showErrorToast,
  showSuccessToast,
  showToast,
} from "../components/shared/Toaster";

//Init Axios instance
const axiosClient = axios.create();

export const setupAxiosInterceptors = (navigate, setIsLoggedIn) => {
  //Interceptor for refreshing JWT token
  axiosClient.interceptors.response.use(
    async (response) => {
      console.log("Interceptor: Response onfulfilled");
      return response;
    },
    async (error) => {
      console.log("Interceptor: Response onerror");
      const originalRequest = error.config;

      //If the response status is 403 (Forbidden) and it's not the initial token request
      if (
        error.response.status === 403 &&
        !originalRequest._retry &&
        originalRequest.url !== AUTH_ENDPOINTS.refreshTokenUrl
      ) {
        originalRequest._retry = true;
        console.log(AUTH_ENDPOINTS.refreshTokenUrl);
        console.log("PASSES CONDITIONAL");

        try {
          console.log("PASSES CONDITIONAL2");
          const refreshTokenResponse = await axios
            .get(AUTH_ENDPOINTS.refreshTokenUrl, {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                withCredentials: true
              },
            })
            .catch((error) => {
              console.log("THIS ERROR CAUGHT");
              logoutAndRedirect(navigate, setIsLoggedIn);
            });

          console.log("REFRESH REQ COMPLETE");
          if (
            (refreshTokenResponse.status >= 200 &&
              refreshTokenResponse.status <= 299) ||
            refreshTokenResponse.status === 400
          ) {
            console.log("Token refresh succeeded!");
            setAccessToken(refreshTokenResponse.data.accessToken);

            //Retry the original request with the new token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshTokenResponse.data.accessToken}`;

            //Retry the request and if it fails again, logout
            return axiosClient(originalRequest).catch((retryError) => {
              console.log("Retry failed after token refresh: ", retryError);
              logoutAndRedirect(navigate, setIsLoggedIn);
            });
          } else {
            console.log(
              "Refresh token responded failed status: ",
              refreshTokenResponse.status
            );
            logoutAndRedirect(navigate, setIsLoggedIn);
          }
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
          logoutAndRedirect(navigate, setIsLoggedIn);
          return Promise.resolve();
        }
      }

      //If it's not a 403 error or it's already been retried, let it propagate normally.
      return Promise.reject(error);
    }
  );

  //Return the axios instance
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
