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
            src="../gigney-logo-black-rectangular.png"
            alt="Gigney Logo"
            id="nav-logo"
          />
        </Link>
        <div className="nav-links">
          <Link id="nav-gigs" to="/gigs">
            Gigs
          </Link>
          <Link id="nav-articles" to="/articles">
            Articles
          </Link>
          <Link id="nav-user" to="/user">
            Profile
          </Link>
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
