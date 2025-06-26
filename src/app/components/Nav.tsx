import { useState } from "react";
import { useAnime } from "./AnimeProvider";
const Nav = () => {
  const {searchTerm, setSearchTerm} = useAnime();
  return (
    <div className="nav">
      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
      </div>

      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <img className="searchIcon" src="/search.png" alt="" />
      </div>
      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
      </div>
    </div>
  );
};

export default Nav;
