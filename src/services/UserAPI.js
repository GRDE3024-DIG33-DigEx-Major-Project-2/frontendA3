/**
 * HTTP request handler for User-related endpoints
 */



//Import dependencies
import {
    AUTH_ENDPOINTS,
    EVENT_ENDPOINTS,
    USER_ENDPOINTS,
    BASE_URL,
  } from "../utils/constants.util";
  import axios from "axios";
  import { getAccessToken } from "../utils/localStorage";









/**
 * Log the user in
 * @returns 
 */
export const login = async function (email, password) {


    let requestBody = {
        email: email,
        password: password
    };
  
    return await axios
    .post(AUTH_ENDPOINTS.loginUrl, requestBody);
  };






  