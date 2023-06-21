import { Link } from "react-router-dom";

export default function Header({user}) {

    return (
        <header>
            <nav>
                {/* Can place the logo within a link component to have the logo routing to home */}
                <Link id="nav-home" to="/">Home</Link>
                <Link id="nav-blog" to="/blog">Blog</Link>
                <Link id="nav-user" to={`user/${user.id}`}>User</Link>
                <Link id="nav-events" to="/events">Events</Link>
            </nav>
        </header>
    )
}
