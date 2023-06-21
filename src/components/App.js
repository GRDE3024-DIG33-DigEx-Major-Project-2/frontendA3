import { Routes, Route } from "react-router-dom";
import '../static/style.css';
import Home from "./Home.js";
import Blog from "./Blog.js";
import Events from "./Events.js";
import User from "./User.js";
import Header from "./Header.js";
import Profile from "./Profile.js";

function App() {

  const user = {
    id: "123456789",
    name: "Test User"
  }

  return (
    <div className="App">
          <Header user = {user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path={`${user.id}`} element={<User user={user} />}>
              <Route path="profile" element={<Profile user={user} />} />
            </Route>
            <Route path="events" element={<Events />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>

        <footer>
        </footer>
    </div>
  );
}

export default App;
