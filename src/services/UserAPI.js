/**
 * HTTP request handler for User-related endpoints
 */

//Import dependencies
import { USER_ENDPOINTS } from "../utils/constants.util";
import {
  getAccessToken,
  setAccessToken,
  setUserSession,
} from "../utils/localStorage";
import axiosClient from "./Axios";
import { showErrorToast, showSuccessToast } from "../components/shared/Toaster";
import { logoutErrorHandler } from "./AuthAPI";

/**
 * Register a new user
 */
export const register = async function (requestBody) {
  return await axiosClient.post(USER_ENDPOINTS.registerUrl, requestBody);
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
    if (response.status === 200) {
      console.log("Update User Success!");
      setUserSession(response.data.user);
      setAccessToken(response.data.accessToken);
      return "Success";
    }
    //Failed!
    else {
      console.log("Update User Failed!");
      console.log(response.status);
      return "Error";
    }
};

/**
 * Reset a user's password
 */
export const resetPassword = async function (oldPassword, newPassword) {
  let options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  let requestBody = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  try {
    let response = await axiosClient.put(
      USER_ENDPOINTS.resetPasswordUrl,
      requestBody,
      options
    );

    //Success! Set new user and access token
    if (response.status === 200) {
      console.log("Reset Password Success!");
      console.log(response.data.msg);
      return response;
    }
    //Failed!
    else {
      console.log("Reset Password Failed!");
      console.log(response.data.msg);
      return response;
    }
  } catch (error) {
    if (error.response.status === 400) {
      showErrorToast("Invalid credentials");
    } else {
      showErrorToast("Password reset failed!");
    }
  }
};

/**
 * Deletes a user and erases session data and localstorage
 */
export const deleteUser = async function () {
  let options = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

    let response = await axiosClient.delete(USER_ENDPOINTS.deleteUrl, options);

    //Success! Set new user and access token
    if (response.status === 200) {
      console.log("User Delete Success!");
      showSuccessToast("Your account was successfully deleted!");
      logoutErrorHandler();
      return response;
    }
    //Failed!
    else {
      console.log(
        "A problem occured whiile deleting your account. Please try again later."
      );
      console.log(response);
      return response;
    }
};
