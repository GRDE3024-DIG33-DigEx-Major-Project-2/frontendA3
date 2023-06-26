import { NavLink, Link, Outlet} from "react-router-dom";

const User = ({isLoggedIn, user, setIsLoggedIn, setUser}) => {

  function logOut(){
    setIsLoggedIn(false);
    setUser(null);
    console.log("logging out")
  }

  return (
    <div className="user-container">
      {isLoggedIn && (
        <>
          <div className="user-links">
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="profile">
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="wishlist">
              Events Wishlist
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="edit-profile">
              Edit Profile
            </NavLink>
          </div>
          <Outlet />
          <div className="user-links">
            <Link to="../" onClick={logOut}>Log Out</Link>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <>
          <h1>You must login to view this page.</h1>
        </>
      )}
    </div>
  );
};

export default User;
