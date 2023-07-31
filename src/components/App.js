import { Routes, Route } from "react-router-dom";
import '../static/style.css';
import Home from "./base/Home.js";
import Header from "./base/Header.js";
import Profile from "./user/Profile.js";
import Footer from "./base/Footer.js";
import Login from "./user/Login.js";
import Signup from "./user/Signup.js";
import About from "./base/About.js";
import ResetPassword from "./user/ResetPassword.js";
import Events from "./event/Events";
import TermsOfUse from "./base/TermsOfUse";
import PrivacyPolicy from "./base/PrivacyPolicy";
import EventPage from "./event/EventPage.js";
import SignUpGuest from "./user/SignupGuest.js";
import SignUpOrganiser from "./user/SignupOrganiser";
import Dashboard from "./user/Dashboard";
import CreateEvent from "./event/CreateEvent.js";
import "../static/fonts.css";

//Import prop context providers
import { SearchEventsProvider, SearchEventFiltersProvider } from "../props/search-events.prop";

function App() {

  return (
    <div className="App">
      <Header />
      <SearchEventsProvider>
        <SearchEventFiltersProvider>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="events" element={<Events />} />        
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/signupguest" element={<SignUpGuest />} />
        <Route path="/signuporganiser" element={<SignUpOrganiser />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
      </Routes>          
        </SearchEventFiltersProvider>
      </SearchEventsProvider>

      <Footer />
    </div>
  );
}

export default App;
