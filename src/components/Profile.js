const Profile = ({user}) => {
    return (
      <div className="profile-container">
        <h1>{user.name}'s Profile</h1>
      </div>
    );
  };
  
  export default Profile;