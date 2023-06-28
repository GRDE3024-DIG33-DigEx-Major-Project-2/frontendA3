import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>
      <Link id="footer-tou" to="../terms-of-use">Terms of Use</Link>
      <Link id="footer-privpol" to="../privacy-policy">Privacy Policy</Link>
      <div>
      {`Copyright © Gigney ${year}`}
      </div>
    </footer>;
  };
  
  export default Footer;