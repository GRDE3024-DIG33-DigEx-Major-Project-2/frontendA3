import { Link } from "react-router-dom";
import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

export default function Header({ user, isLoggedIn, setIsLoggedIn, setUser }) {
  const [menu, setMenu] = useState(false);
  const year = new Date().getFullYear();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      neutral: {
        main: "#e6e2e2;",
      },
    },
  });

  const logOut = () => {
    setIsLoggedIn(false);
    toggleDrawer(false);
    setUser(null);
  };

  // only for mobile menu
  const toggleDrawer = (menu) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setMenu(menu);
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
          <Link id="nav-home-txt" to="/">
            Home
          </Link>
          <Link id="nav-events" to="/events">
            Search
          </Link>
          {isLoggedIn && !user.organizationName && (
            <Link id="nav-profile" to="/profile">
              Profile
            </Link>
          )}
          {isLoggedIn && user.organizationName && (
            <>
              <Link id="nav-dashboard" to="/dashboard">
                Dashboard
              </Link>
              <Link
                id="nav-create-event"
                className="bttn-style-orange"
                to="/createevent"
              >
                Create a new event
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link id="nav-signup" className="bttn-style-purple" to="/signup">
                Signup
              </Link>
              <Link id="nav-login" className="bttn-style-orange" to="/login">
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              id="nav-logout"
              className="bttn-style-purple"
              to="../"
              onClick={logOut}
            >
              Logout
            </Link>
          )}
        </div>

        {/* MOBILE MENU */}
        <div id="mobile-menu">
          <ThemeProvider theme={theme}>
            <IconButton
              color="primary"
              edge="start"
              aria-label="open menu"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 1,
                display: {
                  xs: "block",
                  sm: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              id="menu-drawer"
              anchor="right"
              open={menu}
              onClose={toggleDrawer(false)}
            >
              <div className="mobile-menu-box">
                <CloseIcon
                  size="large"
                  color="primary"
                  className="close-icon-btn"
                  fontSize="2"
                  sx={{ ml: "75vw", mb: "80vh" }}
                  onClick={toggleDrawer(false)}
                />
                <div id="gigney-menu-logo">
                  <img src="../gigney-logo-vertical.png" alt="gigney logo" />
                </div>
                <h1>Menu</h1>

                {isLoggedIn && (
                  <>
                    <div id="loggedin-links-menu">
                      <Link
                        className="mobile-menu-link"
                        to="/home"
                        onClick={toggleDrawer(false)}
                      >
                        Home
                      </Link>
                      <Link
                        className="mobile-menu-link"
                        to="/events"
                        onClick={toggleDrawer(false)}
                      >
                        Search
                      </Link>
                      <Link
                        className="mobile-menu-link"
                        to="/profile"
                        onClick={toggleDrawer(false)}
                      >
                        Profile
                      </Link>
                    </div>
                    <Link
                      className="bttn-style-purple"
                      to="../"
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <div id="loggedout-bttns-menu">
                    <Link
                      id="nav-signup"
                      className="bttn-style-purple"
                      to="/signup"
                      onClick={toggleDrawer(false)}
                    >
                      Signup
                    </Link>
                    <Link
                      id="nav-login"
                      className="bttn-style-orange"
                      to="/login"
                      onClick={toggleDrawer(false)}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
              <div className="menu-footer">
                {`© ${year}. Team X Inc. All rights reserved`} |{" "}
                <Link
                  id="footer-tou"
                  to="../terms-of-use"
                  onClick={toggleDrawer(false)}
                >
                  Terms of Use
                </Link>{" "}
                |{" "}
                <Link
                  id="footer-privpol"
                  to="../privacy-policy"
                  onClick={toggleDrawer(false)}
                >
                  Privacy Policy
                </Link>
              </div>
              ;
            </Drawer>
          </ThemeProvider>
        </div>
      </nav>
    </header>
  );
}
