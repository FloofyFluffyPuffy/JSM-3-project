import { useEffect } from "react";
import { useAnime } from "./AnimeProvider";
import axios from "axios";
export const getAnime = () => {
  const {
    animeList,
    setAnimeList,
    loading,
    setLoading,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm
  } = useAnime();
  const API_URL = import.meta.env.VITE_API_URL; // remember to put this wher package.json,vite.ts is
       useEffect(() => {
        setLoading(true);
          //   console.log("Calling API URL:", API_URL); //checking API
          axios
            .get(`${API_URL}/`,  {params: {searchTerm}}) 
            // params pass it along with the url like http://localhost:5174/?searchTerm=one+piece to back end
            .then((res) => {
                     // use then bcuz it simple no need chaining thens
              setAnimeList(res.data.animeData);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Failed to fetch anime data", error);
              setLoading(false);
            });
        }, [debouncedSearchTerm]);
  useEffect(() => {
    console.log("animeList updated:", animeList);
  }, [animeList]);
  // ! really annoying, need to run both backend and front
  // !  also need .env.local to be same place as package.json and vite.config
  //? why loading, it wont matter cuz when it get to this it the useffect will be complete?
  // bcuz this isnt async/await, then only stop code in the block and still run the rest A B(then here) C => A C B
  return null
};

export default GetAnime;
