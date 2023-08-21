/**
 * Header component
 */

//Import dependencies
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import {
  resetUserSession,
  resetTokenSession,
  getUser,
  resetDrafts,
} from "../../utils/localStorage";
import { showToast } from "../shared/Toaster";
import { GIGNEY_HEADER_LOGO, PATHS } from "../../utils/constants.util";


/**
 * Build the header component
 * @param {*} param0 props for setting/getting flag for if user is logged in
 * @returns Render of header component
 */
export default function Header({ isLoggedIn, setIsLoggedIn }) {

  //Menu state
  const [menu, setMenu] = useState(false);
  //Current year
  const year = new Date().getFullYear();
  //User data
  const user = getUser();
  
  /**
   * Control login and logout
   */
  useEffect(() => {
    if (user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user]);

  /**
   * Set the header theme
   */
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

  /**
   * Log user out
   */
  const logout = () => {
    //Mobile menu option
    toggleDrawer(false);
    //Delete data from local storage
    resetUserSession();
    resetTokenSession();
    resetDrafts();
    //Change user and logged in state
    setIsLoggedIn(false);
    //Show toaster for logout notification
    showToast("You have been logged out", "logout");
  };


  //Mobile-only header drawer toggle
  const toggleDrawer = (menu) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //Changes the function state according to the value of open
    setMenu(menu);
  };


  //Mobile menu template
  let mobileMenu = <>
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
                  <img
                    src="../gigney_logo_white_square_no_bg_web.png"
                    alt="gigney logo"
                  />
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
  </>;


//Navigation links template
let navLinks = <>
        <NavLink id="nav-home" to={PATHS.HOME}>
          <img src={GIGNEY_HEADER_LOGO} alt="Gigney Logo" id="nav-logo" />
        </NavLink>
        <div className="nav-links">
          <NavLink
            id="nav-home-txt"
            className="hover-underline-animation"
            to={PATHS.HOME}
          >
            Home
          </NavLink>
          <NavLink
            id="nav-events"
            className="hover-underline-animation"
            to={PATHS.SEARCH_EVENTS}
          >
            Search
          </NavLink>
          {isLoggedIn && user && !user.organizationName && (
            <NavLink
              id="nav-profile"
              className="hover-underline-animation"
              to={PATHS.PROFILE}
            >
              Profile
            </NavLink>
          )}
          {isLoggedIn && user && user.organizationName && (
            <>
              <NavLink
                id="nav-dashboard"
                className="hover-underline-animation"
                to={PATHS.DASHBOARD}
              >
                Dashboard
              </NavLink>
              <NavLink
                id="nav-create-event"
                className="bttn-style-orange"
                to={PATHS.CREATE_EVENT}
              >
                Create a new event
              </NavLink>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                id="nav-signup"
                className="bttn-style-purple"
                to={PATHS.SIGN_UP}
              >
                Signup
              </NavLink>
              <NavLink
                id="nav-login"
                className="bttn-style-orange"
                to={PATHS.LOGIN}
              >
                Login
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <NavLink
              id="nav-logout"
              className="bttn-style-purple"
              to={PATHS.HOME}
              onClick={logout}
            >
              Logout
            </NavLink>
          )}
        </div>
</>



  //Return render of header component
  return (
    <header>
      <nav>
            {navLinks}
            {mobileMenu}
      </nav>
    </header>
  );
};
