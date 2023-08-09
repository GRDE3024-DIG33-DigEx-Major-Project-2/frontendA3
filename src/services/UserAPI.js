/**
 * HTTP request handler for User-related endpoints
 */



//Import dependencies
import {
  USER_ENDPOINTS,
} from "../utils/constants.util";
import { getAccessToken, resetUserSession, resetTokenSession, setAccessToken, setUserSession } from "../utils/localStorage";
import axiosClient from "./Axios";



/**
 * Register a new user
 * @returns 
 */
export const register = async function (requestBody) {
  return await axiosClient
    .post(USER_ENDPOINTS.registerUrl, requestBody);
};


/**
 * Update a user and set session and access token storage
 */
export const updateUser = async function (formData) {

  let options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  let response = await axiosClient
    .put(USER_ENDPOINTS.updateUrl, formData, options);

  //Success! Set new user and access token
  if (response.status == 200) {
    console.log("Update User Success!");
    setUserSession(response.data.user);
    setAccessToken(response.data.accessToken);
  }
  //Failed!
  else {
    console.log("Update User Failed!");
    console.log(response.status);
  }

}


/**
 * Reset a user's password
 * @returns 
 */
export const resetPassword = async function (oldPassword, newPassword) {
  let options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  let requestBody = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  let response = await axiosClient
    .put(USER_ENDPOINTS.resetPasswordUrl, requestBody, options);

  //Success! Set new user and access token
  if (response.status == 200) {
    console.log("Reset Password Success!");
    console.log(response.data.msg);
  }
  //Failed!
  else {
    console.log("Reset Password Failed!");
    console.log(response.data.msg);
  }

}


/**
 * Deletes a user and erases session data and localstorage
 */
export const deleteUser = async function () {
  let options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  let response = await axiosClient
    .delete(USER_ENDPOINTS.deleteUrl, options);

  //Success! Set new user and access token
  if (response.status == 200) {
    console.log("User Delete Success!");
    console.log(response.data);
    resetUserSession();
    resetTokenSession();
  }
  //Failed!
  else {
    console.log("User Delete Failed!");
    console.log(response);
  }

}



