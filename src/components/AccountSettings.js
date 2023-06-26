import { Link } from "react-router-dom";

const AccountSettings = () => {

  const handleDelete = () => {
    console.log("...deleting account");
  }


    return (
      <>
        <h2>Account Settings</h2>
        <h3>Password</h3>
        <p>Password editing here</p>
        <h3>Permissions</h3>
        <p>Permissions editing here</p>
        <Link onClick={handleDelete}>Delete Account</Link>
      </>
    );
  };
  
  export default AccountSettings;