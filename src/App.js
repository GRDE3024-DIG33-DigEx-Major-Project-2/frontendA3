import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import './static/style.css';
import Home from "./Home.js";
import Blog from "./Blog.js";
import Events from "./Events.js";
import User from "./User.js";

function App() {

  const user = {
    id: "123456789",
    name: "Test User"
  }

  return (
    <div className="App">
        <header>
          <nav>
            <NavLink id="nav-home" to="/">Home</NavLink>
            <NavLink id="nav-blog" to="/blog">Blog</NavLink>
            <NavLink id="nav-user" to={`user/${user.id}`}>User</NavLink>
            <NavLink id="nav-events" to="/events">Events</NavLink>
          </nav>
        </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path={`user/${user.id}`} element={<User user={user} />} />
            <Route path="events" element={<Events />} />
          </Routes>

        <footer>
        </footer>
    </div>
  );
}

export default App;
