/**
 * Toaster notification UI
 */

//Import dependencies
import { toast } from 'react-toastify';
import notificationSound from '../../static/mixkit-message-pop-alert-2354.mp3';
import { playSound } from '../../utils/utils';


//Toast UI stylesheet props
const styleProps = {
  top: "8vh",
  paddingTop: "20px",
  fontWeight: "bold",
};


/**
 * Displays the Toaster UI for a timespan
 * @param {*} msg The message to display
 */
export const showToast = (msg, id) => {
  //Play notification sound
  playSound(notificationSound);
  toast(msg, {
    toastId: id || "neutral",
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: styleProps
  });
};


/**
 * Displays the success Toaster UI for a timespan
 * @param {*} msg The message to display
 */
export const showSuccessToast = (msg) => {
  //Play notification sound
  playSound(notificationSound);
  toast.success(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: styleProps
  });
};

/**
 * Displays the error Toaster UI for a timespan
 * @param {*} msg The error message to display
 */
export const showErrorToast = (msg) => {
  //Play notification sound
  playSound(notificationSound);
  toast.error(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: styleProps
  });
};