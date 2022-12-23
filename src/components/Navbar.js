// styles:
import "./Navbar.css";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import ThemeSelector from "./ThemeSelector";

// components:
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <nav className={`navbar nav-${color.name}`}>
      <div className="nav-top-container">
        <div className="site-title-container">
          <Link to="/" className="home-link">
            <h1 className="site-title">Larder to Table</h1>
          </Link>
          <p className="subtitle">Your Recipe History</p>
        </div>
        <div>
          <Link to="/create" className="create-link">
            <p className="create-text">
              Create
              <br />
              Recipe
            </p>
          </Link>
        </div>
      </div>
      <div className="nav-bottom-container">
        <div className="theme-selector-container">
          <ThemeSelector />
        </div>
        <div className="search-field-container">
          <Searchbar />
        </div>
      </div>
    </nav>
  );
}
