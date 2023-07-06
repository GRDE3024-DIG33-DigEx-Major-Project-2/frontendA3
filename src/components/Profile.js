const Profile = ({ isLoggedIn, user, setIsLoggedIn, setUser }) => {
  return (
    <>
      <div className="profile-container">
        {isLoggedIn && (
          <>
            <div className="profile-banner">
              <h2>{user.name}'s Profile</h2>
            </div>
            <article className="personal-bio">
              <h3>Personal Bio</h3>
              <h4>{user.name}</h4>
              <p>Something here</p>
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
