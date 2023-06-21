import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>
    <Link id="nav-home" to="/">Home</Link>
    <Link id="nav-blog" to="/blog">Blog</Link>
    <Link id="nav-events" to="/events">Events</Link>
    <div>
    {`Copyright © Gigney ${year}`}
    </div>
    </footer>;
  };
  
  export default Footer;