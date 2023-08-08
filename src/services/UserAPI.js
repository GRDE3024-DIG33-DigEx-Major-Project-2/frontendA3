/**
 * HTTP request handler for User-related endpoints
 */



//Import dependencies
import {
  USER_ENDPOINTS,
  INVALID_TOKEN_MSG,
  INVALID_TOKEN_STATUS
} from "../utils/constants.util";
import axios from "axios";
import { getAccessToken, resetUserSession, resetTokenSession, setAccessToken, setUserSession } from "../utils/localStorage";
import { refreshToken } from "./AuthAPI";



/**
 * Register a new user
 * @returns 
 */
export const register = async function (requestBody) {
  return await axios
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

  let response = await axios
    .put(USER_ENDPOINTS.updateUrl, formData, options);

  //Refresh tokens in case of expired access token
  if (response.status == INVALID_TOKEN_STATUS && response.data.msg == INVALID_TOKEN_MSG) {
    console.log("Initial user update failed...Attempting token refresh");
    //Retry if refresh succeeded
    if (refreshToken()) {
      let retry = await axios
        .put(USER_ENDPOINTS.updateUrl, formData, options);

      console.log("Retried user update request");

      //Retry success! Set new user and access token
      if (retry == 200) {
        console.log("Update User Success!");
        setUserSession(retry.data.user);
        setAccessToken(retry.data.accessToken);
      }
      //Retry failed!
      else {
        console.log("Error while updating user");
        console.log(retry);
        return;
      }
    }
  }
  //Success! Set new user and access token
  else if (response.status == 201) {
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

  let response = await axios
    .put(USER_ENDPOINTS.resetPasswordUrl, requestBody, options);

  //Refresh tokens in case of expired access token
  if (response.status == INVALID_TOKEN_STATUS && response.data.msg == INVALID_TOKEN_MSG) {
    console.log("Initial user reset password failed...Attempting token refresh");
    //Retry if refresh succeeded
    if (refreshToken()) {
      let retry = await axios
        .put(USER_ENDPOINTS.resetPasswordUrl, requestBody, options);

      console.log("Retried user reset password request");

      //Retry success! Set new user and access token
      if (retry == 200) {
        console.log("Reset Password Success!");
        console.log(retry.data.msg);
      }
      //Retry failed!
      else {
        console.log("Reset Password Failed!");
        console.log(retry.data.msg);
      }
    }
  }
  //Success! Set new user and access token
  else if (response.status == 201) {
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

  let response = await axios
    .delete(USER_ENDPOINTS.deleteUrl, options);

  //Refresh tokens in case of expired access token
  if (response.status == INVALID_TOKEN_STATUS && response.data.msg == INVALID_TOKEN_MSG) {
    console.log("Initial user delete failed...Attempting token refresh");
    //Retry if refresh succeeded
    if (refreshToken()) {
      let retry = await axios
        .delete(USER_ENDPOINTS.deleteUrl, options);

      console.log("Retried user delete request");

      //Retry success! Set new user and access token
      if (retry == 200) {
        console.log("User Delete Success!");
        console.log(retry.data);
        resetUserSession();
        resetTokenSession();
      }
      //Retry failed!
      else {
        console.log("User Delete Failed!");
        console.log(retry);
      }
    }
  }
  //Success! Set new user and access token
  else if (response.status == 201) {
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



