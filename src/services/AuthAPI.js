/**
 * HTTP request handler for Auth-related endpoints
 */


//Import dependencies
import { AUTH_ENDPOINTS } from "../utils/constants.util";
import axiosClient from "./Axios";
import { resetTokenSession, resetUserSession, getUser } from "../utils/localStorage";
import { showToast } from "../components/shared/Toaster";
import { PATHS } from "../utils/constants.util";


/**
 * Log the user in
 * @returns 
 */
export const login = async function (email, password) {

    //Build login request body
    let requestBody = {
        email: email,
        password: password
    };

    //Return promise for user login
    return await axiosClient
        .post(AUTH_ENDPOINTS.loginUrl, requestBody, {withCredentials:true});
};


/**
 * Error handler for when refresh/retry request fails.
 * Log user out in this scenario
 * @param {*} error The error instance
 */
export const logoutErrorHandler = async function (error) {
    if (getUser !== null) {
        if (error !== undefined) {
            if (error.status !== 403) {
                return;
            }
        }
    console.log("Logout error handler in action");
    console.error(error);
    resetTokenSession();
    resetUserSession();
    showToast("You have been logged out", "logout");
}        
    }
