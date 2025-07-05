import { createContext, useContext, useEffect, useState } from "react";
import type { Anime, StreamData } from "../../../../Backend/type";
import { useDebounce } from "react-use";
interface AnimeContextType {
  animeList: Anime[];
  loading: boolean;
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
  scrapedStreamData: StreamData;
  setScrapedStreamData: React.Dispatch<React.SetStateAction<StreamData>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageInput: string;
  setPageInput: React.Dispatch<React.SetStateAction<string>>;
  searchCL: Anime[]; // added searchCL to context
  setSearchCL: React.Dispatch<React.SetStateAction<Anime[]>>; // added}
  inputValue: string; // added inputValue to context
  setInputValue: React.Dispatch<React.SetStateAction<string>>; // added inputValue
}
const AnimeContext = createContext<AnimeContextType | null>(null); // make new context
// | is either || is or
export const useAnime = () => {
  const context = useContext(AnimeContext); // error check
  if (context === null)
    throw new Error("useAnime must be use within AnimeProvider");
  return context;
};
export const AnimeProvider = ({ children }: { children: React.ReactNode }) => {
  // wrapper to save time passing props manually
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>("1"); // to avoid NaN problem on footer
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );
  const [inputValue, setInputValue] = useState("");
  const [searchCL, setSearchCL] = useState<Anime[]>([])
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrapedStreamData, setScrapedStreamData] = useState<StreamData>({
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
  });
  return (
    <AnimeContext.Provider
      value={{
        animeList,
        loading,
        setLoading,
        setAnimeList,
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        scrapedStreamData,
        setScrapedStreamData,
        page,
        setPage,
        pageInput,
        setPageInput,
        searchCL,
        setSearchCL, // added searchCL to context
        inputValue,
        setInputValue, // added inputValue to context
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeProvider;
