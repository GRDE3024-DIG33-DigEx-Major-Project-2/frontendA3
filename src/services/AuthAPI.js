/**
 * HTTP request handler for Auth-related endpoints
 */
import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;






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

