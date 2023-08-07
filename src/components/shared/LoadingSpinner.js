/**
 * Loading spinner component for async tasks
 */


import { useRef, useEffect, useState, useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoadingContext } from "../../props/loading-spinner.prop";


/**
 * Fullpage load spinner for displaying fullpage
 * @returns Fullpage spinner render
 */
export const FullPageSpinner = () => {

  //States for spinner
  const {
    loading, 
    setLoading,
    isLoading
  } = useContext(LoadingContext);
  
  //If loading state is true, render the full page spinner
  return (
    <>
        {isLoading.get ? (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      //Fullscreen
      justifyContent: 'center',
      position: 'fixed', 
      top: 0, 
      left: 0,
      width: '100vw',
      height: '100vh',
      //Set above everything else
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      //Disable scroll
      overflow: 'hidden', 
    }}>
    <CircularProgress 
    //Set size of spinner
    size={"12rem"} 
    //Set color of spinner
    sx={{color:"#f58146"}}
    />
  </Box>
        ) : null}    
    </>

  );
};



/**
 * Partial load spinner for displaying at the component level
 * @returns Partial page spinner render
 */
export const PartialLoadSpinner = () => {

    
  //If loading state is true, render the partial spinner
  return (
    <>
    <Box sx={{
      display: 'flex',
    }}>
    <CircularProgress 
    //Set size of spinner
    size={"6rem"} 
    //Set color of spinner
    sx={{color:"#f58146"}}
    />
  </Box>
    </>

  );
}


