import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { async } from "q";
import Recepie from "./Recepie.js";

function App() {
  const APP_ID = "05e6e1a8";
  const APP_KEY = "3666be40e1cb08561b47a14d5a22f849";

  const [recepies, setRecepies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecepies();
  }, [query]);

  const getRecepies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecepies(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recepies.map(recepies => (
        <Recepie
          key={recepies.recipe.key}
          title={recepies.recipe.label}
          calories={recepies.recipe.calories}
          image={recepies.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
