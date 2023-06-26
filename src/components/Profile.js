const Profile = ({user}) => {
  
    return (
      <>
        <h2>{user.name}'s Profile</h2>
        <p>User profile</p>
        <h3>Personal Bio</h3>
        <p>Something here</p>
        <h3>Connected Social Media</h3> 
        <p>Links here</p>
      </>
    );
  };
  
  export default Profile;