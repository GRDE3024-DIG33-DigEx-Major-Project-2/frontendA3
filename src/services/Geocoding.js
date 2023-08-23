/**
 * Geocoding service for Mapbox
 */

//Import dependencies
import axios from "axios";
//Import Mapbox access token environment variable
let ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

/**
 * Forward's geocoding for Mapbox
 * @param {*} address
 * @returns
 */
export const forwardGeocoding = async function (address) {
  //Default value - Sydney
  let lat = -33.86;
  let lng = 151.2;
  let tempAddress = null;

  let url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    ACCESS_TOKEN +
    "&limit=1";

  //Get the array of events and the page number
  await axios
    .get(url)
    .then((response) => {
      if (response.data.features.length === 0) {
        console.log("Unable to find location. Try to search another location.");
      } else {
        tempAddress = response.data.features[0];
        lng = response.data.features[0].center[0];
        lat = response.data.features[0].center[1];
        console.log(tempAddress);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  let result = [];
  result.push(lat);
  result.push(lng);
  result.push(tempAddress);
  return result;
};
