import React, { useEffect } from "react";
import { href, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAnime } from "../anime/AnimeProvider";
import axios from "axios";
import { useState } from "react";
const Search = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const {
    setSearchTerm,
    inputValue,
    setInputValue,
    setSearchCL,
    searchCL,
    dbInputValue,
  } = useAnime();
  const inputRef = useRef<HTMLInputElement>(null); // <== here
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false)

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
      // put in a function so we can use async, so it dont feed undefined data to the HTML css in return and crash everything
      try {
        const res = await axios.get(`${API_URL}/searchCard`, {
          params: { inputValue },
        });
        setSearchCL(res.data.cardData);
        //  console.log("Incoming card data:", SearchCL); // ! wrong cuz it only [] cuz old value somehow cuz delay need another usestate
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchData();
  }, [dbInputValue]);
  useEffect(() => {
    console.log("searchCL updated:", searchCL);
  }, [searchCL]);
  return (
    <div className="searchWrap relative group">
      <form className="search group" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onFocus={() => setIsFocused(true)}
  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={() => inputRef.current?.blur()}>
          {" "}
          {/*without this if search by clicking icon it wont unfocus */}
          <img className="searchIcon" src="/search.png" alt="Search" />
        </button>
      </form>
      <div className={`animeDropdown ${isFocused && searchCL.length > 0 ? "flex" : "hidden"}`}>
        {searchCL.map((card, index) => (
          <div
            className={`searchCard ${
              index === 0 ? "rounded-t-2xl" : index === 3 ? "rounded-b-2xl" : ""
            } ${isFocused && searchCL.length > 0 ? "flex" : "hidden"}`}
            key={index}
            onClick={() => {
              const cleanHref = card.href.replace(/^\/watch\//, "");
              navigate(`/watch/${encodeURIComponent(cleanHref)}`);
            }}
          >
            <img className="SCImage" src={card.image} alt={card.title} />
            <div className="searchCD">
              <p className="SCName">{card.title}</p>
              <div className="cardExtraD">
                <span>{card.aired.split(" to ")[0]}</span>
                {/* "Jun 12, 2024 to Sep 25, 2024".split(" to ")
⇒ ["Jun 12, 2024", "Sep 25, 2024"]

We take only the first part: [0] */}
                <span>{card.type}</span>
                <span>{card.SD}</span>
                <span>{card.newEp}</span>
                <span>{card.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
