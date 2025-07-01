import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAnime } from "../anime/AnimeProvider";
import axios from "axios";

const GetStream = ({ href }: { href?: string }) => {
    // have to : in {} too cuz it an object
    console.log("Sending href to backend:", href);
      const {
        setLoading,
        scrapedStreamData,
        setScrapedStreamData
      } = useAnime();
    const API_URL = import.meta.env.VITE_BACKEND_API_URL;
    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/watch/`, {params: {href}})
        .then((res) => {
          setScrapedStreamData(res.data.streamData)
          setLoading(false)
        })
    }, [href])
    useEffect(() => {
    console.log("Scraped stream data updated:", scrapedStreamData)
  }, [scrapedStreamData]);
  return null
};

export default GetStream;
