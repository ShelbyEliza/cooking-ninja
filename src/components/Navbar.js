import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// components:
import Searchbar from "./Searchbar";

// styles:
import "./Navbar.css";

export default function Navbar() {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <div className="with-subtitle">
          <Link to="/" className="brand">
            <h1>Larder to Table</h1>
          </Link>
          <p className="subtitle">Your Recipe History</p>
        </div>
        <div className="search-field">
          <Searchbar />
        </div>
        <Link to="/create" className="create-link">
          <p className="new-text">Create Recipe</p>
        </Link>
      </nav>
    </div>
  );
}
