import React, { use } from "react";
import { useAnime } from "./anime/AnimeProvider";
const Footer = () => {
  const { page, setPage, pageInput, setPageInput, animeList } = useAnime();
  const SubmitHandle = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault(); 
    inputRef.current?.blur()
    setPage(parseInt(pageInput))
  }
  const inputRef = React.useRef<HTMLInputElement>(null); // Reference to the input element
  return (
    <div className="footer">
      <div className="pageControl">
        <img
          src="back.png"
          className="pageBtn bg-teto"
          onClick={() => setPage(page - 1)}
        />
        <p>Page</p>
        <form className="pageForm group" action="submit">
          <input className="pageInput" type="text" placeholder={`${page}`} value={pageInput} onChange={(e) => setPageInput(e.target.value)} ref={inputRef} />
          <button className="pageBtn bg-teto-lilac" type="submit"
        onClick={SubmitHandle}>GO</button>
        </form>
        <p> of 201</p>
        <img
          src="next.png"  
          className="pageBtn"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default Footer;
