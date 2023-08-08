/**
 * Toaster notification UI
 */

//Import dependencies
import { toast } from 'react-toastify';



    /**
     * Displays the Toaster UI for a timespan
     * @param {*} msg The message to display
     */
  export const showToast = (msg) => {
    toast(msg, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
};


    /**
     * Displays the success Toaster UI for a timespan
     * @param {*} msg The message to display
     */
  export const showSuccessToast = (msg) => {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
};

    /**
     * Displays the error Toaster UI for a timespan
     * @param {*} msg The error message to display
     */
    export const showErrorToast = (msg) => {
        toast.error(msg, {
          position: 'top-right', 
          autoClose: 4000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
  };