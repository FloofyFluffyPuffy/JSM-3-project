import { useState } from "react";

const Nav = () => {
  const [search, setSearch] = useState<string>();
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
