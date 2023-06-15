import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import './static/style.css';
import Home from "./Home.js";
import Blog from "./Blog.js";
import Profile from "./Profile.js";
import Events from "./Events.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <NavLink id="nav-home" to="/">Home</NavLink>
          <NavLink id="nav-blog" to="/blog">Blog</NavLink>
          <NavLink id="nav-profile" to="/profile">Profile</NavLink>
          <NavLink id="nav-events" to="/events">Events</NavLink>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
        <footer>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
