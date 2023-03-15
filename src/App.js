import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// page components:
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/admin/Login";
import Signup from "./pages/admin/Signup";
import Create from "./pages/create-update/Create";
import Search from "./pages/Search";
import Recipe from "./pages/recipe/Recipe";
import Update from "./pages/create-update/Update";

// styles:
import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();
  const { authIsReady, user, isUserVerified } = useAuthContext();

  return (
    <div className={`app app-${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className="centering-app">
            <div className="side-by-side">
              <Routes>
                <Route
                  path="/"
                  element={isUserVerified ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={isUserVerified ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/signup"
                  element={user ? <Navigate to="/login" /> : <Signup />}
                />
                <Route
                  path="/create"
                  element={
                    isUserVerified ? <Create /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/search/:query"
                  element={
                    isUserVerified ? <Search /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/recipes/:id"
                  element={
                    isUserVerified ? <Recipe /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/update/:id"
                  element={
                    isUserVerified ? <Update /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
