import { BrowserRouter, Switch, Route } from "react-router-dom";

// page components:
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Update from "./pages/update/Update";

// styles:
import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <div className="centering-app">
          <div className="side-by-side">
            <ThemeSelector />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/search/:query">
                <Search />
              </Route>
              <Route path="/recipes/:id">
                <Recipe />
              </Route>
              <Route path="/update/:id">
                <Update />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
