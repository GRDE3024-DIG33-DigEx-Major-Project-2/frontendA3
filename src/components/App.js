/**
 * The startup file for the React SPA
 */

//Import dependencies
import { Routes, Route } from "react-router-dom";
import "../static/style.css";
import Home from "./base/Home.js";
import Header from "./base/Header.js";
import Profile from "./user/Profile.js";
import Footer from "./base/Footer.js";
import Login from "./user/Login.js";
import Signup from "./user/Signup.js";
import ResetPassword from "./user/ResetPassword.js";
import SearchEvent from "./event/search/SearchEvent";
import TermsOfUse from "./base/TermsOfUse";
import PrivacyPolicy from "./base/PrivacyPolicy";
import EventPage from "./event/display/EventPage.js";
import SignUpGuest from "./user/SignupGuest.js";
import SignUpOrganiser from "./user/SignupOrganiser";
import Dashboard from "./user/Dashboard";
import CreateEvent from "./event/CreateEvent.js";
import EditEvent from "./event/EditEvent";
import "../static/fonts.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PATHS } from "../utils/constants.util";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "../services/Axios";
import { useEffect } from "react";
//Import prop context providers
import {
  SearchEventsProvider,
  SearchEventFiltersProvider,
} from "../props/search-events.prop";
import { LoadingProvider } from "../props/loading-spinner.prop";
import { FullPageSpinner } from "./shared/LoadingSpinner";

import { AuthContext } from "../props/auth.prop";

/**
 * Builds the root component
 * @returns The rendered root component
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const axiosClient = setupAxiosInterceptors(navigate, setIsLoggedIn);
    return () => {
      axiosClient.interceptors.response.eject();
    };
  }, []);

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
                  element={<SignUpGuest />}
                />
                <Route
                  path={PATHS.SIGN_UP_ORGANISER}
                  element={<SignUpOrganiser />}
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

export default App;
