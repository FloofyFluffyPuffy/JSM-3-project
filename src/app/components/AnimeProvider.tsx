import { createContext, useContext, useEffect, useState } from "react";
import type { Anime } from "../../../Backend/anime";
import axios from "axios";
interface AnimeContextType {
  animeList: Anime[],
  loading: boolean
}
const AnimeContext = createContext<AnimeContextType | null>(null); // make new context
// | is either || is or
export const useAnime = () => {
  const context = useContext(AnimeContext); // error check
  if (context === null) throw new Error("useAnime must be use within AnimeProvider");
  return context;
};
export const AnimeProvider = ({ children }: { children: React.ReactNode }) => { // get data + wrapper 
  // save time passing props manually 
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const API_URL = import.meta.env.VITE_API_URL; // remember to put this wher package.json,vite.ts is
  useEffect(() => {
    console.log("Calling API URL:", API_URL); //checking API
    axios
      .get(`${API_URL}/`)
      .then((res) => {
        // use then bcuz it simple no need chaining thens
        setAnimeList(res.data.animeData);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch anime data", error);
        setLoading(false)
      });
  }, []);
  useEffect(() => {
    console.log("animeList updated:", animeList);
  }, [animeList]);
  // ! really annoying, need to run both backend and front
  // !  also need .env.local to be same place as package.json and vite.config
  //? why loading, it wont matter cuz when it get to this it the useffect will be complete?
  // bcuz this isnt async/await, then only stop code in the block and still run the rest A B(then here) C => A C B
  return (
      <AnimeContext.Provider value={{animeList, loading}}>
        {children}
      </AnimeContext.Provider>
  );
};

export default AnimeProvider;
