/**
 * HTTP request handler for Auth-related endpoints
 */


//Import dependencies
import { AUTH_ENDPOINTS } from "../utils/constants.util";
import axiosClient from "./Axios";


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
        .post(AUTH_ENDPOINTS.loginUrl, requestBody);
};