import React, { useState } from "react";
import { useAnime } from "../anime/AnimeProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AnimeDetails from "./AnimeDetails";
import axios from "axios";
import { Episode } from "../../../../Backend/type";
const StreamContent = () => {
  const { loading, scrapedStreamData } = useAnime();
  const [loadingIframe, setLoadingIframe] = useState(true);
  const navigate = useNavigate();
  const { href } = useParams();
  const [iframeSrc, setIframeSrc] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [currentEp, setCurrentEp] = useState("1");
  const updateIframe = async (ep: Episode) => {
    const cleanHref: string = ep.href.replace(/^\/watch\//, "");
    try {
      setLoadingIframe(true);
      const res = await axios.get(`${API_URL}/updateIframe`, {
        params: { updateEP: cleanHref },
      }); // params musts be object
      setIframeSrc(res.data.newIframe);
      setCurrentEp(ep.order);
    } catch (error) {
      console.error("Failed to load iframe", error);
      setLoadingIframe(false);
    }
  };
  if (loading)
    return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;
  return (
    <div className="streamContentPage">
      <h2 className="subHeader">{scrapedStreamData.title}</h2>
      <div className="animePlayer">
  <div className="iframeWrapper relative">
    {loadingIframe && (
      <img
        src="/fatTeto.png"
        className="iframeTetoLoad"
        alt="Loading..."
      />
    )}
    <iframe
      src={iframeSrc || scrapedStreamData.iframeSrc}
      key={iframeSrc || scrapedStreamData.iframeSrc}
      onLoad={() => setLoadingIframe(false)}
      className="w-full aspect-video rounded-xl shadow z-0"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; fullscreen"
    ></iframe>
  </div>
        <div className="episodeList scrollbar-hide ">
          {scrapedStreamData.episodes.map((ep) => {
            const isActive = currentEp === ep.order;
            return (
              <div
                className={`epButton ${isActive ? "active" : ""}`} // we use .active in tailwind to apply class
                key={ep.order}
                onClick={() => {
                  if (ep.order === currentEp) return;
                  updateIframe(ep);
                }}
              >
                {ep.order}
              </div>
            );
          })}
        </div>
      </div>
      <AnimeDetails />
    </div>
  );
};

export default StreamContent;
