import { BrowserRouter, Route, Routes } from "react-router-dom";

// page components:
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/create/Create";
import Search from "./pages/Search";
import Recipe from "./pages/recipe/Recipe";
import Update from "./pages/update/Update";

// styles:
import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`app app-${mode}`}>
      <BrowserRouter>
        <Navbar />
        <div className="centering-app">
          <div className="side-by-side">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/recipes/:id" element={<Recipe />} />
              <Route path="/update/:id" element={<Update />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
