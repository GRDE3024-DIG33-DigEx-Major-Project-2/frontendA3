import { Outlet } from "react-router-dom";

const User = ({user}) => {
    return (
      <div className="user-container">
        <h1>{user.name}'s homepage</h1>
        <Outlet />
      </div>
    );
  };
  
  export default User;