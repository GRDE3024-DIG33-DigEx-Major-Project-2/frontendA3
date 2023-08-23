/**
 * Footer component
 */

//Import dependencies
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/constants.util";

/**
 * Build the footer component
 * @returns The footer component
 */
const Footer = () => {
    //Find the current year
    const year = new Date().getFullYear();

    //Return render of footer component
    return <footer>
      {`© ${year}. Team X Inc. All rights reserved`} | <Link id="footer-tou" target="_blank" to={PATHS.TERMS_OF_USE}>Terms of Use</Link> | <Link id="footer-privpol" target="_blank" to={PATHS.PRIVACY_POLICY}>Privacy Policy</Link>
    </footer>;
  };
  
  //Export the footer component
  export default Footer;