import { useState } from "react";
import { useNavigate} from "react-router-dom";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const resetHandler = async (event) => {
    event.preventDefault();
    console.log("Reset Password Handler");
    // dummy setMessage to avoid warning
    setMessage("Code sent.");
    navigate("../login");
  };

  return (
    <div class="reset-password">
      <h1>Reset Password</h1>
      <form className="reset-pwd-form" onSubmit={resetHandler}>
      <p>We are going to send a code to your email to reset your password.</p>
      <label htmlFor="email">Enter your email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {/* if the message is defined, show it */}
        {message && <p className="error-message">{message}</p>}
        <input
          id="reset-btn"
          className="input-btn"
          type="submit"
          value="Send code"
        />
      </form>  
      </div>
  );
};

export default ResetPassword;
