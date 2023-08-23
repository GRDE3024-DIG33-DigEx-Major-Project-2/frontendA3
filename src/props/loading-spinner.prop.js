/**
 * Fullpage loading spinner context for asynchronous operations
 */

//Import dependencies
import { createContext, useState, useContext } from "react";

//Create the loading context
const LoadingContext = createContext();

//Create the loading provider
const LoadingProvider = ({ children }) => {
  //Flag for loading status
  const [loading, setLoading] = useState(false);

  //Props to provide in context
  const props = {
    isLoading: {
      get: loading,
      set: setLoading,
    },
    loading,
    setLoading,
  };

  //Return the loading context provider render
  return (
    <LoadingContext.Provider value={props}>{children}</LoadingContext.Provider>
  );
};

//Init useLoading
const useLoading = () => {
  useContext(LoadingContext);
};

//Export context and provider
export { LoadingContext, LoadingProvider, useLoading };
