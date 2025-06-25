import React from 'react';
import { useAnime } from './AnimeProvider';
import AnimeCard from './AnimeCard';

const AnimeList = () => {
  const { animeList, loading } = useAnime();

  if (loading)
    return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;

  return (
    <div className='animeList'>
      <section>
        <h2 className='subHeader'>Popular Today</h2>
        <div className="cardContainer">
          {animeList.slice(0, 5).map((anime) => (
            <AnimeCard key={anime.title} anime={anime} />
          ))}
        </div>
      </section>

      <section>
        <h2 className='subHeader'>Latest Releases</h2>
        <div className="cardContainer">
          {animeList.slice(5).map((anime) => (
            <AnimeCard key={anime.title} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
