import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import '../static/style.css';
import Home from "./Home.js";
import Blog from "./Blog.js";
import Events from "./Events.js";
import User from "./User.js";
import Header from "./Header.js";
import Profile from "./Profile.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import FavouritesList from "./FavouritesList";
import PastEvents from "./PastEvents";
import ResetPassword from "./ResetPassword";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, setIsLoggedIn, user]);

  return (
    <div className="App">
          <Header user = {user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="user" element={<User isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}>
              <Route path="profile" element={<Profile user = {user} />} />
              <Route path="favourites" element={<FavouritesList user = {user} />} />
              <Route path="past-events" element={<PastEvents user = {user} />} />
            </Route>
            <Route path="events" element={<Events />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
