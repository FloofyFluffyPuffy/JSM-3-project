import React from 'react';
import { useAnime } from './AnimeProvider';
import AnimeCard from './AnimeCard';

const AnimeList = () => {
  const { animeList, loading } = useAnime();

  if (loading)
    return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;

    if (animeList.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className='subHeader'>No Anime Found</h2>
        <img src="/tetoCry.png" alt="No results"/>
      </div>
    );

  return (
    <div className='animeList scrollbar-hide::-webkit-scrollbar'>
      <section>
        <div className="cardContainer">
          {animeList.map((anime) => (
            <AnimeCard key={anime.title} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
