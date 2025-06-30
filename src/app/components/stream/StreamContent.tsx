import React, { useState } from "react";
import { useAnime } from "../anime/AnimeProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const StreamContent = () => {
  const { loading, scrapedStreamData } = useAnime();
  const navigate = useNavigate();
  const { href } = useParams();
  const [currentEp, setCurrentEp] = useState(decodeURIComponent(href || ''));
    useEffect(() => {
    if (href) {
      setCurrentEp(decodeURIComponent(href));
    }
  }, [href]);
  if (loading)
    return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;
  return (
    <div className="streamContentPage">
      <h2 className="subHeader">{scrapedStreamData.title}</h2>
      <div className="animePlayer">
        <iframe
          src={scrapedStreamData.iframeSrc}
          className="w-full aspect-video rounded-xl shadow"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen"
        ></iframe>
        <div className="episodeList scrollbar-hide ">
          {scrapedStreamData.episodes.map((ep) => {
            const epHref = ep.href.replace(/^\/watch\//, '');
            const isActive = currentEp === epHref;

            return (
              <div
                className={`epButton ${isActive ? 'active' : ''}`} // we use .active in tailwind to apply class
                key={ep.order}
                onClick={() => {
                  const cleanHref = ep.href.replace(/^\/watch\//, "");
                  navigate(`/watch/${encodeURIComponent(cleanHref)}`);
                
                }}
              >
                {ep.order}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StreamContent;
