import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useAnime } from "../anime/AnimeProvider";
import axios from "axios";
const Search = () => {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const { setSearchTerm, inputValue, setInputValue, setSearchCL, searchCL } =
    useAnime();
  const inputRef = useRef<HTMLInputElement>(null); // <== here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setSearchTerm(inputValue);
    inputRef.current?.blur(); // <== blur input
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/searchCard`, { params: { inputValue } })
      .then((res) => {
        setSearchCL(res.data.searchCL);
        console.log("Fetched searchCL:", res.data.searchCL);
      });
  }, [inputValue]);
  return (
    <div className="searchWrap relative">
      <form className="search group" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={() => inputRef.current?.blur()}>
          {" "}
          {/*without this if search by clicking icon it wont unfocus */}
          <img className="searchIcon" src="/search.png" alt="Search" />
        </button>
      </form>
      <div className="animeDropdown">
        {searchCL.map((card) => (
          <div className="searchCard" key={card.href}>
            <img src={card.image} alt={card.title} />
            <div className="searchCD">
              <p>{card.title}</p>
              <div className="cardExtraD">
                <span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
