import { NavLink, Outlet} from "react-router-dom";

const EditProfile = ({user}) => {
  
    return (
      <>
        <h2>{user.name}'s Profile - EDIT</h2>
        <div className="edit-links">
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="bio">
              Edit Bio
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="wishlist">
              Edit Wishlist
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "user-link-active" : null)}
              to="settings">
              Edit Account Settings
            </NavLink>
          </div>
          <Outlet />
      </>
    );
  };
  
  export default EditProfile;