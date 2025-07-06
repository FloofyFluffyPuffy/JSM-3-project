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
    if (typeof inputValue === "string") {
      setSearchTerm(inputValue);
    }
    inputRef.current?.blur(); // <== blur input
  };
  useEffect(() => {
    if (!inputValue.trim()) return; // remove black ""
    const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/searchCard`, { 
        params: { inputValue } 
      });
      setSearchCL(res.data.cardData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  fetchData() 
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
        {searchCL.length > 0 ? (
          searchCL.map((card) => (
            <div className="searchCard" key={card.href}>
              <img src={card.image} alt={card.title} />
              <div className="searchCD">
                <p>{card.title}</p>
                <div className="cardExtraD">
                  <span></span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noResults">No results found</div>
        )}
      </div>
    </div>
  );
};

export default Search;