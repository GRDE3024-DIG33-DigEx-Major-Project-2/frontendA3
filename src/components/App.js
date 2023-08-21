/**
 * React main component module
 */

//Import dependencies
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PATHS } from "../utils/constants.util";
import { setupAxiosInterceptors } from "../services/Axios";
//Import base components
import Home from "./base/Home.js";
import Header from "./base/Header.js";
import Footer from "./base/Footer.js";
import TermsOfUse from "./base/TermsOfUse";
import PrivacyPolicy from "./base/PrivacyPolicy";
//Import event components
import SearchEvent from "./event/search/SearchEvent";
import EventPage from "./event/display/EventPage.js";
import CreateEvent from "./event/CreateEvent.js";
import EditEvent from "./event/EditEvent";
//Import user components
import Profile from "./user/Profile.js";
import Login from "./user/Login.js";
import Signup from "./user/SignupBase.js";
import ResetPassword from "./user/ResetPassword.js";
import SignupAttendee from "./user/SignupAttendee.js";
import SignupOrganiser from "./user/SignupOrganiser";
import Dashboard from "./user/Dashboard";
//Import styling
import "../static/style.css";
import "../static/fonts.css";
//Import prop context providers
import {
  SearchEventsProvider,
  SearchEventFiltersProvider,
} from "../props/search-events.prop";
import { LoadingProvider } from "../props/loading-spinner.prop";
import { AuthContext } from "../props/auth.prop";
//Import shared components
import { FullPageSpinner } from "./shared/LoadingSpinner";


/**
 * Builds the main component module
 * @returns The rendered main component module
 */
function App() {
  //Flags if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Navigator for SPA
  const navigate = useNavigate();

  /**
   * Build the Axios client instance
   */
  useEffect(() => {
    const axiosClient = setupAxiosInterceptors(navigate, setIsLoggedIn);
    return () => {
      axiosClient.interceptors.response.eject();
    };
  }, []);

  //The rendered main component module
  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <ToastContainer />
        <LoadingProvider>
          <FullPageSpinner></FullPageSpinner>
          <SearchEventsProvider>
            <SearchEventFiltersProvider>
              <Routes>
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.SEARCH_EVENTS} element={<SearchEvent />} />
                <Route
                  path={PATHS.LOGIN}
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path={PATHS.SIGN_UP} element={<Signup />} />
                <Route
                  path={PATHS.RESET_PASSWORD}
                  element={<ResetPassword />}
                />
                <Route path={PATHS.PROFILE} element={<Profile />} />
                <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
                <Route path={PATHS.TERMS_OF_USE} element={<TermsOfUse />} />
                <Route
                  path={PATHS.PRIVACY_POLICY}
                  element={<PrivacyPolicy />}
                />
                <Route path={PATHS.EVENT_PAGE} element={<EventPage />} />
                <Route
                  path={PATHS.SIGN_UP_ATTENDEE}
                  element={<SignupAttendee />}
                />
                <Route
                  path={PATHS.SIGN_UP_ORGANISER}
                  element={<SignupOrganiser />}
                />
                <Route path={PATHS.CREATE_EVENT} element={<CreateEvent />} />
                <Route path={PATHS.EDIT_EVENT} element={<EditEvent />} />
                <Route
                  path={PATHS.PAGE_NOT_FOUND}
                  element={<h1 className="not-found">Page Not Found</h1>}
                />
              </Routes>
            </SearchEventFiltersProvider>
          </SearchEventsProvider>
        </LoadingProvider>

        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

//Export the main module
export default App;
