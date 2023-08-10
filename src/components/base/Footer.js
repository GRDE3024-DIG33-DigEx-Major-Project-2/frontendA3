import { Link } from "react-router-dom";
import { PATHS } from "../../utils/constants.util";

const Footer = () => {
    const year = new Date().getFullYear();

    return <footer>
      {`© ${year}. Team X Inc. All rights reserved`} | <Link id="footer-tou" to={PATHS.TERMS_OF_USE}>Terms of Use</Link> | <Link id="footer-privpol" to={PATHS.PRIVACY_POLICY}>Privacy Policy</Link>
    </footer>;
  };
  
  export default Footer;