import { createContext, useContext, useEffect, useState } from "react";
import type { Anime, StreamData } from "../../../../Backend/type";
import axios from "axios";
import { useDebounce } from "react-use";
interface AnimeContextType {
  animeList: Anime[],
  loading: boolean,
    setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
    debouncedSearchTerm: string;
        scrapedStreamData: StreamData
    setScrapedStreamData:React.Dispatch<React.SetStateAction<StreamData>>
}
const AnimeContext = createContext<AnimeContextType | null>(null); // make new context
// | is either || is or
export const useAnime = () => {
  const context = useContext(AnimeContext); // error check
  if (context === null) throw new Error("useAnime must be use within AnimeProvider");
  return context;
};
export const AnimeProvider = ({ children }: { children: React.ReactNode }) => {
  // wrapper to save time passing props manually 
    const [searchTerm, setSearchTerm] = useState<string>('');
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
   useDebounce(() => {
  setDebouncedSearchTerm(searchTerm);
}, 300, [searchTerm]);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [scrapedStreamData, setScrapedStreamData] = useState<StreamData>
  ({
      title: "",
  image: "",
  status: "",
  type: "",
  desc: "",
  genres: [],
  aired: "",
  episodes: [],
  iframeSrc: "",
      score: "",
    duration: "",
    quality: "",
    views: "",
    studios: [],
    aliases: [],
  })
  return (
      <AnimeContext.Provider  value={{
    animeList,
    loading,
    setLoading,
    setAnimeList,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    scrapedStreamData,
    setScrapedStreamData
  }}>
        {children}
      </AnimeContext.Provider>
  );
};

export default AnimeProvider;
