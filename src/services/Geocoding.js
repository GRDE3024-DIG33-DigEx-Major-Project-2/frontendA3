import axios from "axios";
let ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const forwardGeocoding = async function (address) {
  
  // default value - Sydney
  let lat = -33.86;
  let lng = 151.2;

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
        lng = response.data.features[0].center[0];
        lat = response.data.features[0].center[1];
        // let location = response.data.features[0].place_name;
      }
      console.log(response.data.features);
    })
    .catch((error) => {
      console.log(error);
    });

  let result = [];
  result.push(lat);
  result.push(lng);
  return result;
};

export const reverseGeocoding = async function (lat, lng) {

  let location=null;

  let url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    lng + "," + lat + 
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
        location = response.data.features[0];
        // lat = response.data.features[0].center[1];
        // let location = response.data.features[0].place_name;
      }
      console.log(location);
    })
    .catch((error) => {
      console.log(error);
    });

  return location;
};

