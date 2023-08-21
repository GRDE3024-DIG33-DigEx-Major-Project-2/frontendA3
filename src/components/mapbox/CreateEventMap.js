/**
 * Create/Update Event map component
 */

//Import dependencies
import { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; //eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
//Import mapbox access token from env
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

/**
 * Creates the event map component
 * @param {*} props prop data to consume
 * @returns Render of event map component
 */
const CreateEventMap = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  //Initialize the event map component
  useEffect(() => {
    //Only initialize the map once
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [props.lng, props.lat],
      zoom: 15,
    });
    //Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        //When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        //Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }, [props.lng, props.lat]);

  //Return the event map component render
  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};


//Export Create/Update Event map component
export default CreateEventMap;