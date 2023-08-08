/**
 * HTTP request handler for Auth-related endpoints
 */


//Import dependencies
import axios from "axios";
import { AUTH_ENDPOINTS } from "../utils/constants.util";
import { getAccessToken, setAccessToken, resetUserSession, resetTokenSession } from "../utils/localStorage";


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
    return await axios
        .post(AUTH_ENDPOINTS.loginUrl, requestBody);
};



/**
 * Refreshes a user's access token if expired
 * @returns {boolean} true if succeeded, else false
 */
export const refreshToken = async function () {

    console.log("Refreshing token");

    let options = {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    };

    let response = await axios
        .get(AUTH_ENDPOINTS.refreshTokenUrl, options);

    //Refresh token response success!
    if (response.status == 201) {
        console.log("Token refresh succeeded!");
        //Reassign new access token
        setAccessToken(response.data.accessToken);
        return true;
    }
    //Refresh token response failed!
    else {
        console.log("Token refresh failed!");
        //Log expired user out
        resetTokenSession();
        resetUserSession();
        return false;
    }
};

