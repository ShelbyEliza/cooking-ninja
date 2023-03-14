// styles:
import "./Navbar.css";

import { useAuthContext } from "../hooks/useAuthContext";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import ThemeSelector from "./ThemeSelector";
import { useLogout } from "../hooks/useLogout";

// components:
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { color } = useTheme();
  const { user, isUserVerified } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <nav className={`navbar nav-${color.name}`}>
      <div className="nav-top-container">
        <div className="site-title-container">
          <Link to="/" className="home-link">
            <h1 className="site-title">Larder to Table</h1>
          </Link>
          <p className="subtitle">Your Recipe History</p>
        </div>
        {user && (
          <>
            {isUserVerified && (
              <div>
                <Link to="/create" className="create-link">
                  <p className="create-text">
                    Create
                    <br />
                    Recipe
                  </p>
                </Link>
              </div>
            )}
            <li>
              {!isPending && (
                <button className="logout-link" onClick={logout}>
                  <p className="logout-text">Logout</p>
                </button>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logging Out...
                </button>
              )}
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/signup" className="signup-link">
                <p className="signup-text">Sign Up</p>
              </Link>
            </li>
            <li>
              <Link to="/login" className="login-link">
                <p className="login-text">Log In</p>
              </Link>
            </li>
          </>
        )}
      </div>
      <div className="nav-bottom-container">
        <div className="theme-selector-container">
          <ThemeSelector />
        </div>
        {isUserVerified && (
          <div className="search-field-container">
            <Searchbar />
          </div>
        )}
      </div>
    </nav>
  );
}
