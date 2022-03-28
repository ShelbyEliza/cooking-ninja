import { useState } from "react";
import { useHistory } from "react-router-dom";
// styles:
import "./Searchbar.css";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    history.push(`/search?q=${term}`);
    e.target.reset();
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input
          className="search-field"
          type="text"
          id="search"
          placeholder="Search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
