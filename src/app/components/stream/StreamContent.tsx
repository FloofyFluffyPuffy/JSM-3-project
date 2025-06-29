import React from 'react';
import { useAnime } from '../anime/AnimeProvider';

const StreamContent = () => {
  const { loading, scrapedStreamData } = useAnime();

  if (loading) return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;
  return (
    <div>
      <h2>{scrapedStreamData.title}</h2>
      <div className="max-w-5xl mx-auto p-4">
        <iframe
          src={scrapedStreamData.iframeSrc}
          className="w-full aspect-video rounded-xl shadow"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default StreamContent;