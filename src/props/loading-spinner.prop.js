/**
 * Fullpage loading spinner context for asynchronous operations
 */


import { createContext, useState, useContext } from 'react';


const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);


      const props = {
        isLoading: {
            get: loading,
            set: setLoading
        },
        loading,
        setLoading
    };

  return (
    <LoadingContext.Provider value={props}>
      {children}
    </LoadingContext.Provider>
  );
};


const useLoading = () => {useContext(LoadingContext)}

export {LoadingContext, LoadingProvider, useLoading};