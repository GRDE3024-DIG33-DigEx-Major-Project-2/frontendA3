import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { resetUserSession, resetTokenSession, getUser, resetDrafts } from "../../utils/localStorage";
import { showToast, showErrorToast, showSuccessToast } from "../shared/Toaster";
import { PATHS } from "../../utils/constants.util";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [menu, setMenu] = useState(false);
  const year = new Date().getFullYear();
  const user = getUser();

  useEffect(() => {
    if(user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user]);

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

  const logout = () => {
    // mobile menu option
    toggleDrawer(false);
    // delete data from local storage
    resetUserSession();
    resetTokenSession();
    resetDrafts();
    // change user and logged in state
    setIsLoggedIn(false);
    //Show toaster for logout notification
    showToast("You have been logged out", "logout");  
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
        <Link id="nav-home" to={PATHS.HOME}>
          <img
            src="../gigney_logo_white_landscape_no_bg_web.png"
            alt="Gigney Logo"
            id="nav-logo"
          />
        </Link>
        <div className="nav-links">
          <Link id="nav-home-txt" to={PATHS.HOME}>
            Home
          </Link>
          <Link id="nav-events" to={PATHS.SEARCH_EVENTS}>
            Search
          </Link>
          {isLoggedIn && user && !user.organizationName && (
            <Link id="nav-profile" to={PATHS.PROFILE}>
              Profile
            </Link>
          )}
          {isLoggedIn && user && user.organizationName && (
            <>
              <Link id="nav-dashboard" to={PATHS.DASHBOARD}>
                Dashboard
              </Link>
              <Link
                id="nav-create-event"
                className="bttn-style-orange"
                to={PATHS.CREATE_EVENT}
              >
                Create a new event
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link id="nav-signup" className="bttn-style-purple" to={PATHS.SIGN_UP}>
                Signup
              </Link>
              <Link id="nav-login" className="bttn-style-orange" to={PATHS.LOGIN}>
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              id="nav-logout"
              className="bttn-style-purple"
              to={PATHS.HOME}
              onClick={logout}
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
                  <img src="../gigney_logo_white_square_no_bg_web.png" alt="gigney logo" />
                </div>
                <h1>Menu</h1>

                {isLoggedIn && (
                  <>
                    <div id="loggedin-links-menu">
                      <Link
                        className="mobile-menu-link"
                        to={PATHS.HOME}
                        onClick={toggleDrawer(false)}
                      >
                        Home
                      </Link>
                      <Link
                        className="mobile-menu-link"
                        to={PATHS.SEARCH_EVENTS}
                        onClick={toggleDrawer(false)}
                      >
                        Search
                      </Link>
                      <Link
                        className="mobile-menu-link"
                        to={PATHS.PROFILE}
                        onClick={toggleDrawer(false)}
                      >
                        Profile
                      </Link>
                    </div>
                    <Link
                      className="bttn-style-purple"
                      to={PATHS.HOME}
                      onClick={logout}
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
                      to={PATHS.SIGN_UP}
                      onClick={toggleDrawer(false)}
                    >
                      Signup
                    </Link>
                    <Link
                      id="nav-login"
                      className="bttn-style-orange"
                      to={PATHS.LOGIN}
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
                  to={PATHS.TERMS_OF_USE}
                  onClick={toggleDrawer(false)}
                >
                  Terms of Use
                </Link>{" "}
                |{" "}
                <Link
                  id="footer-privpol"
                  to={PATHS.PRIVACY_POLICY}
                  onClick={toggleDrawer(false)}
                >
                  Privacy Policy
                </Link>
              </div>
            </Drawer>
          </ThemeProvider>
        </div>
      </nav>
    </header>
  );
}
