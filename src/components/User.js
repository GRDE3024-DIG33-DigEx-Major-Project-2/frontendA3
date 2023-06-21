import { Outlet, useLocation } from "react-router-dom";

const User = () => {
  
  let { state } = useLocation();

  return (
    <div className="user-container">
      { state && (
        <>
          <h1>{state.user.name}'s homepage</h1>
          <Outlet />
        </>
      )}
      { !state && (
        <>
          <h1>You must login to view this page.</h1>
        </>
      )}

    </div>
  );
};

export default User;
