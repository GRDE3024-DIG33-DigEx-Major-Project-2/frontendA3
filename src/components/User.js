import { NavLink, Link, Outlet} from "react-router-dom";

const User = ({isLoggedIn, user}) => {

  function logOut(){
    console.log("logging out")
  }

  return (
    <div className="user-container">
      {isLoggedIn && (
        <>
          <h1>{user.name}'s homepage</h1>
          <NavLink
            className={({ isActive }) => (isActive ? "user-link-active" : null)}
            to="profile">
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "user-link-active" : null)}
            to="favourites">
            Favourites List
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "user-link-active" : null)}
            to="past-events">
            Past Events
          </NavLink>
          <Outlet />
          <Link to="../" onClick={logOut}>Log Out</Link>
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
