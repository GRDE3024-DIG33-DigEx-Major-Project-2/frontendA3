import { Link } from "react-router-dom";

export default function Header({ user, isLoggedIn, setIsLoggedIn, setUser }) {
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header>
      <nav>
        {/* Can place the logo within a link component to have the logo routing to home */}
        <Link id="nav-home" to="/">
          <img
            src="../gigney-logo-transparent.png"
            alt="Gigney Logo"
            id="nav-logo"
          />
        </Link>
        <div className="nav-links">
          <Link id="nav-events" to="/events">
            Events
          </Link>
          {isLoggedIn && user.type === "guest" && (
            <Link id="nav-profile" to="/profile">
              Profile
            </Link>
          )}
          {isLoggedIn && user.type === "organiser" && (
            <>
              <Link id="nav-create-event" to="/create-event">
                Create Event
              </Link>
              <Link id="nav-dashboard" to="/dashboard">
                Dashboard
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link id="nav-signup" to="/signup">
                Signup
              </Link>
              <Link id="nav-login" to="/login">
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link id="nav-logout" to="../" onClick={logOut}>
              Logout
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
