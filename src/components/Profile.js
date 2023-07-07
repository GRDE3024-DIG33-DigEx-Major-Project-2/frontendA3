import { Paper, Avatar } from "@mui/material";

const Profile = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  return (
    <>
      <div className="profile-container">
        {isLoggedIn && (
          <>
            <div className="profile-banner">
              <h2>My Profile</h2>
            </div>
            <article className="personal-bio">
              <h2>Personal Bio</h2>
              <Paper elevation={2} className="profile-paper">
                <Avatar alt={user.name} src="../gigney.png" className="profile-avatar" />
                <h4>{user.name}</h4>
                <p>Something here</p>
              </Paper>
            </article>
            <article className="account-settings">
              <h3>Account settings</h3>
              <p>Something here</p>
            </article>
            <article className="saved-events">
              <h3>Saved Events</h3>
              <p>Event cards here</p>
            </article>
          </>
        )}
        {!isLoggedIn && (
          <>
            <h1>You must login to view this page.</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
