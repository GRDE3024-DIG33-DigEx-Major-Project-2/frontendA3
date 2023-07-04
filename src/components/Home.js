import { Link } from "react-router-dom";
import FindEventHeader from "./FindEventHeader";
const Home = () => {
    return (
      <>
        <FindEventHeader />
        <div className="home-row">
          <h1>Music events nearby</h1>
          <Link id="" to="/event"><h3>First Event</h3></Link>
        </div>
        <div className="home-row">
          <h1>Dance music events</h1>
        </div>
        <div className="home-row">
          <h1>Country music events</h1>
        </div>
      </>
    );
  };
  
  export default Home;