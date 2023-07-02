import { Link } from "react-router-dom";
import FindEventHeader from "./FindEventHeader";
const Home = () => {
    return (
      <>
        <FindEventHeader />
        <h1>Homepage</h1>
       <div><Link id="" to="/event"><h1>First Event</h1></Link></div> 
      </>
    );
  };
  
  export default Home;