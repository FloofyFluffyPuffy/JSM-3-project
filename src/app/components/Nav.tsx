import { useState } from "react";
import { useAnime } from "./anime/AnimeProvider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const { setSearchTerm } = useAnime();
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // <== here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setSearchTerm(inputValue);
    inputRef.current?.blur(); // <== blur input
  };

  return (
    <div className="nav">
      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
         <img className="fatTetoLogo" src="/fatTetoHome.png" onClick={() => navigate('/')} />
      </div>
      <form className="search group" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit"
        onClick={() => inputRef.current?.blur()}> {/*without this if search by clicking icon it wont unfocus */}
          <img className="searchIcon" src="/search.png" alt="Search" />  
        </button>
      </form>

      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
      </div>
    </div>
  );
};

export default Nav;
