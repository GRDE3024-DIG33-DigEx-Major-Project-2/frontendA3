/**
 * Axios instance setup
 */

//Import dependencies
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../utils/constants.util';
import { getAccessToken, setAccessToken, resetTokenSession, resetUserSession } from '../utils/localStorage';

//Init Axios instance
const axiosClient = axios.create();

// //Interceptor for forcing cookie set
// axiosClient.interceptors.request.use(
//     (config) => {
//         if (config.headers.Authorization) {
//             config.withCredentials = true;
//         }
//       return config
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
//   );


//Interceptor for refreshing JWT token
axiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    //If the response status is 403 (Forbidden) and it's not the initial token request
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenResponse = await axiosClient.get(AUTH_ENDPOINTS.refreshTokenUrl, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (refreshTokenResponse.status === 201) {
          console.log('Token refresh succeeded!');
          setAccessToken(refreshTokenResponse.data.accessToken);

          //Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${refreshTokenResponse.data.accessToken}`;
          return axiosClient(originalRequest);
        } else {
          console.log('Token refresh failed!');
          console.log('Response Headers:', originalRequest.headers);
          resetTokenSession();
          resetUserSession();
          //Handle the failed refresh case
        }
      } catch (refreshError) {
        console.log('Error refreshing token:', refreshError);
        resetTokenSession();
        resetUserSession();
        //Handle the error during token refresh
      }
    }

    return Promise.reject(error);
  }
);


//Export the axios instance
export default axiosClient;